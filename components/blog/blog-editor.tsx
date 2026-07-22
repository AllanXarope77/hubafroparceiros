"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type PublishedPost = { id: number; slug: string; title: string; category: string; createdAt: string };

export function BlogEditor() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [published, setPublished] = useState<PublishedPost | null>(null);
  const [posts, setPosts] = useState<PublishedPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/blog-posts", { cache: "no-store" })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Não foi possível carregar os posts.");
        setPosts(data.posts ?? []);
      })
      .catch(reason => setPostsError(reason instanceof Error ? reason.message : "Não foi possível carregar os posts."))
      .finally(() => setLoadingPosts(false));
  }, []);

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
      setPosts(current => [data.post, ...current]);
      form.reset();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível publicar o post.");
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(post: PublishedPost) {
    if (!window.confirm(`Excluir definitivamente o post “${post.title}”?`)) return;

    setDeletingId(post.id);
    setPostsError("");
    try {
      const response = await fetch(`/api/blog-posts?id=${post.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível excluir o post.");
      setPosts(current => current.filter(item => item.id !== post.id));
      if (published?.id === post.id) setPublished(null);
    } catch (reason) {
      setPostsError(reason instanceof Error ? reason.message : "Não foi possível excluir o post.");
    } finally {
      setDeletingId(null);
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
      <section className="blog-editor-posts" aria-labelledby="editor-posts-title">
        <div><span className="eyebrow"><i />Gerenciar conteúdo</span><h2 id="editor-posts-title">Posts publicados</h2></div>
        {loadingPosts && <p className="blog-editor-posts-status">Carregando posts...</p>}
        {postsError && <p className="editor-message editor-message--error">{postsError}</p>}
        {!loadingPosts && !postsError && !posts.length && <p className="blog-editor-posts-status">Nenhum post publicado ainda.</p>}
        {!!posts.length && <div className="blog-editor-post-list">
          {posts.map(post => (
            <article className="blog-editor-post-item" key={post.id}>
              <div><small>{post.category}</small><h3>{post.title}</h3><Link href={`/blog/${post.slug}`}>Visualizar post</Link></div>
              <button type="button" onClick={() => deletePost(post)} disabled={deletingId === post.id} aria-label={`Excluir o post ${post.title}`}>
                <Trash2 size={16} />{deletingId === post.id ? "Excluindo..." : "Excluir"}
              </button>
            </article>
          ))}
        </div>}
      </section>
    </div>
  );
}
