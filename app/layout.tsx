import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hub-afro.sites.openai.com"),
  title: {
    default: "Hub Afro — Cultura em movimento",
    template: "%s · Hub Afro",
  },
  description: "Um ecossistema de moda, literatura, educação, comunicação e podcast que transforma cultura em movimento.",
  keywords: ["cultura afro-brasileira", "literatura", "educação", "podcast", "moda", "impacto social"],
  openGraph: {
    title: "Hub Afro — Cultura em movimento",
    description: "Ideias que movem mundos. Conheça nosso ecossistema criativo.",
    type: "website",
    locale: "pt_BR",
    siteName: "Hub Afro",
    images: [{ url: "/og.png", width: 1728, height: 910, alt: "Hub Afro — Ideias que movem mundos" }],
  },
  twitter: { card: "summary_large_image", title: "Hub Afro — Cultura em movimento", description: "Ideias que movem mundos.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={spaceGrotesk.variable}>{children}</body>
    </html>
  );
}
