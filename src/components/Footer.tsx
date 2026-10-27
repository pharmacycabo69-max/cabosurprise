import Link from "next/link";
import { site } from "@/config/site";
import InstagramLink from "./InstagramLink";
import WhatsAppLink from "./WhatsAppLink";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 text-sm text-ink/70 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-ink">Cabo Surprise</p>
          <p className="mt-1">Cabo Surprise · Los Cabos, Mexico</p>
        </div>
        <div className="space-y-1">
          <p>
            <WhatsAppLink message="Hi, I'd like to plan a surprise in Cabo on [date]." label="footer_phone" className="hover:underline">
              {site.phoneDisplay}
            </WhatsAppLink>
          </p>
          <p><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></p>
          <p><InstagramLink className="hover:underline" /></p>
        </div>
        <div className="space-y-1 md:text-right">
          <p><Link href="/privacy/" className="hover:underline">Privacy Policy</Link></p>
          <p><Link href="/terms/" className="hover:underline">Terms &amp; Conditions</Link></p>
        </div>
      </div>
    </footer>
  );
}
