import Hero from "./Hero";
import PackageCard from "./PackageCard";
import Gallery from "./Gallery";
import Steps from "./Steps";
import FaqList from "./FaqList";
import FinalCta from "./FinalCta";
import Footer from "./Footer";
import Reveal from "./Reveal";
import { commonFaqs, packages, serviceSteps } from "@/config/site";
import type { Service } from "@/config/services";

export default function ServicePage({ s }: { s: Service }) {
  const list = s.packageIds.map((id) => packages.find((p) => p.id === id)!).filter(Boolean);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: commonFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero title={s.h1} subtitle={s.heroSubtitle} cta={s.cta} message={s.message} label={`${s.slug}_hero`} photo={s.heroPhoto} />

      <section className="section">
        <Reveal>
          <p className="max-w-2xl text-lg text-ink/75 md:text-xl">{s.intro}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PackageCard key={p.id} p={p} linked={false} />
          ))}
        </div>
        {s.note && <p className="mt-6 rounded-2xl bg-blush/30 p-4 text-sm">{s.note}</p>}
      </section>

      <Gallery title={s.galleryTitle} files={s.gallery} alt={`${s.slug} setup in Cabo`} />
      <Steps items={serviceSteps} />

      <section className="section">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2 mb-8">Good questions.</h2>
          <FaqList items={commonFaqs} />
        </Reveal>
      </section>

      <FinalCta message={s.message} label={`${s.slug}_final`} />
      <Footer />
    </main>
  );
}
