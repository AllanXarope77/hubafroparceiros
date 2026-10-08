import { quoteShipping, type ShippingItem } from "@/lib/shipping";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { postalCode?: unknown; items?: unknown };
    const postalCode = String(payload.postalCode ?? "").replace(/\D/g, "");
    if (postalCode.length !== 8 || !Array.isArray(payload.items) || !payload.items.length) {
      return Response.json({ error: "Informe um CEP e produtos válidos." }, { status: 400 });
    }
    const items = payload.items.slice(0, 30).map(item => item as ShippingItem);
    if (items.some(item => !Number.isInteger(item.quantity) || item.quantity < 1)) {
      return Response.json({ error: "Revise os itens para cotação." }, { status: 400 });
    }
    return Response.json({ quotes: await quoteShipping(postalCode, items) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Não foi possível calcular o frete." }, { status: 503 });
  }
}
