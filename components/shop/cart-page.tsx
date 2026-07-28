"use client";

import { CreditCard, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice, productVariantPriceCents, savedProductToProduct, type Product, type SavedProduct } from "@/lib/products";
import { cartItemKey, useCart } from "./cart-provider";

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [loadedProducts, setLoadedProducts] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    if (!items.length) return;
    fetch("/api/products", { cache: "no-store" })
      .then(response => response.json())
      .then((data: { products?: SavedProduct[] }) => setSavedProducts((data.products ?? []).map(savedProductToProduct)))
      .catch(() => setSavedProducts([]))
      .finally(() => setLoadedProducts(true));
  }, [items.length]);

  const entries = items.flatMap((item) => {
    const product = savedProducts.find(saved => saved.id === item.id.replace("custom-", ""));
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = entries.reduce((total, item) =>
    total + productVariantPriceCents(item.product, item.size ?? item.product.sizes?.[0], item.color) * item.quantity, 0);

  async function startCheckout() {
    setCheckingOut(true);
    setCheckoutError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await response.json() as { checkoutUrl?: string; error?: string };
      if (!response.ok || !data.checkoutUrl) throw new Error(data.error || "Não foi possível abrir o pagamento.");
      window.location.assign(data.checkoutUrl);
    } catch (reason) {
      setCheckoutError(reason instanceof Error ? reason.message : "Não foi possível abrir o pagamento.");
      setCheckingOut(false);
    }
  }

  if (!loadedProducts && items.length) {
    return <section className="cart-section"><div className="container cart-empty"><ShoppingBag size={44} /><h1>Preparando seu carrinho...</h1></div></section>;
  }

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
            {entries.map(({ product, quantity, size, color, ...cartItem }) => {
              const key = cartItemKey({ id: cartItem.id, size, color });
              const unitPrice = productVariantPriceCents(product, size ?? product.sizes?.[0], color);
              return (
              <article className="cart-item" key={key}>
                <Link href={`/loja/${product.id}`} className="cart-item-image"><img src={product.image} alt={product.name} /></Link>
                <div className="cart-item-copy"><Link href={`/loja/${product.id}`}><h2>{product.name}</h2></Link><strong>{formatPrice(unitPrice)}</strong>{(size || color) && <span>{[size, color].filter(Boolean).join(" · ")}</span>}</div>
                <div className="quantity-control">
                  <button type="button" aria-label="Diminuir" onClick={() => quantity === 1 ? removeItem(key) : updateQuantity(key, quantity - 1)}><Minus size={15} /></button>
                  <strong>{quantity}</strong>
                  <button type="button" aria-label="Aumentar" onClick={() => updateQuantity(key, quantity + 1)}><Plus size={15} /></button>
                </div>
                <button type="button" className="cart-remove" aria-label={`Remover ${product.name}`} onClick={() => removeItem(key)}><Trash2 size={18} /></button>
              </article>
            );})}
            <button type="button" className="clear-cart" onClick={clearCart}>Limpar carrinho</button>
          </div>
          <aside className="cart-summary">
            <span>Resumo</span>
            <div><p>Produtos</p><strong>{items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
            <div className="cart-total"><p>Subtotal</p><strong>{formatPrice(subtotal)}</strong></div>
            <p className="cart-summary-note"><ShieldCheck size={16} /> O pagamento é processado com segurança pelo Mercado Pago.</p>
            {checkoutError && <p className="checkout-error">{checkoutError}</p>}
            <button className="button button--gold checkout-button" type="button" onClick={startCheckout} disabled={checkingOut}>
              <CreditCard size={17} />{checkingOut ? "Abrindo pagamento..." : "Finalizar compra"}
            </button>
            <Link className="continue-shopping" href="/loja">Continuar comprando</Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
