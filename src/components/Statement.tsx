import Reveal from "./Reveal";

export default function Statement() {
  return (
    <section className="section !pb-10 md:!pb-16">
      <Reveal>
        <p className="eyebrow">Cabo Surprise</p>
        <p className="max-w-5xl font-serif text-3xl leading-[1.18] tracking-tight md:text-6xl md:leading-[1.1]">
          We design private experiences in Los Cabos, from a chef's dinner for two to an <em className="text-terracotta">exclusive ranch wedding</em>. Every detail is arranged before you arrive.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <dl className="mt-12 grid gap-6 border-t border-ink/15 pt-8 text-sm sm:grid-cols-3">
          {[
            ["Where", "Los Cabos, Mexico"],
            ["How", "Designed around you"],
            ["Start", "Request a custom quote"],
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
