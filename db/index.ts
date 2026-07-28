import { drizzle } from "drizzle-orm/d1";
import catalog from "@/data/yampi-products.json";
import * as schema from "./schema";

const catalogImportKey = "yampi_catalog_v1";
const clothingCatalogImportKey = "yampi_clothing_catalog_v2";
const variantPricingImportKey = "variant_pricing_and_sizes_v3";
const localImages: Record<string, string> = {
  "43721859": "/images/dna-guetos/camisa-dna-guetos.png",
  "43722351": "/images/dna-guetos/camisa-thug-life.png",
  "43773672": "/images/dna-guetos/bone-dna-guetos.png",
  "44489867": "/images/dna-guetos/camisa-minimalista-dna-guetos.png",
  "44489895": "/images/dna-guetos/moletom-dna-guetos.png",
};

export async function getD1() {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) throw new Error("O armazenamento do site não está disponível.");
  return env.DB;
}

export async function getDb() {
  return drizzle(await getD1(), { schema });
}

export async function ensureBlogSchema() {
  const d1 = await getD1();
  await d1.batch([
    d1.prepare(`CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    d1.prepare("CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts (created_at)"),
  ]);
}

export async function ensureShopSchema() {
  const d1 = await getD1();
  await d1.batch([
    d1.prepare(`CREATE TABLE IF NOT EXISTS shop_products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      price_cents INTEGER NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      image TEXT NOT NULL,
      official_url TEXT NOT NULL DEFAULT '',
      product_type TEXT NOT NULL,
      audience TEXT NOT NULL DEFAULT 'unissex',
      sizes TEXT NOT NULL DEFAULT '[]',
      colors TEXT NOT NULL DEFAULT '[]',
      extra_categories TEXT NOT NULL DEFAULT '[]',
      color_images TEXT NOT NULL DEFAULT '[]',
      catalog_data TEXT NOT NULL DEFAULT '{}',
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    d1.prepare("CREATE INDEX IF NOT EXISTS shop_products_status_idx ON shop_products (status)"),
    d1.prepare("CREATE INDEX IF NOT EXISTS shop_products_created_at_idx ON shop_products (created_at)"),
    d1.prepare(`CREATE TABLE IF NOT EXISTS catalog_imports (
      key TEXT PRIMARY KEY,
      imported_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    d1.prepare(`CREATE TABLE IF NOT EXISTS shop_orders (
      id TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'created',
      total_cents INTEGER NOT NULL,
      items TEXT NOT NULL,
      preference_id TEXT NOT NULL DEFAULT '',
      payment_id TEXT NOT NULL DEFAULT '',
      checkout_url TEXT NOT NULL DEFAULT '',
      mode TEXT NOT NULL DEFAULT 'test',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    d1.prepare("CREATE INDEX IF NOT EXISTS shop_orders_created_at_idx ON shop_orders (created_at)"),
    d1.prepare("CREATE INDEX IF NOT EXISTS shop_orders_status_idx ON shop_orders (status)"),
  ]);
}

function importedProductFields(product: (typeof catalog.products)[number]) {
  const value = `${product.name} ${product.publicUrl}`.toLowerCase();
  const productType = value.includes("livro") ? "livro"
    : value.includes("boné") || value.includes("bone") ? "bone"
      : value.includes("moletom") || value.includes("moleton") ? "moletom" : "camisa";
  const audience = /-i\/p|criança/.test(value) ? "infantil"
    : /-f\/p|feminino|negra|panafricana|machista|misógino/.test(value) ? "feminino"
      : /-m\/p|continuo-negro|panafricano/.test(value) ? "masculino" : "unissex";
  const priceCents = productType === "livro" ? 5500 : productType === "bone" ? 9990 : productType === "moletom" ? 20000 : 15000;
  return {
    productType, audience, priceCents,
    image: localImages[product.id] ?? product.image,
    officialUrl: product.publicUrl.replace("afroparceiros.catalog.yampi.io", "www.afroparceiros.com"),
  };
}

function clothingAudience(product: (typeof catalog.products)[number]) {
  const value = `${product.name} ${product.publicUrl}`.toLowerCase();
  if (/-i\/p|criança/.test(value)) return "infantil";
  if (/-f\/p|feminino|negra|panafricana|machista|misógino/.test(value)) return "feminino";
  if (/-m\/p|continuo-negro|panafricano/.test(value)) return "masculino";
  return "unissex";
}

function clothingColor(product: (typeof catalog.products)[number]) {
  const value = `${product.image} ${product.publicUrl}`.toLowerCase();
  const colors = [
    ["preto", "Preto"], ["branco", "Branco"], ["vermelho", "Vermelho"], ["amarelo", "Amarelo"],
    ["rosa", "Rosa"], ["verde", "Verde"], ["azul", "Azul"], ["marrom", "Marrom"],
  ] as const;
  return colors.find(([key]) => value.includes(key))?.[1] ?? "";
}

function skuPart(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toUpperCase();
}

async function ensureClothingCatalogSeeded(d1: Awaited<ReturnType<typeof getD1>>) {
  const imported = await d1.prepare("SELECT key FROM catalog_imports WHERE key = ?").bind(clothingCatalogImportKey).first();
  if (imported) return;

  const clothing = catalog.products.filter(product => {
    const type = importedProductFields(product).productType;
    return (type === "camisa" || type === "moletom") && !product.image.includes("nophoto");
  });
  const nameCounts = new Map<string, number>();
  for (const product of clothing) nameCounts.set(product.name, (nameCounts.get(product.name) ?? 0) + 1);

  const audienceLabels = { masculino: "Masculina", feminino: "Feminina", infantil: "Infantil", unissex: "Unissex" };
  const sizes = ["PP", "P", "M", "G", "GG", "XG", "EXG", "X1", "X2", "X3", "Único"];
  const statements = clothing.map(product => {
    const fields = importedProductFields(product);
    const audience = clothingAudience(product);
    const productType = fields.productType as "camisa" | "moletom";
    const displayName = (nameCounts.get(product.name) ?? 0) > 1
      ? `${product.name} (${audienceLabels[audience]})`
      : product.name;
    const inferredColor = clothingColor(product);
    const colors = product.id === "43721859" ? ["Preto", "Branco", "Rosa"] : inferredColor ? [inferredColor] : [];
    const variantColors = colors.length ? colors : [""];
    const baseSku = `YAMPI-${product.id}`;
    const variants = sizes.flatMap(size => variantColors.map(color => ({
      key: `${size}::${color || "padrao"}`,
      size,
      color,
      sku: [baseSku, color, size].filter(Boolean).map(skuPart).join("-"),
      barcode: "",
      stock: 0,
      priceCents: ["X1", "X2", "X3"].includes(size) ? 20000 : fields.priceCents,
    })));
    const extraCategories = [productType, ...(audience === "masculino" || audience === "feminino" ? [audience] : [])];
    const piece = productType === "moletom" ? "Moletom" : "Camisa";
    const description = `${piece} autoral DNA GUETOS. ${displayName.replace(/^(Camisa|Moletom)\s+/i, "")} transforma identidade, memória e resistência em presença. Produto nacional desenvolvido para expressar cultura, pertencimento e atitude.`;
    const image = localImages[product.id] ?? product.image.replace("-small.", "-large.");
    const catalogData = {
      brand: "DNA GUETOS",
      baseSku,
      barcode: "",
      material: "",
      condition: "new",
      weightGrams: 0,
      lengthCm: 0,
      widthCm: 0,
      heightCm: 0,
      variants,
    };

    return d1.prepare(`INSERT INTO shop_products (
      id, name, description, price_cents, stock, image, official_url, product_type, audience,
      sizes, colors, extra_categories, color_images, catalog_data, status
    ) SELECT ?, ?, ?, ?, ?, ?, '', ?, ?, ?, ?, ?, '[]', ?, 'active'
    WHERE NOT EXISTS (
      SELECT 1 FROM shop_products WHERE json_extract(catalog_data, '$.baseSku') = ?
    )`).bind(
      Number(product.id), displayName, description, fields.priceCents, product.stock, image,
      productType, audience, JSON.stringify(sizes), JSON.stringify(colors), JSON.stringify(extraCategories),
      JSON.stringify(catalogData), baseSku,
    );
  });
  statements.push(d1.prepare("INSERT OR IGNORE INTO catalog_imports (key) VALUES (?)").bind(clothingCatalogImportKey));
  await d1.batch(statements);
}

async function ensureVariantPricingAndSizes(d1: Awaited<ReturnType<typeof getD1>>) {
  const imported = await d1.prepare("SELECT key FROM catalog_imports WHERE key = ?").bind(variantPricingImportKey).first();
  if (imported) return;

  const result = await d1.prepare(`
    SELECT id, price_cents, audience, sizes, catalog_data
    FROM shop_products
    WHERE sizes <> '[]'
  `).all<{
    id: number;
    price_cents: number;
    audience: string;
    sizes: string;
    catalog_data: string;
  }>();

  const statements = result.results.map(product => {
    const currentSizes = JSON.parse(product.sizes || "[]") as string[];
    const sizes = currentSizes.filter(size =>
      size !== "Único" && size !== "Ãšnico" && (size !== "PP" || product.audience === "infantil"),
    );
    const data = JSON.parse(product.catalog_data || "{}") as {
      variants?: Array<Record<string, unknown>>;
      [key: string]: unknown;
    };
    const variants = Array.isArray(data.variants)
      ? data.variants.flatMap(variant => {
          const size = String(variant.size ?? "");
          if (size === "Único" || size === "Ãšnico" || (size === "PP" && product.audience !== "infantil")) return [];
          return [{
            ...variant,
            priceCents: ["X1", "X2", "X3"].includes(size) ? 20000 : product.price_cents,
          }];
        })
      : [];
    return d1.prepare("UPDATE shop_products SET sizes = ?, catalog_data = ? WHERE id = ?")
      .bind(JSON.stringify(sizes), JSON.stringify({ ...data, variants }), product.id);
  });

  statements.push(d1.prepare("INSERT OR IGNORE INTO catalog_imports (key) VALUES (?)").bind(variantPricingImportKey));
  await d1.batch(statements);
}

export async function ensureShopCatalogSeeded() {
  await ensureShopSchema();
  const d1 = await getD1();
  await ensureClothingCatalogSeeded(d1);
  const imported = await d1.prepare("SELECT key FROM catalog_imports WHERE key = ?").bind(catalogImportKey).first();
  if (!imported) {
    const statements = catalog.products.map(product => {
      const fields = importedProductFields(product);
      return d1.prepare(`INSERT OR IGNORE INTO shop_products (
        id, name, description, price_cents, stock, image, official_url, product_type, audience,
        sizes, colors, extra_categories, color_images, status
      ) VALUES (?, ?, '', ?, ?, ?, ?, ?, ?, '[]', '[]', '[]', '[]', 'active')`).bind(
        Number(product.id), product.name, fields.priceCents, product.stock, fields.image,
        fields.officialUrl, fields.productType, fields.audience,
      );
    });
    statements.push(d1.prepare("INSERT OR IGNORE INTO catalog_imports (key) VALUES (?)").bind(catalogImportKey));
    await d1.batch(statements);
  }
  await ensureVariantPricingAndSizes(d1);
}
