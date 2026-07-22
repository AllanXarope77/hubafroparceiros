"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { savedProductToProduct, type Product, type SavedProduct } from "@/lib/products";
import { ProductDetail } from "./product-detail";

export function ProductDetailLoader({ id, initialProduct }: { id: string; initialProduct?: Product }) {
  const [product, setProduct] = useState<Product | undefined>(initialProduct);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialProduct || !id.startsWith("custom-")) return;
    const numericId = id.replace("custom-", "");
    fetch(`/api/products?id=${numericId}`, { cache: "no-store" })
      .then(async response => {
        const data = await response.json() as { product?: SavedProduct; error?: string };
        if (!response.ok || !data.product) throw new Error(data.error || "Produto não encontrado.");
        setProduct(savedProductToProduct(data.product));
      })
      .catch(reason => setError(reason instanceof Error ? reason.message : "Produto não encontrado."));
  }, [id, initialProduct]);

  if (product) return <ProductDetail product={product} />;
  return <section className="product-detail-state"><div className="container"><p>{error || "Carregando produto..."}</p><Link href="/loja">Voltar para DNA Guetos</Link></div></section>;
}
