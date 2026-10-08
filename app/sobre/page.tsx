import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Sobre", description: "Conheça o ecossistema AFROPARCEIROS e suas frentes de atuação.", alternates: { canonical: "/sobre" } };
const fronts = [
  ["AFROPARCEIROS", "Produtora afrocentrada e núcleo empresarial do ecossistema.", "/"],
  ["INSTITUTO AFROPARCEIROS", "Frente voltada ao impacto social, à cultura, à educação e à transformação.", "/instituto-afroparceiros"],
  ["DNA GUETOS", "Marca que transforma identidade, território e expressão em produtos e experiências.", "/loja"],
] as const;

export default function SobrePage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Sobre o ecossistema</Eyebrow><h1>Muito além de<br /><span>uma produtora.</span></h1><p>AFROPARCEIROS articula cultura, diversidade, conhecimento e negócios em diferentes frentes, conectando organizações, territórios, artistas e pessoas.</p><div className="hero-actions"><ButtonLink href="/contato">Fale com a gente</ButtonLink></div></Reveal></div></section>
    <section className="section about-ecosystem-section"><div className="container"><SectionHeading eyebrow="Arquitetura institucional" title={<>Frentes próprias.<br /><span className="gold-text">Propósito conectado.</span></>} /><div className="about-fronts-grid">{fronts.map(([title, copy, href], index) => <Reveal className="about-front-card" key={title} delay={index * .05}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p><Link href={href}>Conhecer <ArrowRight size={16} /></Link></Reveal>)}</div></div></section>
    <section className="section about-presence-section"><div className="container about-presence-grid"><Reveal><Eyebrow>Atuação</Eyebrow><h2>Conexões nacionais<br />e internacionais.</h2></Reveal><Reveal delay={.08}><p>O ecossistema desenvolve soluções, experiências, projetos, produtos e conteúdos a partir de uma perspectiva afrocentrada, em diálogo com empresas, instituições e territórios.</p><div className="about-placeholder-list"><span>Cultura</span><span>Diversidade</span><span>Conhecimento</span><span>Negócios</span><span>Educação</span><span>Economia criativa</span></div></Reveal></div></section>
    <section className="kapacite-note"><div className="container"><span>KAPACITE</span><p>Referência institucional ao ambiente próprio de Segurança e Saúde no Trabalho. A frente de SST permanece separada da navegação cultural principal.</p></div></section>
  </SiteShell>;
}
