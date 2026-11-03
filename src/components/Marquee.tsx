export default function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((t, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-8 font-serif text-2xl italic md:text-3xl">{t}</span>
          <span className="text-blush">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden py-5 ${className}`} role="presentation">
      <div className="flex w-max animate-marquee">{row}{row}{row}{row}</div>
    </div>
  );
}
