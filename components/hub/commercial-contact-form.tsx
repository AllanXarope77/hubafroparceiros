"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { commercialTopics } from "@/content/hub-architecture";

const businessTopics = new Set(["palestra", "treinamento", "evento-corporativo", "experiencia", "artista", "solucao-sob-medida"]);
const projectTopics = new Set(["patrocinio", "levar-projeto", "instituto"]);
type Summary = Record<string, string | boolean>;

export function CommercialContactForm({ initialTopic = "" }: { initialTopic?: string }) {
  const validInitialTopic = commercialTopics.some(([value]) => value === initialTopic) ? initialTopic : "";
  const [topic, setTopic] = useState(validInitialTopic);
  const [step, setStep] = useState(validInitialTopic ? 2 : 1);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [protocol, setProtocol] = useState("");
  const topicLabel = commercialTopics.find(([value]) => value === topic)?.[1] ?? "";

  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    setSummary(Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value)])));
    setStep(3);
    setError("");
  }

  async function send() {
    if (!summary) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...summary, topic, consent: summary.consent === "on" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível registrar a solicitação.");
      setProtocol(data.protocol);
      setStep(4);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível registrar a solicitação.");
    } finally { setSending(false); }
  }

  if (step === 4) return <div className="commercial-form commercial-confirmation"><CheckCircle2 size={34} /><small>Solicitação registrada</small><h2>Obrigado, {summary?.name}.</h2><p>Protocolo: <strong>{protocol}</strong></p><p>A equipe poderá responder pelos dados informados. Para atendimento imediato, use o WhatsApp oficial.</p><a href="https://wa.me/5571996424293" target="_blank" rel="noopener noreferrer">Abrir WhatsApp <ArrowUpRight size={16} /></a></div>;

  return <div className="commercial-form">
    <div className="commercial-step-indicator"><span className={step >= 1 ? "active" : ""}>1. Intenção</span><span className={step >= 2 ? "active" : ""}>2. Dados</span><span className={step >= 3 ? "active" : ""}>3. Conferência</span></div>
    {step === 1 && <fieldset className="commercial-topic-fieldset"><legend>Como podemos ajudar?</legend><div className="commercial-topic-grid">{commercialTopics.map(([value, label]) => <label key={value} className={topic === value ? "selected" : ""}><input type="radio" name="topic" value={value} checked={topic === value} onChange={() => setTopic(value)} /><span>{label}</span></label>)}</div><button className="commercial-next" type="button" disabled={!topic} onClick={() => setStep(2)}>Continuar <ArrowUpRight size={17} /></button></fieldset>}
    {step === 2 && <form className="commercial-fields commercial-fields--step" onSubmit={review}><button className="commercial-back" type="button" onClick={() => setStep(1)}><ArrowLeft size={15} /> Alterar assunto</button><h2>{topicLabel}</h2><div className="field-row"><label>Nome<input name="name" type="text" required /></label><label>E-mail<input name="email" type="email" required /></label></div><div className="field-row"><label>WhatsApp<input name="whatsapp" type="tel" /></label><label>Cidade/UF<input name="cityState" type="text" /></label></div>
      {businessTopics.has(topic) && <><div className="field-row"><label>Empresa<input name="company" type="text" /></label><label>Cargo<input name="role" type="text" /></label></div><div className="field-row"><label>Data prevista<input name="eventDate" type="date" /></label><label>Público estimado<input name="estimatedAudience" type="number" min="1" /></label></div><label>O que procura?<input name="requestType" type="text" /></label></>}
      {projectTopics.has(topic) && <div className="field-row"><label>Empresa, instituição ou cidade<input name="company" type="text" /></label><label>Projeto ou frente de interesse<input name="requestType" type="text" /></label></div>}
      {topic === "imprensa" && <label>Veículo e pauta<input name="requestType" type="text" /></label>}{topic === "parceria" && <label>Organização e proposta<input name="requestType" type="text" /></label>}
      <label>Conte-nos um pouco da necessidade<textarea name="message" rows={7} required /></label><label className="commercial-consent"><input name="consent" type="checkbox" required /> Concordo com o uso destes dados para responder à solicitação e li a <Link href="/privacidade">Política de Privacidade</Link>.</label><button type="submit">Revisar informações <ArrowUpRight size={17} /></button></form>}
    {step === 3 && summary && <div className="commercial-review"><button className="commercial-back" type="button" onClick={() => setStep(2)}><ArrowLeft size={15} /> Editar dados</button><small>Confira antes de enviar</small><h2>{topicLabel}</h2><dl>{Object.entries(summary).filter(([key, value]) => value && key !== "consent").map(([key, value]) => <div key={key}><dt>{({ name: "Nome", email: "E-mail", whatsapp: "WhatsApp", cityState: "Cidade/UF", company: "Empresa/organização", role: "Cargo", eventDate: "Data prevista", estimatedAudience: "Público estimado", requestType: "O que procura", message: "Necessidade" } as Record<string, string>)[key] || key}</dt><dd>{String(value)}</dd></div>)}</dl>{error && <p className="editor-message editor-message--error">{error}</p>}<button className="commercial-next" type="button" onClick={send} disabled={sending}>{sending ? "Registrando..." : "Confirmar e enviar"} <ArrowUpRight size={17} /></button></div>}
  </div>;
}
