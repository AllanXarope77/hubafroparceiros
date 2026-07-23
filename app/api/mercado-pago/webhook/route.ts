import { syncMercadoPagoPayment } from "@/lib/order-payments";

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const body = await request.json().catch(() => ({})) as { data?: { id?: unknown } };
    const paymentId = String(url.searchParams.get("data.id") ?? body.data?.id ?? "");
    if (!paymentId) return Response.json({ received: true });
    await syncMercadoPagoPayment(paymentId);
    return Response.json({ received: true });
  } catch {
    return Response.json({ received: true });
  }
}
