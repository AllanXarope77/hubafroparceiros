import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Artistas", description: "Curadoria artística e talentos do ecossistema AFROPARCEIROS." };

export default function ArtistasPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Curadoria artística</Eyebrow><h1>Talentos que criam<br /><span>experiências.</span></h1><p>Uma vitrine comercial preparada para músicos, bandas, atores, artistas cênicos, DJs, escritores, mestres de cerimônia e palestrantes autorizados.</p><div className="hero-actions"><ButtonLink href="/contato?assunto=artista">Consultar disponibilidade</ButtonLink></div></Reveal></div></section>
    <section className="section artist-directory-section"><div className="container"><SectionHeading eyebrow="Artistas cadastrados" title={<>Pessoas conectadas<br /><span className="gold-text">ao ecossistema.</span></>} copy="Novos perfis serão apresentados apenas após cadastro e autorização." /><div className="artist-directory-grid">
      <Reveal className="artist-card"><Link href="/pessoas/sergio-carvalho"><div className="artist-card-image"><img src="/images/palestras/sergio-carvalho.png" alt="Sergio Carvalho" /></div><small>Artista · escritor · palestrante</small><h2>Sergio Carvalho</h2><p>Perfil existente no acervo AFROPARCEIROS.</p><strong>Conhecer perfil <ArrowRight size={16} /></strong></Link></Reveal>
    </div></div></section>
  </SiteShell>;
}
