"use client";

import { FormEvent, useState } from "react";

export function UnsubscribeForm({ token }: { token: string }) {
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setStatus("Processando...");
    const response = await fetch("/api/newsletter/unsubscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, email: values.get("email") }) });
    const data = await response.json();
    setStatus(response.ok ? data.message : data.error || "Não foi possível concluir.");
  }
  return <form className="newsletter-signup" onSubmit={submit}>{!token && <label>E-mail<input name="email" type="email" required /></label>}<button type="submit">Cancelar inscrição</button>{status && <small role="status">{status}</small>}</form>;
}
