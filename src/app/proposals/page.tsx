import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import Steps from "@/components/Steps";
import FaqList from "@/components/FaqList";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import WhatsAppLink from "@/components/WhatsAppLink";
import { proposalAddOns, proposalFaqs, proposals, secretSteps } from "@/config/site";

export const metadata: Metadata = {
  title: "Proposal in Cabo | Villa, Beach & Ranch Proposals",
  description:
    "Plan a proposal in Cabo: villa, sunset beach or private ranch with horses & mariachi. Fully set up, discreetly photographed and kept secret. From $1,190 USD.",
  alternates: { canonical: "/proposals" },
  keywords: ["proposal in cabo", "cabo proposal planner", "beach proposal los cabos", "ranch proposal cabo"],
  openGraph: { title: "Say yes in Cabo.", url: "/proposals", images: ["/photos/og-proposals.jpg"] },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: proposalFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ProposalsPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero
        title="Say yes in Cabo."
        subtitle="Villa, beach or private ranch. We build the moment, keep the secret and capture every second."
        cta="Plan my proposal"
        message="Hi Cabo Surprise! I'm planning a proposal in Cabo. Date: ___ . Preferred setting: ___ ."
        label="proposals_hero"
        photo="proposals-hero.jpg"
      />

      <section className="section">
        <Reveal>
          <p className="eyebrow">Three ways to ask</p>
          <h2 className="h2 max-w-2xl">Choose your setting.</h2>
        </Reveal>
        <div className="mt-12 space-y-16 md:space-y-24">
          {proposals.map((p, i) => (
            <Reveal key={p.id}>
              <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <Photo
                  src={p.photo}
                  alt={`${p.name} in Los Cabos`}
                  className={`aspect-[4/5] rounded-3xl ${i % 2 ? "md:order-2" : ""}`}
                />
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl">{p.name}</h3>
                  <p className="mt-2 font-serif text-2xl text-terracotta">From ${p.from.toLocaleString("en-US")}</p>
                  <p className="mt-4 text-lg text-ink/75">{p.intro}</p>
                  <h4 className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-ink/50">What’s included</h4>
                  <ul className="mt-3 space-y-2">
                    {p.includes.map((x) => (
                      <li key={x} className="flex gap-2"><span className="text-terracotta">✦</span>{x}</li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-2xl bg-blush/30 p-4 text-sm">
                    <strong className="font-medium">Add-on:</strong> hidden photographer &amp; video, so you never miss her reaction.
                  </div>
                  <WhatsAppLink
                    label={`proposal_${p.id}`}
                    message={`Hi Cabo Surprise! I'd like details on the "${p.name}" (from $${p.from} USD). Date: ___ .`}
                    className="btn-primary mt-7"
                  >
                    Ask about this proposal
                  </WhatsAppLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-blush/25">
        <div className="section">
          <Reveal>
            <p className="eyebrow">Add-on</p>
            <h2 className="h2 max-w-2xl">The hidden photographer.</h2>
            <p className="mt-4 max-w-2xl text-lg text-ink/70">
              Proposals happen once. Our discreet photographer and videographer blend in and capture the build-up, the question and the happy tears.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {proposalAddOns.map((a) => (
              <Reveal key={a.name}>
                <div className="rounded-3xl bg-white p-7">
                  <h3 className="font-serif text-2xl">{a.name}</h3>
                  <p className="mt-2 text-ink/70">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Steps items={secretSteps.slice(0, 4)} title="How we keep it a secret" />
      <section className="mx-auto max-w-6xl px-5 pt-10">
        <p className="text-ink/70">
          <strong className="font-medium text-ink">{secretSteps[4].title}.</strong> {secretSteps[4].text}
        </p>
      </section>

      <section className="section">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2 mb-8">Good questions.</h2>
          <FaqList items={proposalFaqs} />
        </Reveal>
      </section>

      <FinalCta
        title="Ready to ask the question?"
        text="Tell us the date and the setting you love. We’ll take it from there."
        message="Hi Cabo Surprise! I'm planning a proposal in Cabo. Date: ___ . Preferred setting: ___ ."
        label="proposals_final"
      />
      <Footer />
    </main>
  );
}
