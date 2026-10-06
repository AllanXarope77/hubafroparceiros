"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  createdAt: string;
};

export function BlogPostDetail() {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params.slug) return;
    fetch(`/api/blog-posts?slug=${encodeURIComponent(params.slug)}`, { cache: "no-store" })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(response.status === 404 ? "Post não encontrado." : "Este conteúdo não está disponível no momento.");
        setPost(data.post);
      })
      .catch(reason => setError(reason instanceof Error ? reason.message : "Este conteúdo não está disponível no momento."));
  }, [params.slug]);

  if (error) return <div className="container blog-post-state"><p>{error}</p><Link href="/blog"><ArrowLeft size={16} />Voltar para o Blog</Link></div>;
  if (!post) return <div className="container blog-post-state"><p>Carregando post...</p></div>;

  const dateValue = post.createdAt.includes("T") ? post.createdAt : post.createdAt.replace(" ", "T");
  const date = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(`${dateValue}Z`));
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <article className="blog-post-page">
      <header className="container blog-post-header">
        <Link href="/blog"><ArrowLeft size={16} />Voltar para o Blog</Link>
        <small>{post.category} · {date}</small>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </header>
      <div className="container blog-post-body">
        {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </article>
  );
}
