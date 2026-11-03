import { NextResponse } from "next/server";
import Stripe from "stripe";
import { site } from "@/config/site";
import { CUSTOM_ID, customLimits, payableItems } from "@/config/payments";

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

  // The amount never comes from a package id sent by the client: it is looked up here.
  let cents: number;
  let label: string;
  if (itemId === CUSTOM_ID) {
    const amount = Number(b.amount);
    if (!Number.isFinite(amount) || amount < customLimits.min || amount > customLimits.max) {
      return fail(`Enter an amount between $${customLimits.min} and $${customLimits.max} USD.`);
    }
    cents = Math.round(amount * 100);
    label = "Custom quote";
  } else {
    const item = payableItems.find((p) => p.id === itemId);
    if (!item) return fail("Please choose a package.");
    cents = item.deposit * 100;
    label = item.name;
  }

  const base = process.env.NODE_ENV === "production" ? site.url : new URL(req.url).origin;
  const metadata = { service: label, event_date: date, venue, customer_name: name };

  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      customer_email: email,
      locale: "en",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: cents,
            product_data: { name: `Deposit: ${label}`, description: `Cabo Surprise setup on ${date}` },
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
