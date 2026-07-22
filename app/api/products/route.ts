import { desc, eq } from "drizzle-orm";
import { ensureShopSchema, getDb } from "@/db";
import { shopProducts } from "@/db/schema";

const productTypes = new Set(["camisa", "bone", "moletom", "livro"]);
const audiences = new Set(["masculino", "feminino", "unissex", "infantil"]);
const statuses = new Set(["active", "draft"]);
const categoryNames = new Set(["masculino", "feminino", "bone", "camisa", "moletom", "livro"]);

function textList(value: unknown, maximum = 20) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(item => String(item).trim()).filter(item => item && item.length <= 30))].slice(0, maximum);
}

function message(error: unknown) {
  return error instanceof Error ? error.message : "Não foi possível acessar os produtos.";
}

export async function GET(request: Request) {
  try {
    await ensureShopSchema();
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
    const payload = (await request.json()) as Record<string, unknown>;
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
    const priceCents = Number(payload.priceCents);
    const stock = Number(payload.stock);

    if (!name || !image || !officialUrl || !productTypes.has(productType) || !audiences.has(audience) || !statuses.has(status)) {
      return Response.json({ error: "Preencha os dados obrigatórios do produto." }, { status: 400 });
    }
    try {
      const imageUrl = new URL(image);
      const storeUrl = new URL(officialUrl);
      if (imageUrl.protocol !== "https:" || storeUrl.protocol !== "https:") throw new Error();
    } catch {
      return Response.json({ error: "Use links seguros iniciados por https:// para a imagem e a Yampi." }, { status: 400 });
    }
    if (!Number.isInteger(priceCents) || priceCents < 0 || !Number.isInteger(stock) || stock < 0) {
      return Response.json({ error: "Informe preço e estoque válidos." }, { status: 400 });
    }
    if (name.length > 140 || description.length > 1200 || image.length > 1500 || officialUrl.length > 1500) {
      return Response.json({ error: "Revise o tamanho dos textos e links." }, { status: 400 });
    }

    await ensureShopSchema();
    const db = await getDb();
    const [product] = await db.insert(shopProducts).values({
      name, description, image, officialUrl, productType, audience, sizes, colors, extraCategories, status, priceCents, stock,
    }).returning();
    return Response.json({ product }, { status: 201 });
  } catch (error) {
    return Response.json({ error: message(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!Number.isInteger(id) || id <= 0) return Response.json({ error: "Produto inválido." }, { status: 400 });
    await ensureShopSchema();
    const db = await getDb();
    const [deleted] = await db.delete(shopProducts).where(eq(shopProducts.id, id)).returning({ id: shopProducts.id });
    if (!deleted) return Response.json({ error: "Produto não encontrado." }, { status: 404 });
    return Response.json({ deleted });
  } catch (error) {
    return Response.json({ error: message(error) }, { status: 500 });
  }
}
