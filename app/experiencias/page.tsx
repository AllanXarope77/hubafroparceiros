import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Experiências", description: "Experiências AFROPARCEIROS que conectam arte, cultura, música e conhecimento.", alternates: { canonical: "/experiencias" } };

export default function ExperienciasPage() {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Experiências AFROPARCEIROS</Eyebrow><h1>Arte e conhecimento<br /><span>que acontecem ao vivo.</span></h1><p>Experiências são encontros desenhados para mobilizar sentidos, repertórios e relações. Elas são diferentes de palestras, treinamentos, eventos e projetos.</p><div className="hero-actions"><ButtonLink href="/contato?assunto=experiencia">Quero entender como esta experiência funciona</ButtonLink></div></Reveal></div></section>
    <section className="section experience-curation-section"><div className="container"><SectionHeading eyebrow="O que é uma experiência" title={<>Vivência, arte e conhecimento<br />em um <span className="gold-text">mesmo encontro.</span></>} copy="Uma experiência é uma construção vivencial, sensorial, artística, musical, performática ou híbrida. Cada proposta parte de um conceito real e é desenhada conforme o objetivo, o público, o espaço, a agenda e a estrutura disponível." /><div className="hero-actions"><ButtonLink href="/contato?assunto=experiencia">Quero entender como esta experiência funciona</ButtonLink></div></div></section>
    <section className="section experience-method-section"><div className="container"><SectionHeading eyebrow="Como construímos" title={<>Conceito, formato<br />e <span className="gold-text">viabilidade.</span></>} /><div className="experience-method-grid">{[
      ["Conceito", "A ideia central e a relação desejada com o público."],
      ["Duração e público", "Tempo e perfil dos participantes alinhados ao contexto."],
      ["Customização", "Possibilidades de adaptação sem descaracterizar a proposta."],
      ["Estrutura necessária", "Espaço, técnica, produção e responsabilidades definidos antes da contratação."],
    ].map(([title, copy], index) => <Reveal key={title} className="solution-detail-item" delay={index * .04}><span>0{index + 1}</span><div><h2>{title}</h2><p>{copy}</p></div></Reveal>)}</div><div className="hero-actions"><ButtonLink href="/contato?assunto=experiencia">Quero entender como esta experiência funciona</ButtonLink></div></div></section>
  </SiteShell>;
}

