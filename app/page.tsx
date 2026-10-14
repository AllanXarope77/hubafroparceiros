import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, BriefcaseBusiness, Landmark, Mic2, ShoppingBag, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const ecosystem = [
  { title: "AFROPARCEIROS", copy: "Produtora afrocentrada e núcleo empresarial do ecossistema.", href: "/sobre" },
  { title: "INSTITUTO AFROPARCEIROS", copy: "Frente voltada a impacto social, cultura, educação e transformação.", href: "/instituto-afroparceiros" },
  { title: "DNA GUETOS", copy: "Marca que transforma identidade, território e expressão em produtos e experiências.", href: "/loja" },
] as const;

const paths = [
  { title: "Quero contratar", copy: "Palestras, treinamentos, eventos corporativos e soluções personalizadas.", href: "/solucoes", icon: BriefcaseBusiness },
  { title: "Quero viver uma experiência", copy: "Arte, cultura, música, conhecimento e experiências autorais.", href: "/experiencias", icon: Sparkles },
  { title: "Quero patrocinar ou realizar um projeto", copy: "Projetos culturais, sociais e educacionais para construir parcerias.", href: "/projetos", icon: Landmark },
  { title: "Quero comprar", copy: "DNA Guetos, Livro Guetos e produtos do nosso universo.", href: "/guetos", icon: ShoppingBag },
] as const;

const highlights = [
  { title: "Soluções B2B", href: "/solucoes", icon: BriefcaseBusiness },
  { title: "Experiências", href: "/experiencias", icon: Sparkles },
  { title: "Banco de projetos", href: "/projetos", icon: Landmark },
  { title: "Talentos", href: "/talentos", icon: Mic2 },
  { title: "Livro Guetos", href: "/guetos/o-apartheid-urbano", icon: BookOpen },
  { title: "DNA Guetos", href: "/loja", icon: ShoppingBag },
] as const;

const connections: Array<{ name: string; logo?: string; monochrome?: boolean }> = [
  { name: "Petrobras", logo: "/images/connections/petrobras.svg" },
  { name: "Eletrobras", logo: "/images/connections/eletrobras.png" },
  { name: "Caixa Econômica Federal", logo: "/images/connections/caixa.png" },
  { name: "Vibra Energia", logo: "/images/connections/vibra.png" },
  { name: "Nacional Gás", logo: "/images/connections/nacional-gas-correta.png", monochrome: true },
  { name: "Governo do Estado da Bahia" },
  { name: "Embrapa" },
  { name: "Petrobahia", logo: "/images/connections/petrobahia.svg" },
  { name: "Petronac", logo: "/images/connections/petronac.svg" },
  { name: "Sesc", logo: "/images/connections/sesc.png" },
  { name: "Olodum" },
  { name: "Top Service", logo: "/images/connections/top-service.jpg" },
  { name: "Guaramix", logo: "/images/connections/guaramix-logo.png" },
  { name: "Escola Pan Americana", logo: "/images/connections/pan-american-school.webp" },
];

export default function Home() {
  return <SiteShell>
    <section className="hub-home-hero" id="inicio"><div className="hub-home-grid" aria-hidden="true" /><div className="container hub-home-hero-inner"><Reveal><Eyebrow>AFROPARCEIROS</Eyebrow><h1>Cultura, diversidade,<br />conhecimento<br /><span>e negócios.</span></h1><p>Afroparceiros é uma produtora afrocentrada que conecta cultura, conhecimento, experiências e projetos para empresas, instituições, territórios e pessoas.</p><div className="hero-actions"><ButtonLink href="/solucoes">Conheça nossas soluções</ButtonLink><ButtonLink href="#ecossistema" variant="ghost">Explore o ecossistema</ButtonLink></div></Reveal></div></section>
    <section className="section hub-ecosystem-section" id="ecossistema"><div className="container hub-ecosystem-layout"><SectionHeading eyebrow="O ecossistema" title={<>Uma marca-mãe.<br /><span className="gold-text">Frentes conectadas.</span></>} copy="Cada frente tem função própria e se conecta às demais para ampliar possibilidades de atuação, parceria e impacto." /><div className="hub-ecosystem-list">{ecosystem.map((item, index) => <Reveal key={item.title} delay={index * .06}><Link href={item.href}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><ArrowRight size={20} /></Link></Reveal>)}</div></div></section>
    <section className="section hub-paths-section"><div className="container"><SectionHeading eyebrow="Por onde começar" title={<>Escolha o caminho que<br /><span className="gold-text">faz sentido agora.</span></>} /><div className="hub-paths-grid">{paths.map((item, index) => { const Icon = item.icon; return <Reveal key={item.href} className="hub-path-card" delay={index * .05}><Link href={item.href}><span>0{index + 1}</span><Icon size={30} strokeWidth={1.25} /><h2>{item.title}</h2><p>{item.copy}</p><strong>Explorar <ArrowRight size={16} /></strong></Link></Reveal>; })}</div></div></section>
    <section className="section hub-highlights-section"><div className="container"><SectionHeading eyebrow="Explore o HUB" title={<>Encontre pessoas, ideias<br />e caminhos para <span className="gold-text">agir.</span></>} /><div className="hub-highlights-grid">{highlights.map((item, index) => { const Icon = item.icon; return <Reveal key={item.href} delay={index * .04}><Link href={item.href}><Icon size={22} /><span>{item.title}</span><ArrowRight size={16} /></Link></Reveal>; })}</div></div></section>
    <section className="section connections-section"><div className="container"><SectionHeading eyebrow="Nossas conexões" title={<>Relações que ampliam<br /><span className="gold-text">possibilidades.</span></>} copy="Nomes apresentados conforme o acervo comercial autorizado da AFROPARCEIROS." /><div className="connections-grid">{connections.map(({ name, logo, monochrome }) => <Reveal key={name} className="connection-name">{logo ? <><div className="connection-logo-wrap"><Image className={`connection-logo${monochrome ? " connection-logo--light" : ""}`} src={logo} alt={`Logo ${name}`} width={220} height={90} sizes="(max-width: 520px) 70vw, (max-width: 1050px) 30vw, 220px" /></div><span>{name}</span></> : <strong className="connection-text-logo">{name}</strong>}</Reveal>)}</div></div></section>
    <section className="hub-commercial-cta"><div className="container"><Reveal><Eyebrow>Central de relacionamento</Eyebrow><h2>Vamos construir algo juntos?</h2><p>Conte-nos o que sua organização precisa e encontre o caminho certo dentro do ecossistema.</p><ButtonLink href="/contato">Fale com a gente</ButtonLink></Reveal></div></section>
  </SiteShell>;
}
