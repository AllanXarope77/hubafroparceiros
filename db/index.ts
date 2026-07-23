import { drizzle } from "drizzle-orm/d1";
import catalog from "@/data/yampi-products.json";
import * as schema from "./schema";

const catalogImportKey = "yampi_catalog_v1";
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

export async function ensureShopCatalogSeeded() {
  await ensureShopSchema();
  const d1 = await getD1();
  const imported = await d1.prepare("SELECT key FROM catalog_imports WHERE key = ?").bind(catalogImportKey).first();
  if (imported) return;

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
