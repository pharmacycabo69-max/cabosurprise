import Link from "next/link";
import DepositForm from "@/components/DepositForm";
import Footer from "@/components/Footer";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pay your deposit | Cabo Surprise",
  description: "Secure your date with a deposit for your Cabo Surprise setup in Los Cabos.",
  path: "/deposit/",
  og: "og.jpg",
  index: false,
});

export default function DepositPage() {
  return (
    <main>
      <div className="mx-auto max-w-2xl px-5 py-16">
        <Link href="/" className="text-sm text-terracotta hover:underline">← Back home</Link>
        <h1 className="mt-6 font-serif text-4xl md:text-5xl">Secure your date.</h1>
        <p className="mt-3 text-ink/70">Pay your deposit by card in a minute. We confirm everything with you on WhatsApp right after.</p>
        <div className="mt-10"><DepositForm /></div>
      </div>
      <Footer />
    </main>
  );
}
