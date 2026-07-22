"use client";

import { ExternalLink, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/products";
import { useCart } from "./cart-provider";

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const entries = items.flatMap((item) => {
    const product = getProduct(item.id);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = entries.reduce((total, item) => total + item.product.priceCents * item.quantity, 0);

  if (!entries.length) {
    return (
      <section className="cart-section"><div className="container cart-empty">
        <ShoppingBag size={44} />
        <h1>Seu carrinho está vazio.</h1>
        <p>Explore a coleção DNA Guetos e escolha seus produtos.</p>
        <Link className="button button--gold" href="/loja">Ver produtos</Link>
      </div></section>
    );
  }

  return (
    <section className="cart-section">
      <div className="container">
        <div className="cart-title"><span className="eyebrow"><i />Sua seleção</span><h1>Carrinho</h1></div>
        <div className="cart-layout">
          <div className="cart-items">
            {entries.map(({ product, quantity }) => (
              <article className="cart-item" key={product.id}>
                <Link href={`/loja/${product.id}`} className="cart-item-image"><img src={product.image} alt={product.name} /></Link>
                <div className="cart-item-copy"><Link href={`/loja/${product.id}`}><h2>{product.name}</h2></Link><strong>{product.price}</strong>
                  <a href={product.officialUrl} target="_blank" rel="noreferrer">Escolher tamanho e cor <ExternalLink size={13} /></a>
                </div>
                <div className="quantity-control">
                  <button type="button" aria-label="Diminuir" onClick={() => quantity === 1 ? removeItem(product.id) : updateQuantity(product.id, quantity - 1)}><Minus size={15} /></button>
                  <strong>{quantity}</strong>
                  <button type="button" aria-label="Aumentar" onClick={() => updateQuantity(product.id, quantity + 1)}><Plus size={15} /></button>
                </div>
                <button type="button" className="cart-remove" aria-label={`Remover ${product.name}`} onClick={() => removeItem(product.id)}><Trash2 size={18} /></button>
              </article>
            ))}
            <button type="button" className="clear-cart" onClick={clearCart}>Limpar carrinho</button>
          </div>
          <aside className="cart-summary">
            <span>Resumo</span>
            <div><p>Produtos</p><strong>{items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
            <div className="cart-total"><p>Subtotal</p><strong>{formatPrice(subtotal)}</strong></div>
            <p className="cart-summary-note">Para confirmar tamanho, cor, frete e pagamento, abra cada produto na loja oficial. A Yampi reúne os itens no carrinho oficial durante a escolha.</p>
            <a className="button button--gold" href={entries[0].product.officialUrl} target="_blank" rel="noreferrer">Continuar na Yampi <ExternalLink size={16} /></a>
            <Link className="continue-shopping" href="/loja">Continuar comprando</Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

