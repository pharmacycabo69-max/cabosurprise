// Deposit emails, styled like the website: cream paper, ink type, bronze accents, serif headlines.
// Email clients ignore web fonts and most CSS, so everything is inline and table-based.
import { policy, site } from "../config/site";
import { esc } from "./email";

const C = { cream: "#FBF6EF", ink: "#2B2420", bronze: "#9C6B43", champagne: "#E9D5B0", tint: "#F4EBDD", muted: "#7a6f68", line: "#E4D9C8" };
const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "Helvetica,Arial,sans-serif";

export type DepositMail = {
  name: string;
  email: string;
  /** What Stripe actually charged. */
  paid: number;
  currency: string;
  service: string;
  /** yyyy-mm-dd, the event date or the check-in. */
  date: string;
  /** yyyy-mm-dd check-out, stays only. */
  endDate?: string;
  nights?: number;
  guests?: number;
  /** Package price for this booking, when the item has one. */
  packageUsd?: number;
  balanceDays: number;
  addons?: string;
  transport?: boolean;
  venue?: string;
  /** Everything else Stripe holds for this payment (shown to the owner only). */
  extra: Record<string, string>;
  sessionId: string;
};

const money = (n: number, currency = "USD") =>
  `${currency === "USD" ? "$" : ""}${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })} ${currency}`;

export const longDate = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
};

const minusDays = (iso: string, days: number) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return "";
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3] - days)).toISOString().slice(0, 10);
};

/** Balance after the deposit, and when it is due. null when the item has no package price. */
export function balanceOf(d: DepositMail, today = new Date().toISOString().slice(0, 10)) {
  if (!d.packageUsd) return null;
  const amount = Math.max(d.packageUsd - d.paid, 0);
  const dueIso = minusDays(d.date, d.balanceDays);
  const due = !dueIso || dueIso <= today ? "with your booking confirmation" : longDate(dueIso);
  return { amount, due, soon: !dueIso || dueIso <= today };
}

const when = (d: DepositMail) =>
  d.endDate && d.nights ? `${longDate(d.date)} to ${longDate(d.endDate)} (${d.nights} ${d.nights === 1 ? "night" : "nights"})` : longDate(d.date);

const eyebrow = (t: string) =>
  `<p style="margin:0 0 14px;font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:0.3em;text-transform:uppercase;color:${C.bronze}">&mdash;&nbsp; ${esc(t)}</p>`;
const h1 = (t: string) => `<h1 style="margin:0 0 18px;font-family:${SERIF};font-size:32px;line-height:1.12;font-weight:400;letter-spacing:-0.01em;color:${C.ink}">${t}</h1>`;
const p = (t: string, extra = "") => `<p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.ink};${extra}">${t}</p>`;
const small = (t: string) => `<p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted}">${t}</p>`;

const table = (rows: [string, string][], bg = "transparent") =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${bg}">${rows
    .map(
      ([k, v], i) =>
        `<tr><td style="padding:11px 0;${i ? `border-top:1px solid ${C.line};` : ""}font-family:${SANS};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${C.muted};vertical-align:top;width:38%">${esc(k)}</td><td style="padding:11px 0;${i ? `border-top:1px solid ${C.line};` : ""}font-family:${SANS};font-size:15px;color:${C.ink};text-align:right;vertical-align:top">${v}</td></tr>`,
    )
    .join("")}</table>`;

const button = (href: string, label: string) =>
  `<a href="${esc(href)}" style="display:inline-block;background:${C.ink};color:${C.cream};text-decoration:none;font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;padding:16px 30px;border-radius:2px">${esc(label)}</a>`;

const box = (inner: string) => `<div style="margin:26px 0;padding:20px 22px;background:${C.tint};border-left:2px solid ${C.bronze}">${inner}</div>`;

function layout(preheader: string, inner: string) {
  return `<div style="margin:0;padding:34px 12px;background:${C.cream}">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.cream}">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto">
