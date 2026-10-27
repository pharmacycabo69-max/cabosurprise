import Link from "next/link";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name} · Los Cabos, Mexico</p>
        <div className="flex gap-5">
          <Link href="/proposals" className="hover:underline">Proposals</Link>
          <Link href="/legal" className="hover:underline">Legal</Link>
          <a href={site.instagram} className="hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
