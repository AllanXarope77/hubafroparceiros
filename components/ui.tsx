import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow"><i />{children}</span>;
}

export function ButtonLink({ href, children, variant = "gold" }: { href: string; children: ReactNode; variant?: "gold" | "ghost" }) {
  return (
    <Link href={href} className={`button button--${variant}`}>
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
          <small>Ecossistema<br />Hub Afro</small>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta({ title = "Faça parte desse movimento", copy = "A cultura muda quando a gente muda junto." }: { title?: string; copy?: string }) {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <Reveal>
          <Eyebrow>Próximo capítulo</Eyebrow>
          <h2>{title}</h2>
          <p>{copy}</p>
        </Reveal>
        <Reveal delay={0.1}><ButtonLink href="/contato">Quero fazer parte</ButtonLink></Reveal>
      </div>
    </section>
  );
}

