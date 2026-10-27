import Link from "next/link";

const links = [
  { href: "/proposals/", label: "Proposals" },
  { href: "/birthday/", label: "Birthday" },
  { href: "/bachelorette/", label: "Bachelorette" },
  { href: "/honeymoon/", label: "Honeymoon" },
  { href: "/packages/", label: "Packages" },
];

export default function Header({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`absolute inset-x-0 top-0 z-30 ${dark ? "text-white" : "text-ink"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Link href="/" className="font-serif text-xl">Cabo Surprise</Link>
        <nav className="flex gap-5 text-sm">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} className={`hover:underline ${i > 0 && l.href !== "/packages/" ? "hidden lg:inline" : i === 0 ? "" : "hidden sm:inline"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
