"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { savedProductToProduct, shopCategories, type Product, type SavedProduct, type ShopCategory } from "@/lib/products";
import { ProductCard } from "./product-card";

export function ShopCatalog() {
  const [category, setCategory] = useState<ShopCategory>("todos");
  const [query, setQuery] = useState("");
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?status=active", { cache: "no-store" })
      .then(async response => {
        if (!response.ok) throw new Error();
        const data = await response.json() as { products?: SavedProduct[] };
        setCatalogProducts((data.products ?? []).map(savedProductToProduct));
      })
      .catch(() => setCatalogProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => catalogProducts.filter((product) => {
    const matchesCategory = category === "todos" || product.categories.includes(category);
    const matchesQuery = product.name.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  }), [catalogProducts, category, query]);

  return (
    <>
      <div className="shop-controls">
        <div className="category-pills" aria-label="Filtrar produtos por categoria">
          {shopCategories.map((item) => (
            <button key={item.id} type="button" className={category === item.id ? "selected" : ""} onClick={() => setCategory(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <label className="shop-search">
          <Search size={17} />
          <span className="sr-only">Buscar produto</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar produto" />
        </label>
      </div>
      <p className="product-count">{loading ? "Carregando catálogo..." : `${filtered.length} ${filtered.length === 1 ? "produto" : "produtos"}`}</p>
      {!loading && filtered.length ? (
        <div className="product-grid">
          {filtered.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 3} />)}
        </div>
      ) : !loading && <div className="shop-empty">Nenhum produto encontrado com esse filtro.</div>}
    </>
  );
}
