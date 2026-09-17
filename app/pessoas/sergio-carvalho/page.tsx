import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, BriefcaseBusiness, Mic2, Newspaper } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Sergio Carvalho", description: "Página de Sergio Carvalho no ecossistema AFROPARCEIROS." };
const roles = ["Empresário", "Produtor cultural", "Artista", "Músico e percussionista", "Escritor", "Roteirista", "Palestrante"];
const connections = [
  ["Palestras", "/palestras", Mic2],
  ["Livro Guetos", "/livro-guetos", BookOpen],
  ["Projetos", "/projetos", BriefcaseBusiness],
  ["Conteúdos", "/conteudo", Newspaper],
] as const;

export default function SergioCarvalhoPage() {
  return <SiteShell>
    <section className="person-hero"><div className="container person-hero-grid"><Reveal className="person-portrait"><img src="/images/palestras/sergio-carvalho.png" alt="Sergio Carvalho" /></Reveal><Reveal className="person-intro" delay={.08}><Eyebrow>Ecossistema · Pessoas</Eyebrow><h1>Sergio<br /><span>Carvalho</span></h1><div className="person-role-list">{roles.map(role => <span key={role}>{role}</span>)}</div><p>Esta página organiza as conexões de Sergio Carvalho com as frentes já existentes da AFROPARCEIROS. Informações biográficas adicionais serão incluídas quando estiverem cadastradas no acervo oficial.</p><ButtonLink href="/contato?assunto=artista">Consultar disponibilidade / contratar</ButtonLink></Reveal></div></section>
    <section className="section person-connections-section"><div className="container"><SectionHeading eyebrow="Conexões no HUB" title={<>Uma pessoa.<br /><span className="gold-text">Múltiplas frentes.</span></>} /><div className="person-connections-grid">{connections.map(([title, href, Icon]) => <Reveal key={href}><Link href={href}><Icon size={24} /><span>{title}</span><ArrowRight size={17} /></Link></Reveal>)}</div></div></section>
    <section className="section person-media-placeholder"><div className="container"><SectionHeading eyebrow="Perfil em evolução" title={<>Bio, trabalhos, fotos,<br />vídeos e imprensa.</>} copy="A estrutura está preparada para receber apenas materiais oficiais e autorizados." /></div></section>
  </SiteShell>;
}
