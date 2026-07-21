import type { Metadata } from "next";
import { BookHeart, CalendarDays, MessageCircle, Users } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, FinalCta, PageHero, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Clube do Livro | Hub Afro", description: "Uma comunidade de leitura, conversa e transformação." };

export default function ClubePage() {
  return (
    <SiteShell>
      <PageHero index="04" eyebrow="Clube do Livro" title={<>Ler junto muda<br /><span className="gold-text">a paisagem.</span></>} copy="Uma comunidade de leitores para atravessar obras de autoras e autores negros com tempo, escuta e boas conversas.">
        <ButtonLink href="#participar">Participar do clube</ButtonLink>
      </PageHero>
      <section className="section book-month-section">
        <div className="container book-month-grid">
          <Reveal className="book-cover"><span>ITAMAR<br />VIEIRA<br />JUNIOR</span><strong>TORTO<br />ARADO</strong><i>Leitura do mês</i></Reveal>
          <Reveal delay={.1}><span className="eyebrow"><i />Leitura de agosto</span><h2>Uma história que brota da terra e permanece na gente.</h2><p>Em Torto Arado, duas irmãs atravessam memória, pertencimento e luta no sertão da Bahia. Nossa leitura inclui mediação, material de apoio e encontro ao vivo.</p><div className="book-meta"><span><CalendarDays size={18} /> Encontro: 29 de agosto</span><span><Users size={18} /> Online · 19h30</span></div><ButtonLink href="#participar">Quero ler junto</ButtonLink></Reveal>
        </div>
      </section>
      <section className="section how-section">
        <div className="container"><SectionHeading eyebrow="Como funciona" title={<>Três movimentos.<br />Muitas descobertas.</>} /><div className="steps-grid">
          {[['01', BookHeart, 'Leitura guiada', 'Você recebe um roteiro leve, referências e provocações para acompanhar a obra no seu ritmo.'], ['02', MessageCircle, 'Troca contínua', 'Nossa comunidade permanece aberta durante o mês para impressões, perguntas e descobertas.'], ['03', Users, 'Encontro ao vivo', 'Fechamos o ciclo com uma conversa mediada, sensível e sem respostas prontas.']].map(([number, Icon, title, copy]) => { const StepIcon = Icon as typeof BookHeart; return <Reveal className="step-card" key={number as string}><span>{number as string}</span><StepIcon size={28} strokeWidth={1.3} /><h3>{title as string}</h3><p>{copy as string}</p></Reveal>})}
        </div></div>
      </section>
      <section className="section calendar-section" id="participar"><div className="container calendar-grid"><SectionHeading eyebrow="Próximos encontros" title={<>Sua agenda de<br /><span className="gold-text">boas conversas.</span></>} /><div className="calendar-list">
        {[['29 AGO', 'Torto Arado', 'Itamar Vieira Junior'], ['26 SET', 'Olhos d’Água', 'Conceição Evaristo'], ['31 OUT', 'O Avesso da Pele', 'Jeferson Tenório']].map(([date, book, author]) => <Reveal className="calendar-row" key={date}><strong>{date}</strong><div><h3>{book}</h3><span>{author}</span></div><span>19h30 · Online</span></Reveal>)}
      </div></div></section>
      <FinalCta title="Entre para o círculo" copy="Uma leitura por mês, uma comunidade inteira ao seu lado." />
    </SiteShell>
  );
}
