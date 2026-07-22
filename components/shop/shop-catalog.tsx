"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { products, shopCategories, type ShopCategory } from "@/lib/products";
import { ProductCard } from "./product-card";

export function ShopCatalog() {
  const [category, setCategory] = useState<ShopCategory>("todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "todos" || product.categories.includes(category);
    const matchesQuery = product.name.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

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
      <p className="product-count">{filtered.length} {filtered.length === 1 ? "produto" : "produtos"}</p>
      {filtered.length ? (
        <div className="product-grid">
          {filtered.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 3} />)}
        </div>
      ) : <div className="shop-empty">Nenhum produto encontrado com esse filtro.</div>}
    </>
  );
}

