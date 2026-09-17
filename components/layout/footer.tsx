import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navItems, socials } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand brand--footer" aria-label="Hub Afroparceiros — início">
            <img
              className="brand-logo brand-logo--footer"
              src="/images/logo-hub-afroparceiros.png"
              alt="HUB Afroparceiros"
            />
          </Link>
          <p className="footer-intro">AFROPARCEIROS é o HUB que conecta cultura, conhecimento, experiências, projetos e negócios.</p>
        </div>
        <div>
          <span className="footer-label">Explore</span>
          <div className="footer-links">
            {navItems.slice(1, 6).map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <span className="footer-label">Ecossistema</span>
          <div className="footer-links">
            <Link href="/conteudo">Conteúdo</Link>
            <Link href="/livro-guetos">Livro Guetos</Link>
            <Link href="/instituto-afroparceiros">Instituto Afroparceiros</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/contato">Central comercial</Link>
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
          <form className="newsletter-form">
            <label className="sr-only" htmlFor="footer-email">Seu e-mail</label>
            <input id="footer-email" type="email" placeholder="seu@email.com" />
            <button type="submit" aria-label="Assinar newsletter">→</button>
          </form>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 AFROPARCEIROS — HUB</span>
        <span>Bahia · Distrito Federal</span>
      </div>
    </footer>
  );
}
