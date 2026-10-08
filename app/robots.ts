import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const privatePaths = [
  "/api/",
  "/blog/editar",
  "/loja/editar",
  "/carrinho",
  "/pedido",
  "/newsletter/descadastrar",
];

export default function robots(): MetadataRoute.Robots {
  const rule = { allow: "/", disallow: privatePaths };

  return {
    rules: [
      { userAgent: "OAI-SearchBot", ...rule },
      { userAgent: "ChatGPT-User", ...rule },
      { userAgent: "*", ...rule },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
    host: getSiteUrl(),
  };
}
