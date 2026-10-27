import { gallery, testimonials } from "@/config/site";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Proof() {
  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Happy faces</p>
        <h2 className="h2 max-w-2xl">Moments we’ve helped create.</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <figure className="h-full rounded-3xl bg-white p-7 shadow-sm">
              <div className="text-terracotta" aria-label="5 stars">★★★★★</div>
              <blockquote className="mt-3 font-serif text-lg leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-ink/60">{t.name} · {t.where}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {gallery.map((g, i) => (
          <Reveal key={g} delay={(i % 4) * 0.05}>
            <Photo src={g} alt={`Cabo Surprise gallery photo ${i + 1}`} className="aspect-square rounded-2xl" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
