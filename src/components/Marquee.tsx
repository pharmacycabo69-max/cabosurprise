export default function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((t, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-10 font-serif text-xl font-light italic md:text-2xl">{t}</span>
          <span className="text-champagne/70">◆</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden py-6 ${className}`} role="presentation">
      <div className="flex w-max animate-marquee">{row}{row}{row}{row}</div>
    </div>
  );
}
