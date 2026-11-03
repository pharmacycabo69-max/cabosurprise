"use client";
import { useState } from "react";
import Link from "next/link";
import { CUSTOM_ID, customLimits, payableItems } from "@/config/payments";
import { policy } from "@/config/site";

const input = "w-full rounded-xl border border-ink/20 bg-white px-4 py-3 outline-none focus:border-terracotta";

export default function DepositForm({ initialItem }: { initialItem?: string }) {
  const options = payableItems.filter((p) => !p.quoted); // quoted items (wedding reception) use the guest-count flow
  const valid = initialItem === CUSTOM_ID || options.some((p) => p.id === initialItem);
  const [item, setItem] = useState(valid && initialItem ? initialItem : options[0].id);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const selected = options.find((p) => p.id === item);
  const today = new Date().toISOString().slice(0, 10);

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
          amount: f.get("amount"),
          name: f.get("name"),
          email: f.get("email"),
          date: f.get("date"),
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

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block">
        <span className="mb-1 block text-sm font-medium">What are you booking?</span>
        <select value={item} onChange={(e) => setItem(e.target.value)} className={input}>
          {options.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (from ${p.from.toLocaleString("en-US")})
            </option>
          ))}
          <option value={CUSTOM_ID}>Custom quote (amount agreed on WhatsApp)</option>
        </select>
      </label>

      {item === CUSTOM_ID ? (
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Deposit amount (USD)</span>
          <input name="amount" type="number" required min={customLimits.min} max={customLimits.max} step="1" className={input} placeholder="e.g. 250" />
        </label>
      ) : (
        <p className="rounded-2xl bg-blush/30 p-4 text-sm">
          Deposit today: <strong className="font-medium">${selected?.deposit.toLocaleString("en-US")} USD</strong> ({policy.depositPercent}% of the starting price). The balance is due before the setup.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Your name</span>
          <input name="name" required maxLength={80} autoComplete="name" className={input} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email for your receipt</span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" className={input} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Event date</span>
          <input name="date" type="date" required min={today} className={input} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Hotel or villa (optional)</span>
          <input name="venue" maxLength={120} className={input} />
        </label>
      </div>

      {/* Honeypot: real visitors never see or fill this */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <label className="flex items-start gap-3 text-sm">
        <input name="terms" type="checkbox" required className="mt-1 h-4 w-4 accent-[#C4663D]" />
        <span>
          I agree to the <Link href="/terms/" className="underline" target="_blank">Terms &amp; Conditions</Link>, including the cancellation policy.
        </span>
      </label>

      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
        {busy ? "Redirecting to secure payment…" : "Continue to secure payment"}
      </button>
      <p className="text-center text-xs text-ink/55">Card payments are processed securely by Stripe. We never see or store your card details.</p>
    </form>
  );
}
