import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";
import { projectFilters } from "@/content/hub-architecture";

export const metadata: Metadata = { title: "Banco de Projetos", description: "Projetos culturais, educacionais e sociais concebidos pela AFROPARCEIROS.", alternates: { canonical: "/projetos" } };

export default function ProjetosPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Banco de Projetos AFROPARCEIROS</Eyebrow><h1>Projetos que podem<br /><span>transformar territórios.</span></h1><p>Conheça projetos concebidos pela Afroparceiros nas áreas de cultura, educação, desenvolvimento social, música, literatura, formação e economia criativa. Encontre oportunidades para patrocinar, apoiar ou realizar conosco.</p><div className="hero-actions"><ButtonLink href="/contato?assunto=patrocinio">Converse sobre patrocínio</ButtonLink></div></Reveal></div></section>
    <section className="section hub-catalog-section"><div className="container"><SectionHeading eyebrow="Banco de projetos" title={<>Cultura, educação<br />e <span className="gold-text">transformação.</span></>} copy="Encontre caminhos para apoiar, patrocinar ou realizar projetos culturais, sociais e educacionais em parceria com a AFROPARCEIROS." /><div className="project-filter-rail" aria-label="Áreas do banco de projetos">{projectFilters.map(filter => <span key={filter}>{filter}</span>)}</div><Reveal className="project-empty-state"><h2>Vamos construir uma parceria?</h2><p>Conte-nos a área de interesse, o território e o formato de participação que sua organização procura.</p><div className="project-detail-actions"><ButtonLink href="/contato?assunto=patrocinio">Quero patrocinar este projeto</ButtonLink><ButtonLink href="/contato?assunto=levar-projeto" variant="ghost">Quero levar este projeto para minha cidade/instituição</ButtonLink></div></Reveal></div></section>
  </SiteShell>;
}

