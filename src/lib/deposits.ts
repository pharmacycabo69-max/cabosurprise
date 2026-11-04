import type Stripe from "stripe";
import { policy } from "@/config/site";
import { sendEmail } from "./email";
import { customerEmail, failedEmail, ownerEmail, type DepositMail } from "./emailTemplates";

const mail = (s: Stripe.Checkout.Session): DepositMail => {
  const m = s.metadata ?? {};
  const num = (v?: string) => (v && Number.isFinite(Number(v)) ? Number(v) : undefined);
  return {
    name: m.customer_name ?? s.customer_details?.name ?? "",
    email: s.customer_details?.email ?? s.customer_email ?? "",
    paid: (s.amount_total ?? 0) / 100,
    currency: (s.currency ?? "usd").toUpperCase(),
    service: m.service ?? "Deposit",
    date: m.event_date ?? "",
    endDate: m.check_out,
    nights: num(m.nights),
    guests: num(m.guests),
    packageUsd: num(m.package_price_usd),
    balanceDays: num(m.balance_days) ?? policy.balanceDays,
    addons: m.addons,
    transport: !!m.transport,
    venue: m.venue,
    extra: m,
    sessionId: s.id,
  };
};

/** Called once Stripe confirms a deposit was paid: logs it, alerts the owner, and confirms to the customer. */
export async function onDepositPaid(s: Stripe.Checkout.Session) {
  const d = mail(s);
  console.log(JSON.stringify({ event: "deposit_paid", session: s.id, amount: d.paid, currency: d.currency, email: d.email, ...s.metadata }));

  const owner = process.env.NOTIFY_EMAIL;
  const jobs: Promise<void>[] = [];

  if (owner) {
    const o = ownerEmail(d);
    jobs.push(
      sendEmail({
        to: owner,
        replyTo: d.email || undefined,
        subject: `Deposit received: ${d.currency} ${d.paid.toLocaleString("en-US", { minimumFractionDigits: 2 })} · ${d.service}${d.date ? ` · ${d.date}` : ""}`,
        idempotencyKey: `deposit-paid-owner-${s.id}`,
        html: o.html,
        text: o.text,
      }),
    );
  }

  if (d.email) {
    const c = customerEmail(d);
    jobs.push(
      sendEmail({
        to: d.email,
        replyTo: owner || undefined,
        subject: "Deposit received | Cabo Surprise",
        idempotencyKey: `deposit-paid-customer-${s.id}`,
        html: c.html,
        text: c.text,
      }),
    );
  }

  // If an email fails the webhook returns 500 and Stripe retries; idempotency keys prevent duplicates.
  await Promise.all(jobs);
}

export async function onDepositFailed(s: Stripe.Checkout.Session) {
  const d = mail(s);
  console.warn(JSON.stringify({ event: "deposit_failed", session: s.id, email: d.email, ...s.metadata }));
  const owner = process.env.NOTIFY_EMAIL;
  if (!owner) return;
  const f = failedEmail(d);
  await sendEmail({
    to: owner,
    subject: `Deposit payment failed: ${d.service}${d.date ? ` · ${d.date}` : ""}`,
    idempotencyKey: `deposit-failed-owner-${s.id}`,
    html: f.html,
    text: f.text,
  });
}
