"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "./cart-provider";

export function AddToCartButton({ id, quantity = 1, compact = false, size, color }: { id: string; quantity?: number; compact?: boolean; size?: string; color?: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={compact ? "product-add" : "button button--gold product-detail-add"}
      onClick={() => {
        addItem(id, quantity, size, color);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
    >
      {added ? <Check size={17} /> : <ShoppingBag size={17} />}
      {added ? "Adicionado" : "Adicionar ao carrinho"}
    </button>
  );
}
