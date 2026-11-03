import { payableItems } from "@/config/payments";
import { computeQuote, DEPOSIT_PERCENT, MAX_GUESTS, mxn, type Line, type Tier } from "./quote";

export const MAX_PARTY = 999;
export const MAX_NIGHTS = 60;

/** Nights between two yyyy-mm-dd dates (check-out minus check-in), or null if invalid. */
export function nightsBetween(start: unknown, end: unknown): number | null {
  const re = /^(\d{4})-(\d{2})-(\d{2})$/;
  const a = typeof start === "string" ? re.exec(start) : null;
  const b = typeof end === "string" ? re.exec(end) : null;
  if (!a || !b) return null;
  const days = Math.round((Date.UTC(+b[1], +b[2] - 1, +b[3]) - Date.UTC(+a[1], +a[2] - 1, +a[3])) / 86400000);
  return days >= 1 && days <= MAX_NIGHTS ? days : null;
}

export type DepositPlan = {
  usdCents: number;
  name: string;
  quoted: boolean;
  guests: number | null;
  nights?: number;
  /** Peso quote (quoted items only). Amounts in centavos. */
  lines?: Line[];
  totalMxn?: number;
  depositMxn?: number;
  rate?: number;
  metadata: Record<string, string>;
  description: string;
};

type Result = { ok: true; plan: DepositPlan } | { ok: false; error: string; status: number };
const bad = (error: string, status = 400): Result => ({ ok: false, error, status });

/**
 * Single place that turns (item, guests, rate tier) into the deposit to charge, always on the server.
 * Quoted items use the ranch price sheet; the rest use the fixed deposit from the product list.
 */
export function depositFor(itemId: string, guestsRaw: unknown, tierRaw: unknown, rate: number | null, nights: number | null = null): Result {
  const item = payableItems.find((p) => p.id === itemId);
  if (!item) return bad("Please choose a package.");
  if (!item.payOnline) return bad("Online deposits are not available for this experience yet. Please request a custom quote.", 403);

  const g = Number(guestsRaw);
  const guests = guestsRaw === undefined || guestsRaw === null || guestsRaw === "" ? null : g;
  if (guests !== null && (!Number.isInteger(guests) || guests < 1 || guests > MAX_PARTY)) return bad("Please enter a valid number of guests.");

  if (item.stay) {
    if (!nights) return bad("Please choose your check-in and check-out dates.");
    // deposit = percent of the whole stay, in cents (from * nights * percent / 100 dollars = from * nights * percent cents)
    const total = Math.round(item.from * nights * item.depositPercent);
    return {
      ok: true,
      plan: {
        usdCents: total,
        name: item.name,
        quoted: false,
        guests,
        nights,
        metadata: { service: item.name, nights: String(nights), ...(guests ? { guests: String(guests) } : {}) },
        description: `${item.name}, ${nights} ${nights === 1 ? "night" : "nights"}${guests ? `, ${guests} guests` : ""}`,
      },
    };
  }

  if (!item.quoted) {
    return {
      ok: true,
      plan: {
        usdCents: item.deposit * 100,
        name: item.name,
        quoted: false,
        guests,
        metadata: { service: item.name, ...(guests ? { guests: String(guests) } : {}) },
        description: `${item.name}${guests ? `, ${guests} guests` : ""}`,
      },
    };
  }

  if (guests === null) return bad("Please tell us how many guests.");
  if (guests > MAX_GUESTS) return bad(`For more than ${MAX_GUESTS} guests, message our team for a custom quote.`);
  if (tierRaw !== "general" && tierRaw !== "destination") return bad("Please choose a rate.");
  if (!rate) return bad("Online deposits are not available right now. Please message us on WhatsApp.", 503);

  const tier: Tier = tierRaw;
  const q = computeQuote({
    guests, tier, cabanas: 0, extraHours: 0, horses: false, photoRanch: false, photoBeach: false,
    audio: false, dinner: false, bar: false, chairs: false, staff6h: false, staffExtraHours: 0,
  });
  if (!q) return bad("Please check your guest count.");
  return {
    ok: true,
    plan: {
      usdCents: Math.round(q.deposit / rate),
      name: item.name,
      quoted: true,
      guests,
      lines: q.lines,
      totalMxn: q.total,
      depositMxn: q.deposit,
      rate,
      metadata: {
        service: item.name, guests: String(guests), rate_tier: tier,
        total_mxn: (q.total / 100).toFixed(2), deposit_mxn: (q.deposit / 100).toFixed(2), mxn_per_usd: String(rate),
      },
      description: `${item.name}, ${guests} guests. Quote total ${mxn(q.total)}, ${DEPOSIT_PERCENT}% deposit ${mxn(q.deposit)} at ${rate} MXN per USD.`,
    },
  };
}
