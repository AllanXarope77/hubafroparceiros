import {
  BookOpen,
  Headphones,
  Mic2,
  Newspaper,
  ShoppingBag,
} from "lucide-react";

export const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Experiências", href: "/experiencias" },
  { label: "Projetos", href: "/projetos" },
  { label: "Talentos", href: "/talentos" },
  { label: "Guetos", href: "/guetos" },
  { label: "Conteúdo", href: "/conteudo" },
] as const;

export const projects = [
  {
    title: "DNA Guetos",
    eyebrow: "Vista a ideia",
    description: "Peças autorais, livros e objetos que carregam memória, identidade e futuro.",
    href: "/loja",
    icon: ShoppingBag,
    className: "project-visual--shop",
  },
  {
    title: "Blog",
    eyebrow: "Pensamento em movimento",
    description: "Análises, histórias e perspectivas para ampliar repertórios e conversas.",
    href: "/blog",
    icon: Newspaper,
    className: "project-visual--blog",
  },
  {
    title: "Palestras",
    eyebrow: "Ideias que mobilizam",
    description: "Encontros potentes para empresas, escolas, coletivos e eventos.",
    href: "/palestras",
    icon: Mic2,
    className: "project-visual--talks",
  },
  {
    title: "Clube do Livro",
    eyebrow: "Leitura compartilhada",
    description: "Uma comunidade para ler, conversar e transformar páginas em vínculos.",
    href: "/clube-do-livro",
    icon: BookOpen,
    className: "project-visual--books",
  },
  {
    title: "Podcast",
    eyebrow: "Vozes que ecoam",
    description: "Conversas profundas com quem está redesenhando cultura e sociedade.",
    href: "/podcast",
    icon: Headphones,
    className: "project-visual--podcast",
  },
] as const;

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/afroparceirosoficial/" },
  { label: "YouTube", href: "https://www.youtube.com/@Afroparceiros" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sergio-carvalho-sant/?skipRedirect=true" },
  { label: "Spotify", href: "https://open.spotify.com/show/1RqN2gzgY4EKKA3V8tWrtX" },
] as const;
