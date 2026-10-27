export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl">
            {f.q}
            <span className="text-terracotta transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-2xl text-ink/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
