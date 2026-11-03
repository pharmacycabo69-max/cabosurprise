"use client";
import { useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return { y, m: m - 1, d };
};
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Month-grid date picker. Dates are yyyy-mm-dd strings in local time.
 * With `range`, the first click sets the start (check-in) and the next later day sets the end (check-out).
 */
export default function Calendar({ value, end = "", min, range = false, onChange }: { value: string; end?: string; min: string; range?: boolean; onChange: (start: string, end: string) => void }) {
  const start = parse(value || min);
  const [view, setView] = useState({ y: start.y, m: start.m });
  const lo = parse(min);
  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const atMin = view.y < lo.y || (view.y === lo.y && view.m <= lo.m);
  const pick = (s: string) => {
    if (!range) return onChange(s, "");
    if (!value || end || s <= value) return onChange(s, ""); // start a new range
    onChange(value, s);
  };
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
      <div className="grid grid-cols-7 text-center text-[11px] uppercase tracking-wider text-ink/45">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} className="py-1">{d}</span>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-y-1">
        {Array.from({ length: first }).map((_, i) => <span key={`b${i}`} />)}
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => {
          const s = fmt(view.y, view.m, d);
          const off = s < min;
          const isStart = s === value;
          const isEnd = !!end && s === end;
          const sel = isStart || isEnd;
          const inRange = !!value && !!end && s > value && s < end;
          return (
            <button
              key={d}
              type="button"
              disabled={off}
              onClick={() => pick(s)}
              aria-pressed={sel}
              className={`aspect-square text-sm transition ${
                sel ? "rounded-full bg-terracotta text-white shadow-md" : inRange ? "rounded-none bg-champagne/50" : off ? "rounded-full text-ink/25" : "rounded-full hover:bg-champagne/50"
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
