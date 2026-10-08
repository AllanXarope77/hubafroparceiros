import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Newspaper, ShoppingBag } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Guetos", description: "Livro, DNA Guetos e conteúdos ligados ao universo Guetos.", alternates: { canonical: "/guetos" } };
const doors = [
  ["DNA Guetos", "Moda, identidade e expressão em produtos do ecossistema.", "/loja", ShoppingBag],
  ["Guetos — O Apartheid Urbano", "A página editorial do livro e suas conexões com o HUB.", "/guetos/o-apartheid-urbano", BookOpen],
  ["Conteúdos", "Artigos, vídeos e conversas relacionados a cultura e território.", "/conteudo", Newspaper],
] as const;

export default function GuetosPage() {
  return <SiteShell><section className="hub-inner-hero"><div className="container"><Reveal><Eyebrow>Universo Guetos</Eyebrow><h1>Identidade, território<br /><span>e expressão.</span></h1><p>Uma porta de entrada para a marca DNA Guetos, o livro Guetos e os conteúdos que atravessam esse universo.</p></Reveal></div></section><section className="section hub-catalog-section"><div className="container"><SectionHeading eyebrow="Explore Guetos" title={<>Produtos, livro<br />e <span className="gold-text">conteúdo.</span></>} /><div className="hub-service-grid">{doors.map(([title, copy, href, Icon], index) => <Reveal className="hub-service-card" key={href} delay={index * .05}><span>0{index + 1}</span><Icon size={30} /><h2>{title}</h2><p>{copy}</p><Link href={href}>Conhecer <ArrowRight size={16} /></Link></Reveal>)}</div></div></section></SiteShell>;
}

