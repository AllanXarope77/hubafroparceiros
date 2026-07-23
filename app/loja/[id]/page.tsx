import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ProductDetailLoader } from "@/components/shop/product-detail-loader";

export const metadata: Metadata = {
  title: "Produto | DNA Guetos",
  description: "Conheça os produtos DNA Guetos.",
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SiteShell><ProductDetailLoader id={id} /></SiteShell>;
}
