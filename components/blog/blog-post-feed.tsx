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
  createdAt: string;
};

function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

const editorialArticles = [
  ["Cultura", "O futuro também se escreve a partir das margens", "8 min", "article-art--red"],
  ["Moda", "Vestir memória: quando a roupa se torna arquivo", "6 min", "article-art--gold"],
  ["Educação", "Repertório é uma tecnologia de liberdade", "7 min", "article-art--dark"],
  ["Literatura", "Cinco autoras para atravessar o presente", "5 min", "article-art--paper"],
  ["Comunicação", "Quem conta a história muda o centro da conversa", "9 min", "article-art--line"],
  ["Território", "Criar comunidade é desenhar permanência", "6 min", "article-art--earth"],
];

const artStyles = ["article-art--red", "article-art--gold", "article-art--dark", "article-art--paper", "article-art--line", "article-art--earth"];

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

  return (
    <div className="article-grid" aria-live="polite">
      {loading && <p className="blog-feed-status blog-feed-status--full">Carregando posts publicados...</p>}
      {error && <p className="blog-feed-status blog-feed-status--error blog-feed-status--full">{error}</p>}
      {!loading && posts.map((post, index) => (
        <Reveal className="article-card published-article-card" key={post.id} delay={(index % 2) * .06}>
          <div className={`article-art ${artStyles[index % artStyles.length]}`} role="img" aria-label={`Arte do post ${post.title}`}><span>{String(index + 1).padStart(2, "0")}</span></div>
          <small>{post.category} · {readingTime(post.content)} min de leitura</small>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`}>Ler post <ArrowRight size={15} /></Link>
        </Reveal>
      ))}
      {!loading && editorialArticles.map(([category, title, time, art], index) => (
        <Reveal className="article-card" key={title} delay={(index % 2) * .06}>
          <div className={`article-art ${art}`} role="img" aria-label={`Arte do artigo ${title}`}><span>{String(posts.length + index + 1).padStart(2, "0")}</span></div>
          <small>{category} · {time}</small><h3>{title}</h3><Link href="#">Ler agora <ArrowRight size={15} /></Link>
        </Reveal>
      ))}
    </div>
  );
}
