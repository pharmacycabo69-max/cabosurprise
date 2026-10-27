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
          <p className="eyebrow !text-blush">{title}</p>
          <h2 className="h2 max-w-2xl">{heading}</h2>
        </Reveal>
        <ol className={`mt-12 grid gap-8 sm:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="list-none">
                <span className="font-serif text-5xl text-terracotta">{i + 1}</span>
                <h3 className="mt-3 font-serif text-xl">{s.title}</h3>
                <p className="mt-2 text-cream/70">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
