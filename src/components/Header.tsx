import Link from "next/link";

import { navLinks as links } from "@/config/nav";

export default function Header({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`absolute inset-x-0 top-0 z-30 ${dark ? "text-white" : "text-ink"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Link href="/" className="font-serif text-2xl font-light tracking-wide">Cabo Surprise</Link>
        <nav className="flex gap-6 text-[11px] font-medium uppercase tracking-[0.2em] xl:gap-8 xl:tracking-[0.22em]">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} className={`whitespace-nowrap transition hover:text-champagne ${i === 0 ? "" : "hidden lg:inline"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
