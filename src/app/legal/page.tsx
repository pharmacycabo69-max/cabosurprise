import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Legal",
  description: "Terms, cancellation policy and privacy for Cabo Surprise.",
  robots: { index: false },
};

export default function LegalPage() {
  return (
    <main>
      <div className="mx-auto max-w-3xl px-5 py-16">
        <Link href="/" className="text-sm text-terracotta hover:underline">← Back home</Link>
        <h1 className="mt-6 font-serif text-4xl md:text-5xl">Legal</h1>
        <p className="mt-2 text-sm text-ink/50">
          PLACEHOLDER TEXT: have this reviewed by a lawyer before launch.
        </p>

        <h2 className="mt-10 font-serif text-2xl">Terms of service</h2>
        <p className="mt-3 text-ink/75">
          Prices are listed in USD and shown as starting prices. Final quotes depend on date, location, guest count and selected add-ons. A booking is confirmed once the deposit is received.
        </p>

        <h2 className="mt-10 font-serif text-2xl">Cancellation &amp; changes</h2>
        <p className="mt-3 text-ink/75">
          Deposit and cancellation terms are shared in your written quote. Date changes are subject to availability. Weather-related changes are rescheduled whenever possible.
        </p>

        <h2 className="mt-10 font-serif text-2xl">Privacy</h2>
        <p className="mt-3 text-ink/75">
          This site has no accounts or forms. When you contact us on WhatsApp, we use your messages only to plan your event. We use Meta Pixel and Google Ads tags to measure advertising performance.
        </p>

        <h2 className="mt-10 font-serif text-2xl">Contact</h2>
        <p className="mt-3 text-ink/75">{site.email}</p>
      </div>
      <Footer />
    </main>
  );
}
