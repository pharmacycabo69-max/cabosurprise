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
        <ol className={`mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="list-none border-t border-white/20 pt-6">
                <span
                  className="block font-serif text-7xl italic leading-none text-transparent md:text-8xl"
                  style={{ WebkitTextStroke: "1px #E9D5B0" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-serif text-2xl leading-tight">{s.title}</h3>
                <p className="mt-2 text-cream/65">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
