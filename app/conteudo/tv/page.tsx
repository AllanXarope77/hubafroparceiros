import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Afroparceiros TV", description: "Vídeos e conversas no canal oficial AFROPARCEIROS." };

export default function TvPage() {
  return <SiteShell><section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Afroparceiros TV</Eyebrow><h1>Ideias, vozes<br /><span>e encontros.</span></h1><p>Assista a conteúdos oficiais do ecossistema no YouTube.</p><div className="hero-actions"><ButtonLink href="https://www.youtube.com/@Afroparceiros">Assistir no YouTube</ButtonLink></div></Reveal></div></section><section className="section content-video-section"><div className="container content-video-grid"><Reveal><Eyebrow>Vídeo em destaque</Eyebrow><h2>AFROPARCEIROS no YouTube</h2><p className="body-copy">O vídeo é incorporado do canal oficial, sem hospedar arquivos pesados no site.</p></Reveal><Reveal className="youtube-video"><iframe title="AFROPARCEIROS no YouTube" src="https://www.youtube.com/embed/gdCREaNq_yU?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" /></Reveal></div></section></SiteShell>;
}

