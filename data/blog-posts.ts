import type { BlogPost } from "@/db/schema";

/**
 * Conteúdo de segurança para o Blog.
 *
 * A lista mantém a página pública disponível quando o banco remoto ainda não
 * foi conectado à Vercel. Posts persistentes continuam sendo administrados
 * pelo editor quando a integração com o Turso está configurada.
 */
export const bundledBlogPosts: BlogPost[] = [];
