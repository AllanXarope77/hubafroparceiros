"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState("");
  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Enviando...");
    const form = event.currentTarget;
    const values = new FormData(form);
    const response = await fetch("/api/newsletter/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: values.get("email"), consent: values.get("consent") === "on" }) });
    const data = await response.json();
    setStatus(response.ok ? data.message : data.error || "Não foi possível concluir a inscrição.");
    if (response.ok) form.reset();
  }
  return <form className={compact ? "newsletter-form" : "newsletter-signup"} onSubmit={subscribe}>
    <label className={compact ? "sr-only" : undefined}>{compact ? "Seu e-mail" : "E-mail"}<input name="email" type="email" placeholder="seu@email.com" required /></label>
    {!compact && <label className="newsletter-consent"><input name="consent" type="checkbox" required /> Concordo em receber a Carta do HUB e li a Política de Privacidade.</label>}
    <button type="submit" aria-label="Assinar Carta do HUB">{compact ? "→" : "Quero receber"}</button>
    {status && <small role="status">{status}</small>}
  </form>;
}
