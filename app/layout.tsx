import type { Metadata } from "next";
import { SiteTranslator } from "@/components/i18n/site-translator";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "AFROPARCEIROS — Cultura, conhecimento e negócios",
    template: "%s · AFROPARCEIROS",
  },
  description: "HUB afrocentrado que conecta cultura, conhecimento, experiências e projetos para empresas, instituições, territórios e pessoas.",
  keywords: ["cultura afro-brasileira", "literatura", "educação", "podcast", "moda", "impacto social"],
  openGraph: {
    title: "AFROPARCEIROS — Cultura, conhecimento e negócios",
    description: "Conheça o ecossistema AFROPARCEIROS.",
    type: "website",
    locale: "pt_BR",
    siteName: "AFROPARCEIROS",
    images: [{ url: "/og.png", width: 1728, height: 910, alt: "Hub Afro — Ideias que movem mundos" }],
  },
  twitter: { card: "summary_large_image", title: "AFROPARCEIROS — HUB", description: "Cultura, conhecimento, experiências, projetos e negócios.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><SiteTranslator />{children}</body>
    </html>
  );
}
