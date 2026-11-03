"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import WhatsAppLink from "./WhatsAppLink";

const links = [
  { href: "/proposals/", label: "Proposals" },
  { href: "/birthday/", label: "Birthday" },
  { href: "/bachelorette/", label: "Bachelorette" },
  { href: "/honeymoon/", label: "Honeymoon" },
  { href: "/packages/", label: "Packages" },
];

// Appears after the hero so the menu is always one scroll away.
export default function StickyNav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-lg transition duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="font-serif text-xl" tabIndex={show ? 0 : -1}>Cabo Surprise</Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink/75 transition hover:text-terracotta" tabIndex={show ? 0 : -1}>{l.label}</Link>
          ))}
        </nav>
        <WhatsAppLink message="Hi, I'd like to plan a surprise in Cabo on [date]." label="sticky_nav" className="btn-primary !px-5 !py-2.5 text-sm">
          Plan my surprise
        </WhatsAppLink>
      </div>
    </header>
  );
}
