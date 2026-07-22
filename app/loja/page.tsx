import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink, FinalCta, PageHero, SectionHeading } from "@/components/shared/ui";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = { title: "DNA Guetos | Hub Afro", description: "Conheça os produtos da DNA Guetos." };

const products = [
  { name: "Boné DNA GUETOS", category: "Bonés", price: "R$ 99,90 no Pix", installments: "12x de R$ 10,17", image: "/images/dna-guetos/bone-dna-guetos.png", href: "https://www.afroparceiros.com/bone-dna-guetos-preto/p" },
  { name: "Moletom DNA GUETOS", category: "Vestuário", price: "R$ 200,00 no Pix", installments: "12x de R$ 20,35", image: "/images/dna-guetos/moletom-dna-guetos.png", href: "https://www.afroparceiros.com/moletom-dna-guetos/p" },
  { name: "Camisa MINIMALISTA DNA GUETOS", category: "Camisetas", price: "R$ 150,00 no Pix", installments: "12x de R$ 15,26", image: "/images/dna-guetos/camisa-minimalista-dna-guetos.png", href: "https://www.afroparceiros.com/camisa-minimalista-dna-guetos/p" },
  { name: "Camisa Thug Life", category: "Camisetas", price: "R$ 150,00 no Pix", installments: "12x de R$ 15,26", image: "/images/dna-guetos/camisa-thug-life.png", href: "https://www.afroparceiros.com/camisa-thug-life/p" },
  { name: "Camisa DNA GUETOS", category: "Camisetas", price: "R$ 150,00 no Pix", installments: "12x de R$ 15,26", image: "/images/dna-guetos/camisa-dna-guetos.png", href: "https://www.afroparceiros.com/camisa-dna-guetos/p" },
];

export default function LojaPage() {
  return (
    <SiteShell>
      <PageHero index="01" eyebrow="DNA Guetos" title={<>Vista identidade.<br /><span className="gold-text">Carregue resistência.</span></>} copy="Moda autoral criada para transformar memória, luta e presença em linguagem — do gueto para o mundo.">
        <ButtonLink href="#produtos">Ver coleção</ButtonLink>
      </PageHero>
      <section className="section" id="produtos">
        <div className="container">
          <div className="shop-heading">
            <SectionHeading eyebrow="Coleção atual" title={<>DNA que se veste<br />e se afirma.</>} copy="Produtos disponíveis na loja oficial Afroparceiros." />
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <Reveal key={product.name} className="product-card" delay={(index % 3) * 0.05}>
                <div className="product-art product-art--image">
                  <img className="product-art-image" src={product.image} alt={product.name} loading={index > 2 ? "lazy" : "eager"} />
                </div>
                <div className="product-info">
                  <div><small>{product.category}</small><h3>{product.name}</h3></div>
                  <div className="product-price"><strong>{product.price}</strong><span>{product.installments}</span></div>
                </div>
                <a className="add-button" href={product.href} target="_blank" rel="noreferrer"><ShoppingBag size={16} /> Comprar na loja</a>
              </Reveal>
            ))}
          </div>
          <p className="integration-note">A compra e a escolha de tamanho são finalizadas com segurança na loja oficial Afroparceiros.</p>
        </div>
      </section>
      <FinalCta title="Leve o movimento com você" copy="Cada peça afirma identidade, memória e criação independente." />
    </SiteShell>
  );
}
