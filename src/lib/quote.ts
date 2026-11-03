// Rancho McCoy venue pricing. All prices are MXN. Math is done in centavos to avoid float errors.
export type Tier = "general" | "destination";

export const MAX_GUESTS = 199;
export const FEE_PERCENT = 4; // service fee on the subtotal, no IVA
export const DEPOSIT_PERCENT = 40; // of the total, to hold the date

const GUEST_TIERS = [
  { max: 30, general: 10900, destination: 14170 },
  { max: 60, general: 14900, destination: 19370 },
  { max: 90, general: 18900, destination: 24570 },
  { max: 120, general: 23900, destination: 31070 },
  { max: 150, general: 29900, destination: 38870 },
  { max: 199, general: 38900, destination: 50570 },
];

const price = (general: number, destination: number) => ({ general, destination });

export const PRICES = {
  cabanas: { 1: { label: "Cabin (1)", ...price(3500, 4550) }, 2: { label: "Cabins (2)", ...price(5500, 7150) } },
  extraHours: { 1: { label: "Extra ranch hour (1)", ...price(3200, 4160) }, 2: { label: "Extra ranch hours (2)", ...price(5000, 6500) } },
  horses: { label: "Two-horse experience", ...price(5000, 6500) },
  photoRanch: { label: "Ranch photo session (1 h, horses and videographer)", ...price(9500, 12350) },
  photoBeach: { label: "Beach photo session (1.5 h, horses and videographer)", ...price(14500, 18850) },
  audio: { label: "Audio equipment (6 h)", ...price(13500, 17550) },
  dinner: { label: "Dinner, per guest", ...price(389, 505.7) },
  bar: { label: "Open bar, per guest", ...price(349, 453.7) },
  chairs: { label: "Crossback chair, per guest", ...price(170, 221) },
  staff6h: { label: "Staff package, 6 h (1 server, 1 bartender, 1 captain)", ...price(3600, 4680) },
  staffHour: { label: "Additional staff hour", ...price(600, 780) },
};

export type Selection = {
  guests: number;
  tier: Tier;
  cabanas: 0 | 1 | 2;
  extraHours: 0 | 1 | 2;
  horses: boolean;
  photoRanch: boolean;
  photoBeach: boolean;
  audio: boolean;
  dinner: boolean;
  bar: boolean;
  chairs: boolean;
  staff6h: boolean;
  staffExtraHours: number; // 0-12
};

export type Line = { label: string; cents: number };
export type Quote = { lines: Line[]; subtotal: number; fee: number; total: number; deposit: number }; // centavos

const c = (mxn: number) => Math.round(mxn * 100);
const pct = (cents: number, p: number) => Math.round((cents * p) / 100);

/** Returns null when the selection is invalid or above the quotable size. */
export function computeQuote(s: Selection): Quote | null {
  if (!Number.isInteger(s.guests) || s.guests < 1 || s.guests > MAX_GUESTS) return null;
  const t = s.tier;
  const lines: Line[] = [];
  const tier = GUEST_TIERS.find((x) => s.guests <= x.max)!;
  const lo = GUEST_TIERS[GUEST_TIERS.indexOf(tier) - 1]?.max;
  lines.push({ label: `Ranch rental, furniture and 6 hours (${lo ? lo + 1 : 1}–${tier.max} guests)`, cents: c(tier[t]) });

  if (s.cabanas) lines.push({ label: PRICES.cabanas[s.cabanas].label, cents: c(PRICES.cabanas[s.cabanas][t]) });
  if (s.extraHours) lines.push({ label: PRICES.extraHours[s.extraHours].label, cents: c(PRICES.extraHours[s.extraHours][t]) });
  for (const k of ["horses", "photoRanch", "photoBeach", "audio"] as const) {
    if (s[k]) lines.push({ label: PRICES[k].label, cents: c(PRICES[k][t]) });
  }
  for (const k of ["dinner", "bar", "chairs"] as const) {
    if (s[k]) lines.push({ label: `${PRICES[k].label} × ${s.guests}`, cents: c(PRICES[k][t]) * s.guests });
  }
  if (s.staff6h) lines.push({ label: PRICES.staff6h.label, cents: c(PRICES.staff6h[t]) });
  if (s.staffExtraHours > 0) {
    lines.push({ label: `${PRICES.staffHour.label} × ${s.staffExtraHours}`, cents: c(PRICES.staffHour[t]) * s.staffExtraHours });
  }

  const subtotal = lines.reduce((a, l) => a + l.cents, 0);
  const fee = pct(subtotal, FEE_PERCENT);
  const total = subtotal + fee;
  return { lines, subtotal, fee, total, deposit: pct(total, DEPOSIT_PERCENT) };
}

/** Validates untrusted input (API) into a Selection. */
export function parseSelection(raw: unknown): Selection | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const bool = (v: unknown) => v === true;
  const guests = Number(r.guests);
  const staffExtraHours = Number(r.staffExtraHours ?? 0);
  const cabanas = Number(r.cabanas ?? 0);
  const extraHours = Number(r.extraHours ?? 0);
  if (r.tier !== "general" && r.tier !== "destination") return null;
  if (![0, 1, 2].includes(cabanas) || ![0, 1, 2].includes(extraHours)) return null;
  if (!Number.isInteger(staffExtraHours) || staffExtraHours < 0 || staffExtraHours > 12) return null;
  return {
    guests,
    tier: r.tier,
    cabanas: cabanas as 0 | 1 | 2,
    extraHours: extraHours as 0 | 1 | 2,
    horses: bool(r.horses),
    photoRanch: bool(r.photoRanch),
    photoBeach: bool(r.photoBeach),
    audio: bool(r.audio),
    dinner: bool(r.dinner),
    bar: bool(r.bar),
    chairs: bool(r.chairs),
    staff6h: bool(r.staff6h),
    staffExtraHours,
  };
}

export const mxn = (cents: number) => `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
