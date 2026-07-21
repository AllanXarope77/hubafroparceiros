import type { Metadata } from "next";
import { ShoppingBag, SlidersHorizontal } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { ButtonLink, FinalCta, PageHero, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Loja | Hub Afro", description: "Moda, livros e objetos autorais do Hub Afro." };

const products = [
  ["Camiseta Centro", "Vestuário", "R$ 149", "product-art--shirt"],
  ["Livro Vozes do Agora", "Livros", "R$ 72", "product-art--book"],
  ["Boné Futuro Ancestral", "Acessórios", "R$ 119", "product-art--cap"],
  ["Ecobag Movimento", "Acessórios", "R$ 69", "product-art--bag"],
  ["Caderno Encruzilhadas", "Papelaria", "R$ 54", "product-art--notebook"],
  ["Print Novos Centros", "Arte", "R$ 89", "product-art--print"],
];

export default function LojaPage() {
  return (
    <SiteShell>
      <PageHero index="01" eyebrow="Loja do Hub" title={<>Vista a ideia.<br /><span className="gold-text">Carregue a história.</span></>} copy="Produtos autorais que atravessam memória, design e identidade — feitos em pequenas tiragens, com propósito e presença.">
        <ButtonLink href="#produtos">Ver coleção</ButtonLink>
      </PageHero>
      <section className="section" id="produtos">
        <div className="container">
          <div className="shop-heading">
            <SectionHeading eyebrow="Coleção essencial" title={<>Objetos com<br />significado.</>} />
            <button className="filter-button"><SlidersHorizontal size={16} /> Filtrar</button>
          </div>
          <div className="category-pills" aria-label="Categorias da loja">
            {['Todos', 'Camisetas', 'Bonés', 'Livros', 'Acessórios', 'Coleções'].map((item, i) => <button className={i === 0 ? 'selected' : ''} key={item}>{item}</button>)}
          </div>
          <div className="product-grid">
            {products.map(([name, category, price, art], index) => (
              <Reveal key={name} className="product-card" delay={(index % 3) * 0.05}>
                <div className={`product-art ${art}`} role="img" aria-label={name}>
                  <span>HA</span>
                </div>
                <div className="product-info">
                  <div><small>{category}</small><h3>{name}</h3></div>
                  <strong>{price}</strong>
                </div>
                <button className="add-button"><ShoppingBag size={16} /> Adicionar</button>
              </Reveal>
            ))}
          </div>
          <p className="integration-note">Loja demonstrativa preparada para futura integração com Shopify ou WooCommerce.</p>
        </div>
      </section>
      <FinalCta title="Leve o movimento com você" copy="Cada escolha fortalece uma cadeia de criação independente." />
    </SiteShell>
  );
}

