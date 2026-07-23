import { eq } from "drizzle-orm";
import { ensureShopSchema, getDb } from "@/db";
import { shopOrders } from "@/db/schema";
import { syncMercadoPagoPayment } from "@/lib/order-payments";

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const orderId = String(params.get("order") ?? "");
    const paymentId = String(params.get("payment_id") ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(orderId)) return Response.json({ error: "Pedido inválido." }, { status: 400 });
    if (paymentId) {
      const result = await syncMercadoPagoPayment(paymentId, orderId);
      return Response.json({ order: result.order });
    }
    await ensureShopSchema();
    const db = await getDb();
    const [order] = await db.select().from(shopOrders).where(eq(shopOrders.id, orderId)).limit(1);
    if (!order) return Response.json({ error: "Pedido não encontrado." }, { status: 404 });
    return Response.json({ order });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Não foi possível consultar o pedido." }, { status: 500 });
  }
}
