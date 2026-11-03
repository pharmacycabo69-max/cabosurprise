import Link from "next/link";
import { wellnessPages } from "@/config/wellness";
import Reveal from "./Reveal";

export default function WellnessSection() {
  return (
    <section className="section !pt-10 md:!pt-16">
      <Reveal>
        <p className="eyebrow">Also in Cabo</p>
        <h2 className="h2 max-w-3xl">Wellness and pharmacy, <em className="text-terracotta">at your door.</em></h2>
      </Reveal>
      <div className="mt-12 border-t border-ink/15">
        {Object.values(wellnessPages).map((w, i) => (
          <Reveal key={w.slug} delay={i * 0.06}>
            <Link href={w.path} className="group flex items-center justify-between gap-6 border-b border-ink/15 py-7 md:py-9">
              <div>
                <h3 className="font-serif text-3xl leading-tight transition group-hover:text-terracotta md:text-5xl">{w.cardTitle}</h3>
                <p className="mt-2 text-ink/60">{w.cardText}</p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/25 text-xl transition group-hover:border-terracotta group-hover:bg-terracotta group-hover:text-white md:h-14 md:w-14">→</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
