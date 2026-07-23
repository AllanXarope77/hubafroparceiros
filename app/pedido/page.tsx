import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { OrderStatus } from "@/components/shop/order-status";

export const metadata: Metadata = { title: "Status do pedido | DNA Guetos", description: "Acompanhe a confirmação do seu pagamento." };

export default async function PedidoPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const value = (name: string) => Array.isArray(params[name]) ? params[name][0] ?? "" : params[name] ?? "";
  return <SiteShell><OrderStatus orderId={value("order")} paymentId={value("payment_id")} result={value("result")} /></SiteShell>;
}
