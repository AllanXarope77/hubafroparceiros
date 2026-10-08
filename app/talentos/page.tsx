import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Talentos", description: "Curadoria artística e talentos autorizados do ecossistema AFROPARCEIROS.", alternates: { canonical: "/talentos" } };

export default function TalentosPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Curadoria artística</Eyebrow><h1>Talentos que criam<br /><span>experiências.</span></h1><p>Artistas, criadores e profissionais conectados ao ecossistema, apresentados somente com conteúdo autorizado.</p><div className="hero-actions"><ButtonLink href="/contato?assunto=artista">Consultar disponibilidade / contratar</ButtonLink></div></Reveal></div></section>
    <section className="section artist-directory-section"><div className="container"><SectionHeading eyebrow="Talentos cadastrados" title={<>Pessoas conectadas<br /><span className="gold-text">ao ecossistema.</span></>} /><div className="artist-directory-grid">
      <Reveal className="artist-card"><Link href="/talentos/sergio-carvalho"><div className="artist-card-image"><Image src="/images/palestras/sergio-carvalho.png" alt="Sergio Carvalho" width={900} height={1100} /></div><small>Empresário · produtor cultural · artista</small><h2>Sergio Carvalho</h2><p>Conheça suas conexões com palestras, livro, projetos e conteúdos.</p><strong>Conhecer perfil <ArrowRight size={16} /></strong></Link></Reveal>
    </div></div></section>
  </SiteShell>;
}

