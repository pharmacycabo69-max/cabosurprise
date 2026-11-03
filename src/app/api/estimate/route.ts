import { NextResponse } from "next/server";
import { depositFor, nightsBetween } from "@/lib/pricing";

export const runtime = "nodejs";

// Read-only: shows the visitor the quote and deposit before they pay. The checkout route recomputes everything.
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const r = Number(process.env.MXN_PER_USD);
  const rate = Number.isFinite(r) && r > 0 ? r : null;
  const res = depositFor(String(b.item ?? ""), b.guests, b.tier, rate, nightsBetween(b.date, b.endDate));
  if (!res.ok) return NextResponse.json({ error: res.error }, { status: res.status });
  const p = res.plan;
  return NextResponse.json({
    quoted: p.quoted,
    guests: p.guests,
    nights: p.nights,
    depositUsd: p.usdCents / 100,
    lines: p.lines?.map((l) => ({ label: l.label, mxn: l.cents / 100 })),
    totalMxn: p.totalMxn ? p.totalMxn / 100 : undefined,
    depositMxn: p.depositMxn ? p.depositMxn / 100 : undefined,
    rate: p.rate,
  });
}
