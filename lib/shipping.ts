export type ShippingItem = { quantity: number; weightGrams: number; lengthCm: number; widthCm: number; heightCm: number };
export type ShippingQuote = { service: string; priceCents: number; estimatedDays: number };

export async function quoteShipping(postalCode: string, items: ShippingItem[]): Promise<ShippingQuote[]> {
  const provider = process.env.SHIPPING_PROVIDER?.trim() || "disabled";
  if (provider === "mock" && process.env.NODE_ENV !== "production") {
    const units = items.reduce((sum, item) => sum + item.quantity, 0);
    return [{ service: "Simulação padrão", priceCents: 1800 + units * 250, estimatedDays: 7 }];
  }
  if (provider === "correios") {
    const configured = process.env.CORREIOS_ORIGIN_CEP && process.env.CORREIOS_USERNAME && process.env.CORREIOS_ACCESS_CODE;
    if (!configured) throw new Error("A cotação dos Correios aguarda CEP de origem, contrato e credenciais.");
    throw new Error("O adaptador dos Correios está protegido até a validação das credenciais de produção.");
  }
  throw new Error("A cotação de frete ainda não está ativa.");
}

