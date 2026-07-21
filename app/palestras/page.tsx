import type { Metadata } from "next";
import { Building2, Check, Clock3, GraduationCap, Users } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, FinalCta, PageHero, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Palestras | Hub Afro", description: "Palestras e experiências para transformar equipes, escolas e eventos." };

const talks = [
  { title: "Futuro ancestral: inovação começa pela memória", copy: "Uma conversa sobre repertório, tecnologia e as inteligências que atravessam gerações.", duration: "60 min", audience: "Empresas e eventos", icon: Building2 },
  { title: "Representatividade além da imagem", copy: "Como construir cultura, narrativa e pertencimento de forma consistente dentro das organizações.", duration: "75 min", audience: "Lideranças e equipes", icon: Users },
  { title: "Educação que expande mundos", copy: "Práticas para transformar leitura, escuta e repertório em ferramentas de autonomia.", duration: "60 min", audience: "Escolas e educadores", icon: GraduationCap },
];

export default function PalestrasPage() {
  return (
    <SiteShell>
      <PageHero index="03" eyebrow="Palestras & Experiências" title={<>Ideias que<br /><span className="gold-text">mobilizam.</span></>} copy="Conversas profundas, acessíveis e provocadoras para mover pessoas, equipes e instituições da intenção para a prática.">
        <ButtonLink href="/contato">Solicitar palestra</ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Temas em movimento" title={<>Conteúdo que encontra<br />o seu contexto.</>} copy="Cada experiência é adaptada ao perfil, aos desafios e ao momento do público." />
          <div className="talks-grid">
            {talks.map((talk, index) => { const Icon = talk.icon; return (
              <Reveal key={talk.title} className="talk-card" delay={index * .07}>
                <div className="talk-card-top"><span>0{index + 1}</span><Icon size={30} strokeWidth={1.3} /></div>
                <h3>{talk.title}</h3><p>{talk.copy}</p>
                <div className="talk-meta"><span><Clock3 size={15} />{talk.duration}</span><span><Users size={15} />{talk.audience}</span></div>
                <ButtonLink href="/contato" variant="ghost">Solicitar palestra</ButtonLink>
              </Reveal>
            )})}
          </div>
        </div>
      </section>
      <section className="section experience-section">
        <div className="container experience-grid">
          <Reveal><span className="giant-quote">“</span><h2>Não existe transformação sem uma conversa que tenha coragem de começar.</h2></Reveal>
          <Reveal className="benefit-list" delay={.1}>
            {['Conteúdo personalizado para o contexto', 'Linguagem acessível e provocadora', 'Material de apoio pós-encontro', 'Formato presencial ou online'].map(item => <div key={item}><Check size={17} />{item}</div>)}
          </Reveal>
        </div>
      </section>
      <section className="section faq-section">
        <div className="container faq-grid"><SectionHeading eyebrow="Perguntas frequentes" title={<>Antes de<br />começarmos.</>} /><div>
          {[['As palestras são personalizadas?', 'Sim. Tema, linguagem, exemplos e dinâmica são alinhados ao contexto e ao público do encontro.'], ['Vocês atendem fora de São Paulo?', 'Sim. Realizamos experiências presenciais em todo o Brasil e encontros online.'], ['Qual o prazo ideal para contratação?', 'Recomendamos pelo menos 30 dias para garantir uma construção cuidadosa.']].map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
        </div></div>
      </section>
      <FinalCta title="Vamos mover essa conversa?" copy="Conte sobre seu evento, equipe ou comunidade. A gente desenha o encontro com você." />
    </SiteShell>
  );
}
