import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Contato | Hub Afro", description: "Entre em contato com o Hub Afro." };

export default function ContatoPage() {
  return (
    <SiteShell>
      <PageHero index="06" eyebrow="Vamos conversar" title={<>Toda parceria começa<br /><span className="gold-text">com um encontro.</span></>} copy="Conte sua ideia, convide o Hub para seu evento ou descubra como podemos construir algo relevante juntos." />
      <section className="section contact-section"><div className="container contact-grid">
        <Reveal className="contact-info"><span className="eyebrow"><i />Canais diretos</span><h2>Estamos do outro lado.</h2><p>Respondemos em até dois dias úteis. Se preferir, fale por um dos canais abaixo.</p>
          <a href="mailto:ceo@afroparceiros.com"><Mail size={20} /><div><small>E-mail</small><strong>ceo@afroparceiros.com</strong></div><ArrowUpRight size={18} /></a>
          <a href="#"><MessageCircle size={20} /><div><small>WhatsApp</small><strong>+55 11 99999-2026</strong></div><ArrowUpRight size={18} /></a>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={.1}><form className="contact-form"><div className="field-row"><label>Seu nome<input type="text" placeholder="Como podemos chamar você?" /></label><label>Seu e-mail<input type="email" placeholder="voce@email.com" /></label></div><label>Assunto<select defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Palestras</option><option>Parcerias</option><option>Imprensa</option><option>Clube do Livro</option><option>Outro</option></select></label><label>Conte sua ideia<textarea rows={6} placeholder="Escreva aqui sua mensagem..." /></label><button type="submit">Enviar mensagem <ArrowUpRight size={17} /></button><small>Ao enviar, você concorda com nossa política de privacidade.</small></form></Reveal>
      </div></section>
    </SiteShell>
  );
}
