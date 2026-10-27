"use client";
import { site } from "@/config/site";
import { trackInstagram } from "@/lib/whatsapp";

export default function InstagramLink({ className }: { className?: string }) {
  return (
    <a href={site.instagram} className={className} target="_blank" rel="noopener noreferrer" onClick={trackInstagram}>
      Instagram
    </a>
  );
}
