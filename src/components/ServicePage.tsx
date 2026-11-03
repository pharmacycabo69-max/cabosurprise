import Hero from "./Hero";
import Experiences from "./Experiences";
import VenueBanner from "./VenueBanner";
import PackageCard from "./PackageCard";
import Gallery from "./Gallery";
import Steps from "./Steps";
import FaqList from "./FaqList";
import FinalCta from "./FinalCta";
import Footer from "./Footer";
import Reveal from "./Reveal";
import { commonFaqs, featuredPackages, packages, serviceSteps } from "@/config/site";
import type { Service } from "@/config/services";

export default function ServicePage({ s }: { s: Service }) {
  const list = s.packageIds.map((id) => [...featuredPackages, ...packages].find((p) => p.id === id)!).filter(Boolean);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: commonFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero title={s.h1} subtitle={s.heroSubtitle} cta={s.cta} message={s.message} label={`${s.slug}_hero`} photos={s.heroPhotos ?? [s.heroPhoto]} secondary={{ label: "See packages", href: "#packages" }} />

      {s.slug === "packages" ? (
        <>
          <VenueBanner />
          <section className="section !pb-14 md:!pb-20">
            <Reveal>
              <p className="max-w-2xl font-serif text-2xl font-light leading-snug md:text-4xl md:leading-[1.2]">{s.intro}</p>
            </Reveal>
          </section>
          <Experiences intro={false} />
        </>
      ) : (
      <section id="packages" className="section scroll-mt-4">
          <Reveal>
            <p className="max-w-2xl text-base font-light text-ink/75 md:text-xl">{s.intro}</p>
          </Reveal>
          <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {list.map((p) => (
              <div key={p.id} className="w-[74%] shrink-0 snap-start sm:w-auto"><PackageCard p={p} linked={false} /></div>
            ))}
          </div>
          {s.note && <p className="mt-6 rounded-sm bg-champagne/30 p-4 text-sm">{s.note}</p>}
        </section>
      )}

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
