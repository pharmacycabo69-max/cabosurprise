import Reveal from "./Reveal";

export default function Steps({
  items,
  title = "How it works",
  heading = "Simple for you. Seamless on the day.",
}: {
  items: { title: string; text: string }[];
  title?: string;
  heading?: string;
}) {
  return (
    <section className="bg-ink text-cream">
      <div className="section">
        <Reveal>
          <p className="eyebrow !text-champagne before:!bg-champagne">{title}</p>
          <h2 className="h2 max-w-3xl">{heading}</h2>
        </Reveal>
        <ol className={`mt-10 grid gap-x-8 gap-y-6 md:mt-16 md:gap-y-12 sm:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="flex list-none items-baseline gap-5 border-t border-white/20 pt-5 sm:block sm:pt-6">
                <span
                  className="block shrink-0 font-serif text-4xl italic leading-none text-transparent sm:text-7xl md:text-8xl"
                  style={{ WebkitTextStroke: "1px #E9D5B0" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-xl leading-tight sm:mt-6 sm:text-2xl">{s.title}</h3>
                  <p className="mt-1 text-sm text-cream/65 sm:mt-2 sm:text-base">{s.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
