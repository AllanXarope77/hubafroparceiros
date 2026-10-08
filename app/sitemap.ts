import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const publicRoutes = [
  "",
  "/solucoes",
  "/solucoes/workshops",
  "/solucoes/eventos-corporativos",
  "/solucoes/sob-medida",
  "/experiencias",
  "/projetos",
  "/talentos",
  "/talentos/sergio-carvalho",
  "/guetos",
  "/guetos/o-apartheid-urbano",
  "/loja",
  "/conteudo",
  "/conteudo/tv",
  "/conteudo/carta",
  "/blog",
  "/podcast",
  "/clube-do-livro",
  "/palestras",
  "/instituto-afroparceiros",
  "/sobre",
  "/contato",
  "/privacidade",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return publicRoutes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/blog" || route === "/loja" ? 0.8 : 0.7,
  }));
}
