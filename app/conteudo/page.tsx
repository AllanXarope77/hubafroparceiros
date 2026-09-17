import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Play } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Conteúdo", description: "Blog AFROPARCEIROS e AFROPARCEIROS TV." };

export default function ConteudoPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Conteúdo AFROPARCEIROS</Eyebrow><h1>Ideias para ler.<br /><span>Vozes para assistir.</span></h1><p>Artigos, análises, entrevistas, cultura, território, diversidade, empreendedorismo, educação e bastidores em um único ponto de entrada.</p></Reveal></div></section>
    <section className="section content-doors-section"><div className="container content-doors-grid">
      <Reveal className="content-door content-door--read"><BookOpen size={34} strokeWidth={1.2} /><small>Leia</small><h2>Blog AFROPARCEIROS</h2><p>O blog existente continua sendo o espaço editorial do ecossistema, com posts publicados pelo editor já implementado.</p><Link href="/blog">Acessar o blog <ArrowRight size={17} /></Link></Reveal>
      <Reveal className="content-door content-door--watch" delay={.08}><Play size={34} strokeWidth={1.2} /><small>Assista</small><h2>AFROPARCEIROS TV</h2><p>Vídeos e conversas conectados ao canal oficial no YouTube, sem hospedar arquivos pesados no site.</p><a href="https://www.youtube.com/@Afroparceiros" target="_blank" rel="noreferrer">Assistir no YouTube <ArrowRight size={17} /></a></Reveal>
    </div></section>
    <section className="section content-video-section"><div className="container content-video-grid"><Reveal><SectionHeading eyebrow="AFROPARCEIROS TV" title={<>Conteúdo em<br /><span className="gold-text">movimento.</span></>} copy="A estrutura está preparada para receber thumbnails, títulos e resumos dos vídeos oficiais." /><ButtonLink href="/podcast">Conhecer o podcast</ButtonLink></Reveal><Reveal className="youtube-video" delay={.08}><iframe title="AFROPARCEIROS no YouTube" src="https://www.youtube.com/embed/gdCREaNq_yU?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" /></Reveal></div></section>
  </SiteShell>;
}
