import Link from "next/link";
import Hero from "./Hero";
import Gallery from "./Gallery";
import Steps from "./Steps";
import FaqList from "./FaqList";
import FinalCta from "./FinalCta";
import Footer from "./Footer";
import Reveal from "./Reveal";
import PackageCard from "./PackageCard";
import DepositLink from "./DepositLink";
import WhatsAppLink from "./WhatsAppLink";
import { commonFaqs, featuredPackages, serviceSteps } from "@/config/site";
import { payableItems } from "@/config/payments";
import type { Product } from "@/config/products";

export default function ProductPage({ product: p }: { product: Product }) {
  const pkg = featuredPackages.find((x) => x.id === p.packageId)!;
  const deposit = payableItems.find((x) => x.id === pkg.id)?.deposit;
  const faqs = [...p.faqExtra, ...commonFaqs];
  const related = featuredPackages.filter((x) => x.id !== pkg.id).slice(0, 3);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero title={p.h1} subtitle={p.heroSubtitle} cta={p.cta} message={p.message} label={`${p.slug}_hero`} photos={p.heroPhotos} secondary={{ label: "See what's included", href: "#offer" }} />

      <section id="offer" className="section scroll-mt-4">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <p className="max-w-2xl font-serif text-2xl leading-snug md:text-4xl md:leading-[1.2]">{p.intro}</p>
            <h2 className="eyebrow mt-12">What&apos;s included</h2>
            <ul className="space-y-2 text-lg">
              {pkg.includes.map((i) => (
                <li key={i} className="flex gap-3"><span className="text-terracotta">✦</span>{i}</li>
              ))}
            </ul>
            <h2 className="eyebrow mt-12">Good to know</h2>
            <ul className="space-y-3 text-ink/75">
              {p.goodToKnow.map((g) => (
                <li key={g} className="flex gap-3"><span className="text-terracotta">—</span>{g}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="rounded-[2rem] bg-white p-7 shadow-[0_20px_50px_-25px_rgba(43,36,32,0.4)] lg:sticky lg:top-24">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-terracotta">From</p>
              <p className="mt-1 font-serif text-5xl">${pkg.from.toLocaleString("en-US")} <span className="text-lg text-ink/55">USD</span></p>
              <p className="mt-1 text-sm text-ink/60">{pkg.name}</p>
              <div className="mt-6 space-y-3">
                <DepositLink item={pkg.id} className="btn-primary w-full">
                  {pkg.quoted ? "Get quote & pay deposit" : `Pay deposit${deposit ? ` $${deposit.toLocaleString("en-US")}` : ""}`}
                </DepositLink>
                <WhatsAppLink message={p.message} label={`${p.slug}_offer`} packageName={pkg.name} className="btn-ghost w-full">Ask on WhatsApp</WhatsAppLink>
              </div>
              <p className="mt-4 text-xs text-ink/55">Hold your date with a deposit. We confirm availability and details on WhatsApp.</p>
              {p.quote && (
                <div className="mt-6 border-t border-ink/10 pt-5 text-sm">
                  <p className="text-ink/70">{p.quote.text}</p>
                  <Link href="/quote/" className="mt-2 inline-block font-medium text-terracotta underline">{p.quote.label} →</Link>
                </div>
              )}
            </aside>
          </Reveal>
        </div>
      </section>

      <Gallery title={p.galleryTitle} files={p.gallery} alt={`${pkg.name} in Cabo`} />
      <Steps items={serviceSteps} />

      <section className="section">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2 mb-10">Good questions.</h2>
          <FaqList items={faqs} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 md:pb-32">
        <Reveal>
          <p className="eyebrow">More to explore</p>
          <h2 className="h2 mb-10">You might also like.</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {related.map((r) => <PackageCard key={r.id} p={r} />)}
        </div>
      </section>

      <FinalCta message={p.message} label={`${p.slug}_final`} />
      <Footer />
    </main>
  );
}
