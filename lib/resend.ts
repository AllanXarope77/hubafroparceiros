type EmailMessage = { to: string; subject: string; html: string };

export async function sendTransactionalEmail(message: EmailMessage) {
  if (process.env.RESEND_SEND_ENABLED !== "true") return { sent: false, reason: "disabled" } as const;
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) return { sent: false, reason: "not-configured" } as const;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, ...message }),
  });
  if (!response.ok) throw new Error("O alerta por e-mail não pôde ser enviado.");
  return { sent: true } as const;
}