<tr><td style="padding:0 6px 22px"><span style="font-family:${SERIF};font-size:26px;font-weight:300;letter-spacing:0.01em;color:${C.ink}">Cabo Surprise</span></td></tr>
<tr><td style="background:#ffffff;border:1px solid ${C.line};padding:38px 34px">${inner}</td></tr>
<tr><td style="padding:22px 6px 0;text-align:center">${small(`Rancho McCoy &middot; Cabo Surprise &middot; Los Cabos, Mexico<br>${esc(site.phoneDisplay)} &middot; <a href="mailto:${esc(site.email)}" style="color:${C.muted}">${esc(site.email)}</a>`)}</td></tr>
</table></div>`;
}

export function customerEmail(d: DepositMail) {
  const first = d.name.split(" ")[0];
  const bal = balanceOf(d);
  const wa = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi, I just paid my deposit. Here are the details: [hotel or villa, guest name, preferences].")}`;

  const summary: [string, string][] = [["Experience", `<strong>${esc(d.service)}</strong>`], [d.endDate ? "Stay" : "Date", esc(when(d))]];
  if (d.guests) summary.push(["Guests", String(d.guests)]);
  if (d.addons) summary.push(["Add-ons requested", esc(d.addons)]);
  if (d.transport) summary.push(["Transportation", "Requested"]);

  const payment: [string, string][] = [];
  if (bal && d.packageUsd) {
    payment.push(["Package price", esc(money(d.packageUsd, d.currency))]);
    payment.push(["Deposit paid", `<strong>${esc(money(d.paid, d.currency))}</strong>`]);
    payment.push(["Balance", `<strong>${esc(money(bal.amount, d.currency))}</strong>`]);
  } else {
    payment.push(["Deposit paid", `<strong>${esc(money(d.paid, d.currency))}</strong>`]);
  }

  const next = [
    "We confirm availability and your final price.",
    "You receive your booking confirmation with the total.",
    bal ? (bal.soon ? "You pay the balance as set out in your confirmation." : `You pay the balance by <strong>${esc(bal.due)}</strong>, ${d.balanceDays} days before your date.`) : "We set out the balance and its due date in your confirmation.",
  ];

  const html = layout(
    `We received your ${money(d.paid, d.currency)} deposit for ${d.service}.`,
    `${eyebrow("Deposit received")}
${h1(`Thank you${first ? `, ${esc(first)}` : ""}.<br><em style="font-weight:300;color:${C.bronze}">We received your deposit.</em>`)}
${p("This is your summary. Stripe also emails you a separate receipt.")}
${table(summary)}
${box(
  `<p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:${C.bronze}">Your payment</p>${table(payment)}${
    bal ? `<p style="margin:12px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted}">The balance is due ${d.balanceDays} days before your date${bal.soon ? "" : `, on ${esc(bal.due)}`}. The final price is confirmed in your booking confirmation. Add-ons and transportation are quoted separately.</p>` : ""
  }`,
)}
<p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:${C.bronze}">What happens next</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px">${next
    .map((t, i) => `<tr><td style="padding:5px 14px 5px 0;font-family:${SERIF};font-size:20px;color:${C.bronze};vertical-align:top">${i + 1}</td><td style="padding:5px 0;font-family:${SANS};font-size:15px;line-height:1.55;color:${C.ink}">${t}</td></tr>`)
    .join("")}</table>
${p("To speed things up, send us the hotel or villa, the guest of honor and any preferences on WhatsApp.")}
<p style="margin:22px 0 28px">${button(wa, "Send details on WhatsApp")}</p>
<div style="border-top:1px solid ${C.line};padding-top:18px">${small(`<strong style="color:${C.ink}">Cancellation.</strong> Cancel more than ${policy.refundDays} days before your date and your payment is refunded. Questions? Reply to this email or message us on WhatsApp.`)}</div>`,
  );

  const text = [
    `Thank you${first ? `, ${first}` : ""}. We received your deposit.`,
    "",
    `Experience: ${d.service}`,
    `${d.endDate ? "Stay" : "Date"}: ${when(d)}`,
    d.guests ? `Guests: ${d.guests}` : "",
    d.addons ? `Add-ons requested: ${d.addons}` : "",
    d.transport ? "Transportation: requested" : "",
    "",
    bal && d.packageUsd ? `Package price: ${money(d.packageUsd, d.currency)}` : "",
    `Deposit paid: ${money(d.paid, d.currency)}`,
    bal ? `Balance: ${money(bal.amount, d.currency)}, due ${bal.soon ? "as set out in your confirmation" : `${bal.due} (${d.balanceDays} days before your date)`}` : "",
    "The final price is confirmed in your booking confirmation. Add-ons and transportation are quoted separately.",
    "",
    "What happens next:",
    ...next.map((t, i) => `${i + 1}. ${t.replace(/<[^>]+>/g, "")}`),
    "",
    `Send us your details on WhatsApp: ${wa}`,
    "",
    `Cancellation: cancel more than ${policy.refundDays} days before your date and your payment is refunded.`,
    `${site.name} · ${site.phoneDisplay}`,
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");

  return { html, text };
}

