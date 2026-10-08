import { eq } from "drizzle-orm";
import { ensureEngagementSchema, getDb } from "@/db";
import { dataConsents, newsletterSubscribers } from "@/db/schema";
import { sendTransactionalEmail } from "@/lib/resend";

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 180;
}

export async function POST(request: Request) {
  if (!process.env.TURSO_DATABASE_URL?.trim()) return Response.json({ error: "A Carta do HUB aguarda a conexão do banco na Vercel." }, { status: 503 });
  try {
    const payload = await request.json() as { email?: unknown; consent?: unknown };
    const email = String(payload.email ?? "").trim().toLowerCase();
    if (!validEmail(email) || payload.consent !== true) return Response.json({ error: "Informe um e-mail válido e confirme o consentimento." }, { status: 400 });
    await ensureEngagementSchema();
    const db = await getDb();
    const [existing] = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
    const token = existing?.unsubscribeToken || crypto.randomUUID();
    if (existing) await db.update(newsletterSubscribers).set({ status: "active", consentAt: new Date().toISOString(), unsubscribedAt: "" }).where(eq(newsletterSubscribers.id, existing.id));
    else await db.insert(newsletterSubscribers).values({ email, unsubscribeToken: token });
    await db.insert(dataConsents).values({ subjectType: "newsletter", subjectId: email, purpose: "carta-do-hub", granted: true });
    try { await sendTransactionalEmail({ to: email, subject: "Inscrição na Carta do HUB", html: `<p>Sua inscrição foi registrada.</p><p><a href="${new URL(`/newsletter/descadastrar?token=${token}`, request.url)}">Cancelar inscrição</a></p>` }); } catch (error) { console.error("Newsletter confirmation email failed.", error); }
    return Response.json({ message: "Inscrição registrada com sucesso." }, { status: existing ? 200 : 201 });
  } catch (error) {
    console.error("Newsletter subscription failed.", error);
    return Response.json({ error: "Não foi possível registrar a inscrição." }, { status: 500 });
  }
}

