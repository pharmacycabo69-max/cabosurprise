"use client";
import Link from "next/link";

export default function DepositLink({ item, className, children }: { item: string; className?: string; children: React.ReactNode }) {
  return (
    <Link
      href={`/deposit/?item=${encodeURIComponent(item)}`}
      className={className}
      onClick={() => window.gtag?.("event", "deposit_click", { item, page_path: window.location.pathname })}
    >
      {children}
    </Link>
  );
}
