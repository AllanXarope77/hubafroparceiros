import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Eyebrow } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";

export const metadata: Metadata = { title: "Carta do HUB", description: "Curadoria editorial da AFROPARCEIROS por e-mail." };

export default function CartaPage() {
  return <SiteShell><section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Carta do HUB</Eyebrow><h1>Uma curadoria para<br /><span>ampliar repertórios.</span></h1><p>Receba ideias, encontros, lançamentos e movimentos do ecossistema AFROPARCEIROS. A assinatura exige consentimento explícito e pode ser cancelada a qualquer momento.</p><div className="newsletter-page-form"><NewsletterForm /></div></Reveal></div></section></SiteShell>;
}

