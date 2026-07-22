"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = { id: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (id: string, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
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
    addItem(id, quantity = 1) {
      setItems((current) => {
        const found = current.find((item) => item.id === id);
        return found
          ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + quantity } : item)
          : [...current, { id, quantity }];
      });
    },
    updateQuantity(id, quantity) {
      if (quantity < 1) return;
      setItems((current) => current.map((item) => item.id === id ? { ...item, quantity } : item));
    },
    removeItem(id) { setItems((current) => current.filter((item) => item.id !== id)); },
    clearCart() { setItems([]); },
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro de CartProvider");
  return context;
}
