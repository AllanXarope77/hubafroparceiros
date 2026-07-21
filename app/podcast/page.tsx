import type { Metadata } from "next";
import { Play, Radio, Video } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, FinalCta, PageHero, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Podcast | Hub Afro", description: "Conversas com quem transforma cultura e sociedade." };

const episodes = [
  ["EP. 48", "Quem tem direito ao futuro?", "Com Aline Odara", "52 min", "episode-art--one"],
  ["EP. 47", "Moda é linguagem política", "Com João Pimenta", "46 min", "episode-art--two"],
  ["EP. 46", "A literatura como território", "Com Eliana Alves Cruz", "58 min", "episode-art--three"],
  ["EP. 45", "Criar também é cuidar", "Com Ana Paula Xongani", "41 min", "episode-art--four"],
];

export default function PodcastPage() {
  return (
    <SiteShell>
      <PageHero index="05" eyebrow="Podcast Hub Afro" title={<>Vozes que<br /><span className="gold-text">fazem eco.</span></>} copy="Conversas sem pressa com pessoas que transformam cultura, negócios, educação e sociedade a partir de novas perspectivas.">
        <ButtonLink href="#episodios">Ouvir agora</ButtonLink>
      </PageHero>
      <section className="section now-playing"><div className="container"><Reveal className="player-card"><div className="player-cover"><Radio size={42} strokeWidth={1.2} /><span>NOVO<br />EPISÓDIO</span></div><div className="player-copy"><small>EP. 48 · Cultura & Futuro</small><h2>Quem tem direito ao futuro?</h2><p>Uma conversa com Aline Odara sobre imaginação política, tecnologia e os futuros que já estão sendo construídos nas bordas.</p><div className="player-controls"><button aria-label="Reproduzir episódio"><Play size={20} fill="currentColor" /></button><div className="player-track"><i /></div><span>52:14</span></div></div></Reveal></div></section>
      <section className="section" id="episodios"><div className="container"><SectionHeading eyebrow="Últimos episódios" title={<>Conversas para<br />levar com você.</>} /><div className="episodes-grid">
        {episodes.map(([number,title,guest,time,art], index) => <Reveal className="episode-card" key={number} delay={(index % 2)*.06}><div className={`episode-art ${art}`} role="img" aria-label={`Capa do episódio ${title}`}><span>{number}</span><button aria-label={`Ouvir ${title}`}><Play size={18} fill="currentColor" /></button></div><small>{time}</small><h3>{title}</h3><p>{guest}</p></Reveal>)}
      </div></div></section>
      <section className="section watch-section"><div className="container watch-grid"><Reveal><span className="eyebrow"><i />Assista também</span><h2>Presença, gesto e conversa — agora em vídeo.</h2><p>Os episódios completos e conteúdos extras estão disponíveis no nosso canal.</p><ButtonLink href="#" variant="ghost">Ir para o YouTube</ButtonLink></Reveal><Reveal className="video-frame" delay={.1}><Video size={48} /><span>HUB AFRO<br />NO YOUTUBE</span><button aria-label="Assistir vídeo"><Play size={24} fill="currentColor" /></button></Reveal></div></section>
      <section className="platform-strip"><span>Ouça no</span>{['Spotify', 'YouTube', 'Apple Podcasts', 'Deezer'].map(platform => <a href="#" key={platform}>{platform}</a>)}</section>
      <FinalCta title="Sua voz também importa" copy="Sugira uma pauta, indique uma pessoa ou venha sentar à mesa com a gente." />
    </SiteShell>
  );
}