const KNOWN = new Set(["service", "event_date", "check_out", "nights", "guests", "package_price_usd", "deposit_percent", "balance_days", "addons", "transport", "venue", "customer_name"]);

export function ownerEmail(d: DepositMail) {
  const bal = balanceOf(d);
  const who = d.name || d.email;

  const rows: [string, string][] = [
    ["Customer", esc(who)],
    ["Email", `<a href="mailto:${esc(d.email)}" style="color:${C.ink}">${esc(d.email)}</a>`],
    ["Experience", `<strong>${esc(d.service)}</strong>`],
    [d.endDate ? "Stay" : "Date", esc(when(d))],
  ];
  if (d.guests) rows.push(["Guests", String(d.guests)]);
  if (d.venue) rows.push(["Hotel or villa", esc(d.venue)]);
  if (d.addons) rows.push(["Add-ons requested", esc(d.addons)]);
  if (d.transport) rows.push(["Transportation", "Requested"]);

  const pay: [string, string][] = [];
  if (bal && d.packageUsd) {
    pay.push(["Package price", esc(money(d.packageUsd, d.currency))]);
    pay.push(["Deposit paid", `<strong>${esc(money(d.paid, d.currency))}</strong>`]);
    pay.push(["Balance", `<strong>${esc(money(bal.amount, d.currency))}</strong>`]);
    pay.push(["Balance due", esc(bal.soon ? "Date is close: collect with the confirmation" : bal.due)]);
  } else {
    pay.push(["Deposit paid", `<strong>${esc(money(d.paid, d.currency))}</strong>`]);
  }

  const other = Object.entries(d.extra).filter(([k]) => !KNOWN.has(k));

  const html = layout(
    `${money(d.paid, d.currency)} from ${who} for ${d.service}.`,
    `${eyebrow("New deposit")}
${h1(`${esc(money(d.paid, d.currency))} from ${esc(who)}`)}
${p("Reply to this email to write to the customer directly.", `color:${C.muted}`)}
${table(rows)}
${box(`<p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:${C.bronze}">Payment</p>${table(pay)}`)}
${other.length ? `<p style="margin:0 0 6px;font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:${C.bronze}">More details</p>${table(other.map(([k, v]) => [k.replace(/_/g, " "), esc(v)]))}` : ""}
<div style="margin:26px 0 0;padding:16px 20px;background:${C.ink}"><p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.55;color:${C.cream}"><strong style="letter-spacing:0.14em;text-transform:uppercase;font-size:11px;color:${C.champagne}">Next</strong><br>Confirm availability and the final price, then send the customer the booking confirmation with the total${bal ? `, and the balance reminder for ${esc(bal.soon ? "now" : bal.due)}` : ""}.</p></div>
<p style="margin:20px 0 0">${small(`Stripe session ${esc(d.sessionId)}`)}</p>`,
  );

  const text = [
    `New deposit: ${money(d.paid, d.currency)} from ${who} (${d.email})`,
    `Experience: ${d.service}`,
    `${d.endDate ? "Stay" : "Date"}: ${when(d)}`,
    d.guests ? `Guests: ${d.guests}` : "",
    d.venue ? `Hotel or villa: ${d.venue}` : "",
    d.addons ? `Add-ons requested: ${d.addons}` : "",
    d.transport ? "Transportation: requested" : "",
    bal && d.packageUsd ? `Package price ${money(d.packageUsd, d.currency)} · deposit ${money(d.paid, d.currency)} · balance ${money(bal.amount, d.currency)} due ${bal.due}` : "",
    ...other.map(([k, v]) => `${k}: ${v}`),
    "NEXT: confirm availability and the final price, then send the booking confirmation with the total.",
    `Stripe session ${d.sessionId}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { html, text };
}

export function failedEmail(d: Pick<DepositMail, "name" | "email" | "service" | "date" | "sessionId">) {
  const who = d.name || d.email;
  return {
    html: layout(
      `A deposit payment failed for ${d.service}.`,
      `${eyebrow("Payment failed")}${h1("A deposit payment failed")}${table([["Customer", esc(who)], ["Email", esc(d.email)], ["Experience", esc(d.service)], ["Date", esc(d.date ? longDate(d.date) : "")]])}<p style="margin:20px 0 0">${small(`Stripe session ${esc(d.sessionId)}`)}</p>`,
    ),
    text: `Deposit payment failed: ${who} (${d.email}), ${d.service}, ${d.date}. Stripe session ${d.sessionId}`,
  };
}
