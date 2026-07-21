import Link from "next/link";
import { ArrowDown, ArrowRight, Quote } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { ButtonLink, Eyebrow, FinalCta, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/site";

const stats = [
  ["10+", "anos construindo pontes"],
  ["500+", "conteúdos publicados"],
  ["200+", "encontros realizados"],
  ["40 mil", "pessoas alcançadas"],
];

const testimonials = [
  {
    quote: "O Hub não entrega só conteúdo. Ele cria contexto, encontro e coragem para transformar intenção em ação.",
    name: "Marina Costa",
    role: "Gestora cultural · São Paulo",
  },
  {
    quote: "Encontrei aqui uma comunidade que trata cultura com profundidade, beleza e compromisso com o futuro.",
    name: "Rafael Nascimento",
    role: "Educador · Salvador",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <section className="home-hero" id="inicio">
        <div className="hero-image" role="img" aria-label="Criadores negros reunidos entre moda, literatura e podcast" />
        <div className="hero-overlay" />
        <div className="container home-hero-content">
          <Reveal>
            <Eyebrow>Cultura · Conhecimento · Impacto</Eyebrow>
            <h1>Ideias que<br /><em>movem</em> mundos.</h1>
            <p>
              Um ecossistema criativo que conecta moda, literatura, educação,
              comunicação e voz para ampliar futuros possíveis.
            </p>
            <div className="hero-actions">
              <ButtonLink href="#ecossistema">Conheça o ecossistema</ButtonLink>
              <ButtonLink href="/contato" variant="ghost">Fale com a gente</ButtonLink>
            </div>
          </Reveal>
        </div>
        <a href="#sobre" className="scroll-cue" aria-label="Rolar para a próxima seção">
          <span>Descubra</span><ArrowDown size={18} />
        </a>
        <span className="hero-side-label">HUB AFRO · DESDE 2016</span>
      </section>

      <section className="section about-section" id="sobre">
        <div className="container about-grid">
          <Reveal className="about-number"><span>01</span></Reveal>
          <div>
            <SectionHeading
              eyebrow="Sobre o Hub"
              title={<>Uma plataforma.<br /><span className="gold-text">Muitos caminhos.</span></>}
            />
            <Reveal delay={0.08}>
              <p className="lead-copy">
                Somos um ponto de encontro para quem acredita no poder da cultura
                como ferramenta de presença, autonomia e transformação social.
              </p>
              <p className="body-copy">
                Reunimos iniciativas independentes em um mesmo território digital.
                Cada projeto tem sua própria linguagem; todos compartilham o mesmo
                compromisso: criar experiências que deixam marcas e abrem conversas.
              </p>
            </Reveal>
          </div>
          <Reveal className="about-manifesto" delay={0.14}>
            <span>Nosso manifesto</span>
            <p>“Não ocupamos espaços. Criamos novos centros.”</p>
          </Reveal>
        </div>
      </section>

      <section className="section projects-section" id="ecossistema">
        <div className="container">
          <SectionHeading
            eyebrow="Nosso ecossistema"
            title={<>Cinco projetos.<br />Uma só <span className="gold-text">pulsação.</span></>}
            copy="Explore as frentes que dão vida ao Hub e encontre seu próximo ponto de conexão."
          />
          <div className="projects-grid">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Reveal key={project.href} className={`project-card project-card--${index + 1}`} delay={index * 0.05}>
                  <Link href={project.href} aria-label={`Conhecer ${project.title}`}>
                    <div className={`project-visual ${project.className}`} role="img" aria-label={`Identidade visual do projeto ${project.title}`}>
                      <Icon size={54} strokeWidth={1.2} />
                      <span>0{index + 1}</span>
                    </div>
                    <div className="project-card-body">
                      <small>{project.eyebrow}</small>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <span className="text-link">Conhecer <ArrowRight size={16} /></span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
          {stats.map(([number, label], index) => (
            <Reveal key={label} className="stat" delay={index * 0.06}>
              <strong>{number}</strong><span>{label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <SectionHeading eyebrow="Quem caminha com a gente" title={<>Impacto que vira<br /><span className="gold-text">história.</span></>} />
          <div className="testimonials-grid">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} className="testimonial-card" delay={index * 0.08}>
                <Quote size={30} strokeWidth={1.2} />
                <blockquote>{item.quote}</blockquote>
                <div><strong>{item.name}</strong><span>{item.role}</span></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </SiteShell>
  );
}

