import { site } from "@/config/site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** Reads UTMs from the URL and remembers them for the session, so they survive navigation to /proposals. */
function getUtm(): string {
  if (typeof window === "undefined") return "";
  try {
    const params = new URLSearchParams(window.location.search);
    const fresh = UTM_KEYS.filter((k) => params.get(k)).map((k) => `${k}=${params.get(k)}`);
    if (fresh.length) sessionStorage.setItem("cs_utm", fresh.join("&"));
    return sessionStorage.getItem("cs_utm") ?? "";
  } catch {
    return "";
  }
}

export function buildWhatsAppUrl(message: string): string {
  const utm = getUtm();
  const text = utm ? `${message}\n\n(ref: ${utm})` : message;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Fires the Meta "Contact" event and the Google Ads conversion. */
export function trackContact(label: string) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Contact", { content_name: label });
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const convLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (adsId && convLabel) window.gtag?.("event", "conversion", { send_to: `${adsId}/${convLabel}` });
  window.gtag?.("event", "contact", { method: "whatsapp", label });
}
