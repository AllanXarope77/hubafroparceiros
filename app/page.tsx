import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { FinalCta, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";
import { projects } from "@/content/site";

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
      <section className="home-hero home-hero--banner" id="inicio">
        <img
          className="home-banner-image"
          src="/images/banner-principal.png"
          alt="HUB Afroparceiros — Pois resistência não é moda, é meio de sobrevivência"
        />
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
                      {index < 2 ? null : <Icon size={54} strokeWidth={1.2} />}
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
