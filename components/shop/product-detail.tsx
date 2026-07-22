"use client";

import { ExternalLink, Minus, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="product-detail-section">
      <div className="container">
        <div className="product-breadcrumb"><Link href="/loja">DNA Guetos</Link><span>/</span><span>{product.name}</span></div>
        <div className="product-detail-grid">
          <div className="product-detail-image"><img src={product.image} alt={product.name} /></div>
          <div className="product-detail-copy">
            <span className="eyebrow"><i />Produto DNA Guetos</span>
            <h1>{product.name}</h1>
            <div className="product-detail-price"><strong>{product.price}</strong><span>no Pix</span></div>
            <p>Uma peça que transforma identidade, memória e resistência em presença.</p>
            <div className="quantity-row">
              <span>Quantidade</span>
              <div className="quantity-control">
                <button type="button" aria-label="Diminuir quantidade" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={16} /></button>
                <strong>{quantity}</strong>
                <button type="button" aria-label="Aumentar quantidade" onClick={() => setQuantity((value) => value + 1)}><Plus size={16} /></button>
              </div>
            </div>
            <AddToCartButton id={product.id} quantity={quantity} />
            <a className="official-options" href={product.officialUrl} target="_blank" rel="noreferrer">
              Escolher tamanho e cor na loja oficial <ExternalLink size={15} />
            </a>
            <div className="secure-note"><ShieldCheck size={20} /><span>Tamanhos, cores e pagamento são confirmados com segurança no checkout oficial da Yampi.</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

