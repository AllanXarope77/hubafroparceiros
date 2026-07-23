import { desc, eq } from "drizzle-orm";
import { ensureShopCatalogSeeded, getDb } from "@/db";
import { shopProducts } from "@/db/schema";

const productTypes = new Set(["camisa", "bone", "moletom", "livro"]);
const audiences = new Set(["masculino", "feminino", "unissex", "infantil"]);
const statuses = new Set(["active", "draft"]);
const categoryNames = new Set(["masculino", "feminino", "bone", "camisa", "moletom", "livro"]);

function textList(value: unknown, maximum = 20) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(item => String(item).trim()).filter(item => item && item.length <= 30))].slice(0, maximum);
}

function colorImageList(value: unknown, selectedColors: string[]) {
  if (!Array.isArray(value)) return [];
  return value.flatMap(item => {
    if (!item || typeof item !== "object") return [];
    const color = String((item as { color?: unknown }).color ?? "").trim();
    const image = String((item as { image?: unknown }).image ?? "").trim();
    if (!selectedColors.includes(color) || !image.startsWith("/api/product-images/") || image.length > 500) return [];
    return [{ color, image }];
  }).slice(0, 20);
}

function isSafeImage(value: string) {
  if (value.startsWith("/images/") || value.startsWith("/api/product-images/")) return true;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

function message(error: unknown) {
  return error instanceof Error ? error.message : "Não foi possível acessar os produtos.";
}

function productValues(payload: Record<string, unknown>) {
  const name = String(payload.name ?? "").trim();
  const description = String(payload.description ?? "").trim();
  const image = String(payload.image ?? "").trim();
  const officialUrl = String(payload.officialUrl ?? "").trim();
  const productType = String(payload.productType ?? "");
  const audience = String(payload.audience ?? "unissex");
  const status = String(payload.status ?? "active");
  const sizes = textList(payload.sizes);
  const colors = textList(payload.colors);
  const extraCategories = textList(payload.extraCategories).filter(category => categoryNames.has(category));
  const colorImages = colorImageList(payload.colorImages, colors);
  const priceCents = Number(payload.priceCents);
  const stock = Number(payload.stock);

  if (!name || !image || !officialUrl || !productTypes.has(productType) || !audiences.has(audience) || !statuses.has(status)) {
    return { error: "Preencha os dados obrigatórios do produto." } as const;
  }
  let safeStoreUrl = false;
  try { safeStoreUrl = new URL(officialUrl).protocol === "https:"; } catch { /* invalid */ }
  if (!isSafeImage(image) || !safeStoreUrl) {
    return { error: "Use uma imagem válida e um link da Yampi iniciado por https://." } as const;
  }
  if (!Number.isInteger(priceCents) || priceCents < 0 || !Number.isInteger(stock) || stock < 0) {
    return { error: "Informe preço e estoque válidos." } as const;
  }
  if (name.length > 140 || description.length > 1200 || image.length > 1500 || officialUrl.length > 1500) {
    return { error: "Revise o tamanho dos textos e links." } as const;
  }
  return { values: { name, description, image, officialUrl, productType, audience, sizes, colors, extraCategories, colorImages, status, priceCents, stock } } as const;
}

export async function GET(request: Request) {
  try {
    await ensureShopCatalogSeeded();
    const db = await getDb();
    const params = new URL(request.url).searchParams;
    const id = Number(params.get("id"));

    if (Number.isInteger(id) && id > 0) {
      const [product] = await db.select().from(shopProducts).where(eq(shopProducts.id, id)).limit(1);
      if (!product) return Response.json({ error: "Produto não encontrado." }, { status: 404 });
      return Response.json({ product }, { headers: { "Cache-Control": "no-store" } });
    }

    const requestedStatus = params.get("status");
    const products = requestedStatus === "active"
      ? await db.select().from(shopProducts).where(eq(shopProducts.status, "active")).orderBy(desc(shopProducts.id)).limit(200)
      : await db.select().from(shopProducts).orderBy(desc(shopProducts.id)).limit(200);
    return Response.json({ products }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return Response.json({ error: message(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const parsed = productValues((await request.json()) as Record<string, unknown>);
    if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });
    await ensureShopCatalogSeeded();
    const db = await getDb();
    const [product] = await db.insert(shopProducts).values(parsed.values).returning();
    return Response.json({ product }, { status: 201 });
  } catch (error) {
    return Response.json({ error: message(error) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const id = Number(payload.id);
    if (!Number.isInteger(id) || id <= 0) return Response.json({ error: "Produto inválido." }, { status: 400 });
    const parsed = productValues(payload);
    if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });
    await ensureShopCatalogSeeded();
    const db = await getDb();
    const [product] = await db.update(shopProducts).set(parsed.values).where(eq(shopProducts.id, id)).returning();
    if (!product) return Response.json({ error: "Produto não encontrado." }, { status: 404 });
    return Response.json({ product });
  } catch (error) {
    return Response.json({ error: message(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!Number.isInteger(id) || id <= 0) return Response.json({ error: "Produto inválido." }, { status: 400 });
    await ensureShopCatalogSeeded();
    const db = await getDb();
    const [deleted] = await db.delete(shopProducts).where(eq(shopProducts.id, id)).returning({ id: shopProducts.id });
    if (!deleted) return Response.json({ error: "Produto não encontrado." }, { status: 404 });
    return Response.json({ deleted });
  } catch (error) {
    return Response.json({ error: message(error) }, { status: 500 });
  }
}
