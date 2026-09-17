import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";
import { projectNames, projectSlug } from "@/content/hub-architecture";

export const metadata: Metadata = { title: "Projeto", description: "Estrutura de projeto do Banco de Projetos AFROPARCEIROS." };
const sections = ["O projeto", "Objetivos", "Público", "Território", "Formato", "Impacto esperado", "Galeria", "Situação para captação/parceria"];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = projectNames.find(item => projectSlug(item) === slug);
  if (!name) notFound();
  return <SiteShell><section className="hub-inner-hero hub-inner-hero--compact"><div className="container"><Reveal><Eyebrow>Banco de Projetos</Eyebrow><h1>{name}</h1><p>Esta página está pronta para receber as informações oficiais do projeto sem antecipar dados ainda não cadastrados.</p></Reveal></div></section><section className="section project-detail-section"><div className="container"><div className="project-detail-grid">{sections.map((section, index) => <Reveal key={section} className="project-detail-block" delay={(index % 3) * .04}><span>{String(index + 1).padStart(2, "0")}</span><h2>{section}</h2><p>Conteúdo em preparação.</p></Reveal>)}</div><div className="project-detail-actions"><ButtonLink href={`/contato?assunto=patrocinio`}>Quero patrocinar este projeto</ButtonLink><ButtonLink href="/contato?assunto=levar-projeto" variant="ghost">Quero levar este projeto para minha cidade/instituição</ButtonLink></div></div></section></SiteShell>;
}
