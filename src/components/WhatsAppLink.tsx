"use client";
import { buildWhatsAppUrl, trackPackage, trackWhatsApp, whatsAppHref } from "@/lib/whatsapp";

type Props = {
  message: string;
  label: string;
  /** Set when the link sits inside a package card, to also fire package_click. */
  packageName?: string;
  className?: string;
  children: React.ReactNode;
};

export default function WhatsAppLink({ message, label, packageName, className, children }: Props) {
  return (
    <a
      href={whatsAppHref(message)}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        trackWhatsApp(label);
        if (packageName) trackPackage(packageName);
        window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      }}
    >
      {children}
    </a>
  );
}
