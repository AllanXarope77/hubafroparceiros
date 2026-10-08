import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Eyebrow } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Privacidade", description: "Minuta da Política de Privacidade da AFROPARCEIROS.", alternates: { canonical: "/privacidade" } };

export default function PrivacyPage() {
  return <SiteShell><section className="hub-inner-hero hub-inner-hero--compact"><div className="container"><Reveal><Eyebrow>Privacidade e proteção de dados</Eyebrow><h1>Transparência no uso<br /><span>das informações.</span></h1><p>Esta minuta explica como os dados enviados voluntariamente nos formulários podem ser usados para responder solicitações, registrar consentimentos e manter contato relacionado ao pedido.</p></Reveal></div></section><section className="section legal-content"><div className="container"><h2>Minuta para aprovação</h2><p>Dados de contato e briefing são tratados somente para atender a solicitação enviada. A inscrição na Carta do HUB é opcional e separada dos demais contatos.</p><h2>Direitos do titular</h2><p>O titular pode solicitar acesso, correção ou exclusão de seus dados pelo e-mail ceo@afroparceiros.com. Prazos legais e informações jurídicas definitivas serão incluídos após validação institucional.</p><h2>Cookies e métricas</h2><p>Métricas não essenciais somente serão ativadas após configuração dos identificadores e registro do consentimento.</p></div></section></SiteShell>;
}

