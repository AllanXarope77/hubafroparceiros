"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "./cart-provider";

export function AddToCartButton({ id, quantity = 1, compact = false }: { id: string; quantity?: number; compact?: boolean }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={compact ? "product-add" : "button button--gold product-detail-add"}
      onClick={() => {
        addItem(id, quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
    >
      {added ? <Check size={17} /> : <ShoppingBag size={17} />}
      {added ? "Adicionado" : "Adicionar ao carrinho"}
    </button>
  );
}

