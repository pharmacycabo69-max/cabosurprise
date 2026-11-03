"use client";
import { useState } from "react";

// On phones the section is a tap-to-open row (less text at once); from md up it is always open, as a normal heading.
export default function MobileFold({ title, children, defaultOpen = false, className = "" }: { title: string; children: React.ReactNode; defaultOpen?: boolean; className?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={className}>
      <h2 className="eyebrow mt-12 hidden md:flex">{title}</h2>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between border-t border-ink/15 py-4 text-left md:hidden"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-terracotta">{title}</span>
        <span aria-hidden className="text-lg text-ink/50">{open ? "−" : "+"}</span>
      </button>
      <div className={`${open ? "block" : "hidden"} pb-5 md:block md:pb-0`}>{children}</div>
    </div>
  );
}
