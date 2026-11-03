"use client";
import Link from "next/link";
import { site } from "@/config/site";
import { payableItems } from "@/config/payments";
import Photo from "./Photo";
import Reveal from "./Reveal";
import DepositLink from "./DepositLink";
import InstagramLink from "./InstagramLink";

const wedding = "ranch-wedding-reception";

// Rancho McCoy presented as an event venue. Facts come from the venue brief and price list.
export default function VenueBanner() {
  const from = payableItems.find((p) => p.id === wedding)?.from ?? 9500;
  const facts = [
    { k: "Up to 220", v: "guests" },
    { k: "6 hours", v: "of exclusive use" },
    { k: "2 cabins", v: "private, for up to 6 guests" },
    { k: `From $${from.toLocaleString("en-US")}`, v: "USD per event" },
  ];
  return (
    <section aria-label="Rancho McCoy event venue" className="relative isolate overflow-hidden bg-ink text-white">
      <Photo src="hero/proposals-3.jpg" alt="Rancho McCoy event venue in Cabo San Lucas" className="absolute inset-0" sizes="100vw" position="50% 55%" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-24 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16">
        <Reveal>
          <p className="mb-6 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.32em] text-champagne before:h-px before:w-12 before:bg-champagne/70">The venue</p>
          <h2 className="font-serif text-4xl font-light leading-[1.04] tracking-tight md:text-6xl">
            Rancho McCoy, your private <em className="text-champagne">event venue</em> in Cabo San Lucas.
          </h2>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/85">
            Exclusive use of the ranch for weddings and private celebrations, with furniture, decoration, dinner, DJ, lighting and service staff.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <DepositLink item={wedding} className="btn-light">Request a custom quote</DepositLink>
            <Link href="/ranch-wedding-reception/" className="inline-flex items-center gap-2 border-b border-white/60 pb-0.5 text-[12px] font-medium uppercase tracking-[0.2em] transition hover:border-champagne hover:text-champagne">
              Explore the venue <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/65">
            Follow the ranch on <InstagramLink className="text-white underline underline-offset-4 transition hover:text-champagne" label={`@${site.instagram.replace(/\/$/, "").split("/").pop()}`} />
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-px border border-white/20 bg-white/20 backdrop-blur-sm">
            {facts.map((f) => (
              <div key={f.k} className="bg-ink/55 p-5 md:p-6">
                <dt className="font-serif text-2xl font-light md:text-3xl">{f.k}</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/65">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
