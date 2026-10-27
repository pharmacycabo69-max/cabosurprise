import { site } from "@/config/site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** Reads UTMs from the URL and remembers them for the session, so they survive navigation between pages. */
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

export function whatsAppHref(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Same link, with the session's UTMs appended to the prefilled text. */
export function buildWhatsAppUrl(message: string): string {
  const utm = getUtm();
  return whatsAppHref(utm ? `${message}\n\n(ref: ${utm})` : message);
}

export function trackWhatsApp(label: string) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Contact", { content_name: label });
  window.gtag?.("event", "whatsapp_click", { label, page_path: window.location.pathname });
  // Google Ads conversion for WhatsApp clicks (set both env vars to enable).
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const convLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (adsId && convLabel) window.gtag?.("event", "conversion", { send_to: `${adsId}/${convLabel}` });
}

export function trackPackage(name: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "package_click", { package_name: name, page_path: window.location.pathname });
  window.fbq?.("trackCustom", "PackageClick", { package_name: name });
}

export function trackInstagram() {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "instagram_click", { page_path: window.location.pathname });
  window.fbq?.("trackCustom", "InstagramClick");
}
