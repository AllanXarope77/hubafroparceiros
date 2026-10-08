import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { UnsubscribeForm } from "@/components/newsletter/unsubscribe-form";
import { Eyebrow } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Descadastrar da Carta do HUB", robots: { index: false, follow: false } };

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return <SiteShell><section className="hub-inner-hero hub-inner-hero--compact"><div className="container"><Reveal><Eyebrow>Carta do HUB</Eyebrow><h1>Gerencie sua<br /><span>inscrição.</span></h1><p>Você pode cancelar os próximos envios a qualquer momento.</p><div className="newsletter-page-form"><UnsubscribeForm token={token} /></div></Reveal></div></section></SiteShell>;
}

