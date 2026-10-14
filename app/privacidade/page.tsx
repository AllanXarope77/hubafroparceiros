import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Eyebrow } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Privacidade", description: "Política de Privacidade da AFROPARCEIROS.", alternates: { canonical: "/privacidade" } };

export default function PrivacyPage() {
  return <SiteShell><section className="hub-inner-hero hub-inner-hero--compact"><div className="container"><Reveal><Eyebrow>Privacidade e proteção de dados</Eyebrow><h1>Transparência no uso<br /><span>das informações.</span></h1><p>Esta política explica como os dados enviados voluntariamente nos formulários são usados para responder solicitações, registrar consentimentos e manter contato relacionado ao pedido.</p></Reveal></div></section><section className="section legal-content"><div className="container"><h2>Como tratamos seus dados</h2><p>Dados de contato e informações sobre a solicitação são utilizados para oferecer atendimento e responder à mensagem enviada. A inscrição na Carta do HUB é opcional e separada dos demais contatos.</p><h2>Direitos do titular</h2><p>Solicitações de acesso, correção ou exclusão de dados podem ser enviadas para ceo@afroparceiros.com.</p><h2>Cookies e métricas</h2><p>Recursos essenciais são utilizados para o funcionamento do site. Métricas opcionais dependem da autorização do visitante.</p></div></section></SiteShell>;
}

