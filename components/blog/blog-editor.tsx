"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

type PublishedPost = { slug: string; title: string };

export function BlogEditor() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [published, setPublished] = useState<PublishedPost | null>(null);

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setPublished(null);

    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      title: String(values.get("title") || ""),
      category: String(values.get("category") || ""),
      excerpt: String(values.get("excerpt") || ""),
      content: String(values.get("content") || ""),
    };

    try {
      const response = await fetch("/api/blog-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível publicar o post.");
      setPublished(data.post);
      form.reset();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível publicar o post.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="blog-editor-grid">
      <form className="blog-editor-form" onSubmit={publish}>
        <div className="field-row">
          <label>Título<input name="title" type="text" maxLength={140} placeholder="Título do post" required /></label>
          <label>Categoria<input name="category" type="text" maxLength={50} placeholder="Cultura, educação..." required /></label>
        </div>
        <label>Resumo<textarea name="excerpt" rows={3} maxLength={280} placeholder="Uma apresentação curta para o card do post" required /></label>
        <label>Conteúdo<textarea name="content" rows={14} placeholder="Escreva o texto completo do post. Separe os parágrafos com uma linha em branco." required /></label>
        <button type="submit" disabled={saving}>{saving ? "Publicando..." : "Publicar post"} <ArrowRight size={17} /></button>
        {error && <p className="editor-message editor-message--error">{error}</p>}
        {published && <p className="editor-message editor-message--success"><CheckCircle2 size={18} />Post publicado. <Link href={`/blog/${published.slug}`}>Visualizar “{published.title}”</Link></p>}
      </form>
      <aside className="blog-editor-help">
        <span className="eyebrow"><i />Como funciona</span>
        <h2>Escreva, revise e publique.</h2>
        <p>Depois de publicado, o post aparece automaticamente na página do Blog. Use um resumo curto e deixe o texto completo no campo de conteúdo.</p>
        <Link href="/blog">Voltar para o Blog <ArrowRight size={15} /></Link>
      </aside>
    </div>
  );
}
