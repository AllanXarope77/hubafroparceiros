import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const publicRoutes = [
  "",
  "/solucoes",
  "/experiencias",
  "/projetos",
  "/artistas",
  "/loja",
  "/conteudo",
  "/blog",
  "/podcast",
  "/clube-do-livro",
  "/livro-guetos",
  "/palestras",
  "/instituto-afroparceiros",
  "/pessoas/sergio-carvalho",
  "/sobre",
  "/contato",
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
