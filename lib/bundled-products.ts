import catalog from "@/data/yampi-products.json";
import { editorProductColorAliases, yampiColorVariants } from "@/data/yampi-color-variants";
import { emptyProductCatalogData, type SavedProduct } from "@/lib/products";

const localImages: Record<string, string> = {
  "43721859": "/images/dna-guetos/camisa-dna-guetos.png",
  "43722351": "/images/dna-guetos/camisa-thug-life.png",
  "43773672": "/images/dna-guetos/bone-dna-guetos.png",
  "44489867": "/images/dna-guetos/camisa-minimalista-dna-guetos.png",
  "44489895": "/images/dna-guetos/moletom-dna-guetos.png",
};

const standardSizes = ["P", "M", "G", "GG", "XG", "EXG", "X1", "X2", "X3"];

function productType(product: (typeof catalog.products)[number]): SavedProduct["productType"] {
  const value = `${product.name} ${product.publicUrl}`.toLowerCase();
  if (value.includes("livro")) return "livro";
  if (value.includes("boné") || value.includes("bone")) return "bone";
  if (value.includes("moletom") || value.includes("moleton")) return "moletom";
  return "camisa";
}

function audience(product: (typeof catalog.products)[number]): SavedProduct["audience"] {
  const value = `${product.name} ${product.publicUrl}`.toLowerCase();
  if (/-i\/p|criança/.test(value)) return "infantil";
  if (/-f\/p|feminino|negra|panafricana|machista|misógino/.test(value)) return "feminino";
  if (/-m\/p|continuo-negro|panafricano/.test(value)) return "masculino";
  return "unissex";
}

function priceCents(type: SavedProduct["productType"]) {
  if (type === "livro") return 5500;
  if (type === "bone") return 9990;
  if (type === "moletom") return 20000;
  return 15000;
}

export function hasRemoteDatabase() {
  return Boolean(process.env.TURSO_DATABASE_URL?.trim());
}

export function bundledProducts(): SavedProduct[] {
  return catalog.products.map(product => {
    const type = productType(product);
    const targetAudience = audience(product);
    const source = yampiColorVariants.find(item => item.id === Number(product.id))
      ?? (() => {
        const alias = editorProductColorAliases.find(item => item.id === Number(product.id));
        return alias ? yampiColorVariants.find(item => item.id === alias.sourceId) : undefined;
      })();
    const colors = source?.colors ?? [];
    const colorImages = source?.colorImages ?? [];
    const sizes = type === "camisa" || type === "moletom"
      ? [...(targetAudience === "infantil" ? ["PP"] : []), ...standardSizes]
      : [];
    const basePrice = priceCents(type);
    const baseSku = `YAMPI-${product.id}`;
    const variants = sizes.flatMap(size => (colors.length ? colors : [""]).map(color => ({
      key: `${size}::${color || "padrao"}`,
      size,
      color,
      sku: `${baseSku}-${color || "PADRAO"}-${size}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").toUpperCase(),
      barcode: "",
      stock: 0,
      priceCents: ["X1", "X2", "X3"].includes(size) ? 20000 : basePrice,
    })));

    return {
      id: Number(product.id),
      name: product.name,
      description: "",
      priceCents: basePrice,
      stock: product.stock,
      image: localImages[product.id] ?? product.image.replace("-small.", "-large."),
      officialUrl: product.publicUrl.replace("afroparceiros.catalog.yampi.io", "www.afroparceiros.com"),
      productType: type,
      audience: targetAudience,
      sizes,
      colors,
      extraCategories: [type, ...(targetAudience === "masculino" || targetAudience === "feminino" ? [targetAudience] : [])],
      colorImages,
      catalogData: { ...emptyProductCatalogData, brand: "DNA GUETOS", baseSku, variants },
      status: "active",
      createdAt: "2026-07-22T00:00:00.000Z",
    };
  });
}

