import Link from "next/link";
import Stripe from "stripe";
import Footer from "@/components/Footer";
import PurchaseTracker from "@/components/PurchaseTracker";
import WhatsAppLink from "@/components/WhatsAppLink";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Deposit received | Cabo Surprise",
  description: "Your deposit for Cabo Surprise was received.",
  path: "/deposit/success/",
  og: "og.jpg",
  index: false,
});

export const dynamic = "force-dynamic";

async function load(sessionId?: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  try {
    const s = await new Stripe(key).checkout.sessions.retrieve(sessionId);
    if (s.payment_status !== "paid") return null;
    return { id: s.id, amount: (s.amount_total ?? 0) / 100, currency: s.currency ?? "usd", service: s.metadata?.service, date: s.metadata?.event_date };
  } catch {
    return null;
  }
}

export default async function Success({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const paid = await load(session_id);
  const message = paid
    ? `Hi, I just paid my deposit${paid.service ? ` for ${paid.service}` : ""}${paid.date ? ` (event date ${paid.date})` : ""}. Here are the details: [hotel or villa, guest name, preferences].`
    : "Hi, I just paid my deposit. Here are the details: [hotel or villa, guest name, preferences].";

  return (
    <main>
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/15 text-3xl text-terracotta">✓</div>
        <h1 className="mt-6 font-serif text-4xl md:text-5xl">{paid ? "Deposit received." : "Thank you."}</h1>
        {paid && (
          <p className="mt-4 text-ink/70">
            We received your deposit of <strong className="font-medium">${paid.amount.toLocaleString("en-US")} {paid.currency.toUpperCase()}</strong>
            {paid.service ? <> for <strong className="font-medium">{paid.service}</strong></> : null}. A receipt is on its way to your email.
          </p>
        )}
        {!paid && <p className="mt-4 text-ink/70">If you completed a payment, a receipt will arrive by email shortly. Message us and we will confirm it.</p>}
        <div className="mx-auto mt-8 max-w-md rounded-sm border border-ink/12 px-6 py-5 text-left text-sm text-ink/70">
          <p className="font-medium text-ink">What happens next</p>
          <ol className="mt-2 space-y-1.5">
            <li>1. We confirm availability and your final price.</li>
            <li>2. We send you your booking confirmation with the total.</li>
            <li>3. Send us your hotel or villa, the guest of honor and any preferences on WhatsApp to speed things up.</li>
          </ol>
        </div>
        <WhatsAppLink message={message} label="deposit_success" className="btn-primary mt-8">Send details on WhatsApp</WhatsAppLink>
        <p className="mt-8"><Link href="/" className="text-sm text-terracotta hover:underline">Back to home</Link></p>
        {paid && <PurchaseTracker id={paid.id} value={paid.amount} currency={paid.currency} />}
      </div>
      <Footer />
    </main>
  );
}
