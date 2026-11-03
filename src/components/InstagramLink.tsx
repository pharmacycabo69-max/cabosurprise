"use client";
import { site } from "@/config/site";
import { trackInstagram } from "@/lib/whatsapp";

export default function InstagramLink({ className, label = "Instagram" }: { className?: string; label?: string }) {
  return (
    <a href={site.instagram} className={className} target="_blank" rel="noopener noreferrer" onClick={trackInstagram}>
      {label}
    </a>
  );
}
