import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { CommercialContactForm } from "@/components/hub/commercial-contact-form";
import { SiteShell } from "@/components/layout/site-shell";
import { Eyebrow } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Central de Relacionamento", description: "Fale com a AFROPARCEIROS sobre soluções, experiências, projetos, talentos, loja, livro, imprensa e parcerias.", alternates: { canonical: "/contato" } };

export default async function ContatoPage({ searchParams }: { searchParams?: Promise<{ assunto?: string }> }) {
  const params = await searchParams;

  return (
    <SiteShell>
      <section className="hub-inner-hero hub-inner-hero--compact">
        <div className="container"><Reveal><Eyebrow>Central de relacionamento</Eyebrow><h1>Fale com a<br /><span>Afroparceiros.</span></h1><p>Escolha sua intenção e conte-nos o que você precisa. Sua solicitação será direcionada à frente mais adequada do ecossistema.</p></Reveal></div>
      </section>
      <section className="section commercial-contact-section">
        <div className="container commercial-contact-layout">
          <Reveal className="commercial-contact-aside">
            <span className="eyebrow"><i />Contato direto</span>
            <h2>Como podemos ajudar?</h2>
            <p>Contrate uma solução, conheça possibilidades de patrocínio, consulte talentos, fale com o Instituto ou proponha uma parceria.</p>
            <a href="mailto:ceo@afroparceiros.com"><Mail size={20} /><div><small>E-mail</small><strong>ceo@afroparceiros.com</strong></div><ArrowUpRight size={18} /></a>
            <a href="https://wa.me/5571996424293" target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /><div><small>WhatsApp oficial</small><strong>+55 71 99642-4293</strong></div><ArrowUpRight size={18} /></a>
          </Reveal>
          <Reveal delay={0.08}><CommercialContactForm initialTopic={params?.assunto} /></Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
