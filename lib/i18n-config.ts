export const siteLocales = ["pt-BR", "en", "es"] as const;
export type SiteLocale = (typeof siteLocales)[number];

export const defaultSiteLocale: SiteLocale = "pt-BR";

export const localizedRouteMap = {
  home: "/",
  solutions: "/solucoes",
  experiences: "/experiencias",
  projects: "/projetos",
  artists: "/artistas",
  store: "/loja",
  content: "/conteudo",
  about: "/sobre",
  contact: "/contato",
} as const;

export function localePath(locale: SiteLocale, pathname: string) {
  if (locale === defaultSiteLocale) return pathname;
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

// A configuração acima centraliza os idiomas e as rotas canônicas. As versões
// traduzidas poderão ser publicadas sob /en e /es sem alterar nomes de marcas.
