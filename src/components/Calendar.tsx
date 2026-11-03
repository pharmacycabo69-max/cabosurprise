"use client";
import { useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return { y, m: m - 1, d };
};
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Month-grid date picker. `min` and `value` are yyyy-mm-dd strings in local time. */
export default function Calendar({ value, min, onChange }: { value: string; min: string; onChange: (v: string) => void }) {
  const start = parse(value || min);
  const [view, setView] = useState({ y: start.y, m: start.m });
  const lo = parse(min);
  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const atMin = view.y < lo.y || (view.y === lo.y && view.m <= lo.m);
  const shift = (delta: number) =>
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} disabled={atMin} aria-label="Previous month" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-lg transition hover:border-terracotta disabled:opacity-30 disabled:hover:border-ink/15">‹</button>
        <p className="font-serif text-xl">{MONTHS[view.m]} {view.y}</p>
        <button type="button" onClick={() => shift(1)} aria-label="Next month" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-lg transition hover:border-terracotta">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-ink/45">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} className="py-1">{d}</span>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: first }).map((_, i) => <span key={`b${i}`} />)}
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => {
          const s = fmt(view.y, view.m, d);
          const off = s < min;
          const sel = s === value;
          return (
            <button
              key={d}
              type="button"
              disabled={off}
              onClick={() => onChange(s)}
              aria-pressed={sel}
              className={`aspect-square rounded-full text-sm transition ${
                sel ? "bg-terracotta text-white shadow-md" : off ? "text-ink/25" : "hover:bg-champagne/50"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
