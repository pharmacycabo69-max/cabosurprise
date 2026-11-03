import { venueLocation as v } from "@/config/site";
import Reveal from "./Reveal";
import WhatsAppLink from "./WhatsAppLink";

// "Find us": the venue on a map, directions, and a note about access. Keyless Google Maps embed, loaded lazily.
export default function LocationMap() {
  const embed = `https://maps.google.com/maps?q=${v.lat},${v.lng}&hl=en&z=14&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}`;
  return (
    <section aria-label="Rancho McCoy location" className="bg-[#F4E9DD]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:py-28 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow">Find us</p>
          <h2 className="font-serif text-3xl font-light leading-[1.08] tracking-tight md:text-5xl">
            {v.name}, <em className="text-terracotta">Cabo San Lucas.</em>
          </h2>
          <p className="mt-5 max-w-md text-base font-light leading-relaxed text-ink/75 md:text-lg">
            The last stretch of the road is a short dirt track. We confirm access, timing and transportation for your group when you book.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={directions} target="_blank" rel="noopener noreferrer" className="btn-primary">Get directions</a>
            <WhatsAppLink
              message="Hi, I'd like to ask about getting to Rancho McCoy and private transportation for my group."
              label="location_transport"
              className="btn-link"
            >
              Ask about transportation
            </WhatsAppLink>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-ink/10 shadow-[0_20px_50px_-25px_rgba(43,36,32,0.45)] md:aspect-[16/10]">
            <iframe
              title="Map of Rancho McCoy in Cabo San Lucas"
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0 [filter:grayscale(0.3)_contrast(1.05)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
