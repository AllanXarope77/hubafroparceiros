import type { Metadata } from "next";
import {
  Award,
  BadgeCheck,
  Building2,
  Check,
  GraduationCap,
  Handshake,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Palestras Corporativas",
  description:
    "Palestras e formações corporativas sobre letramento racial, diversidade, ESG, cultura organizacional e prevenção.",
};

const formations = [
  {
    number: "01",
    title: "Treinamento corporativo",
    copy: "Formação prática para construir ambientes de trabalho saudáveis e respeitosos. O letramento racial é aplicado à convivência diária, oferecendo ferramentas para reconhecer e enfrentar situações discriminatórias.",
    audience: "Colaboradores e lideranças",
    icon: Building2,
  },
  {
    number: "02",
    title: "Letramento racial para atendimento",
    copy: "Prepara equipes que lidam diretamente com o público para acolher diferenças, reduzir conflitos e prevenir condutas racistas, machistas ou LGBTfóbicas durante o atendimento.",
    audience: "Atendimento e linha de frente",
    icon: Users,
  },
  {
    number: "03",
    title: "ESG e diversidade na prática",
    copy: "Conecta consciência socioeducativa à estratégia da organização. A abordagem fortalece a cultura interna e ajuda a prevenir danos à reputação, conflitos e riscos jurídicos.",
    audience: "Gestores e equipes estratégicas",
    icon: GraduationCap,
  },
];

const outcomes = [
  {
    title: "Certificação",
    copy: "Certificado de participação para quem conclui a experiência formativa.",
    icon: Award,
  },
  {
    title: "Selo da Diversidade",
    copy: "Reconhecimento do compromisso institucional com uma cultura mais inclusiva.",
    icon: BadgeCheck,
  },
  {
    title: "Equidade",
    copy: "Responsabilidade social traduzida em atitudes, processos e relações cotidianas.",
    icon: Handshake,
  },
  {
    title: "Prevenção",
    copy: "Mais segurança para pessoas, clientes, lideranças e para a própria organização.",
    icon: ShieldCheck,
  },
];

export default function PalestrasPage() {
  return (
    <SiteShell>
      <div className="corporate-talks-page">
        <section className="corporate-talks-hero">
          <div className="corporate-talks-grid" />
          <div className="corporate-talks-glow" />
          <div className="container">
            <div className="corporate-hero-layout">
              <Reveal>
                <Eyebrow>Educação corporativa · ESG · Diversidade</Eyebrow>
                <h1>
                  Transforme a cultura da sua empresa com
                  <span> letramento racial e prevenção.</span>
                </h1>
                <p>
                  Palestras e treinamentos que unem educação, responsabilidade
                  social e enfrentamento às desigualdades para fortalecer
                  equipes éticas, conscientes e preparadas.
                </p>
                <div className="hero-actions">
                  <ButtonLink href="/contato">Agendar uma palestra</ButtonLink>
                  <ButtonLink href="#formacoes" variant="ghost">
                    Conhecer formações
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal className="corporate-hero-note" delay={0.12}>
                <Sparkles size={22} strokeWidth={1.3} />
                <blockquote>
                  Diversidade consistente não termina no discurso: ela aparece
                  na cultura, nas decisões e na forma como as pessoas são
                  tratadas todos os dias.
                </blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section corporate-audience-strip">
          <div className="container corporate-audience-grid">
            <Reveal>
              <span>Desenvolvido para</span>
              <h2>Quem sustenta a cultura da organização.</h2>
            </Reveal>
            <div>
              {["Colaboradores", "Lideranças", "Equipes de atendimento"].map(
                (item, index) => (
                  <Reveal key={item} className="audience-item" delay={index * 0.05}>
                    <span>0{index + 1}</span>
                    <strong>{item}</strong>
                    <Check size={17} />
                  </Reveal>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="section corporate-formations" id="formacoes">
          <div className="container">
            <SectionHeading
              eyebrow="Formações & palestras"
              title={
                <>
                  Consciência que vira
                  <br />
                  <span className="gold-text">prática institucional.</span>
                </>
              }
              copy="Cada experiência combina reflexão, orientação aplicável e alinhamento à realidade da organização."
            />

            <div className="corporate-formations-grid">
              {formations.map((formation, index) => {
                const Icon = formation.icon;
                return (
                  <Reveal
                    key={formation.title}
                    className="corporate-formation-card"
                    delay={index * 0.07}
                  >
                    <div className="formation-card-head">
                      <span>{formation.number}</span>
                      <Icon size={31} strokeWidth={1.25} />
                    </div>
                    <h3>{formation.title}</h3>
                    <p>{formation.copy}</p>
                    <div className="formation-audience">
                      <Users size={15} />
                      {formation.audience}
                    </div>
                    <ButtonLink href="/contato" variant="ghost">
                      Solicitar proposta
                    </ButtonLink>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section specialist-section">
          <div className="container specialist-grid">
            <Reveal className="specialist-photo">
              <img
                src="/images/palestras/sergio-carvalho.png"
                alt="Sérgio Carvalho, especialista em diversidade e inclusão"
              />
              <span>Especialista convidado</span>
            </Reveal>

            <Reveal className="specialist-copy" delay={0.1}>
              <Eyebrow>Conheça o especialista</Eyebrow>
              <h2>Sérgio Carvalho</h2>
              <p className="specialist-lead">
                Especialista em diversidade, cultura organizacional, educação
                socio-normativa e desenvolvimento humano.
              </p>
              <p>
                CEO da Afroparceiros e autor de <em>Guetos</em>, obra reconhecida
                em espaços culturais e literários no Brasil e no exterior,
                Sérgio integra conhecimento técnico, vivência social e visão
                estratégica para dialogar com organizações contemporâneas.
              </p>
              <p>
                Sua metodologia traduz diversidade, equidade, inclusão,
                inovação social e ESG em conteúdos acessíveis e aplicáveis. As
                experiências combinam reflexão crítica e orientação prática
                para desenvolver lideranças, melhorar o clima organizacional e
                fortalecer ambientes mais humanos e sustentáveis.
              </p>
              <div className="specialist-tags">
                <span>Diversidade & inclusão</span>
                <span>Cultura organizacional</span>
                <span>ESG</span>
                <span>Desenvolvimento humano</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section corporate-outcomes">
          <div className="container">
            <SectionHeading
              eyebrow="Resultados da formação"
              title={
                <>
                  Da sensibilização ao
                  <br />
                  <span className="gold-text">compromisso contínuo.</span>
                </>
              }
            />
            <div className="outcomes-grid">
              {outcomes.map((outcome, index) => {
                const Icon = outcome.icon;
                return (
                  <Reveal key={outcome.title} className="outcome-card" delay={index * 0.05}>
                    <Icon size={28} strokeWidth={1.25} />
                    <h3>{outcome.title}</h3>
                    <p>{outcome.copy}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="corporate-closing-cta">
          <div className="container corporate-closing-grid">
            <Reveal>
              <Eyebrow>O próximo passo</Eyebrow>
              <h2>Invista hoje na cultura que sua empresa quer viver amanhã.</h2>
              <p>
                Proteja pessoas, clientes e reputação enquanto constrói um
                ambiente mais justo, seguro e inclusivo.
              </p>
            </Reveal>
            <Reveal className="closing-action" delay={0.1}>
              <Scale size={36} strokeWidth={1.1} />
              <ButtonLink href="/contato">Falar com nossos consultores</ButtonLink>
            </Reveal>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
