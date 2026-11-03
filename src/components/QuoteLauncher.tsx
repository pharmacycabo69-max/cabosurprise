"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { featuredPackages } from "@/config/site";
import DepositModal from "./DepositModal";
import WhatsAppLink from "./WhatsAppLink";

// "Request a quote" button: first choose the experience, then the date, guests and WhatsApp flow.
export default function QuoteLauncher({ className, children, source = "quote_launcher" }: { className?: string; children: React.ReactNode; source?: string }) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<string | null>(null);
  const close = () => {
    setOpen(false);
    setItem(null);
  };

  return (
    <>
      <a
        href="/packages/"
        className={className}
        onClick={(e) => {
          e.preventDefault();
          window.gtag?.("event", "quote_open", { source, page_path: window.location.pathname });
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open && !item && <Picker onPick={setItem} onClose={close} />}
      {open && item && <DepositModal item={item} extraStep onBack={() => setItem(null)} onClose={close} />}
    </>
  );
}

function Picker({ onPick, onClose }: { onPick: (id: string) => void; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Request a custom quote"
        className="max-h-[94vh] w-full overflow-y-auto rounded-t-lg bg-cream p-6 shadow-2xl sm:max-w-md sm:rounded-sm sm:p-8"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-terracotta">Step 1 of 4 · Choose your experience</p>
            <h2 className="mt-2 font-serif text-2xl font-light leading-tight">What are you planning?</h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-lg transition hover:border-terracotta">×</button>
        </div>
        <div className="mt-4 flex gap-1.5">
          {[1, 2, 3, 4].map((n) => <span key={n} className={`h-1 flex-1 rounded-full ${n <= 1 ? "bg-terracotta" : "bg-ink/15"}`} />)}
        </div>

        <ul className="mt-6 divide-y divide-ink/12 border-y border-ink/12">
          {featuredPackages.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => onPick(p.id)} className="group flex w-full items-center justify-between gap-4 py-4 text-left">
                <span>
                  <span className="block font-serif text-xl font-light leading-tight transition group-hover:text-terracotta">{p.name}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.22em] text-ink/55">From ${p.from.toLocaleString("en-US")} USD{p.unit ? ` · ${p.unit}` : ""}</span>
                </span>
                <span aria-hidden className="text-lg text-ink/40 transition group-hover:translate-x-1 group-hover:text-terracotta">→</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-sm text-ink/60">
          Something else?{" "}
          <WhatsAppLink message="Hi, I'd like to plan a private experience in Cabo on [date]." label="quote_launcher_other" className="text-terracotta underline">Message us on WhatsApp</WhatsAppLink>
        </p>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
