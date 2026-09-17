import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Images, Newspaper, Quote } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Guetos — O Apartheid Urbano", description: "Página editorial do livro Guetos — O Apartheid Urbano." };
const editorialSections = [
  ["Sobre o livro", BookOpen], ["Sobre o autor", Quote], ["Sinopse", BookOpen], ["Trechos e ideias centrais", Quote],
  ["Imprensa e repercussão", Newspaper], ["Fotos de lançamentos", Images], ["Agenda relacionada à obra", CalendarDays],
] as const;

export default function LivroGuetosPage() {
  return <SiteShell>
    <section className="book-editorial-hero"><div className="container book-editorial-grid"><Reveal className="book-editorial-cover"><img src="https://images.yampi.me/assets/stores/afroparceiros/uploads/images/livro-guetos-apartheid-urbano-6827b95f5377f-small.jpg" alt="Capa de Guetos — O Apartheid Urbano" /></Reveal><Reveal className="book-editorial-copy" delay={.08}><Eyebrow>Livro Guetos</Eyebrow><h1>Guetos —<br /><span>O Apartheid Urbano</span></h1><p>Uma página editorial própria, conectada à loja, às palestras, aos projetos, aos conteúdos e ao perfil de Sergio Carvalho.</p><div className="hero-actions"><ButtonLink href="/loja/45486516">Comprar o livro</ButtonLink><ButtonLink href="/pessoas/sergio-carvalho" variant="ghost">Conhecer o autor</ButtonLink></div></Reveal></div></section>
    <section className="section book-editorial-section"><div className="container"><SectionHeading eyebrow="Dossiê editorial" title={<>Uma arquitetura pronta<br />para receber o <span className="gold-text">acervo oficial.</span></>} /><div className="book-editorial-sections">{editorialSections.map(([title, Icon], index) => <Reveal key={title} className="book-editorial-card" delay={(index % 3) * .04}><Icon size={23} /><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>Conteúdo em preparação.</p></Reveal>)}</div></div></section>
    <section className="book-future-section"><div className="container"><Reveal><small>Arquitetura editorial preparada</small><h2>GUETOS — BECOS E VIELAS</h2><p>Espaço reservado para uma futura publicação, sem antecipar informações editoriais ainda não cadastradas.</p></Reveal><Link href="/contato?assunto=imprensa">Imprensa e agenda <ArrowRight size={17} /></Link></div></section>
  </SiteShell>;
}
