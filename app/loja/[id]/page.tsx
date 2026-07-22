import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ProductDetailLoader } from "@/components/shop/product-detail-loader";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() { return products.map((product) => ({ id: product.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const product = getProduct((await params).id);
  return { title: product ? `${product.name} | DNA Guetos` : "Produto | DNA Guetos", description: product ? `Conheça ${product.name}.` : undefined };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  return <SiteShell><ProductDetailLoader id={id} initialProduct={product} /></SiteShell>;
}
