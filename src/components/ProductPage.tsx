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
import MobileFold from "./MobileFold";
import LocationMap from "./LocationMap";
import { faqsFor, featuredPackages, policy, serviceSteps } from "@/config/site";
import { payableItems } from "@/config/payments";
import type { Product } from "@/config/products";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function ProductPage({ product: p }: { product: Product }) {
  const pkg = featuredPackages.find((x) => x.id === p.packageId)!;
  const pay = payableItems.find((x) => x.id === pkg.id)!;
  const percent = pay.depositPercent;
  const faqs = [...p.faqExtra, ...faqsFor(percent)];
  const related = featuredPackages.filter((x) => x.id !== pkg.id).slice(0, 3);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const transportMessage = `Hi, I'd like to add private transportation to ${pkg.name} in Cabo. Pickup: [hotel, villa or residence], passengers: [number].`;
  const policies = [
    "Prices are published in USD.",
    `A ${percent}% deposit starts your booking. We then confirm availability and your final price, and send your confirmation with the total.`,
    `Cancel more than ${policy.refundDays} days before your date and your payment is refunded.`,
    "All services are subject to availability.",
    "Packages are customized to your needs. Destination rates may apply, and are confirmed in your custom quote.",
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero title={p.h1} subtitle={p.heroSubtitle} cta={p.cta} message={p.message} label={`${p.slug}_hero`} photos={p.heroPhotos} secondary={{ label: "See what's included", href: "#offer" }} />

      <section id="offer" className="section scroll-mt-4">
        <div className="grid gap-y-10 lg:grid-cols-[1.3fr_1fr] lg:gap-x-16">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <p className="max-w-2xl font-serif text-[1.3rem] font-light leading-snug md:text-4xl md:leading-[1.2]">{p.intro}</p>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <aside className="rounded-sm bg-white p-6 shadow-[0_20px_50px_-25px_rgba(43,36,32,0.4)] md:p-7 lg:sticky lg:top-24">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-terracotta">From</p>
              <p className="mt-1 font-serif text-5xl font-light">{usd(pkg.from)} <span className="text-lg text-ink/55">USD</span></p>
              <p className="mt-1 text-sm text-ink/60">{pkg.unit}</p>
              <div className="mt-6 space-y-3">
                <DepositLink item={pkg.id} className="btn-primary w-full">
                  {pay.payOnline ? (pay.stay ? "Pay deposit" : `Pay deposit ${usd(pay.deposit)}`) : "Request a Custom Quote"}
                </DepositLink>
                <WhatsAppLink message={p.message} label={`${p.slug}_offer`} packageName={pkg.name} className="btn-ghost w-full">Ask on WhatsApp</WhatsAppLink>
              </div>
              <p className="mt-4 text-xs text-ink/55">
                {pay.payOnline ? "Pay your deposit to start your booking. We then confirm availability and your final price." : "We confirm availability and your custom quote on WhatsApp."}
              </p>
            </aside>
          </Reveal>

          <div className="lg:col-start-1 lg:row-start-2">
            <MobileFold title="What's included" defaultOpen>
              <ul className="space-y-2 text-base md:text-lg">
                {pkg.includes.map((i) => (
                  <li key={i} className="flex gap-3"><span className="text-terracotta">✦</span>{i}</li>
                ))}
              </ul>
              {p.notice && <p className="mt-5 rounded-sm bg-champagne/30 p-4 text-sm">{p.notice}</p>}
            </MobileFold>

            {pay.addons.length > 0 && (
              <MobileFold title="Available add-ons">
                <ul className="flex flex-wrap gap-2">
                  {pay.addons.map((a) => (
                    <li key={a.id} className="rounded-sm border border-ink/20 px-4 py-2 text-sm" title={a.note}>{a.name}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-ink/60">Add them when you book. Quoted separately and confirmed on WhatsApp.</p>
              </MobileFold>
            )}

            {p.options && (
              <MobileFold title={p.optionsTitle ?? "Options"}>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {p.options.map((o) => (
                    <li key={o.title + (o.price ?? "")} className="rounded-sm border border-ink/15 bg-white/60 p-4 md:p-5">
                      <p className="font-serif text-lg font-light md:text-xl">{o.title}</p>
                      {o.price && <p className="mt-1 text-sm font-medium text-terracotta">{o.price}</p>}
                      {o.text && <p className="mt-2 text-sm text-ink/70">{o.text}</p>}
                    </li>
                  ))}
                </ul>
              </MobileFold>
            )}

            <MobileFold title="Good to know">
              <ul className="space-y-3 text-ink/75">
                {p.goodToKnow.map((g) => (
                  <li key={g} className="flex gap-3"><span className="text-terracotta">—</span>{g}</li>
                ))}
              </ul>
            </MobileFold>
          </div>
        </div>
      </section>

      {/* Transportation: available on every product */}
      <section className="bg-[#F4E9DD]">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-20">
          <Reveal>
            <p className="eyebrow">Transportation</p>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">Add private transportation.</h2>
            <p className="mt-3 max-w-2xl text-ink/70">
              Arrive in comfort from your hotel, villa or residence in Los Cabos. Priced separately, according to your pickup location, number of passengers and type of vehicle.
            </p>
          </Reveal>
          <WhatsAppLink message={transportMessage} label={`${p.slug}_transport`} className="btn-ghost justify-self-start md:justify-self-end">Ask about transportation</WhatsAppLink>
        </div>
      </section>

      <section className="section !pb-6 !pt-10 md:!pt-24">
        <MobileFold title="Booking & payment">
          <ul className="grid gap-3 text-ink/75 md:grid-cols-2">
            {policies.map((x) => (
              <li key={x} className="flex gap-3"><span className="text-terracotta">—</span>{x}</li>
            ))}
          </ul>
        </MobileFold>
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
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {related.map((r) => <div key={r.id} className="w-[74%] shrink-0 snap-start sm:w-auto"><PackageCard p={r} /></div>)}
        </div>
      </section>

      {p.showMap && <LocationMap />}
      <FinalCta message={p.message} label={`${p.slug}_final`} />
      <Footer />
    </main>
  );
}
