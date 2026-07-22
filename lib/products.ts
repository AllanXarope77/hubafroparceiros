import catalog from "@/data/yampi-products.json";

export const shopCategories = [
  { id: "todos", label: "Todos" },
  { id: "masculino", label: "Masculino" },
  { id: "feminino", label: "Feminino" },
  { id: "bone", label: "Boné" },
  { id: "camisa", label: "Camisa" },
  { id: "moletom", label: "Moletom" },
  { id: "livro", label: "Livro" },
] as const;

export type ShopCategory = (typeof shopCategories)[number]["id"];

type RawProduct = (typeof catalog.products)[number];

export type Product = RawProduct & {
  categories: ShopCategory[];
  priceCents: number;
  price: string;
  officialUrl: string;
};

const localImages: Record<string, string> = {
  "43721859": "/images/dna-guetos/camisa-dna-guetos.png",
  "43722351": "/images/dna-guetos/camisa-thug-life.png",
  "43773672": "/images/dna-guetos/bone-dna-guetos.png",
  "44489867": "/images/dna-guetos/camisa-minimalista-dna-guetos.png",
  "44489895": "/images/dna-guetos/moletom-dna-guetos.png",
};

function productCategories(product: RawProduct): ShopCategory[] {
  const value = `${product.name} ${product.publicUrl}`.toLowerCase();
  const categories: ShopCategory[] = [];

  if (value.includes("livro")) categories.push("livro");
  if (value.includes("bone") || value.includes("boné")) categories.push("bone");
  if (value.includes("moletom") || value.includes("moleton")) categories.push("moletom");
  if (value.includes("camisa")) categories.push("camisa");

  const isFemale = /-f\/p|feminino|negra|panafricana|machista|misógino/.test(value);
  const isMale = /-m\/p|continuo-negro|panafricano/.test(value);
  const isChild = /-i\/p|criança/.test(value);

  if (!isChild) {
    if (isFemale) categories.push("feminino");
    if (isMale) categories.push("masculino");
    if (!isFemale && !isMale) categories.push("masculino", "feminino");
  }

  return [...new Set(categories)];
}

function productPrice(name: string) {
  const value = name.toLowerCase();
  if (value.includes("livro")) return 5500;
  if (value.includes("boné") || value.includes("bone")) return 9990;
  if (value.includes("moletom") || value.includes("moleton")) return 20000;
  return 15000;
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

export const products: Product[] = catalog.products.map((product) => {
  const priceCents = productPrice(product.name);
  return {
    ...product,
    image: localImages[product.id] ?? product.image,
    categories: productCategories(product),
    priceCents,
    price: formatPrice(priceCents),
    officialUrl: product.publicUrl.replace("afroparceiros.catalog.yampi.io", "www.afroparceiros.com"),
  };
});

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

