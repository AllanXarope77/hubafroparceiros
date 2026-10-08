"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

type Choice = "pending" | "essential" | "analytics";
const storageKey = "afroparceiros-cookie-consent";

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<Choice>("pending");
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "essential" || saved === "analytics") queueMicrotask(() => setChoice(saved));
  }, []);

  function choose(next: Exclude<Choice, "pending">) {
    window.localStorage.setItem(storageKey, next);
    setChoice(next);
  }

  return <>
    {choice === "analytics" && gtmId && <>
      <Script id="gtm-loader" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}</Script>
    </>}
    {choice === "pending" && <aside className="cookie-banner" aria-label="Preferências de privacidade"><div><strong>Privacidade e cookies</strong><p>Usamos apenas recursos essenciais por padrão. Métricas opcionais só são ativadas com sua autorização.</p><Link href="/privacidade">Ler a Política de Privacidade</Link></div><div><button type="button" className="cookie-essential" onClick={() => choose("essential")}>Somente essenciais</button><button type="button" onClick={() => choose("analytics")}>Aceitar métricas</button></div></aside>}
  </>;
}

