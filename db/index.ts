import { createClient, type Client, type InStatement, type InValue } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import catalog from "@/data/yampi-products.json";
import { editorProductColorAliases, yampiColorVariants } from "@/data/yampi-color-variants";
import * as schema from "./schema";

const catalogImportKey = "yampi_catalog_v1";
const clothingCatalogImportKey = "yampi_clothing_catalog_v2";
const variantPricingImportKey = "variant_pricing_and_sizes_v3";
const colorVariantsImportKey = "yampi_color_variants_v4";
const colorImageFallbacksImportKey = "color_image_fallbacks_v5";
const editorProductColorsImportKey = "editor_product_colors_v6";
const localImages: Record<string, string> = {
  "43721859": "/images/dna-guetos/camisa-dna-guetos.png",
  "43722351": "/images/dna-guetos/camisa-thug-life.png",
  "43773672": "/images/dna-guetos/bone-dna-guetos.png",
  "44489867": "/images/dna-guetos/camisa-minimalista-dna-guetos.png",
  "44489895": "/images/dna-guetos/moletom-dna-guetos.png",
};

let client: Client | undefined;

function getClient() {
  const url = process.env.TURSO_DATABASE_URL?.trim();
  const authToken = (
    process.env.TURSO_AUTH_TOKEN ?? process.env.TURSO_DATABASE_TURSO_AUTH_TOKEN
  )?.trim();
  if (!url) {
    throw new Error("Configure TURSO_DATABASE_URL e TURSO_AUTH_TOKEN para ativar o catálogo e o blog.");
  }
  client ??= createClient({ url, authToken: authToken || undefined });
  return client;
}

class LibSqlStatement {
  constructor(
    private readonly client: Client,
    private readonly sql: string,
    private readonly args: InValue[] = [],
  ) {}

  bind(...args: InValue[]) {
    return new LibSqlStatement(this.client, this.sql, args);
  }

  async first<T = Record<string, InValue>>() {
    const result = await this.client.execute({ sql: this.sql, args: this.args });
    return (result.rows[0] as unknown as T | undefined) ?? null;
  }

  async all<T = Record<string, InValue>>() {
    const result = await this.client.execute({ sql: this.sql, args: this.args });
    return { results: result.rows as unknown as T[] };
  }

  toStatement(): InStatement {
    return { sql: this.sql, args: this.args };
  }
}

class LibSqlD1Adapter {
  constructor(private readonly client: Client) {}

  prepare(sql: string) {
    return new LibSqlStatement(this.client, sql);
  }

  async batch(statements: LibSqlStatement[]) {
    return this.client.batch(statements.map(statement => statement.toStatement()), "write");
  }
}

export async function getD1() {
  return new LibSqlD1Adapter(getClient());
}

export async function getDb() {
  return drizzle(getClient(), { schema });
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
      image TEXT NOT NULL DEFAULT '',
      seo_title TEXT NOT NULL DEFAULT '',
      seo_description TEXT NOT NULL DEFAULT '',
      publication_status TEXT NOT NULL DEFAULT 'published',
      published_at TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    d1.prepare("CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts (created_at)"),
  ]);
  const columns = await d1.prepare("PRAGMA table_info(blog_posts)").all<{ name: string }>();
  const names = new Set(columns.results.map(column => column.name));
  const additions = [
    ["image", "TEXT NOT NULL DEFAULT ''"],
    ["seo_title", "TEXT NOT NULL DEFAULT ''"],
    ["seo_description", "TEXT NOT NULL DEFAULT ''"],
    ["publication_status", "TEXT NOT NULL DEFAULT 'published'"],
    ["published_at", "TEXT NOT NULL DEFAULT ''"],
  ].filter(([name]) => !names.has(name));
  if (additions.length) await d1.batch(additions.map(([name, type]) => d1.prepare(`ALTER TABLE blog_posts ADD COLUMN ${name} ${type}`)));
}

