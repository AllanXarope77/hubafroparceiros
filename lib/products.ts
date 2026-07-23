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

export type Product = {
  id: string;
  name: string;
  stock: number;
  image: string;
  publicUrl: string;
  officialUrl: string;
  categories: ShopCategory[];
  priceCents: number;
  price: string;
  description?: string;
  status?: "active" | "draft";
  sizes?: string[];
  colors?: string[];
  colorImages?: Array<{ color: string; image: string }>;
};

export type SavedProduct = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  stock: number;
  image: string;
  officialUrl: string;
  productType: "camisa" | "bone" | "moletom" | "livro";
  audience: "masculino" | "feminino" | "unissex" | "infantil";
  sizes: string[];
  colors: string[];
  extraCategories: string[];
  colorImages: Array<{ color: string; image: string }>;
  status: "active" | "draft";
  createdAt: string;
};

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

export function savedProductToProduct(saved: SavedProduct): Product {
  const categories: ShopCategory[] = [saved.productType];
  if (saved.audience === "unissex") categories.push("masculino", "feminino");
  if (saved.audience === "masculino" || saved.audience === "feminino") categories.push(saved.audience);
  for (const category of saved.extraCategories ?? []) {
    if (shopCategories.some(item => item.id === category) && category !== "todos") categories.push(category as ShopCategory);
  }
  return {
    id: String(saved.id),
    name: saved.name,
    description: saved.description,
    stock: saved.stock,
    image: saved.image,
    publicUrl: saved.officialUrl,
    officialUrl: saved.officialUrl,
    categories: [...new Set(categories)],
    priceCents: saved.priceCents,
    price: formatPrice(saved.priceCents),
    status: saved.status,
    sizes: Array.isArray(saved.sizes) ? saved.sizes : [],
    colors: Array.isArray(saved.colors) ? saved.colors : [],
    colorImages: Array.isArray(saved.colorImages) ? saved.colorImages : [],
  };
}
