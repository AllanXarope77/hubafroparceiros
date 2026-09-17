"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { commercialTopics } from "@/content/hub-architecture";

const businessTopics = new Set(["palestra", "treinamento", "evento-corporativo", "experiencia", "artista"]);
const projectTopics = new Set(["patrocinio", "levar-projeto"]);

export function CommercialContactForm({ initialTopic = "" }: { initialTopic?: string }) {
  const validInitialTopic = commercialTopics.some(([value]) => value === initialTopic) ? initialTopic : "";
  const [topic, setTopic] = useState(validInitialTopic);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selectedLabel = commercialTopics.find(([value]) => value === topic)?.[1] ?? "Contato pelo site";
    const lines = Array.from(data.entries())
      .filter(([, value]) => String(value).trim())
      .map(([key, value]) => `${key}: ${value}`);
    window.location.href = `mailto:ceo@afroparceiros.com?subject=${encodeURIComponent(selectedLabel)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  return (
    <form className="commercial-form" onSubmit={submit}>
      <fieldset className="commercial-topic-fieldset">
        <legend>Como podemos ajudar?</legend>
        <div className="commercial-topic-grid">
          {commercialTopics.map(([value, label]) => (
            <label key={value} className={topic === value ? "selected" : ""}>
              <input type="radio" name="Assunto" value={label} checked={topic === value} onChange={() => setTopic(value)} required />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {topic && (
        <div className="commercial-fields">
          <div className="field-row">
            <label>Nome<input name="Nome" type="text" required /></label>
            <label>E-mail<input name="E-mail" type="email" required /></label>
          </div>
          <div className="field-row">
            <label>WhatsApp<input name="WhatsApp" type="tel" /></label>
            <label>Cidade/UF<input name="Cidade/UF" type="text" /></label>
          </div>

          {businessTopics.has(topic) && (
            <>
              <div className="field-row">
                <label>Empresa<input name="Empresa" type="text" /></label>
                <label>Cargo<input name="Cargo" type="text" /></label>
              </div>
              <div className="field-row">
                <label>Data prevista<input name="Data prevista" type="date" /></label>
                <label>Público estimado<input name="Público estimado" type="number" min="1" /></label>
              </div>
              <label>O que procura?<input name="O que procura" type="text" /></label>
            </>
          )}

          {projectTopics.has(topic) && (
            <div className="field-row">
              <label>Empresa, instituição ou cidade<input name="Organização" type="text" /></label>
              <label>Projeto de interesse<input name="Projeto de interesse" type="text" /></label>
            </div>
          )}

          {topic === "artista" && <label>Artista ou segmento procurado<input name="Artista ou segmento" type="text" /></label>}
          {topic === "imprensa" && <label>Veículo e pauta<input name="Veículo e pauta" type="text" /></label>}
          {topic === "parceria" && <label>Organização e proposta<input name="Organização e proposta" type="text" /></label>}

          <label>Conte-nos um pouco da necessidade<textarea name="Necessidade" rows={7} required /></label>
          <button type="submit">Enviar para a central comercial <ArrowUpRight size={17} /></button>
          <small>O envio abrirá seu aplicativo de e-mail com as informações preenchidas.</small>
        </div>
      )}
    </form>
  );
}
