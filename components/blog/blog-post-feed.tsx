"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/shared/reveal";

type Post = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  createdAt: string;
};

function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

const artStyles = ["article-art--red", "article-art--gold", "article-art--dark", "article-art--paper", "article-art--line", "article-art--earth"];

export function BlogPostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/blog-posts", { cache: "no-store" })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error("Não foi possível carregar os posts.");
        setPosts(data.posts ?? []);
      })
      .catch(() => setError("Os conteúdos estarão disponíveis novamente em breve."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="article-grid" aria-live="polite">
      {loading && <p className="blog-feed-status blog-feed-status--full">Carregando posts publicados...</p>}
      {error && <p className="blog-feed-status blog-feed-status--error blog-feed-status--full">{error}</p>}
      {!loading && !error && !posts.length && <p className="blog-feed-status blog-feed-status--full">Novos conteúdos serão publicados em breve.</p>}
      {!loading && posts.map((post, index) => (
        <Reveal className="article-card published-article-card" key={post.id} delay={(index % 2) * .06}>
          <div className={`article-art ${post.image ? "article-art--custom" : artStyles[index % artStyles.length]}`} style={post.image ? { backgroundImage: `linear-gradient(rgba(0,0,0,.15), rgba(0,0,0,.45)), url("${post.image.replace(/["')]/g, "")}")` } : undefined} role="img" aria-label={`Imagem do post ${post.title}`}><span>{String(index + 1).padStart(2, "0")}</span></div>
          <small>{post.category} · {readingTime(post.content)} min de leitura</small>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`}>Ler post <ArrowRight size={15} /></Link>
        </Reveal>
      ))}
    </div>
  );
}
