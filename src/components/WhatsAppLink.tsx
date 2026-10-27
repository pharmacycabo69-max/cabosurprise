"use client";
import { buildWhatsAppUrl, trackContact } from "@/lib/whatsapp";

type Props = {
  message: string;
  label: string;
  className?: string;
  children: React.ReactNode;
};

export default function WhatsAppLink({ message, label, className, children }: Props) {
  return (
    <a
      href={`https://wa.me/?text=${encodeURIComponent(message)}`}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        trackContact(label);
        window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      }}
    >
      {children}
    </a>
  );
}
