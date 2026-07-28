"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = { id: string; quantity: number; size?: string; color?: string };

export function cartItemKey(item: Pick<CartItem, "id" | "size" | "color">) {
  return `${item.id}::${item.size ?? ""}::${item.color ?? ""}`;
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (id: string, quantity?: number, size?: string, color?: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "dna-guetos-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setItems(JSON.parse(saved));
      } catch { /* mantém o carrinho vazio */ }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    addItem(id, quantity = 1, size, color) {
      setItems((current) => {
        const nextItem = { id, quantity, size, color };
        const key = cartItemKey(nextItem);
        const found = current.find((item) => cartItemKey(item) === key);
        return found
          ? current.map((item) => cartItemKey(item) === key ? { ...item, quantity: item.quantity + quantity } : item)
          : [...current, nextItem];
      });
    },
    updateQuantity(key, quantity) {
      if (quantity < 1) return;
      setItems((current) => current.map((item) => cartItemKey(item) === key ? { ...item, quantity } : item));
    },
    removeItem(key) { setItems((current) => current.filter((item) => cartItemKey(item) !== key)); },
    clearCart() { setItems((current) => current.length ? [] : current); },
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro de CartProvider");
  return context;
}
