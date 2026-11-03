// Minimal Resend client (https://resend.com/docs/api-reference/emails/send-email).
// RESEND_API_URL exists only so tests can point at a local mock.
type Mail = { to: string; subject: string; html: string; text: string; replyTo?: string; idempotencyKey?: string };

export const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEmail(m: Mail) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(`RESEND_API_KEY not set, email skipped: ${m.subject}`);
    return;
  }
  const res = await fetch(`${process.env.RESEND_API_URL ?? "https://api.resend.com"}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      // Stripe can deliver the same event twice; this makes the second send a no-op.
      ...(m.idempotencyKey ? { "Idempotency-Key": m.idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "Cabo Surprise <onboarding@resend.dev>",
      to: m.to,
      subject: m.subject,
      html: m.html,
      text: m.text,
      ...(m.replyTo ? { reply_to: m.replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
}
