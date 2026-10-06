import type { Metadata } from "next";
import { SiteTranslator } from "@/components/i18n/site-translator";
import "./globals.css";

const productionUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")
  || "https://hub-afro-movimento.crafty-sugar-4970.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><SiteTranslator />{children}</body>
    </html>
  );
}
