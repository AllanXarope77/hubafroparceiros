"use client";

import { CheckCircle2, Clock3, ShoppingBag, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/products";
import { useCart } from "./cart-provider";

type Order = { id: string; status: string; totalCents: number; mode: string };

export function OrderStatus({ orderId, paymentId, result }: { orderId: string; paymentId: string; result: string }) {
  const { clearCart } = useCart();
  const clearedCart = useRef(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState(orderId ? "" : "Pedido não identificado.");

  useEffect(() => {
    if (!orderId) return;
    const params = new URLSearchParams({ order: orderId });
    if (paymentId) params.set("payment_id", paymentId);
    fetch(`/api/orders/status?${params}`, { cache: "no-store" })
      .then(async response => {
        const data = await response.json() as { order?: Order; error?: string };
        if (!response.ok || !data.order) throw new Error(data.error || "Não foi possível consultar o pedido.");
        setOrder(data.order);
        if (data.order.status === "approved" && !clearedCart.current) {
          clearedCart.current = true;
          clearCart();
        }
      })
      .catch(reason => setError(reason instanceof Error ? reason.message : "Não foi possível consultar o pedido."));
  }, [orderId, paymentId, clearCart]);

  const status = order?.status;
  const approved = status === "approved";
  const failed = ["rejected", "cancelled", "refunded", "charged_back", "failed"].includes(status ?? "") || result === "failure";
  const pending = !!order && !approved && !failed;

  return (
    <section className="order-result-section">
      <div className="container order-result-card">
        {!order && !error && <><Clock3 size={48} /><h1>Confirmando seu pedido...</h1><p>Aguarde enquanto consultamos o Mercado Pago.</p></>}
        {error && <><XCircle size={48} /><h1>Não foi possível confirmar.</h1><p>{error}</p></>}
        {approved && <><CheckCircle2 size={52} /><span className="order-result-kicker">Pagamento aprovado</span><h1>Pedido confirmado!</h1><p>Recebemos seu pagamento. Em breve você receberá as informações da compra.</p></>}
        {pending && <><Clock3 size={52} /><span className="order-result-kicker">Pagamento em andamento</span><h1>Seu pedido está pendente.</h1><p>Assim que o Mercado Pago confirmar o pagamento, o status será atualizado.</p></>}
        {failed && order && <><XCircle size={52} /><span className="order-result-kicker">Pagamento não concluído</span><h1>Vamos tentar novamente?</h1><p>Nenhum pedido foi confirmado. Você pode retornar ao carrinho e escolher outra forma de pagamento.</p></>}
        {order && <div className="order-result-summary"><span>Pedido <strong>#{order.id.slice(0, 8).toUpperCase()}</strong></span><span>Total <strong>{formatPrice(order.totalCents)}</strong></span>{order.mode === "test" && <em>Ambiente de teste</em>}</div>}
        <div className="order-result-actions"><Link className="button button--gold" href={failed ? "/carrinho" : "/loja"}><ShoppingBag size={17} />{failed ? "Voltar ao carrinho" : "Continuar na loja"}</Link><Link href="/">Ir para o Hub</Link></div>
      </div>
    </section>
  );
}
