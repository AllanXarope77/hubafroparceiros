import type { Metadata } from "next";
import { Clock3, Images, Settings2, Users } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";
import { experienceAreas } from "@/content/hub-architecture";

export const metadata: Metadata = { title: "Experiências", description: "Experiências AFROPARCEIROS que conectam arte, cultura, música e conhecimento." };

export default function ExperienciasPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Experiências AFROPARCEIROS</Eyebrow><h1>Arte e conhecimento<br /><span>que acontecem ao vivo.</span></h1><p>Uma área própria para experiências autorais, vivências e programações que podem ser levadas a organizações, equipes e eventos.</p><div className="hero-actions"><ButtonLink href="/contato?assunto=experiencia">Quero contratar uma experiência</ButtonLink></div></Reveal></div></section>
    <section className="section hub-catalog-section"><div className="container"><SectionHeading eyebrow="Possibilidades" title={<>Experiências para<br /><span className="gold-text">diferentes contextos.</span></>} copy="Esta estrutura está pronta para receber fotos, vídeos e detalhes de cada experiência conforme o acervo for cadastrado." /><div className="experience-concepts-grid">
      {experienceAreas.map((title, index) => <Reveal className="experience-concept-card" key={title} delay={(index % 3) * .05}><span>0{index + 1}</span><div className="experience-media-placeholder"><Images size={18} /><small>Foto / vídeo</small></div><h2>{title}</h2><div className="experience-structure"><small><Clock3 size={14} /> Duração</small><small><Users size={14} /> Público</small><small><Settings2 size={14} /> Customização</small></div><p>Conceito, estrutura necessária e formatos serão incluídos quando esta experiência for cadastrada.</p><ButtonLink href="/contato?assunto=experiencia" variant="ghost">Quero levar esta experiência para minha organização</ButtonLink></Reveal>)}
    </div></div></section>
  </SiteShell>;
}
