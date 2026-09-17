import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, GraduationCap, Mic2, Puzzle } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";
import { solutionAreas } from "@/content/hub-architecture";

export const metadata: Metadata = { title: "Soluções B2B", description: "Palestras, treinamentos, eventos corporativos e soluções sob medida da AFROPARCEIROS." };
const icons = [Mic2, GraduationCap, Building2, Puzzle] as const;

export default function SolucoesPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Soluções B2B</Eyebrow><h1>Conhecimento e cultura<br /><span>a serviço da transformação.</span></h1><p>Soluções para empresas e instituições que querem construir repertório, fortalecer equipes e criar experiências relevantes.</p><div className="hero-actions"><ButtonLink href="/contato">Solicite uma proposta</ButtonLink></div></Reveal></div></section>
    <section className="section hub-catalog-section"><div className="container"><SectionHeading eyebrow="Como podemos atuar" title={<>Quatro caminhos.<br /><span className="gold-text">Uma conversa inicial.</span></>} copy="Cada solução parte do contexto e dos objetivos da organização. Não trabalhamos com tabela pública de preços." /><div className="hub-service-grid">
      {solutionAreas.map((item, index) => { const Icon = icons[index]; return <Reveal className="hub-service-card" key={item.title} delay={index * .05}><span>0{index + 1}</span><Icon size={30} strokeWidth={1.2} /><h2>{item.title}</h2><p>{item.copy}</p><Link href={item.href}>{index === 3 ? "Conte-nos o desafio da sua organização" : "Conhecer e solicitar proposta"}<ArrowRight size={16} /></Link></Reveal>; })}
    </div></div></section>
    <section className="hub-commercial-cta"><div className="container"><Reveal><Eyebrow>Construção sob medida</Eyebrow><h2>Conte-nos o desafio da sua organização</h2><p>Vamos identificar o formato mais adequado dentro do ecossistema.</p><ButtonLink href="/contato?assunto=solucao-sob-medida">Iniciar conversa</ButtonLink></Reveal></div></section>
  </SiteShell>;
}
