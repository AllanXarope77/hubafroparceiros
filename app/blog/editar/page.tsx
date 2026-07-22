import type { Metadata } from "next";
import { BlogEditor } from "@/components/blog/blog-editor";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Editar Blog | Hub Afro", description: "Publique novos posts no Blog do Hub Afro." };

export default function EditarBlogPage() {
  return (
    <SiteShell>
      <PageHero index="02" eyebrow="Editor do Blog" title={<>Transforme ideias<br /><span className="gold-text">em publicação.</span></>} copy="Crie um novo post e publique diretamente na página do Blog." />
      <section className="section blog-editor-section"><div className="container"><BlogEditor /></div></section>
    </SiteShell>
  );
}
