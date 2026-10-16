import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, BriefcaseBusiness, Landmark, ShoppingBag } from "lucide-react";
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
  { title: "Quero contratar", copy: "Palestras, workshops, treinamentos, eventos, experiências e soluções especiais.", href: "/solucoes", icon: BriefcaseBusiness },
  { title: "Quero patrocinar ou realizar", copy: "Banco de Projetos, patrocínio, parceria, impacto e Instituto Afroparceiros.", href: "/projetos", icon: Landmark },
  { title: "Quero comprar", copy: "Livro Guetos e produtos da DNA Guetos.", href: "/guetos", icon: ShoppingBag },
  { title: "Quero acompanhar e me conectar", copy: "Blog, TV, Podcast, Carta do HUB, redes, imprensa e parcerias.", href: "/conteudo", icon: BookOpen },
] as const;

const connections: Array<{ name: string; logo?: string; monochrome?: boolean }> = [
  { name: "Petrobras", logo: "/images/connections/petrobras.svg" },
  { name: "Eletrobras", logo: "/images/connections/eletrobras.png" },
  { name: "Caixa Econômica Federal", logo: "/images/connections/caixa.png" },
  { name: "Vibra Energia", logo: "/images/connections/vibra.png" },
  { name: "Nacional Gás", logo: "/images/connections/nacional-gas-correta.png", monochrome: true },
  { name: "Governo do Estado da Bahia", logo: "/images/connections/governo-bahia.png" },
  { name: "Embrapa", logo: "/images/connections/embrapa.png" },
  { name: "Petrobahia", logo: "/images/connections/petrobahia.svg" },
  { name: "Petronac", logo: "/images/connections/petronac.svg" },
  { name: "Sesc", logo: "/images/connections/sesc.png" },
  { name: "Olodum", logo: "/images/connections/olodum.png" },
  { name: "Top Service", logo: "/images/connections/top-service.jpg" },
  { name: "Guaramix", logo: "/images/connections/guaramix-logo.png" },
  { name: "Escola Pan Americana", logo: "/images/connections/pan-american-school.webp" },
];

export default function Home() {
  return <SiteShell>
    <section className="hub-home-hero" id="inicio"><div className="hub-home-grid" aria-hidden="true" /><div className="container hub-home-hero-inner"><Reveal><Eyebrow>AFROPARCEIROS</Eyebrow><h1>Cultura, diversidade,<br />conhecimento e <span>negócios.</span></h1><p>Criamos soluções para empresas, instituições e territórios por meio de conhecimento, experiências, eventos, projetos, arte, literatura e iniciativas de impacto.</p><div className="hero-actions"><ButtonLink href="/solucoes">Conheça o que fazemos</ButtonLink><ButtonLink href="/contato" variant="ghost">Fale com a Afroparceiros</ButtonLink></div></Reveal></div></section>
    <section className="section hub-ecosystem-section" id="ecossistema"><div className="container hub-ecosystem-layout"><SectionHeading eyebrow="O ecossistema" title={<>Uma marca-mãe.<br /><span className="gold-text">Frentes conectadas.</span></>} copy="Cada frente tem função própria e se conecta às demais para ampliar possibilidades de atuação, parceria e impacto." /><div className="hub-ecosystem-list">{ecosystem.map((item, index) => <Reveal key={item.title} delay={index * .06}><Link href={item.href}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><ArrowRight size={20} /></Link></Reveal>)}</div></div></section>
    <section className="section hub-paths-section"><div className="container"><SectionHeading eyebrow="Por onde começar" title={<>Escolha o caminho que<br /><span className="gold-text">faz sentido agora.</span></>} /><div className="hub-paths-grid">{paths.map((item, index) => { const Icon = item.icon; return <Reveal key={item.href} className="hub-path-card" delay={index * .05}><Link href={item.href}><span>0{index + 1}</span><Icon size={30} strokeWidth={1.25} /><h2>{item.title}</h2><p>{item.copy}</p><strong>Explorar <ArrowRight size={16} /></strong></Link></Reveal>; })}</div></div></section>
    <section className="section connections-section"><div className="container"><SectionHeading eyebrow="Nossas conexões" title={<>Relações que ampliam<br /><span className="gold-text">possibilidades.</span></>} copy="Nomes apresentados conforme o acervo comercial autorizado da AFROPARCEIROS." /><div className="connections-grid">{connections.map(({ name, logo, monochrome }) => <Reveal key={name} className="connection-name">{logo ? <><div className="connection-logo-wrap"><Image className={`connection-logo${monochrome ? " connection-logo--light" : ""}`} src={logo} alt={`Logo ${name}`} width={220} height={90} sizes="(max-width: 520px) 70vw, (max-width: 1050px) 30vw, 220px" /></div><span>{name}</span></> : <strong className="connection-text-logo">{name}</strong>}</Reveal>)}</div></div></section>
    <section className="hub-commercial-cta"><div className="container"><Reveal><Eyebrow>Central de relacionamento</Eyebrow><h2>Encontre o caminho certo para sua organização.</h2><p>Conte-nos o que você precisa e conectaremos sua demanda à frente mais adequada do ecossistema.</p><ButtonLink href="/contato">Fale com a Afroparceiros</ButtonLink></Reveal></div></section>
  </SiteShell>;
}
