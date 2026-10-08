import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { navItems, socials } from "@/content/site";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand brand--footer" aria-label="Hub Afroparceiros — início">
            <Image
              className="brand-logo brand-logo--footer"
              src="/images/afroparceiros-oficial.png"
              alt="Afroparceiros — cultura que transforma"
              width={1000}
              height={1000}
            />
          </Link>
          <p className="footer-intro">AFROPARCEIROS é o HUB que conecta cultura, conhecimento, experiências, projetos e negócios.</p>
        </div>
        <div>
          <span className="footer-label">Explore</span>
          <div className="footer-links">
            {navItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <span className="footer-label">Ecossistema</span>
          <div className="footer-links">
            <Link href="/instituto-afroparceiros">Instituto Afroparceiros</Link>
            <Link href="/loja">DNA Guetos</Link>
            <Link href="/guetos/o-apartheid-urbano">Livro Guetos</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/conteudo/tv">Afroparceiros TV</Link>
            <Link href="/podcast">Podcast</Link>
            <Link href="/conteudo/carta">Carta do HUB</Link>
          </div>
        </div>
        <div>
          <span className="footer-label">Siga o movimento</span>
          <div className="footer-links">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} do Hub Afroparceiros`}
              >
                {social.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <span className="footer-label">Carta do Hub</span>
          <p className="footer-note">Uma curadoria mensal de ideias, encontros e lançamentos.</p>
          <NewsletterForm compact />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 AFROPARCEIROS — HUB</span>
        <div className="footer-legal-links">
          <a href="mailto:ceo@afroparceiros.com">ceo@afroparceiros.com</a>
          <a href="https://wa.me/5571996424293" target="_blank" rel="noopener noreferrer">WhatsApp +55 71 99642-4293</a>
          <Link href="/privacidade">Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
