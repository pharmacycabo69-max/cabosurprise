import Hero from "./Hero";
import Steps from "./Steps";
import FaqList from "./FaqList";
import FinalCta from "./FinalCta";
import Footer from "./Footer";
import Reveal from "./Reveal";
import WhatsAppLink from "./WhatsAppLink";
import type { WellnessPage } from "@/config/wellness";

export default function WellnessPageView({ s }: { s: WellnessPage }) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero title={s.h1} subtitle={s.heroSubtitle} cta={s.cta} message={s.message} label={`${s.slug}_hero`} photo={s.heroPhoto} />

      <section className="section">
        <Reveal>
          <p className="max-w-2xl text-lg text-ink/75 md:text-xl">{s.intro}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {s.offerings.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-white p-7 shadow-sm">
                <h3 className="font-serif text-2xl">{o.title}</h3>
                <p className="mt-2 text-ink/70">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <WhatsAppLink message={s.message} label={`${s.slug}_quote`} className="btn-primary">Message us for pricing</WhatsAppLink>
        </div>
      </section>

      <Steps items={s.steps} />

      <section className="section">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2 mb-8">Good questions.</h2>
          <FaqList items={s.faqs} />
          <p className="mt-8 max-w-3xl text-sm text-ink/60">{s.disclaimer}</p>
        </Reveal>
      </section>

      <FinalCta
        title="Need something while you are in Cabo?"
        text="Send us a message on WhatsApp and we will reply with availability and pricing."
        message={s.message}
        label={`${s.slug}_final`}
      />
      <Footer />
    </main>
  );
}
