"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/content/site";
import { useCart } from "@/components/shop/cart-provider";
import { LanguageSelector } from "@/components/i18n/language-selector";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="Hub Afroparceiros — início">
          <img
            className="brand-logo"
            src="/images/logo-hub-afroparceiros.png"
            alt="HUB Afroparceiros"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
        <LanguageSelector />
        <Link href="/carrinho" className="cart-link" aria-label={`Carrinho com ${count} itens`}>
          <ShoppingBag size={19} />
          {count > 0 && <span>{count > 99 ? "99+" : count}</span>}
        </Link>
        <button
          type="button"
          className="menu-button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Navegação móvel">
          <LanguageSelector mobile />
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link href="/carrinho" onClick={() => setOpen(false)}><span>07</span>Carrinho {count > 0 ? `(${count})` : ""}</Link>
        </nav>
      )}
    </header>
  );
}
