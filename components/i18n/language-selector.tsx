"use client";

import { Languages } from "lucide-react";
import { useSyncExternalStore } from "react";
import { changeSiteLanguage, getSavedSiteLanguage, getServerSiteLanguage, subscribeToSiteLanguage } from "./site-translator";
import type { SiteLanguage } from "@/lib/site-translations";

const languageNames: Record<SiteLanguage, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};
const selectorLabels: Record<SiteLanguage, string> = {
  pt: "Idioma do site",
  en: "Site language",
  es: "Idioma del sitio",
};

export function LanguageSelector({ mobile = false }: { mobile?: boolean }) {
  const language = useSyncExternalStore(subscribeToSiteLanguage, getSavedSiteLanguage, getServerSiteLanguage);

  return (
    <label className={`language-selector ${mobile ? "language-selector--mobile" : ""}`} data-no-translate>
      <Languages size={16} aria-hidden="true" />
      <span className="sr-only">{selectorLabels[language]}</span>
      <select
        aria-label={selectorLabels[language]}
        value={language}
        onChange={event => changeSiteLanguage(event.target.value as SiteLanguage)}
      >
        {(Object.keys(languageNames) as SiteLanguage[]).map(code => (
          <option value={code} key={code}>{languageNames[code]}</option>
        ))}
      </select>
    </label>
  );
}
