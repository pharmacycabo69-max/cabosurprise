"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { payableItems } from "@/config/payments";
import { MAX_GUESTS } from "@/lib/quote";
import Calendar from "./Calendar";
import WhatsAppLink from "./WhatsAppLink";

const input = "w-full rounded-sm border border-ink/20 bg-white px-4 py-3 outline-none focus:border-terracotta";
const pad = (n: number) => String(n).padStart(2, "0");
const money = (n: number, d = 2) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

// Earliest selectable day: tomorrow in the visitor's local time (always valid for the server's UTC check).
function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
const short = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};
const nightsOf = (a: string, b: string) => {
  if (!a || !b) return 0;
  const [y1, m1, d1] = a.split("-").map(Number);
  const [y2, m2, d2] = b.split("-").map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
};
const pretty = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
};

type Estimate = {
  quoted: boolean;
  depositUsd: number;
  lines?: { label: string; mxn: number }[];
  totalMxn?: number;
  depositMxn?: number;
  rate?: number;
};
type Tier = "general" | "destination" | "";


export default function DepositModal({ item, onClose, onBack, extraStep = false }: { item: string; onClose: () => void; onBack?: () => void; extraStep?: boolean }) {
  const it = payableItems.find((p) => p.id === item);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestsText, setGuestsText] = useState(String(it?.party.start ?? 2));
  const [transport, setTransport] = useState(false);
  const [picked, setPicked] = useState<string[]>([]); // add-on ids
  const [tier, setTier] = useState<Tier>("");
  const [est, setEst] = useState<Estimate | null>(null);
  const [estError, setEstError] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const min = tomorrow();
  const offset = extraStep ? 1 : 0; // the experience picker already took step 1
  const total = 3 + offset;

  const party = it?.party ?? { question: "How many guests?", label: "Number of guests", min: 1, max: 999, start: 2, quick: [2, 10, 25, 50, 100] };
  const stay = !!it?.stay; // multi-night: check-in and check-out
  const nights = stay ? nightsOf(date, endDate) : 0;
  const datesReady = stay ? nights >= 1 : !!date;
  const guests = Number(guestsText);
  // "Request a Custom Quote" (no payment, ends on WhatsApp): products without online deposit, or groups above the starter size.
  const overStarter = !!it?.payUpTo && Number.isInteger(guests) && guests > it.payUpTo;
  const quoteMode = !!it && (!it.payOnline || overStarter);
  const quoted = !!it?.quoted;
  const addons = it?.addons ?? [];
  const pickedNames = addons.filter((a) => picked.includes(a.id)).map((a) => a.name);
  const limit = quoted ? Math.min(MAX_GUESTS, party.max) : party.max;
  const tooMany = Number.isInteger(guests) && guests > limit;
  const guestsOk = Number.isInteger(guests) && guests >= party.min && guests <= limit;
  const TITLES = [stay ? "Choose your stay" : "Choose your date", party.question, quoteMode ? "Review your request" : "Your details"];
  const canContinue = guestsOk && (!quoted || tier !== "");

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

  const setGuests = (n: number) => setGuestsText(String(Math.max(party.min, Math.min(party.max, n))));

  async function goToDetails() {
    setEst(null);
    setEstError("");
    setStep(3);
    if (quoteMode) return;
    try {
      const res = await fetch("/api/estimate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, guests, tier: tier || undefined, date, endDate: stay ? endDate : undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "We could not prepare your quote.");
      setEst(data);
    } catch (e) {
      setEstError(e instanceof Error ? e.message : "We could not prepare your quote.");
    }
  }

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
          item, date, endDate: stay ? endDate : undefined, guests, tier: tier || undefined, transport, addons: picked,
          name: f.get("name"), email: f.get("email"), venue: f.get("venue"), company: f.get("company"),
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

  const slide = { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 }, transition: { duration: 0.2 } };
  const depositNow = est ? est.depositUsd : it.deposit;
  const when = stay ? (datesReady ? `from ${pretty(date)} to ${pretty(endDate)} (${nights} ${nights === 1 ? "night" : "nights"})` : "for [dates]") : `on ${date ? pretty(date) : "[date]"}`;
  const extras = [
    transport ? "private transportation from my hotel, villa or residence" : "",
    pickedNames.length ? `add-ons: ${pickedNames.join(", ")}` : "",
  ].filter(Boolean);
  const waMessage = `Hi, I'd like a custom quote for ${it.name} ${when} for ${guestsText} ${party.label.toLowerCase().includes("participant") ? "participants" : party.label.toLowerCase().includes("people") ? "people" : "guests"}${extras.length ? `, with ${extras.join(" and ")}` : ""}.`;
  const noun = guests === 1 ? "guest" : "guests";

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
        className="max-h-[94vh] w-full overflow-y-auto rounded-t-lg bg-cream p-6 shadow-2xl sm:max-w-md sm:rounded-sm sm:p-8"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-terracotta">Step {step + offset} of {total} · {TITLES[step - 1]}</p>
            <h2 className="mt-2 font-serif text-2xl leading-tight">{it.name}</h2>
            {quoteMode || stay ? (
              <p className="mt-1 text-sm text-ink/65">From ${it.from.toLocaleString("en-US")} USD{it.unit ? ` · ${it.unit}` : ""}</p>
            ) : (
              !quoted && step < 3 && <p className="mt-1 text-sm text-ink/65">Deposit today ${it.deposit.toLocaleString("en-US")} USD ({it.depositPercent}%)</p>
            )}
          </div>
          <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-lg transition hover:border-terracotta">×</button>
        </div>

        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: total }, (_, k) => k + 1).map((n) => <span key={n} className={`h-1 flex-1 rounded-full ${n <= step + offset ? "bg-terracotta" : "bg-ink/15"}`} />)}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.div key="s1" {...slide} className="mt-6">
              {stay && (
                <div className="mb-4 grid grid-cols-2 divide-x divide-ink/15 border border-ink/15 text-center text-sm">
                  <div className={`px-3 py-2.5 ${date && !endDate ? "bg-champagne/30" : ""}`}>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-ink/50">Check-in</p>
                    <p className="mt-0.5 font-medium">{date ? short(date) : "Select"}</p>
                  </div>
                  <div className={`px-3 py-2.5 ${date && !endDate ? "" : ""}`}>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-ink/50">Check-out</p>
                    <p className="mt-0.5 font-medium">{endDate ? short(endDate) : date ? "Select" : "—"}</p>
                  </div>
                </div>
              )}
              <Calendar value={date} end={endDate} range={stay} min={min} onChange={(s, e) => { setDate(s); setEndDate(e); }} />
              <p className="mt-5 min-h-[1.5rem] text-center text-sm text-ink/70">
                {stay
                  ? datesReady ? `${nights} ${nights === 1 ? "night" : "nights"}` : date ? "Now select your check-out day" : "Select your check-in day"
                  : date ? pretty(date) : "Select the day of your event"}
              </p>
              <button type="button" disabled={!datesReady} onClick={() => setStep(2)} className="btn-primary mt-3 w-full disabled:opacity-40">Continue</button>
              <p className="mt-3 text-center text-xs text-ink/50">We confirm availability for your {stay ? "dates" : "date"} on WhatsApp.</p>
              {onBack && <button type="button" onClick={onBack} className="mt-3 w-full text-center text-sm text-ink/60 hover:text-ink">← Choose another experience</button>}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" {...slide} className="mt-6">
              <p className="rounded-sm bg-champagne/30 px-4 py-2.5 text-sm">
                <span className="text-ink/60">{stay ? "Your stay:" : "Event date:"}</span> <strong className="font-medium">{stay ? `${short(date)} → ${short(endDate)} · ${nights} ${nights === 1 ? "night" : "nights"}` : pretty(date)}</strong>{" "}
                <button type="button" onClick={() => setStep(1)} className="ml-1 text-terracotta underline">Change</button>
              </p>

              <p className="mt-6 text-center text-sm font-medium">{party.label}</p>
              <div className="mt-3 flex items-center justify-center gap-4">
                <button type="button" aria-label="Fewer" onClick={() => setGuests((guestsOk ? guests : party.min) - 1)} disabled={guestsOk && guests <= party.min} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-2xl transition hover:border-terracotta disabled:opacity-30">−</button>
                <input
                  aria-label={party.label}
                  inputMode="numeric"
                  value={guestsText}
                  onChange={(e) => setGuestsText(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  className="w-28 rounded-sm border border-ink/20 bg-white py-3 text-center font-serif text-4xl outline-none focus:border-terracotta"
                />
                <button type="button" aria-label="More" onClick={() => setGuests((guestsOk ? guests : party.min - 1) + 1)} disabled={guestsOk && guests >= party.max} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-2xl transition hover:border-terracotta">+</button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {party.quick.map((n) => (
                  <button key={n} type="button" onClick={() => setGuests(n)} className={`rounded-full border px-4 py-1.5 text-sm transition ${guests === n ? "border-ink bg-ink text-cream" : "border-ink/20 text-ink/70 hover:border-ink"}`}>{n}</button>
                ))}
              </div>

              {overStarter && (
                <p className="mt-5 rounded-sm bg-champagne/30 px-4 py-3 text-sm">
                  For {guests} {guests === 1 ? "guest" : "guests"} we prepare a custom package, so there is no payment now. We reply on WhatsApp with your quote.
                </p>
              )}

              <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-sm border border-ink/15 px-4 py-3 text-sm">
                <input type="checkbox" checked={transport} onChange={(e) => setTransport(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#C4663D]" />
                <span>
                  <span className="font-medium">Add private transportation</span>
                  <span className="block text-ink/60">From your hotel, villa or residence. Priced by location, passengers and vehicle type.</span>
                </span>
              </label>

              {addons.length > 0 && (
                <details className="group mt-4 rounded-sm border border-ink/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="font-medium">Add-ons</span>{" "}
                      <span className="text-ink/55">(optional){pickedNames.length ? ` · ${pickedNames.length} selected` : ""}</span>
                    </span>
                    <span aria-hidden className="text-lg leading-none text-ink/50 group-open:hidden">+</span>
                    <span aria-hidden className="hidden text-lg leading-none text-ink/50 group-open:inline">−</span>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-xs text-ink/55">
                      Quoted separately and confirmed on WhatsApp.{!quoteMode ? " They do not change today's deposit." : ""}
                    </p>
                    <div className="mt-3 space-y-2">
                      {addons.map((a) => {
                        const on = picked.includes(a.id);
                        return (
                          <label key={a.id} className={`flex cursor-pointer items-start gap-3 rounded-sm border px-4 py-2.5 text-sm transition ${on ? "border-terracotta bg-terracotta/5" : "border-ink/15 hover:border-ink/40"}`}>
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={(e) => setPicked((p) => (e.target.checked ? [...p, a.id] : p.filter((x) => x !== a.id)))}
                              className="mt-0.5 h-4 w-4 accent-[#9C6B43]"
                            />
                            <span>
                              <span className="font-medium">{a.name}</span>
                              {a.note && <span className="block text-ink/60">{a.note}</span>}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </details>
              )}

              {quoted && (
                <div className="mt-6">
                  <p className="text-sm font-medium">Rate</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {([["general", "General"], ["destination", "Destination"]] as const).map(([v, label]) => (
                      <label key={v} className={`cursor-pointer rounded-sm border px-4 py-3 text-center text-sm transition ${tier === v ? "border-terracotta bg-terracotta/10" : "border-ink/15"}`}>
                        <input type="radio" name="tier" value={v} checked={tier === v} onChange={() => setTier(v)} className="sr-only" />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {tooMany ? (
                <div className="mt-6 rounded-sm bg-champagne/30 p-4 text-sm">
                  Groups of more than {limit} are quoted by our team.
                  <WhatsAppLink message={waMessage} label="deposit_modal_large_group" className="btn-primary mt-3 w-full">Message our team</WhatsAppLink>
                </div>
              ) : (
                <button type="button" disabled={!canContinue} onClick={goToDetails} className="btn-primary mt-6 w-full disabled:opacity-40">
                  {quoted ? "See my quote" : quoteMode ? "Review my request" : "Continue"}
                </button>
              )}
              <button type="button" onClick={() => setStep(1)} className="mt-3 w-full text-center text-sm text-ink/60 hover:text-ink">← Back</button>
            </motion.div>
          )}

          {step === 3 && quoteMode && (
            <motion.div key="s3q" {...slide} className="mt-6">
              <div className="rounded-sm bg-white p-5 text-sm shadow-sm">
                <dl className="space-y-3">
                  {stay ? (
                    <>
                      <div className="flex justify-between gap-4"><dt className="text-ink/60">Check-in</dt><dd className="text-right font-medium">{pretty(date)}</dd></div>
                      <div className="flex justify-between gap-4"><dt className="text-ink/60">Check-out</dt><dd className="text-right font-medium">{pretty(endDate)}</dd></div>
                      <div className="flex justify-between gap-4"><dt className="text-ink/60">Nights</dt><dd className="text-right font-medium">{nights}</dd></div>
                    </>
                  ) : (
                    <div className="flex justify-between gap-4"><dt className="text-ink/60">Date</dt><dd className="text-right font-medium">{pretty(date)}</dd></div>
                  )}
                  <div className="flex justify-between gap-4"><dt className="text-ink/60">{party.label}</dt><dd className="text-right font-medium">{guests}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-ink/60">Private transportation</dt><dd className="text-right font-medium">{transport ? "Requested" : "Not requested"}</dd></div>
                  {addons.length > 0 && (
                    <div className="flex justify-between gap-4"><dt className="text-ink/60">Add-ons</dt><dd className="text-right font-medium">{pickedNames.length ? pickedNames.join(", ") : "None"}</dd></div>
                  )}
                  <div className="flex justify-between gap-4 border-t border-ink/10 pt-3"><dt className="text-ink/60">Starting price</dt><dd className="text-right font-serif text-lg">From ${it.from.toLocaleString("en-US")} USD{stay ? " / night" : ""}</dd></div>
                  {stay && nights >= 1 && (
                    <div className="flex justify-between gap-4"><dt className="text-ink/60">Starting estimate, {nights} {nights === 1 ? "night" : "nights"}</dt><dd className="text-right font-serif text-lg">${(it.from * nights).toLocaleString("en-US")} USD</dd></div>
                  )}
                </dl>
              </div>
              <p className="mt-4 text-sm text-ink/65">
                We will confirm availability, your final price and the details with you on WhatsApp. Packages are customized to your needs.
              </p>
              <WhatsAppLink message={waMessage} label={`quote_request_${it.id}`} packageName={it.name} className="btn-primary mt-5 w-full">Request my custom quote on WhatsApp</WhatsAppLink>
              <button type="button" onClick={() => setStep(2)} className="mt-3 w-full text-center text-sm text-ink/60 hover:text-ink">← Back</button>
              <p className="mt-3 text-center text-xs text-ink/50">No payment now. This opens WhatsApp with your details ready to send.</p>
            </motion.div>
          )}

          {step === 3 && !quoteMode && (
            <motion.form key="s3" onSubmit={submit} {...slide} className="mt-6 space-y-4">
              <div className="rounded-sm bg-white p-4 text-sm shadow-sm">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink/70">
                  <span>{stay ? `${short(date)} → ${short(endDate)} · ${nights} ${nights === 1 ? "night" : "nights"}` : pretty(date)}</span><span aria-hidden>·</span><span>{guests} {noun}</span>
                  <button type="button" onClick={() => setStep(2)} className="ml-auto text-terracotta underline">Change</button>
                </div>
                {estError ? (
                  <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-red-700">{estError}</p>
                ) : !est ? (
                  <div className="mt-3 space-y-2" aria-busy>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-ink/10" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-ink/10" />
                  </div>
                ) : est.quoted && est.lines ? (
                  <>
                    <ul className="mt-3 space-y-1.5">
                      {est.lines.map((l) => (
                        <li key={l.label} className="flex justify-between gap-3"><span className="text-ink/75">{l.label}</span><span className="shrink-0">${money(l.mxn)}</span></li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs text-ink/55">Prices in MXN. Includes a 4% service fee. Extras and decoration are quoted with our team.</p>
                    <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 font-serif text-lg"><span>Estimated total</span><span>${money(est.totalMxn ?? 0)} MXN</span></div>
                  </>
                ) : (
                  <p className="mt-3 text-ink/70">Starting price from ${it.from.toLocaleString("en-US")} USD. We confirm the final quote for {guests} {noun} with you on WhatsApp.</p>
                )}
                {pickedNames.length > 0 && (
                  <p className="mt-3 text-xs text-ink/60">Add-ons requested: {pickedNames.join(", ")}. Quoted separately, not part of today&apos;s deposit.</p>
                )}
                {est && (
                  <div className="mt-3 flex items-baseline justify-between border-t border-ink/10 pt-3 text-terracotta">
                    <span>Deposit today</span>
                    <span className="text-right font-serif text-2xl">${money(depositNow, depositNow % 1 ? 2 : 0)} USD</span>
                  </div>
                )}
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">Your name</span>
                <input name="name" required maxLength={80} autoComplete="name" className={input} />
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
              {error && <p role="alert" className="rounded-sm bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <button type="submit" disabled={busy || !est} className="btn-primary w-full disabled:opacity-50">
                {busy ? "Redirecting to secure payment…" : est ? `Pay deposit $${money(depositNow, depositNow % 1 ? 2 : 0)}` : "Preparing your quote…"}
              </button>
              <p className="text-center text-sm text-ink/60">
                Prefer a custom quote first?{" "}
                <WhatsAppLink message={waMessage} label={`quote_request_${it.id}`} packageName={it.name} className="text-terracotta underline">Send this on WhatsApp</WhatsAppLink>
              </p>
              <button type="button" onClick={() => setStep(2)} className="w-full text-center text-sm text-ink/60 hover:text-ink">← Back</button>
              <p className="text-center text-xs text-ink/50">Secure card payment by Stripe. We never see your card details.</p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
