import type Stripe from "stripe";

/**
 * Called once Stripe confirms a deposit was paid. Today it only writes a structured log line
 * (visible in Vercel > Logs). This is the place to add a notification (email, WhatsApp, CRM).
 */
export async function onDepositPaid(s: Stripe.Checkout.Session) {
  console.log(
    JSON.stringify({
      event: "deposit_paid",
      session: s.id,
      amount: (s.amount_total ?? 0) / 100,
      currency: s.currency,
      email: s.customer_details?.email ?? s.customer_email,
      ...s.metadata,
    }),
  );
}

export async function onDepositFailed(s: Stripe.Checkout.Session) {
  console.warn(JSON.stringify({ event: "deposit_failed", session: s.id, email: s.customer_details?.email ?? s.customer_email, ...s.metadata }));
}
