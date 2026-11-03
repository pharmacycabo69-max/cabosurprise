import { NextResponse } from "next/server";
import Stripe from "stripe";
import { onDepositFailed, onDepositPaid } from "@/lib/deposits";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !secret) return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });

  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature." }, { status: 400 });

  // The signature is computed over the exact raw body, so read it as text.
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = Stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        // Card payments are paid here; delayed methods arrive later as async_payment_succeeded.
        if (s.payment_status === "paid") await onDepositPaid(s);
        break;
      }
      case "checkout.session.async_payment_succeeded":
        await onDepositPaid(event.data.object as Stripe.Checkout.Session);
        break;
      case "checkout.session.async_payment_failed":
        await onDepositFailed(event.data.object as Stripe.Checkout.Session);
        break;
    }
  } catch (e) {
    console.error("webhook handler error", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Handler failed." }, { status: 500 }); // Stripe will retry
  }
  return NextResponse.json({ received: true });
}
