import { featuredPackages, packages, policy, proposals } from "./site";

export const CUSTOM_ID = "custom";
export const customLimits = { min: 50, max: 5000 };

export type Payable = { id: string; name: string; from: number; deposit: number; quoted: boolean };

const deposit = (from: number) => Math.round((from * policy.depositPercent) / 100);

// Deposit = policy.depositPercent of the starting price. Amounts are always computed on the server.
export const payableItems: Payable[] = [
  ...featuredPackages.map((p) => ({ id: p.id, name: p.name, from: p.from, deposit: deposit(p.from), quoted: !!p.quoted })),
  ...packages.map((p) => ({ id: p.id, name: p.name, from: p.from, deposit: deposit(p.from), quoted: false })),
  ...proposals.map((p) => ({ id: `proposal-${p.id}`, name: p.name, from: p.from, deposit: deposit(p.from), quoted: false })),
];