export async function ensureEngagementSchema() {
  const d1 = await getD1();
  await d1.batch([
    d1.prepare(`CREATE TABLE IF NOT EXISTS commercial_leads (
      id TEXT PRIMARY KEY,
      protocol TEXT NOT NULL,
      topic TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      whatsapp TEXT NOT NULL DEFAULT '',
      city_state TEXT NOT NULL DEFAULT '',
      company TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT '',
      event_date TEXT NOT NULL DEFAULT '',
      estimated_audience INTEGER NOT NULL DEFAULT 0,
      request_type TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL,
      consent INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    d1.prepare("CREATE UNIQUE INDEX IF NOT EXISTS commercial_leads_protocol_idx ON commercial_leads (protocol)"),
    d1.prepare(`CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      unsubscribe_token TEXT NOT NULL,
      consent_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      unsubscribed_at TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    d1.prepare("CREATE UNIQUE INDEX IF NOT EXISTS newsletter_email_idx ON newsletter_subscribers (email)"),
    d1.prepare("CREATE UNIQUE INDEX IF NOT EXISTS newsletter_token_idx ON newsletter_subscribers (unsubscribe_token)"),
    d1.prepare(`CREATE TABLE IF NOT EXISTS data_consents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_type TEXT NOT NULL,
      subject_id TEXT NOT NULL,
      purpose TEXT NOT NULL,
      granted INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
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

async function ensureYampiColorVariants(d1: Awaited<ReturnType<typeof getD1>>) {
  const imported = await d1.prepare("SELECT key FROM catalog_imports WHERE key = ?").bind(colorVariantsImportKey).first();
  if (imported) return;

  const statements = yampiColorVariants.map(product =>
    d1.prepare("UPDATE shop_products SET colors = ?, color_images = ? WHERE id = ?")
      .bind(JSON.stringify(product.colors), JSON.stringify(product.colorImages), product.id),
  );
  statements.push(d1.prepare("INSERT OR IGNORE INTO catalog_imports (key) VALUES (?)").bind(colorVariantsImportKey));
  await d1.batch(statements);
}

async function ensureColorImageFallbacks(d1: Awaited<ReturnType<typeof getD1>>) {
  const imported = await d1.prepare("SELECT key FROM catalog_imports WHERE key = ?").bind(colorImageFallbacksImportKey).first();
  if (imported) return;

  const result = await d1.prepare(`
    SELECT id, image, colors, color_images
    FROM shop_products
    WHERE colors <> '[]'
  `).all<{
    id: number;
    image: string;
    colors: string;
    color_images: string;
  }>();

  const statements = result.results.map(product => {
    const colors = JSON.parse(product.colors || "[]") as string[];
    const savedImages = JSON.parse(product.color_images || "[]") as Array<{ color: string; image: string }>;
    const imageByColor = new Map(savedImages.filter(item => item?.color && item?.image).map(item => [item.color, item.image]));
    const colorImages = colors.map(color => ({
      color,
      image: imageByColor.get(color) || product.image,
    }));
    return d1.prepare("UPDATE shop_products SET color_images = ? WHERE id = ?")
      .bind(JSON.stringify(colorImages), product.id);
  });

  statements.push(d1.prepare("INSERT OR IGNORE INTO catalog_imports (key) VALUES (?)").bind(colorImageFallbacksImportKey));
  await d1.batch(statements);
}

async function ensureEditorProductColors(d1: Awaited<ReturnType<typeof getD1>>) {
  const imported = await d1.prepare("SELECT key FROM catalog_imports WHERE key = ?").bind(editorProductColorsImportKey).first();
  if (imported) return;

  const statements = editorProductColorAliases.flatMap(alias => {
    const source = yampiColorVariants.find(product => product.id === alias.sourceId);
    if (!source) return [];
    return [
      d1.prepare("UPDATE shop_products SET colors = ?, color_images = ? WHERE id = ?")
        .bind(JSON.stringify(source.colors), JSON.stringify(source.colorImages), alias.id),
    ];
  });

  const editorProducts = await d1.prepare(`
    SELECT id, audience, sizes, catalog_data
    FROM shop_products
    WHERE id IN (${editorProductColorAliases.map(() => "?").join(", ")})
  `).bind(...editorProductColorAliases.map(product => product.id)).all<{
    id: number;
    audience: string;
    sizes: string;
    catalog_data: string;
  }>();

  for (const product of editorProducts.results) {
    const isInfant = product.audience === "infantil";
    const sizes = (JSON.parse(product.sizes || "[]") as string[])
      .filter(size => size !== "Ãšnico" && size !== "Único" && (isInfant || size !== "PP"));
    const data = JSON.parse(product.catalog_data || "{}") as {
      variants?: Array<Record<string, unknown> & { size?: string }>;
    };
    const variants = (data.variants || []).filter(variant => {
      const size = String(variant.size || "");
      return size !== "Ãšnico" && size !== "Único" && (isInfant || size !== "PP");
    });
    statements.push(
      d1.prepare("UPDATE shop_products SET sizes = ?, catalog_data = ? WHERE id = ?")
        .bind(JSON.stringify(sizes), JSON.stringify({ ...data, variants }), product.id),
    );
  }

  statements.push(d1.prepare("INSERT OR IGNORE INTO catalog_imports (key) VALUES (?)").bind(editorProductColorsImportKey));
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
  await ensureYampiColorVariants(d1);
  await ensureColorImageFallbacks(d1);
  await ensureEditorProductColors(d1);
}
