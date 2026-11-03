import { NextResponse } from "next/server";
import Stripe from "stripe";
import { site } from "@/config/site";
import { computeQuote, DEPOSIT_PERCENT, mxn, parseSelection } from "@/lib/quote";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const rate = Number(process.env.MXN_PER_USD);
  if (!key || !Number.isFinite(rate) || rate <= 0) {
    return fail("Online payments are not available right now. Please message us on WhatsApp.", 503);
  }

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
  if (name.length < 2) return fail("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < new Date().toISOString().slice(0, 10)) return fail("Please choose a future event date.");
  if (b.terms !== true) return fail("Please accept the Terms to continue.");

  // The quote is recomputed here from the selections; no amount from the client is ever used.
  const sel = parseSelection(b.selection);
  const quote = sel && computeQuote(sel);
  if (!sel || !quote) return fail("Please check your selection. For more than 199 guests, message our team.");

  const usdCents = Math.round(quote.deposit / rate);
  if (usdCents < 50) return fail("Invalid amount.");

  const base = process.env.NODE_ENV === "production" ? site.url : new URL(req.url).origin;
  const summary = quote.lines.map((l) => l.label).join("; ").slice(0, 480);
  const metadata = {
    service: "Rancho McCoy venue booking",
    event_date: date,
    customer_name: name,
    guests: String(sel.guests),
    rate_tier: sel.tier,
    total_mxn: (quote.total / 100).toFixed(2),
    deposit_mxn: (quote.deposit / 100).toFixed(2),
    mxn_per_usd: String(rate),
    items: summary,
  };

  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      customer_email: email,
      locale: "en",
      custom_text: { submit: { message: "Your deposit is paid to Rancho McCoy. We will confirm your date on WhatsApp right after." } },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: usdCents,
            product_data: {
              name: `Deposit (${DEPOSIT_PERCENT}%): Rancho McCoy event on ${date}`,
              description: `${sel.guests} guests. Quote total ${mxn(quote.total)}, deposit ${mxn(quote.deposit)} at ${rate} MXN per USD.`,
            },
          },
        },
      ],
      metadata,
      payment_intent_data: { description: `Rancho McCoy deposit (${date}, ${sel.guests} guests)`, metadata },
      success_url: `${base}/deposit/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/quote/`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("stripe venue checkout error", e instanceof Error ? e.message : e);
    return fail("We could not start the payment. Please try again or message us on WhatsApp.", 502);
  }
}
