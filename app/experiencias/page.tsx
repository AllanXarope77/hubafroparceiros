import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";
import { experienceAreas } from "@/content/hub-architecture";

export const metadata: Metadata = { title: "Experiências", description: "Experiências AFROPARCEIROS que conectam arte, cultura, música e conhecimento." };

export default function ExperienciasPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Experiências AFROPARCEIROS</Eyebrow><h1>Arte e conhecimento<br /><span>que acontecem ao vivo.</span></h1><p>Experiências são encontros desenhados para mobilizar sentidos, repertórios e relações. Elas são diferentes de palestras, treinamentos, eventos e projetos.</p><div className="hero-actions"><ButtonLink href="/contato?assunto=experiencia">Quero levar uma experiência para minha organização</ButtonLink></div></Reveal></div></section>
    <section className="section experience-curation-section"><div className="container experience-curation-layout"><Reveal><SectionHeading eyebrow="Campos de criação" title={<>Possibilidades que começam<br />com uma <span className="gold-text">conversa.</span></>} copy="A curadoria considera objetivo, público, espaço, agenda, estrutura e possibilidades de customização. Somente experiências oficialmente cadastradas serão publicadas individualmente." /></Reveal><Reveal className="experience-axis-list" delay={.08}>{experienceAreas.map((title, index) => <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong></div>)}</Reveal></div></section>
    <section className="section experience-method-section"><div className="container"><SectionHeading eyebrow="Como construímos" title={<>Conceito, formato<br />e <span className="gold-text">viabilidade.</span></>} /><div className="experience-method-grid">{[
      ["Conceito", "A ideia central e a relação desejada com o público."],
      ["Duração e público", "Tempo e perfil dos participantes alinhados ao contexto."],
      ["Customização", "Possibilidades de adaptação sem descaracterizar a proposta."],
      ["Estrutura necessária", "Espaço, técnica, produção e responsabilidades definidos antes da contratação."],
    ].map(([title, copy], index) => <Reveal key={title} className="solution-detail-item" delay={index * .04}><span>0{index + 1}</span><div><h2>{title}</h2><p>{copy}</p></div></Reveal>)}</div><div className="hero-actions"><ButtonLink href="/contato?assunto=experiencia">Quero levar esta experiência para minha organização</ButtonLink></div></div></section>
  </SiteShell>;
}

