import { desc, eq } from "drizzle-orm";
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

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Não foi possível acessar os posts.";
}

export async function GET(request: Request) {
  try {
    await ensureBlogSchema();
    const db = await getDb();
    const slug = new URL(request.url).searchParams.get("slug");

    if (slug) {
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
      if (!post) return Response.json({ error: "Post não encontrado." }, { status: 404 });
      return Response.json({ post });
    }

    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt), desc(blogPosts.id)).limit(50);
    return Response.json({ posts }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
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
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}
