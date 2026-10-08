import { eq } from "drizzle-orm";
import { ensureEngagementSchema, getDb } from "@/db";
import { dataConsents, newsletterSubscribers } from "@/db/schema";

export async function POST(request: Request) {
  if (!process.env.TURSO_DATABASE_URL?.trim()) return Response.json({ error: "O banco de assinantes ainda não foi conectado." }, { status: 503 });
  try {
    const payload = await request.json() as { email?: unknown; token?: unknown };
    const email = String(payload.email ?? "").trim().toLowerCase();
    const token = String(payload.token ?? "").trim();
    if (!email && !token) return Response.json({ error: "Informe o e-mail ou use o link recebido." }, { status: 400 });
    await ensureEngagementSchema();
    const db = await getDb();
    const [subscriber] = token
      ? await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.unsubscribeToken, token)).limit(1)
      : await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
    if (subscriber) {
      await db.update(newsletterSubscribers).set({ status: "unsubscribed", unsubscribedAt: new Date().toISOString() }).where(eq(newsletterSubscribers.id, subscriber.id));
      await db.insert(dataConsents).values({ subjectType: "newsletter", subjectId: subscriber.email, purpose: "carta-do-hub", granted: false });
    }
    return Response.json({ message: "Descadastro concluído. Você não receberá novos envios." });
  } catch (error) {
    console.error("Newsletter unsubscribe failed.", error);
    return Response.json({ error: "Não foi possível concluir o descadastro." }, { status: 500 });
  }
}

