import Link from "next/link";
import { ArrowRight, BookOpen, BriefcaseBusiness, Landmark, Mic2, ShoppingBag, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

const paths = [
  { title: "Quero contratar", copy: "Palestras, treinamentos, eventos corporativos e soluções personalizadas.", href: "/solucoes", icon: BriefcaseBusiness },
  { title: "Quero viver uma experiência", copy: "Arte, cultura, música, conhecimento e experiências autorais.", href: "/experiencias", icon: Sparkles },
  { title: "Quero patrocinar ou realizar um projeto", copy: "Projetos culturais, sociais e educacionais prontos para construir parcerias.", href: "/projetos", icon: Landmark },
  { title: "Quero comprar", copy: "DNA Guetos, Livro Guetos e produtos do nosso universo.", href: "/loja", icon: ShoppingBag },
] as const;

const ecosystem = [
  { title: "AFROPARCEIROS", copy: "Produtora afrocentrada e núcleo empresarial do ecossistema.", href: "/sobre" },
  { title: "INSTITUTO AFROPARCEIROS", copy: "Braço voltado ao impacto social, cultura, educação e transformação.", href: "/instituto-afroparceiros" },
  { title: "DNA GUETOS", copy: "Marca que transforma identidade, território e expressão em produtos e experiências.", href: "/loja" },
] as const;

const highlights = [
  { title: "Soluções B2B", href: "/solucoes", icon: BriefcaseBusiness },
  { title: "Experiências", href: "/experiencias", icon: Sparkles },
  { title: "Banco de projetos", href: "/projetos", icon: Landmark },
  { title: "Artistas", href: "/artistas", icon: Mic2 },
  { title: "Livro Guetos", href: "/livro-guetos", icon: BookOpen },
  { title: "Conteúdo", href: "/conteudo", icon: ArrowRight },
] as const;

export default function Home() {
  return (
    <SiteShell>
      <section className="hub-home-hero" id="inicio">
        <div className="hub-home-grid" aria-hidden="true" />
        <div className="container hub-home-hero-inner">
          <Reveal>
            <Eyebrow>AFROPARCEIROS — HUB</Eyebrow>
            <h1>Cultura que movimenta.<br />Conhecimento que transforma.<br /><span>Conexões que geram negócios.</span></h1>
            <p>Afroparceiros é uma produtora afrocentrada que conecta cultura, conhecimento, experiências e projetos para empresas, instituições, territórios e pessoas.</p>
            <div className="hero-actions">
              <ButtonLink href="/solucoes">Conheça nossas soluções</ButtonLink>
              <ButtonLink href="#ecossistema" variant="ghost">Explore o ecossistema</ButtonLink>
            </div>
          </Reveal>
          <Reveal className="hub-home-signature" delay={0.12}>
            <span>BA</span><i /><span>DF</span>
            <small>Cultura · Conhecimento · Negócios</small>
          </Reveal>
        </div>
      </section>

      <section className="section hub-paths-section">
        <div className="container">
          <SectionHeading eyebrow="Por onde começar" title={<>Escolha o caminho que<br /><span className="gold-text">faz sentido agora.</span></>} />
          <div className="hub-paths-grid">
            {paths.map((item, index) => {
              const Icon = item.icon;
              return <Reveal key={item.href} className="hub-path-card" delay={index * 0.05}><Link href={item.href}><span>0{index + 1}</span><Icon size={30} strokeWidth={1.25} /><h2>{item.title}</h2><p>{item.copy}</p><strong>Explorar <ArrowRight size={16} /></strong></Link></Reveal>;
            })}
          </div>
        </div>
      </section>

      <section className="section hub-ecosystem-section" id="ecossistema">
        <div className="container hub-ecosystem-layout">
          <SectionHeading eyebrow="O ecossistema" title={<>Uma marca-mãe.<br /><span className="gold-text">Frentes conectadas.</span></>} copy="Cada frente tem uma função própria e se conecta às demais para ampliar possibilidades de atuação, parceria e impacto." />
          <div className="hub-ecosystem-list">
            {ecosystem.map((item, index) => <Reveal key={item.title} delay={index * 0.06}><Link href={item.href}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><ArrowRight size={20} /></Link></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section hub-highlights-section">
        <div className="container">
          <SectionHeading eyebrow="Explore o HUB" title={<>Encontre pessoas, ideias<br />e caminhos para <span className="gold-text">agir.</span></>} />
          <div className="hub-highlights-grid">
            {highlights.map((item, index) => { const Icon = item.icon; return <Reveal key={item.href} delay={index * 0.04}><Link href={item.href}><Icon size={22} /><span>{item.title}</span><ArrowRight size={16} /></Link></Reveal>; })}
          </div>
        </div>
      </section>

      <section className="hub-proof-section" aria-label="Credenciais, clientes e realizações">
        <div className="container hub-proof-grid">
          {["Credenciais", "Clientes", "Realizações"].map((title) => (
            <Reveal key={title} className="hub-proof-item">
              <small>Acervo institucional</small>
              <h2>{title}</h2>
              <p>Estrutura preparada para receber apenas informações oficiais e autorizadas.</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="hub-home-banner-section"><img src="/images/banner-principal.png" alt="HUB Afroparceiros" /></section>

      <section className="hub-commercial-cta"><div className="container"><Reveal><Eyebrow>Central comercial</Eyebrow><h2>Vamos construir algo juntos?</h2><p>Conte-nos o que sua organização precisa e encontre o caminho certo dentro do ecossistema.</p><ButtonLink href="/contato">Solicite uma proposta</ButtonLink></Reveal></div></section>
    </SiteShell>
  );
}
