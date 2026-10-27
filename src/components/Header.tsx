import Link from "next/link";

export default function Header({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`absolute inset-x-0 top-0 z-30 ${dark ? "text-white" : "text-ink"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Link href="/" className="font-serif text-xl">Cabo Surprise</Link>
        <nav className="flex gap-5 text-sm">
          <Link href="/#packages" className="hidden hover:underline sm:inline">Packages</Link>
          <Link href="/proposals" className="hover:underline">Proposals</Link>
        </nav>
      </div>
    </header>
  );
}
