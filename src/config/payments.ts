import { defaultParty, featuredPackages, packages, policy, proposals, type AddOn, type Party } from "./site";

export const CUSTOM_ID = "custom";
export const customLimits = { min: 50, max: 5000 };

export type Payable = {
  id: string;
  name: string;
  from: number;
  deposit: number;
  quoted: boolean;
  payOnline: boolean;
  payUpTo?: number;
  depositPercent: number;
  unit?: string;
  party: Party;
  stay: boolean;
  addons: AddOn[];
};

const pct = (from: number, percent: number) => Math.round((from * percent) / 100);

// Deposit = depositPercent of the starting price. Amounts are always computed on the server.
type Source = { id: string; name: string; from: number; unit?: string; quoted?: boolean; depositPercent?: number; payOnline?: boolean; payUpTo?: number; party?: Party; stay?: boolean; addons?: AddOn[] };
const make = (p: Source): Payable => {
  const depositPercent = p.depositPercent ?? policy.depositPercent;
  return {
    id: p.id, name: p.name, from: p.from, unit: p.unit, quoted: !!p.quoted, depositPercent,
    payOnline: p.payOnline !== false, payUpTo: p.payUpTo, deposit: pct(p.from, depositPercent), party: p.party ?? defaultParty, stay: !!p.stay, addons: p.addons ?? [],
  };
};

export const payableItems: Payable[] = [
  ...featuredPackages.map(make),
  ...packages.map(make),
  ...proposals.map((p) => make({ id: `proposal-${p.id}`, name: p.name, from: p.from })),
];
