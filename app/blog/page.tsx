import type { Metadata } from "next";
import { BlogPostFeed } from "@/components/blog/blog-post-feed";
import { SiteShell } from "@/components/layout/site-shell";
import { FinalCta, PageHero, SectionHeading } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Blog AFROPARCEIROS", description: "Ideias, análises e histórias para ampliar repertórios.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  return (
    <SiteShell>
      <PageHero index="02" eyebrow="Editorial Hub Afro" title={<>Pensamento<br /><span className="gold-text">em movimento.</span></>} copy="Um território de ideias, análises e histórias para quem quer compreender o presente e participar da construção do próximo capítulo." />
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
      <FinalCta title="Continue a conversa" copy="Compartilhe uma ideia, proponha uma pauta ou venha criar com a gente." />
    </SiteShell>
  );
}
