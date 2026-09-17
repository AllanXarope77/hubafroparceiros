import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Instituto Afroparceiros", description: "Braço de impacto social, cultura, educação e transformação do ecossistema AFROPARCEIROS." };

export default function InstitutoPage() {
  return <SiteShell><section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Instituto Afroparceiros</Eyebrow><h1>Impacto social,<br /><span>cultura e educação.</span></h1><p>Esta área identifica o braço do ecossistema voltado à transformação social e está preparada para receber sua atuação, história, projetos, parceiros e credenciais oficiais.</p><div className="hero-actions"><ButtonLink href="/projetos">Conhecer o banco de projetos</ButtonLink></div></Reveal></div></section><section className="section institute-structure-section"><div className="container"><SectionHeading eyebrow="Estrutura preparada" title={<>Conteúdo institucional<br /><span className="gold-text">sem antecipar dados.</span></>} /><div className="about-placeholder-list about-placeholder-list--large"><span>Atuação</span><span>Projetos</span><span>Territórios</span><span>Parcerias</span><span>Impacto</span><span>Credenciais</span></div></div></section></SiteShell>;
}
