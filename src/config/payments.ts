import { defaultParty, featuredPackages, packages, policy, proposals, type AddOn, type Party, type PriceTier } from "./site";

export const CUSTOM_ID = "custom";
export const customLimits = { min: 50, max: 5000 };

export type Payable = {
  id: string;
  name: string;
  from: number;
  deposit: number;
  quoted: boolean;
  payOnline: boolean;
  depositPercent: number;
  balanceDays: number;
  unit?: string;
  party: Party;
  stay: boolean;
  addons: AddOn[];
  tiers?: PriceTier[];
};

/** Package price for a group size, or null when it is above the last tier (the team quotes those). */
export const tierPrice = (tiers: PriceTier[], guests: number): number | null => tiers.find((t) => guests <= t.upTo)?.price ?? null;

const pct = (from: number, percent: number) => Math.round((from * percent) / 100);

// Deposit = depositPercent of the starting price. Amounts are always computed on the server.
type Source = { id: string; name: string; from: number; unit?: string; quoted?: boolean; depositPercent?: number; payOnline?: boolean; party?: Party; stay?: boolean; addons?: AddOn[]; tiers?: PriceTier[]; balanceDays?: number };
const make = (p: Source): Payable => {
  const depositPercent = p.depositPercent ?? policy.depositPercent;
  return {
    id: p.id, name: p.name, from: p.from, unit: p.unit, quoted: !!p.quoted, depositPercent,
    balanceDays: p.balanceDays ?? policy.balanceDays, payOnline: p.payOnline !== false, deposit: pct(p.from, depositPercent), party: p.party ?? defaultParty, stay: !!p.stay, addons: p.addons ?? [], tiers: p.tiers,
  };
};

export const payableItems: Payable[] = [
  ...featuredPackages.map(make),
  ...packages.map(make),
  ...proposals.map((p) => make({ id: `proposal-${p.id}`, name: p.name, from: p.from })),
];
