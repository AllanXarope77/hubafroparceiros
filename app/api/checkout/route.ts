import { eq, inArray } from "drizzle-orm";
import { ensureShopCatalogSeeded, getDb } from "@/db";
import { shopOrders, shopProducts, type ShopOrderItem } from "@/db/schema";
import { createPaymentPreference } from "@/lib/mercado-pago";
import { productVariantPriceCents } from "@/lib/products";

type RequestedItem = { id?: unknown; quantity?: unknown; size?: unknown; color?: unknown };

function requestItems(value: unknown) {
  if (!Array.isArray(value) || !value.length || value.length > 30) return null;
  const items = value.map((item: RequestedItem) => ({
    id: Number(String(item?.id ?? "").replace("custom-", "")),
    quantity: Number(item?.quantity),
    size: String(item?.size ?? "").trim().slice(0, 30),
    color: String(item?.color ?? "").trim().slice(0, 30),
  }));
  if (items.some(item => !Number.isInteger(item.id) || item.id <= 0 || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20)) return null;
  return items;
}

function message(error: unknown) {
  return error instanceof Error ? error.message : "Não foi possível iniciar o pagamento.";
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { items?: unknown };
    const requested = requestItems(payload.items);
    if (!requested) return Response.json({ error: "Revise os produtos do carrinho." }, { status: 400 });

    await ensureShopCatalogSeeded();
    const db = await getDb();
    const ids = [...new Set(requested.map(item => item.id))];
    const products = await db.select().from(shopProducts).where(inArray(shopProducts.id, ids));
    const productMap = new Map(products.map(product => [product.id, product]));
    if (products.length !== ids.length || products.some(product => product.status !== "active")) {
      return Response.json({ error: "Um dos produtos não está mais disponível." }, { status: 409 });
    }

    const items: ShopOrderItem[] = requested.map(item => {
      const product = productMap.get(item.id)!;
      const size = item.size || product.sizes?.[0] || "";
      const color = item.color || product.colors?.[0] || "";
      if ((size && !product.sizes.includes(size)) || (color && !product.colors.includes(color))) {
        throw new Error(`A variação escolhida de “${product.name}” não está mais disponível.`);
      }
      return {
        productId: product.id,
        name: [product.name, size, color].filter(Boolean).join(" · "),
        quantity: item.quantity,
        unitPriceCents: productVariantPriceCents(product, size, color),
      };
    });
    const totalCents = items.reduce((total, item) => total + item.unitPriceCents * item.quantity, 0);
    const orderId = crypto.randomUUID();
    const origin = new URL(request.url).origin;
    await db.insert(shopOrders).values({ id: orderId, status: "creating", totalCents, items, mode: "test" });

    try {
      const { data: preference, testMode } = await createPaymentPreference({
        items: items.map(item => {
          const product = productMap.get(item.productId)!;
          return {
            id: String(item.productId),
            title: item.name,
            description: product.description || "Produto DNA Guetos",
            picture_url: product.image.startsWith("http") ? product.image : `${origin}${product.image}`,
            quantity: item.quantity,
            currency_id: "BRL",
            unit_price: item.unitPriceCents / 100,
          };
        }),
        external_reference: orderId,
        statement_descriptor: "DNA GUETOS",
        back_urls: {
          success: `${origin}/pedido?order=${orderId}&result=success`,
          pending: `${origin}/pedido?order=${orderId}&result=pending`,
          failure: `${origin}/pedido?order=${orderId}&result=failure`,
        },
        notification_url: `${origin}/api/mercado-pago/webhook`,
        auto_return: "approved",
        binary_mode: false,
        payment_methods: { installments: 12 },
      });
      const checkoutUrl = testMode ? (preference.sandbox_init_point || preference.init_point) : preference.init_point;
      if (!preference.id || !checkoutUrl) throw new Error("O Mercado Pago não retornou o endereço de pagamento.");
      await db.update(shopOrders).set({
        status: "ready",
        preferenceId: preference.id,
        checkoutUrl,
        mode: testMode ? "test" : "production",
        updatedAt: new Date().toISOString(),
      }).where(eq(shopOrders.id, orderId));
      return Response.json({ orderId, checkoutUrl, testMode });
    } catch (error) {
      await db.update(shopOrders).set({ status: "failed", updatedAt: new Date().toISOString() }).where(eq(shopOrders.id, orderId));
      throw error;
    }
  } catch (error) {
    return Response.json({ error: message(error) }, { status: 500 });
  }
}
