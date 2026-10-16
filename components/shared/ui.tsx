import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow"><i />{children}</span>;
}

export function ButtonLink({ href, children, variant = "gold" }: { href: string; children: ReactNode; variant?: "gold" | "ghost" }) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  return (
    <Link
      href={href}
      className={`button button--${variant}`}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}<ArrowRight size={17} />
    </Link>
  );
}

export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) {
  return (
    <Reveal className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </Reveal>
  );
}

export function PageHero({ index, eyebrow, title, copy, children }: { index: string; eyebrow: string; title: ReactNode; copy: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="page-hero-orb" />
      <div className="container page-hero-grid">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p>{copy}</p>
          {children && <div className="hero-actions">{children}</div>}
        </Reveal>
        <Reveal className="page-index" delay={0.1}>
          <span>{index}</span>
          <small>Ecossistema<br />Afroparceiros</small>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta({ title = "Fale com a Afroparceiros", copy = "Encontre o caminho mais adequado para sua ideia, organização ou parceria.", cta = "Fale com a Afroparceiros", href = "/contato", eyebrow = "Próximo passo" }: { title?: string; copy?: string; cta?: string; href?: string; eyebrow?: string }) {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>{title}</h2>
          <p>{copy}</p>
        </Reveal>
        <Reveal delay={0.1}><ButtonLink href={href}>{cta}</ButtonLink></Reveal>
      </div>
    </section>
  );
}
