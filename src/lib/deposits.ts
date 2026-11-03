import type Stripe from "stripe";
import { site } from "@/config/site";
import { esc, sendEmail } from "./email";

const wrap = (inner: string) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#2B2420;line-height:1.5">${inner}</div>`;

const details = (s: Stripe.Checkout.Session) => ({
  amount: ((s.amount_total ?? 0) / 100).toLocaleString("en-US", { minimumFractionDigits: 2 }),
  currency: (s.currency ?? "usd").toUpperCase(),
  email: s.customer_details?.email ?? s.customer_email ?? "",
  name: s.metadata?.customer_name ?? s.customer_details?.name ?? "",
  service: s.metadata?.service ?? "Deposit",
  date: s.metadata?.event_date ?? "",
});

/** Called once Stripe confirms a deposit was paid: logs it, alerts the owner, and confirms to the customer. */
export async function onDepositPaid(s: Stripe.Checkout.Session) {
  const d = details(s);
  console.log(JSON.stringify({ event: "deposit_paid", session: s.id, amount: d.amount, currency: d.currency, email: d.email, ...s.metadata }));

  const owner = process.env.NOTIFY_EMAIL;
  const jobs: Promise<void>[] = [];

  if (owner) {
    const rows = Object.entries(s.metadata ?? {})
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#7a6f68">${esc(k)}</td><td style="padding:4px 0">${esc(v)}</td></tr>`)
      .join("");
    jobs.push(
      sendEmail({
        to: owner,
        replyTo: d.email || undefined,
        subject: `Deposit received: ${d.currency} ${d.amount} · ${d.service}${d.date ? ` · ${d.date}` : ""}`,
        idempotencyKey: `deposit-paid-owner-${s.id}`,
        html: wrap(
          `<h2 style="margin:0 0 8px">New deposit received</h2>
           <p style="font-size:20px;margin:0 0 16px"><strong>${esc(d.currency)} ${esc(d.amount)}</strong> from ${esc(d.name || d.email)}</p>
           <p style="margin:0 0 12px">${esc(d.email)}</p>
           <table style="border-collapse:collapse;font-size:14px">${rows}</table>
           <p style="margin-top:16px;padding:12px 14px;background:#F4E9DD;font-size:14px"><strong>Next:</strong> confirm availability and the final price, then send the customer the booking confirmation with the total.</p>
           <p style="margin-top:12px;font-size:12px;color:#7a6f68">Stripe session ${esc(s.id)}</p>`,
        ),
        text: `New deposit: ${d.currency} ${d.amount} from ${d.name || d.email} (${d.email})\nNEXT: confirm availability and the final price, then send the booking confirmation with the total.\n${Object.entries(s.metadata ?? {}).map(([k, v]) => `${k}: ${v}`).join("\n")}\nStripe session ${s.id}`,
      }),
    );
  }

  if (d.email) {
    const wa = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi, I just paid my deposit. Here are the details: [hotel or villa, guest name, preferences].")}`;
    jobs.push(
      sendEmail({
        to: d.email,
        replyTo: owner || undefined,
        subject: "Deposit received | Cabo Surprise",
        idempotencyKey: `deposit-paid-customer-${s.id}`,
        html: wrap(
          `<h2 style="margin:0 0 8px">Thank you${d.name ? `, ${esc(d.name.split(" ")[0])}` : ""}. We received your deposit.</h2>
           <p>We received your deposit of <strong>${esc(d.currency)} ${esc(d.amount)}</strong> for <strong>${esc(d.service)}</strong>${d.date ? ` on <strong>${esc(d.date)}</strong>` : ""}. Stripe also emails you a receipt.</p>
           <p><strong>What happens next:</strong> we confirm availability and your final price, and then send you your booking confirmation with the total. To speed things up, send us the hotel or villa, the guest of honor and any preferences on WhatsApp.</p>
           <p style="margin:24px 0"><a href="${wa}" style="background:#C4663D;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;display:inline-block">Send details on WhatsApp</a></p>
           <p style="font-size:12px;color:#7a6f68">Cabo Surprise · Los Cabos, Mexico · ${esc(site.phoneDisplay)}</p>`,
        ),
        text: `Thank you. We received your deposit of ${d.currency} ${d.amount} for ${d.service}${d.date ? ` on ${d.date}` : ""}.\nWhat happens next: we confirm availability and your final price, then send you your booking confirmation with the total. To speed things up, send us your details on WhatsApp: ${wa}\nCabo Surprise · ${site.phoneDisplay}`,
      }),
    );
  }

  // If an email fails the webhook returns 500 and Stripe retries; idempotency keys prevent duplicates.
  await Promise.all(jobs);
}

export async function onDepositFailed(s: Stripe.Checkout.Session) {
  const d = details(s);
  console.warn(JSON.stringify({ event: "deposit_failed", session: s.id, email: d.email, ...s.metadata }));
  const owner = process.env.NOTIFY_EMAIL;
  if (!owner) return;
  await sendEmail({
    to: owner,
    subject: `Deposit payment failed: ${d.service}${d.date ? ` · ${d.date}` : ""}`,
    idempotencyKey: `deposit-failed-owner-${s.id}`,
    html: wrap(`<h2 style="margin:0 0 8px">A deposit payment failed</h2><p>${esc(d.name || d.email)} (${esc(d.email)}) · ${esc(d.service)} · ${esc(d.date)}</p><p style="font-size:12px;color:#7a6f68">Stripe session ${esc(s.id)}</p>`),
    text: `Deposit payment failed: ${d.name || d.email} (${d.email}), ${d.service}, ${d.date}. Stripe session ${s.id}`,
  });
}
