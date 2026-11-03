import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import Marquee from "@/components/Marquee";
import VenueBanner from "@/components/VenueBanner";
import Statement from "@/components/Statement";
import Venues from "@/components/Venues";
import AddOns from "@/components/AddOns";
import Steps from "@/components/Steps";
import Proof from "@/components/Proof";
import WellnessSection from "@/components/WellnessSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import { site, steps } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Private Experiences & Ranch Weddings in Los Cabos | Cabo Surprise",
  description:
    "Private experiences and exclusive celebrations in Los Cabos: ranch weddings, chef-led dinners, horseback experiences and more, designed around you.",
  path: "/",
  og: "og.jpg",
  keywords: ["proposal in cabo", "cabo birthday surprise", "bachelorette cabo decor", "cabo room decoration"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: `${site.url}/`,
  description: site.description,
  image: `${site.url}/photos/og.jpg`,
  telephone: "+526242261023",
  areaServed: { "@type": "AdministrativeArea", name: "Los Cabos, Baja California Sur, Mexico" },
  priceRange: "$425–$9,500",
  sameAs: [site.instagram],
};

const venueLd = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Rancho McCoy",
  url: `${site.url}/ranch-wedding-reception/`,
  description: "A private ranch event venue in Cabo San Lucas with exclusive use for weddings and private celebrations.",
  maximumAttendeeCapacity: 220,
  address: { "@type": "PostalAddress", addressLocality: "Cabo San Lucas", addressRegion: "BCS", addressCountry: "MX" },
  sameAs: [site.instagram],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(venueLd) }} />
      <Hero
        title="Private experiences in Los Cabos."
        subtitle="Ranch weddings, chef-led dinners and horseback experiences, designed around you."
        cta="Request a custom quote"
        message="Hi, I'd like to plan a private experience in Cabo on [date]."
        label="hero"
        quote
        photos={[{ src: "hero.jpg", position: "60% 40%" }, { src: "hero/home-2.jpg", position: "55% 50%" }, "hero/home-3.jpg", { src: "hero/home-4.jpg", position: "45% 55%" }]}
        secondary={{ label: "See experiences", href: "#packages" }}
      />
      <VenueBanner />
      <Marquee className="bg-terracotta text-white" items={["Ranch weddings", "Private dinners", "Horseback experiences", "Beach photoshoots", "Ranch cabin stays", "Bachelorette parties"]} />
      <Statement />
      <Experiences />
      <div className="hidden md:block">
        <Venues />
        <AddOns />
      </div>
      <Steps items={steps} />
      <Proof />
      <WellnessSection />
      <FinalCta quote />
      <Footer />
    </main>
  );
}
