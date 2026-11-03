"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { computeQuote, DEPOSIT_PERCENT, FEE_PERCENT, MAX_GUESTS, mxn, PRICES, type Selection, type Tier } from "@/lib/quote";
import WhatsAppLink from "./WhatsAppLink";

const input = "w-full rounded-xl border border-ink/20 bg-white px-4 py-3 outline-none focus:border-terracotta";
const card = "rounded-3xl bg-white p-6 shadow-sm";

const initial: Selection = {
  guests: 50, tier: "general", cabanas: 0, extraHours: 0, horses: false, photoRanch: false, photoBeach: false,
  audio: false, dinner: false, bar: false, chairs: false, staff6h: false, staffExtraHours: 0,
};

export default function QuoteBuilder({ rate }: { rate: number | null }) {
  const [tier, setTier] = useState<Tier | "">("");
  const [s, setS] = useState<Selection>(initial);
  const [guestsText, setGuestsText] = useState("50");
  const [paying, setPaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const guests = Number(guestsText);
  const tooMany = Number.isFinite(guests) && guests > MAX_GUESTS;
  const sel: Selection = { ...s, guests, tier: (tier || "general") as Tier };
  const quote = useMemo(() => (tier ? computeQuote(sel) : null), [s, guests, tier]); // eslint-disable-line react-hooks/exhaustive-deps
  const usd = (cents: number) => (rate ? `≈ US$${(cents / 100 / rate).toLocaleString("en-US", { maximumFractionDigits: 0 })}` : "");
  const set = <K extends keyof Selection>(k: K, v: Selection[K]) => setS((p) => ({ ...p, [k]: v }));
  const today = new Date().toISOString().slice(0, 10);

  const waMessage = quote
    ? `Hi, I'd like to book Rancho McCoy on [date]. ${guests} guests, ${tier === "destination" ? "Destination" : "General"} rate. Estimated total ${mxn(quote.total)}, deposit ${mxn(quote.deposit)}. Items: ${quote.lines.map((l) => l.label).join("; ")}.`
    : "Hi, I'd like a custom quote for an event at Rancho McCoy with more than 199 guests on [date].";

  async function pay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/venue-checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selection: sel, name: f.get("name"), email: f.get("email"), date: f.get("date"),
          company: f.get("company"), terms: f.get("terms") === "on",
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

  const check = (k: "horses" | "photoRanch" | "photoBeach" | "audio") => (
    <label key={k} className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-ink/15 px-4 py-3 text-sm">
      <span className="flex items-center gap-3">
        <input type="checkbox" checked={s[k]} onChange={(e) => set(k, e.target.checked)} className="h-4 w-4 accent-[#C4663D]" />
        {PRICES[k].label}
      </span>
      {tier && <span className="shrink-0 text-ink/60">{mxn(PRICES[k][tier] * 100)}</span>}
    </label>
  );
  const perGuest = (k: "dinner" | "bar" | "chairs") => (
    <label key={k} className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-ink/15 px-4 py-3 text-sm">
      <span className="flex items-center gap-3">
        <input type="checkbox" checked={s[k]} onChange={(e) => set(k, e.target.checked)} className="h-4 w-4 accent-[#C4663D]" />
        {PRICES[k].label}
      </span>
      {tier && <span className="shrink-0 text-ink/60">{mxn(PRICES[k][tier] * 100)}</span>}
    </label>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <section className={card}>
          <h2 className="font-serif text-2xl">1. Rate</h2>
          <p className="mt-1 text-sm text-ink/60">Choose the rate that applies to your event.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {([["general", "General"], ["destination", "Destination"]] as const).map(([v, label]) => (
              <label key={v} className={`cursor-pointer rounded-2xl border px-4 py-4 text-sm transition ${tier === v ? "border-terracotta bg-terracotta/10" : "border-ink/15"}`}>
                <input type="radio" name="tier" value={v} checked={tier === v} onChange={() => setTier(v)} className="mr-2 accent-[#C4663D]" />
                <strong className="font-medium">{label}</strong>
              </label>
            ))}
          </div>
        </section>

        <section className={card}>
          <h2 className="font-serif text-2xl">2. Guests</h2>
          <input type="number" min={1} max={999} value={guestsText} onChange={(e) => setGuestsText(e.target.value)} className={`${input} mt-4 max-w-[180px]`} aria-label="Number of guests" />
          {tooMany && (
            <p className="mt-3 rounded-xl bg-blush/30 p-3 text-sm">
              For more than {MAX_GUESTS} guests our team prepares a custom quote.{" "}
              <WhatsAppLink message={waMessage} label="quote_over_199" className="font-medium text-terracotta underline">Message us</WhatsAppLink>
            </p>
          )}
        </section>

        <section className={card}>
          <h2 className="font-serif text-2xl">3. Ranch extras</h2>
          <div className="mt-4 space-y-3">
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Cabins</span>
              <select value={s.cabanas} onChange={(e) => set("cabanas", Number(e.target.value) as 0 | 1 | 2)} className={input}>
                <option value={0}>None</option>
                <option value={1}>{PRICES.cabanas[1].label}{tier ? `: ${mxn(PRICES.cabanas[1][tier] * 100)}` : ""}</option>
                <option value={2}>{PRICES.cabanas[2].label}{tier ? `: ${mxn(PRICES.cabanas[2][tier] * 100)}` : ""}</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Extra ranch hours</span>
              <select value={s.extraHours} onChange={(e) => set("extraHours", Number(e.target.value) as 0 | 1 | 2)} className={input}>
                <option value={0}>None (6 hours included)</option>
                <option value={1}>{PRICES.extraHours[1].label}{tier ? `: ${mxn(PRICES.extraHours[1][tier] * 100)}` : ""}</option>
                <option value={2}>{PRICES.extraHours[2].label}{tier ? `: ${mxn(PRICES.extraHours[2][tier] * 100)}` : ""}</option>
              </select>
            </label>
            {(["horses", "photoRanch", "photoBeach", "audio"] as const).map(check)}
          </div>
        </section>

        <section className={card}>
          <h2 className="font-serif text-2xl">4. Per guest</h2>
          <p className="mt-1 text-sm text-ink/60">Multiplied by the number of guests.</p>
          <div className="mt-4 space-y-3">{(["dinner", "bar", "chairs"] as const).map(perGuest)}</div>
        </section>

        <section className={card}>
          <h2 className="font-serif text-2xl">5. Staff</h2>
          <div className="mt-4 space-y-3">
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-ink/15 px-4 py-3 text-sm">
              <span className="flex items-center gap-3">
                <input type="checkbox" checked={s.staff6h} onChange={(e) => set("staff6h", e.target.checked)} className="h-4 w-4 accent-[#C4663D]" />
                {PRICES.staff6h.label}
              </span>
              {tier && <span className="shrink-0 text-ink/60">{mxn(PRICES.staff6h[tier] * 100)}</span>}
            </label>
            <label className="flex items-center justify-between gap-3 text-sm">
              <span>Additional staff hours{tier ? ` (${mxn(PRICES.staffHour[tier] * 100)} each)` : ""}</span>
              <input type="number" min={0} max={12} value={s.staffExtraHours} onChange={(e) => set("staffExtraHours", Math.max(0, Math.min(12, Math.floor(Number(e.target.value) || 0))))} className={`${input} max-w-[90px]`} />
            </label>
          </div>
          <p className="mt-5 text-sm text-ink/60">Decoration (from $17,900 General or $23,270 Destination, depending on design) and lighting are quoted separately with our team.</p>
        </section>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className={card}>
          <h2 className="font-serif text-2xl">Your estimate</h2>
          {!tier ? (
            <p className="mt-3 text-sm text-ink/60">Choose a rate to see your estimate.</p>
          ) : !quote ? (
            <p className="mt-3 text-sm text-ink/60">Enter between 1 and {MAX_GUESTS} guests.</p>
          ) : (
            <>
              <ul className="mt-4 space-y-2 text-sm">
                {quote.lines.map((l) => (
                  <li key={l.label} className="flex justify-between gap-3">
                    <span className="text-ink/75">{l.label}</span>
                    <span className="shrink-0">{mxn(l.cents)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 space-y-1 border-t border-ink/10 pt-4 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{mxn(quote.subtotal)}</dd></div>
                <div className="flex justify-between"><dt>Service fee ({FEE_PERCENT}%)</dt><dd>{mxn(quote.fee)}</dd></div>
                <div className="flex justify-between font-serif text-xl"><dt>Total</dt><dd>{mxn(quote.total)}</dd></div>
                <div className="flex justify-between pt-2 text-terracotta"><dt>Deposit to hold the date ({DEPOSIT_PERCENT}%)</dt><dd className="text-right">{mxn(quote.deposit)}<br /><span className="text-xs">{usd(quote.deposit)}</span></dd></div>
              </dl>
              <p className="mt-3 text-xs text-ink/55">Estimate, subject to availability and confirmation by our team.</p>
              <div className="mt-5 space-y-3">
                <WhatsAppLink message={waMessage} label="quote_whatsapp" className="btn-ghost w-full">Send this quote on WhatsApp</WhatsAppLink>
                {rate ? (
                  <button onClick={() => setPaying(true)} className="btn-primary w-full">Pay deposit {usd(quote.deposit)}</button>
                ) : (
                  <p className="text-center text-xs text-ink/55">Online deposit is not available yet. Message us to hold your date.</p>
                )}
              </div>
            </>
          )}
        </div>

        {paying && quote && rate && (
          <form onSubmit={pay} className={`${card} mt-6 space-y-4`}>
            <h3 className="font-serif text-xl">Hold your date</h3>
            <input name="name" required maxLength={80} autoComplete="name" placeholder="Your name" className={input} />
            <input name="email" type="email" required maxLength={120} autoComplete="email" placeholder="Email for your receipt" className={input} />
            <label className="block text-sm"><span className="mb-1 block">Event date</span><input name="date" type="date" required min={today} className={input} /></label>
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <label className="flex items-start gap-3 text-sm">
              <input name="terms" type="checkbox" required className="mt-1 h-4 w-4 accent-[#C4663D]" />
              <span>I agree to the <Link href="/terms/" target="_blank" className="underline">Terms &amp; Conditions</Link>, including the cancellation policy.</span>
            </label>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? "Redirecting…" : "Continue to secure payment"}</button>
            <p className="text-center text-xs text-ink/55">Paid in USD by card via Stripe. Converted at {rate} MXN per USD.</p>
          </form>
        )}
      </aside>
    </div>
  );
}
