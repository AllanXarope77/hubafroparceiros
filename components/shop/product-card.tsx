import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const type = product.categories.includes("livro") ? "Livro" : product.categories.includes("bone") ? "Boné" : product.categories.includes("moletom") ? "Moletom" : "Camisa";

  return (
    <article className="product-card shop-product-card">
      <Link href={`/loja/${product.id}`} className="product-card-link" aria-label={`Ver ${product.name}`}>
        <div className="product-art product-art--image">
          <Image className="product-art-image" src={product.image} alt={product.name} width={1200} height={1200} priority={priority} unoptimized />
        </div>
        <div className="product-info">
          <div><small>{type}</small><h3>{product.name}</h3></div>
          <div className="product-price"><strong>{product.price}</strong><span>Preço no Pix</span></div>
        </div>
      </Link>
      <div className="product-card-actions">
        <Link className="product-view" href={`/loja/${product.id}`}>Ver produto</Link>
        <AddToCartButton id={product.id} size={product.sizes?.[0]} color={product.colors?.[0]} compact />
      </div>
    </article>
  );
}
