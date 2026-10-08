import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";
import { projectFilters } from "@/content/hub-architecture";

export const metadata: Metadata = { title: "Banco de Projetos", description: "Projetos culturais, educacionais e sociais concebidos pela AFROPARCEIROS." };

export default function ProjetosPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Banco de Projetos AFROPARCEIROS</Eyebrow><h1>Projetos que podem<br /><span>transformar territórios.</span></h1><p>Conheça projetos concebidos pela Afroparceiros nas áreas de cultura, educação, desenvolvimento social, música, literatura, formação e economia criativa. Encontre oportunidades para patrocinar, apoiar ou realizar conosco.</p><div className="hero-actions"><ButtonLink href="/contato?assunto=patrocinio">Converse sobre patrocínio</ButtonLink></div></Reveal></div></section>
    <section className="section hub-catalog-section"><div className="container"><SectionHeading eyebrow="Curadoria responsável" title={<>Projetos publicados<br />com <span className="gold-text">informação validada.</span></>} copy="Cada projeto só entra na listagem pública depois que objetivos, público, território, formato, impacto, galeria e situação de captação forem confirmados." /><div className="project-filter-rail" aria-label="Áreas do banco de projetos">{projectFilters.map(filter => <span key={filter}>{filter}</span>)}</div><Reveal className="project-empty-state"><h2>Quer construir uma parceria agora?</h2><p>A Central de Relacionamento recebe demandas de patrocínio e realização enquanto os dossiês públicos são validados.</p><div className="project-detail-actions"><ButtonLink href="/contato?assunto=patrocinio">Quero patrocinar um projeto</ButtonLink><ButtonLink href="/contato?assunto=levar-projeto" variant="ghost">Quero levar um projeto para minha cidade/instituição</ButtonLink></div></Reveal></div></section>
  </SiteShell>;
}

