"use client";
import { useState } from "react";
import DepositModal from "./DepositModal";

// Opens the date + details modal. The href keeps the link usable without JavaScript.
export default function DepositLink({ item, className, children }: { item: string; className?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a
        href={`/deposit/?item=${encodeURIComponent(item)}`}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          window.gtag?.("event", "deposit_click", { item, page_path: window.location.pathname });
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open && <DepositModal item={item} onClose={() => setOpen(false)} />}
    </>
  );
}
