import { NextResponse } from "next/server";
import Stripe from "stripe";
import { site } from "@/config/site";
import { CUSTOM_ID, customLimits, payableItems } from "@/config/payments";
import { depositFor, nightsBetween } from "@/lib/pricing";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return fail("Online payments are not available right now. Please message us on WhatsApp.", 503);

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return fail("Invalid request.");
  }

  if (clean(b.company, 50)) return fail("Invalid request."); // honeypot

  const name = clean(b.name, 80);
  const email = clean(b.email, 120);
  const date = clean(b.date, 10);
  const venue = clean(b.venue, 120);
  const itemId = clean(b.item, 40);

  if (name.length < 2) return fail("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < new Date().toISOString().slice(0, 10)) return fail("Please choose a future event date.");
  if (b.terms !== true) return fail("Please accept the Terms to continue.");

  // The amount never comes from the client: it is looked up and computed here.
  let cents: number;
  let label: string;
  let extraMeta: Record<string, string> = {};
  let description: string;
  if (itemId === CUSTOM_ID) {
    const amount = Number(b.amount);
    if (!Number.isFinite(amount) || amount < customLimits.min || amount > customLimits.max) {
      return fail(`Enter an amount between $${customLimits.min} and $${customLimits.max} USD.`);
    }
    cents = Math.round(amount * 100);
    label = "Custom quote";
    description = label;
  } else {
    const r = Number(process.env.MXN_PER_USD);
    const res = depositFor(itemId, b.guests, b.tier, Number.isFinite(r) && r > 0 ? r : null, nightsBetween(date, b.endDate), b.variant);
    if (!res.ok) return fail(res.error, res.status);
    cents = res.plan.usdCents;
    label = res.plan.name;
    extraMeta = res.plan.metadata;
    description = res.plan.description;
    const chosen = Array.isArray(b.addons)
      ? (payableItems.find((p) => p.id === itemId)?.addons ?? []).filter((a) => (b.addons as unknown[]).includes(a.id)).map((a) => a.name)
      : [];
    if (chosen.length) {
      extraMeta = { ...extraMeta, addons: chosen.join(", ").slice(0, 480) };
      description += `. Add-ons requested: ${chosen.join(", ")}`;
    }
    if (b.transport === true) {
      extraMeta = { ...extraMeta, transport: "private transportation requested" };
      description += ". Private transportation requested";
    }
  }

  const base = process.env.NODE_ENV === "production" ? site.url : new URL(req.url).origin;
  const metadata = { ...extraMeta, service: label, event_date: date, ...(typeof b.endDate === "string" && extraMeta.nights ? { check_out: b.endDate } : {}), venue, customer_name: name };

  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      customer_email: email,
      locale: "en",
      custom_text: { submit: { message: "Your deposit is paid to Rancho McCoy · Cabo Surprise. We will confirm your booking on WhatsApp right after." } },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: cents,
            product_data: { name: `Deposit: ${label}`, description: `${description}. ${extraMeta.nights ? `Check-in ${date}, check-out ${String(b.endDate)}` : `Event date ${date}`}.` },
          },
        },
      ],
      metadata,
      payment_intent_data: { description: `Cabo Surprise deposit: ${label} (${date})`, metadata },
      success_url: `${base}/deposit/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/deposit/`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("stripe checkout error", e instanceof Error ? e.message : e);
    return fail("We could not start the payment. Please try again or message us on WhatsApp.", 502);
  }
}
