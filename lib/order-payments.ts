import { eq } from "drizzle-orm";
import { ensureShopSchema, getDb } from "@/db";
import { shopOrders } from "@/db/schema";
import { getMercadoPagoPayment } from "@/lib/mercado-pago";

export async function syncMercadoPagoPayment(paymentId: string, expectedOrderId?: string) {
  const { data: payment } = await getMercadoPagoPayment(paymentId);
  const orderId = String(payment.external_reference ?? "");
  if (!orderId || (expectedOrderId && orderId !== expectedOrderId)) throw new Error("O pagamento não pertence a este pedido.");

  await ensureShopSchema();
  const db = await getDb();
  const [order] = await db.select().from(shopOrders).where(eq(shopOrders.id, orderId)).limit(1);
  if (!order) throw new Error("Pedido não encontrado.");
  const paidCents = Math.round(Number(payment.transaction_amount ?? 0) * 100);
  if (paidCents !== order.totalCents) throw new Error("O valor recebido não corresponde ao pedido.");

  const [updated] = await db.update(shopOrders).set({
    status: payment.status,
    paymentId: String(payment.id),
    updatedAt: new Date().toISOString(),
  }).where(eq(shopOrders.id, orderId)).returning();
  return { order: updated, payment };
}
