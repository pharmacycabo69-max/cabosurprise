import Link from "next/link";
import Footer from "@/components/Footer";
import QuoteBuilder from "@/components/QuoteBuilder";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Ranch Event Quote Calculator | Cabo Surprise",
  description: "Build an instant estimate for your wedding or private event at Rancho McCoy in Los Cabos: guests, cabins, horses, dinner, bar and staff.",
  path: "/quote/",
  og: "og.jpg",
});

// Read per request so the exchange rate can change without a rebuild.
export const dynamic = "force-dynamic";

export default function QuotePage() {
  const r = Number(process.env.MXN_PER_USD);
  const rate = Number.isFinite(r) && r > 0 ? r : null;
  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <Link href="/" className="text-sm text-terracotta hover:underline">← Back home</Link>
        <h1 className="mt-6 font-serif text-4xl md:text-6xl">Build your ranch event quote.</h1>
        <p className="mt-3 max-w-2xl text-ink/70">Choose your guest count and extras to see an instant estimate in Mexican pesos. Send it to us on WhatsApp or hold your date with a deposit.</p>
        <div className="mt-10"><QuoteBuilder rate={rate} /></div>
      </div>
      <Footer />
    </main>
  );
}
