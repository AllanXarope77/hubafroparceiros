import type { Metadata } from "next";
import { BlogPostFeed } from "@/components/blog/blog-post-feed";
import { SiteShell } from "@/components/layout/site-shell";
import { FinalCta, PageHero, SectionHeading } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Blog AFROPARCEIROS", description: "Ideias, análises e histórias para ampliar repertórios.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  return (
    <SiteShell>
      <PageHero index="02" eyebrow="Blog AFROPARCEIROS" title={<>Pensamento<br /><span className="gold-text">em movimento.</span></>} copy="Um território de ideias, análises e histórias para quem quer compreender o presente e participar da construção do próximo capítulo." />
      <section className="section blog-section">
        <div className="container">
          <div className="blog-toolbar">
            <SectionHeading eyebrow="Leituras recentes" title={<>Curadoria para<br />ampliar o olhar.</>} />
          </div>
          <div className="blog-posts-only">
            <BlogPostFeed />
          </div>
        </div>
      </section>
      <FinalCta eyebrow="Carta do HUB" title="Conteúdo para acompanhar e levar com você." copy="Receba uma curadoria de ideias, encontros, lançamentos e movimentos do ecossistema." cta="Receba a Carta" href="/conteudo/carta" />
    </SiteShell>
  );
}
