"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { payableItems } from "@/config/payments";
import { policy } from "@/config/site";
import Calendar from "./Calendar";

const input = "w-full rounded-xl border border-ink/20 bg-white px-4 py-3 outline-none focus:border-terracotta";
const pad = (n: number) => String(n).padStart(2, "0");

// Earliest selectable day: tomorrow in the visitor's local time (always valid for the server's UTC check).
function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const pretty = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
};

export default function DepositModal({ item, onClose }: { item: string; onClose: () => void }) {
  const it = payableItems.find((p) => p.id === item);
  const [step, setStep] = useState<1 | 2>(1);
  const [date, setDate] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const min = tomorrow();

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

  if (!it) return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item,
          date,
          name: f.get("name"),
          email: f.get("email"),
          venue: f.get("venue"),
          company: f.get("company"),
          terms: f.get("terms") === "on",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Something went wrong.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

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
        aria-label={`Deposit for ${it.name}`}
        className="max-h-[94vh] w-full overflow-y-auto rounded-t-[2rem] bg-cream p-6 shadow-2xl sm:max-w-md sm:rounded-[2rem] sm:p-8"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-terracotta">Step {step} of 2 · {step === 1 ? "Choose your date" : "Your details"}</p>
            <h2 className="mt-2 font-serif text-2xl leading-tight">{it.name}</h2>
            <p className="mt-1 text-sm text-ink/65">Deposit today ${it.deposit.toLocaleString("en-US")} USD ({policy.depositPercent}%)</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-lg transition hover:border-terracotta">×</button>
        </div>

        <div className="mt-4 flex gap-1.5">
          {[1, 2].map((n) => <span key={n} className={`h-1 flex-1 rounded-full ${n <= step ? "bg-terracotta" : "bg-ink/15"}`} />)}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {step === 1 ? (
            <motion.div key="s1" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="mt-6">
              <Calendar value={date} min={min} onChange={setDate} />
              <p className="mt-5 min-h-[1.5rem] text-center text-sm text-ink/70">{date ? pretty(date) : "Select the day of your event"}</p>
              <button type="button" disabled={!date} onClick={() => setStep(2)} className="btn-primary mt-3 w-full disabled:opacity-40">Continue</button>
              <p className="mt-3 text-center text-xs text-ink/50">We confirm availability for your date on WhatsApp.</p>
            </motion.div>
          ) : (
            <motion.form key="s2" onSubmit={submit} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.2 }} className="mt-6 space-y-4">
              <p className="rounded-xl bg-blush/30 px-4 py-2.5 text-sm">
                <span className="text-ink/60">Event date:</span> <strong className="font-medium">{pretty(date)}</strong>{" "}
                <button type="button" onClick={() => setStep(1)} className="ml-1 text-terracotta underline">Change</button>
              </p>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Your name</span>
                <input name="name" required maxLength={80} autoComplete="name" autoFocus className={input} />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Email for your receipt</span>
                <input name="email" type="email" required maxLength={120} autoComplete="email" className={input} />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Hotel or villa (optional)</span>
                <input name="venue" maxLength={120} className={input} />
              </label>
              <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <label className="flex items-start gap-3 text-sm">
                <input name="terms" type="checkbox" required className="mt-1 h-4 w-4 accent-[#C4663D]" />
                <span>I agree to the <Link href="/terms/" target="_blank" className="underline">Terms &amp; Conditions</Link>, including the cancellation policy.</span>
              </label>
              {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
                {busy ? "Redirecting to secure payment…" : `Pay deposit $${it.deposit.toLocaleString("en-US")}`}
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm text-ink/60 hover:text-ink">← Back</button>
              <p className="text-center text-xs text-ink/50">Secure card payment by Stripe. We never see your card details.</p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
