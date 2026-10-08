import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Guetos — O Apartheid Urbano", description: "Página editorial do livro Guetos — O Apartheid Urbano." };

export default function LivroGuetosPage() {
  return <SiteShell>
    <section className="book-editorial-hero"><div className="container book-editorial-grid"><Reveal className="book-editorial-cover"><Image src="https://images.yampi.me/assets/stores/afroparceiros/uploads/images/livro-guetos-apartheid-urbano-6827b95f5377f-small.jpg" alt="Capa de Guetos — O Apartheid Urbano" width={800} height={1000} priority /></Reveal><Reveal className="book-editorial-copy" delay={.08}><Eyebrow>Livro Guetos</Eyebrow><h1>Guetos —<br /><span>O Apartheid Urbano</span></h1><p>A obra se conecta às palestras, aos projetos, aos conteúdos e à trajetória de Sergio Carvalho dentro do ecossistema AFROPARCEIROS.</p><div className="hero-actions"><ButtonLink href="/loja/40486919">Comprar o livro</ButtonLink><ButtonLink href="/talentos/sergio-carvalho" variant="ghost">Conhecer o autor</ButtonLink></div></Reveal></div></section>
    <section className="section book-editorial-section"><div className="container"><SectionHeading eyebrow="Conexões editoriais" title={<>Livro, autor<br />e <span className="gold-text">ecossistema.</span></>} copy="A página editorial reunirá materiais oficiais sobre a obra à medida que forem disponibilizados." /><div className="project-detail-actions"><ButtonLink href="/palestras" variant="ghost">Palestras</ButtonLink><ButtonLink href="/conteudo" variant="ghost">Conteúdos</ButtonLink><ButtonLink href="/contato?assunto=imprensa" variant="ghost">Imprensa e agenda</ButtonLink></div></div></section>
  </SiteShell>;
}

