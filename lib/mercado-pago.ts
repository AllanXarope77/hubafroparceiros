type MercadoPagoPreference = {
  id?: string;
  init_point?: string;
  sandbox_init_point?: string;
  message?: string;
};

export type MercadoPagoPayment = {
  id: number | string;
  status: string;
  status_detail?: string;
  external_reference?: string;
  transaction_amount?: number;
  live_mode?: boolean;
};

async function accessToken() {
  const { env } = await import("cloudflare:workers");
  const token = (env as unknown as Record<string, string | undefined>).MERCADO_PAGO_ACCESS_TOKEN;
  if (!token) throw new Error("A integração com o Mercado Pago ainda não foi conectada.");
  return token;
}

async function mercadoPagoRequest<T>(path: string, init?: RequestInit) {
  const token = await accessToken();
  const response = await fetch(`https://api.mercadopago.com${path}`, {
    ...init,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const data = await response.json() as T & { message?: string; error?: string };
  if (!response.ok) throw new Error(data.message || data.error || "O Mercado Pago não respondeu corretamente.");
  return { data, testMode: token.startsWith("TEST-") };
}

export async function createPaymentPreference(payload: Record<string, unknown>) {
  return mercadoPagoRequest<MercadoPagoPreference>("/checkout/preferences", {
    method: "POST",
    headers: { "X-Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify(payload),
  });
}

export async function getMercadoPagoPayment(id: string) {
  if (!/^\d{1,30}$/.test(id)) throw new Error("Pagamento inválido.");
  return mercadoPagoRequest<MercadoPagoPayment>(`/v1/payments/${id}`);
}
