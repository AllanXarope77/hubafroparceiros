import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { BlogPostFeed } from "@/components/blog/blog-post-feed";
import { SiteShell } from "@/components/layout/site-shell";
import { FinalCta, PageHero, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "Blog | Hub Afro", description: "Ideias, análises e histórias para ampliar repertórios." };

export default function BlogPage() {
  return (
    <SiteShell>
      <PageHero index="02" eyebrow="Editorial Hub Afro" title={<>Pensamento<br /><span className="gold-text">em movimento.</span></>} copy="Um território de ideias, análises e histórias para quem quer compreender o presente e participar da construção do próximo capítulo." />
      <section className="section blog-section">
        <div className="container">
          <div className="blog-toolbar">
            <SectionHeading eyebrow="Leituras recentes" title={<>Curadoria para<br />ampliar o olhar.</>} />
            <div className="blog-toolbar-actions"><label className="search-field"><Search size={18} /><input type="search" placeholder="Buscar no blog" /></label></div>
          </div>
          <Reveal className="featured-article">
            <div className="featured-art" role="img" aria-label="Composição editorial dourada e vermelha"><span>MANIFESTO<br />DO AGORA</span></div>
            <div className="featured-copy"><small>Em destaque · Cultura</small><h2>Não pedimos licença para imaginar novos centros</h2><p>Como artistas, educadores e criadores transformam ausência de espaço em linguagem, comunidade e futuro.</p><Link href="#">Ler artigo <ArrowRight size={16} /></Link></div>
          </Reveal>
          <div className="article-layout">
            <BlogPostFeed />
            <aside className="blog-sidebar">
              <span className="footer-label">Assuntos</span>
              {['Cultura (12)', 'Educação (9)', 'Moda (7)', 'Literatura (15)', 'Comunicação (8)'].map(item => <a href="#" key={item}>{item}</a>)}
              <div className="sidebar-newsletter"><span className="eyebrow"><i />Carta do Hub</span><h3>Ideias boas merecem circular.</h3><p>Receba nossa curadoria uma vez por mês.</p><input type="email" placeholder="Seu melhor e-mail" /><button>Quero receber</button></div>
            </aside>
          </div>
        </div>
      </section>
      <FinalCta title="Continue a conversa" copy="Compartilhe uma ideia, proponha uma pauta ou venha criar com a gente." />
    </SiteShell>
  );
}
