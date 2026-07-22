"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  createdAt: string;
};

function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export function BlogPostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/blog-posts", { cache: "no-store" })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Não foi possível carregar os posts.");
        setPosts(data.posts ?? []);
      })
      .catch(reason => setError(reason instanceof Error ? reason.message : "Não foi possível carregar os posts."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="blog-feed-status">Carregando posts publicados...</p>;
  if (error) return <p className="blog-feed-status blog-feed-status--error">{error}</p>;
  if (!posts.length) return null;

  return (
    <section className="published-posts" aria-labelledby="published-posts-title">
      <div className="published-posts-heading">
        <span className="eyebrow"><i />Novos posts</span>
        <h2 id="published-posts-title">Publicados recentemente.</h2>
      </div>
      <div className="published-posts-grid">
        {posts.map((post, index) => (
          <article className="published-post-card" key={post.id}>
            <span className="published-post-number">{String(index + 1).padStart(2, "0")}</span>
            <small>{post.category} · {readingTime(post.content)} min de leitura</small>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`}>Ler post <ArrowRight size={15} /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
