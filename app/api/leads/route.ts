import { ensureEngagementSchema, getDb } from "@/db";
import { commercialLeads, dataConsents } from "@/db/schema";
import { commercialTopics } from "@/content/hub-architecture";
import { sendTransactionalEmail } from "@/lib/resend";

const topics = new Set(commercialTopics.map(([value]) => value));
function clean(value: unknown, maximum: number) { return String(value ?? "").trim().slice(0, maximum); }
function validEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }

export async function POST(request: Request) {
  if (!process.env.TURSO_DATABASE_URL?.trim()) return Response.json({ error: "A Central de Relacionamento aguarda a conexão do banco na Vercel." }, { status: 503 });
  try {
    const payload = await request.json() as Record<string, unknown>;
    const topic = clean(payload.topic, 60);
    const name = clean(payload.name, 120);
    const email = clean(payload.email, 180).toLowerCase();
    const message = clean(payload.message, 4000);
    const consent = payload.consent === true;
    if (!topics.has(topic as (typeof commercialTopics)[number][0]) || !name || !validEmail(email) || !message || !consent) {
      return Response.json({ error: "Revise os campos obrigatórios e confirme a Política de Privacidade." }, { status: 400 });
    }
    const id = crypto.randomUUID();
    const protocol = `AFRO-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${id.slice(0, 6).toUpperCase()}`;
    const values = {
      id, protocol, topic, name, email, message, consent,
      whatsapp: clean(payload.whatsapp, 40), cityState: clean(payload.cityState, 100),
      company: clean(payload.company, 160), role: clean(payload.role, 120),
      eventDate: clean(payload.eventDate, 20), estimatedAudience: Math.max(0, Number(payload.estimatedAudience) || 0),
      requestType: clean(payload.requestType, 240),
    };
    await ensureEngagementSchema();
    const db = await getDb();
    await db.insert(commercialLeads).values(values);
    await db.insert(dataConsents).values({ subjectType: "lead", subjectId: id, purpose: "responder-solicitacao-comercial", granted: true });
    const recipient = process.env.COMMERCIAL_NOTIFICATION_EMAIL?.trim();
    const notifications = [sendTransactionalEmail({ to: email, subject: `Recebemos sua solicitação ${protocol}`, html: `<p>Olá, ${name}.</p><p>Sua solicitação foi registrada com o protocolo <strong>${protocol}</strong>.</p>` })];
    if (recipient) notifications.push(sendTransactionalEmail({ to: recipient, subject: `Nova solicitação ${protocol}`, html: `<p>Assunto: ${topic}</p><p>Nome: ${name}</p><p>E-mail: ${email}</p><p>${message.replace(/</g, "&lt;")}</p>` }));
    await Promise.allSettled(notifications);
    return Response.json({ protocol, message: "Solicitação registrada com sucesso." }, { status: 201 });
  } catch (error) {
    console.error("Lead persistence failed.", error);
    return Response.json({ error: "Não foi possível registrar a solicitação. Use o WhatsApp para atendimento imediato." }, { status: 500 });
  }
}

