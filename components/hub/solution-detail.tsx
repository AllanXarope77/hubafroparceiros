import { CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

type Detail = { label: string; value: string };

export function SolutionDetail({ eyebrow, title, copy, problem, audience, details, topic, cta = "Solicitar proposta" }: {
  eyebrow: string;
  title: string;
  copy: string;
  problem: string;
  audience: string;
  details: Detail[];
  topic: string;
  cta?: string;
}) {
  return <SiteShell>
    <section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{copy}</p><div className="hero-actions"><ButtonLink href={`/contato?assunto=${topic}`}>{cta}</ButtonLink></div></Reveal></div></section>
    <section className="section solution-detail-section"><div className="container solution-detail-layout"><Reveal><SectionHeading eyebrow="Aplicação" title={<>Da necessidade<br /><span className="gold-text">ao formato certo.</span></>} /><div className="solution-problem"><h2>O que esta solução ajuda a construir</h2><p>{problem}</p></div><div className="solution-problem"><h2>Para quem</h2><p>{audience}</p></div></Reveal><div className="solution-detail-list">{details.map((item, index) => <Reveal key={item.label} className="solution-detail-item" delay={index * .04}><CheckCircle2 size={20} /><div><small>{item.label}</small><p>{item.value}</p></div></Reveal>)}</div></div></section>
    <section className="hub-commercial-cta"><div className="container"><Reveal><Eyebrow>Proposta personalizada</Eyebrow><h2>Vamos desenhar esta entrega juntos?</h2><p>O escopo é definido a partir do objetivo, do público e do contexto da organização.</p><ButtonLink href={`/contato?assunto=${topic}`}>{cta}</ButtonLink></Reveal></div></section>
  </SiteShell>;
}

