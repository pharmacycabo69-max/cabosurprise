import Reveal from "./Reveal";

export default function Statement() {
  return (
    <section className="section !pb-10 md:!pb-16">
      <Reveal>
        <p className="eyebrow">Cabo Surprise</p>
        <p className="max-w-5xl font-serif text-3xl leading-[1.18] tracking-tight md:text-6xl md:leading-[1.1]">
          We set the scene <em className="text-terracotta">before you walk in</em>: flowers, cakes, balloons, candlelight and live mariachi, at your villa, hotel, yacht or a private ranch at sunset.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <dl className="mt-12 grid gap-6 border-t border-ink/15 pt-8 text-sm sm:grid-cols-3">
          {[
            ["Where", "Los Cabos, Mexico"],
            ["When", "Ready before you arrive"],
            ["How", "Plan it on WhatsApp"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[11px] uppercase tracking-[0.25em] text-ink/50">{k}</dt>
              <dd className="mt-1 font-serif text-xl">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
