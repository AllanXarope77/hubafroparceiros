import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { CartPage } from "@/components/shop/cart-page";

export const metadata: Metadata = { title: "Carrinho | DNA Guetos", description: "Sua seleção de produtos DNA Guetos." };

export default function CarrinhoPage() { return <SiteShell><CartPage /></SiteShell>; }
