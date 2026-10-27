import Link from "next/link";
import Footer from "./Footer";

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <main>
      <div className="mx-auto max-w-3xl px-5 py-16">
        <Link href="/" className="text-sm text-terracotta hover:underline">← Back home</Link>
        <h1 className="mt-6 font-serif text-4xl md:text-5xl">{title}</h1>
        <p className="mt-2 text-sm text-ink/50">Last updated: {updated}</p>
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="mt-10 font-serif text-2xl">{s.h}</h2>
            {s.p.map((t) => (
              <p key={t} className="mt-3 text-ink/75">{t}</p>
            ))}
          </section>
        ))}
      </div>
      <Footer />
    </main>
  );
}
