import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ShopCatalog } from "@/components/shop/shop-catalog";
import { ButtonLink, PageHero, SectionHeading } from "@/components/shared/ui";
import Link from "next/link";

export const metadata: Metadata = { title: "DNA Guetos | Hub Afro", description: "Conheça os produtos da DNA Guetos." };

export default function LojaPage() {
  return (
    <SiteShell>
      <PageHero index="01" eyebrow="DNA Guetos" title={<>Vista identidade.<br /><span className="gold-text">Carregue resistência.</span></>} copy="Moda autoral criada para transformar memória, luta e presença em linguagem — do gueto para o mundo.">
        <ButtonLink href="#produtos">Ver coleção</ButtonLink>
      </PageHero>
      <nav className="shop-brand-strip" aria-label="Categorias DNA Guetos">
        <a href="#produtos">Novidades</a><a href="#produtos">Camisetas</a><a href="#produtos">Moletons</a><a href="#produtos">Bonés</a><a href="#produtos">Coleções</a><Link href="/livro-guetos">Livro Guetos</Link>
      </nav>
      <section className="section" id="produtos">
        <div className="container">
          <div className="shop-heading"><SectionHeading eyebrow="Coleção completa" title={<>DNA que se veste<br />e se afirma.</>} copy="Filtre por categoria, conheça cada produto e organize sua compra no carrinho." /></div>
          <ShopCatalog />
          <p className="integration-note">Compra protegida e pagamento processado com segurança pelo Mercado Pago.</p>
        </div>
      </section>
    </SiteShell>
  );
}
