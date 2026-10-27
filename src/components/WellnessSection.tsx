import Link from "next/link";
import { wellnessPages } from "@/config/wellness";
import Reveal from "./Reveal";

export default function WellnessSection() {
  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Also in Cabo</p>
        <h2 className="h2 max-w-2xl">Wellness and pharmacy, at your door.</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {Object.values(wellnessPages).map((w, i) => (
          <Reveal key={w.slug} delay={i * 0.08}>
            <Link href={w.path} className="block h-full rounded-3xl bg-white p-7 shadow-sm transition hover:shadow-md">
              <h3 className="font-serif text-2xl">{w.cardTitle}</h3>
              <p className="mt-2 text-ink/70">{w.cardText}</p>
              <span className="mt-5 inline-block text-sm font-medium text-terracotta">Learn more →</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
