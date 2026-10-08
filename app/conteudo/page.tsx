import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Headphones, Mail, Play } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Eyebrow } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Conteúdo", description: "Blog, Afroparceiros TV, Podcast e Carta do HUB." };
const doors = [
  ["Leia", "Blog AFROPARCEIROS", "Artigos, análises, entrevistas, cultura, território, diversidade, empreendedorismo, educação e bastidores.", "/blog", BookOpen],
  ["Assista", "AFROPARCEIROS TV", "Vídeos e conversas incorporados do canal oficial no YouTube.", "/conteudo/tv", Play],
  ["Ouça", "AFROPARCEIROS Podcast", "Conversas disponíveis nas plataformas oficiais do podcast.", "/podcast", Headphones],
  ["Receba", "Carta do HUB", "Uma curadoria editorial enviada somente com consentimento explícito.", "/conteudo/carta", Mail],
] as const;

export default function ConteudoPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Conteúdo AFROPARCEIROS</Eyebrow><h1>Ideias para ler.<br /><span>Vozes para ver e ouvir.</span></h1><p>Conteúdos oficiais do ecossistema reunidos em quatro portas editoriais.</p></Reveal></div></section>
    <section className="section content-doors-section"><div className="container content-doors-grid">{doors.map(([eyebrow, title, copy, href, Icon], index) => <Reveal className={`content-door ${index % 2 ? "content-door--watch" : "content-door--read"}`} key={href} delay={(index % 2) * .05}><Icon size={34} strokeWidth={1.2} /><small>{eyebrow}</small><h2>{title}</h2><p>{copy}</p><Link href={href}>Explorar <ArrowRight size={17} /></Link></Reveal>)}</div></section>
  </SiteShell>;
}
