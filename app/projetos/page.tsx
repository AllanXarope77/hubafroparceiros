import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";
import { projectFilters, projectNames, projectSlug } from "@/content/hub-architecture";

export const metadata: Metadata = { title: "Banco de Projetos", description: "Projetos culturais, educacionais e sociais concebidos pela AFROPARCEIROS." };

export default function ProjetosPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Banco de Projetos AFROPARCEIROS</Eyebrow><h1>Projetos que podem<br /><span>transformar territórios.</span></h1><p>Conheça projetos concebidos pela Afroparceiros nas áreas de cultura, educação, desenvolvimento social, música, literatura, formação e economia criativa. Encontre oportunidades para patrocinar, apoiar ou realizar conosco.</p></Reveal></div></section>
    <section className="section hub-catalog-section"><div className="container"><SectionHeading eyebrow="Projetos preparados para parceria" title={<>Um banco vivo,<br /><span className="gold-text">pronto para crescer.</span></>} />
      <div className="project-filter-rail" aria-label="Filtros preparados para o banco de projetos"><button className="selected" type="button">Todos</button>{projectFilters.map(filter => <button type="button" key={filter} disabled title="Filtro disponível quando os projetos receberem categorias">{filter}</button>)}</div>
      <div className="project-bank-grid">{projectNames.map((name, index) => <Reveal className="project-bank-card" key={name} delay={(index % 3) * .04}><Link href={`/projetos/${projectSlug(name)}`}><span>{String(index + 1).padStart(2, "0")}</span><small>Projeto AFROPARCEIROS</small><h2>{name}</h2><p>Página preparada para receber objetivos, público, território, formato, impacto, galeria e situação de captação.</p><strong>Ver estrutura do projeto <ArrowRight size={16} /></strong></Link></Reveal>)}</div>
    </div></section>
  </SiteShell>;
}
