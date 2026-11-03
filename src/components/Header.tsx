import Link from "next/link";

const links = [
  { href: "/proposals/", label: "Proposals" },
  { href: "/ranch-wedding-reception/", label: "Weddings" },
  { href: "/private-anniversary-dinner/", label: "Dinners" },
  { href: "/packages/", label: "Experiences" },
];

export default function Header({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`absolute inset-x-0 top-0 z-30 ${dark ? "text-white" : "text-ink"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Link href="/" className="font-serif text-2xl font-light tracking-wide">Cabo Surprise</Link>
        <nav className="flex gap-8 text-[11px] font-medium uppercase tracking-[0.22em]">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} className={`transition hover:text-champagne ${i === 0 ? "" : "hidden md:inline"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
