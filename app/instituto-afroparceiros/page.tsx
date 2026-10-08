import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Instituto Afroparceiros", description: "Frente de impacto social, cultura, educação e transformação do ecossistema AFROPARCEIROS." };

export default function InstitutoPage() {
  return <SiteShell>
    <section className="institute-hero"><div className="container institute-hero-grid"><Reveal><Eyebrow>Instituto Afroparceiros</Eyebrow><h1>Impacto social,<br /><span>cultura e educação.</span></h1><p>O Instituto Afroparceiros é a frente do ecossistema voltada à transformação social, à cultura e à educação.</p><div className="hero-actions"><ButtonLink href="/contato?assunto=parceria">Propor uma parceria</ButtonLink><ButtonLink href="/projetos" variant="ghost">Banco de projetos</ButtonLink></div></Reveal><Reveal className="institute-mark" delay={.08}><Image src="/images/instituto-afroparceiros-oficial.png" alt="Instituto Afroparceiros" width={1000} height={1000} priority /></Reveal></div></section>
    <section className="section institute-structure-section"><div className="container"><SectionHeading eyebrow="Compromisso institucional" title={<>Transformação construída<br />com <span className="gold-text">responsabilidade.</span></>} copy="Projetos, resultados, territórios e parceiros serão apresentados somente quando houver informações oficiais validadas." /><div className="hero-actions"><ButtonLink href="/contato?assunto=instituto">Falar com o Instituto</ButtonLink></div></div></section>
  </SiteShell>;
}

