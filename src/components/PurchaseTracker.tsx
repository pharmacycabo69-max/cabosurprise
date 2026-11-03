"use client";
import { useEffect } from "react";

export default function PurchaseTracker({ id, value, currency }: { id: string; value: number; currency: string }) {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(`cs_paid_${id}`)) return; // fire once per payment
      sessionStorage.setItem(`cs_paid_${id}`, "1");
    } catch {}
    window.fbq?.("track", "Purchase", { value, currency: currency.toUpperCase() });
    window.gtag?.("event", "purchase", { transaction_id: id, value, currency: currency.toUpperCase() });
  }, [id, value, currency]);
  return null;
}
