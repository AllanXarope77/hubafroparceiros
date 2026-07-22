import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export async function getD1() {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) {
    throw new Error("O armazenamento do Blog não está disponível.");
  }

  return env.DB;
}

export async function getDb() {
  return drizzle(await getD1(), { schema });
}

export async function ensureBlogSchema() {
  const d1 = await getD1();
  await d1.batch([
    d1.prepare(`CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    d1.prepare("CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts (created_at)"),
  ]);
}
