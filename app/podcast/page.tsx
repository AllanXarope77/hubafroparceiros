import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, FinalCta, PageHero, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Podcast | Hub Afro", description: "Conversas com quem transforma cultura e sociedade." };

const episodes = [
  { title: "2ª T - Gabriel Machado - AfroParceiros Podcast #003", id: "0VUpvYEQl7Loti8I2ZyJiF", duration: "1h 40min" },
  { title: "2ª T - ARAYE, JORGE WALLACE e CARA DE COBRA - AfroParceiros Podcast #006", id: "5T6zdgp0gLInG0JiHQhXkG", duration: "1h 59min" },
  { title: "2ª T - MARINHO SOARES - AfroParceiros Podcast #005", id: "5gWski7rQnyf4dlBTh7iZH", duration: "1h 21min" },
  { title: "2ª T - Valter da Mata - AfroParceiros Podcast #004", id: "2MYzDFqjjECaNjD8239V1r", duration: "1h 51min" },
] as const;

const podcastPlatforms = [
  { label: "YouTube", href: "https://www.youtube.com/playlist?list=PLq3ISSRYFWH1q7CimRNeZPYOHP5EaOy_u" },
  { label: "Spotify", href: "https://open.spotify.com/show/1RqN2gzgY4EKKA3V8tWrtX" },
  { label: "Prime Music", href: "https://music.amazon.com.br/podcasts/82c7f26f-2b52-4ede-b8bf-54a6d0c81aaf/afroparceiros-podcast-oficial" },
] as const;

export default function PodcastPage() {
  return (
    <SiteShell>
      <PageHero index="05" eyebrow="Podcast Hub Afro" title={<>Vozes que<br /><span className="gold-text">fazem eco.</span></>} copy="Conversas sem pressa com pessoas que transformam cultura, negócios, educação e sociedade a partir de novas perspectivas.">
        <ButtonLink href="#previa-spotify">Ouvir agora</ButtonLink>
      </PageHero>
      <section className="platform-strip" aria-label="Plataformas oficiais do Afroparceiros Podcast"><span>Ouça no</span>{podcastPlatforms.map(platform => <a href={platform.href} key={platform.label} target="_blank" rel="noreferrer">{platform.label}<ArrowUpRight size={15} /></a>)}</section>
      <section className="section now-playing" id="previa-spotify"><div className="container"><Reveal className="spotify-preview-card"><div className="spotify-preview-copy"><span className="eyebrow"><i />Prévia no Spotify</span><h2>Gabriel Machado no AfroParceiros Podcast</h2><p>Ouça a prévia oficial do episódio da segunda temporada e continue a reprodução diretamente no Spotify.</p><a href="https://open.spotify.com/episode/0VUpvYEQl7Loti8I2ZyJiF" target="_blank" rel="noreferrer">Abrir episódio no Spotify <ArrowUpRight size={17} /></a></div><div className="spotify-embed"><iframe title="2ª T - Gabriel Machado - AfroParceiros Podcast #003" src="https://open.spotify.com/embed/episode/0VUpvYEQl7Loti8I2ZyJiF?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></div></Reveal></div></section>
      <section className="section" id="episodios"><div className="container"><SectionHeading eyebrow="Últimos episódios" title={<>Conversas para<br />levar com você.</>} /><div className="episodes-grid">
        {episodes.map((episode, index) => <Reveal className="spotify-episode-card" key={episode.id} delay={(index % 2)*.06}><iframe title={episode.title} src={`https://open.spotify.com/embed/episode/${episode.id}?utm_source=generator&theme=0`} width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /><div className="spotify-episode-meta"><small>{episode.duration}</small><a href={`https://open.spotify.com/episode/${episode.id}`} target="_blank" rel="noreferrer">Abrir no Spotify <ArrowUpRight size={14} /></a></div></Reveal>)}
      </div></div></section>
      <section className="section watch-section"><div className="container watch-grid"><Reveal><span className="eyebrow"><i />Último episódio no YouTube</span><h2>ARAYE, Jorge Wallace e Cara de Cobra</h2><p>Assista ao episódio mais recente da playlist oficial do AfroParceiros Podcast.</p><a className="button button--ghost" href="https://www.youtube.com/watch?v=gdCREaNq_yU" target="_blank" rel="noreferrer">Abrir no YouTube <ArrowUpRight size={17} /></a></Reveal><Reveal className="youtube-video" delay={.1}><iframe title="2ª T - ARAYE, JORGE WALLACE e CARA DE COBRA - AfroParceiros Podcast #005" src="https://www.youtube.com/embed/gdCREaNq_yU?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" /></Reveal></div></section>
      <FinalCta title="Sua voz também importa" copy="Sugira uma pauta, indique uma pessoa ou venha sentar à mesa com a gente." />
    </SiteShell>
  );
}
