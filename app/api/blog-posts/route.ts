import { desc, eq } from "drizzle-orm";
import { bundledBlogPosts } from "@/data/blog-posts";
import { ensureBlogSchema, getDb } from "@/db";
import { blogPosts } from "@/db/schema";

function slugify(value: string) {
  const base = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 64);

  return `${base || "post"}-${Date.now().toString(36)}`;
}

function hasRemoteDatabase() {
  return Boolean(process.env.TURSO_DATABASE_URL?.trim());
}

function bundledResponse(slug: string | null) {
  if (slug) {
    const post = bundledBlogPosts.find(item => item.slug === slug);
    if (!post) return Response.json({ error: "Post não encontrado." }, { status: 404 });
    return Response.json({ post, storage: "bundled" });
  }

  return Response.json(
    { posts: bundledBlogPosts, storage: "bundled" },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}

function persistenceUnavailable() {
  return Response.json(
    { error: "Conecte o banco do Blog na Vercel para publicar ou excluir posts de forma persistente." },
    { status: 503 },
  );
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!hasRemoteDatabase()) return bundledResponse(slug);

  try {
    await ensureBlogSchema();
    const db = await getDb();

    if (slug) {
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
      if (!post) return Response.json({ error: "Post não encontrado." }, { status: 404 });
      return Response.json({ post });
    }

    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt), desc(blogPosts.id)).limit(50);
    return Response.json({ posts }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Blog database unavailable; serving bundled content.", error);
    return bundledResponse(slug);
  }
}

export async function POST(request: Request) {
  if (!hasRemoteDatabase()) return persistenceUnavailable();

  try {
    const payload = (await request.json()) as Partial<{
      title: string;
      category: string;
      excerpt: string;
      content: string;
    }>;

    const title = payload.title?.trim() ?? "";
    const category = payload.category?.trim() ?? "";
    const excerpt = payload.excerpt?.trim() ?? "";
    const content = payload.content?.trim() ?? "";

    if (!title || !category || !excerpt || !content) {
      return Response.json({ error: "Preencha todos os campos para publicar." }, { status: 400 });
    }
    if (title.length > 140 || category.length > 50 || excerpt.length > 280) {
      return Response.json({ error: "Revise o tamanho do título, categoria ou resumo." }, { status: 400 });
    }

    await ensureBlogSchema();
    const db = await getDb();
    const [post] = await db.insert(blogPosts).values({
      title,
      slug: slugify(title),
      category,
      excerpt,
      content,
    }).returning();

    return Response.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Unable to publish blog post.", error);
    return Response.json({ error: "O banco do Blog não está disponível. Revise a integração na Vercel." }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  if (!hasRemoteDatabase()) return persistenceUnavailable();

  try {
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return Response.json({ error: "Post inválido." }, { status: 400 });
    }

    await ensureBlogSchema();
    const db = await getDb();
    const [deleted] = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning({ id: blogPosts.id });

    if (!deleted) return Response.json({ error: "Post não encontrado." }, { status: 404 });
    return Response.json({ deleted });
  } catch (error) {
    console.error("Unable to delete blog post.", error);
    return Response.json({ error: "O banco do Blog não está disponível. Revise a integração na Vercel." }, { status: 503 });
  }
}
