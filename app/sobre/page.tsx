import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Sobre", description: "Conheça o ecossistema AFROPARCEIROS." };
const fronts = [
  ["AFROPARCEIROS", "Produtora afrocentrada e núcleo empresarial do ecossistema.", "/"],
  ["INSTITUTO AFROPARCEIROS", "Braço voltado ao impacto social, cultura, educação e transformação.", "/instituto-afroparceiros"],
  ["DNA GUETOS", "Marca que transforma identidade, território e expressão em produtos e experiências.", "/loja"],
] as const;

export default function SobrePage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Sobre o ecossistema</Eyebrow><h1>Muito além de<br /><span>uma produtora.</span></h1><p>AFROPARCEIROS organiza diferentes frentes em um mesmo HUB para conectar cultura, conhecimento, impacto, produtos, experiências e negócios.</p></Reveal></div></section>
    <section className="section about-ecosystem-section"><div className="container"><SectionHeading eyebrow="Arquitetura institucional" title={<>Frentes próprias.<br /><span className="gold-text">Propósito conectado.</span></>} /><div className="about-fronts-grid">{fronts.map(([title, copy, href], index) => <Reveal className="about-front-card" key={title} delay={index * .05}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p><Link href={href}>Conhecer <ArrowRight size={16} /></Link></Reveal>)}</div></div></section>
    <section className="section about-presence-section"><div className="container about-presence-grid"><Reveal><Eyebrow>Presença</Eyebrow><h2>Bahia +<br />Distrito Federal</h2></Reveal><Reveal delay={.08}><p>A página está preparada para receber história, atuação, parceiros, credenciais e realizações oficiais do ecossistema.</p><div className="about-placeholder-list"><span>História</span><span>Atuação</span><span>Parceiros</span><span>Credenciais</span></div></Reveal></div></section>
    <section className="kapacite-note"><div className="container"><span>KAPACITE</span><p>Referência institucional direcionada ao ambiente próprio de Segurança e Saúde no Trabalho. A frente de SST não integra a navegação cultural principal.</p></div></section>
  </SiteShell>;
}
