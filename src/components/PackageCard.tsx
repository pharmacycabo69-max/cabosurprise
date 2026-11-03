"use client";
import Link from "next/link";
import type { Pkg } from "@/config/site";
import { payableItems } from "@/config/payments";
import { trackPackage } from "@/lib/whatsapp";
import Photo from "./Photo";
import WhatsAppLink from "./WhatsAppLink";
import DepositLink from "./DepositLink";

// Editorial card: a clean photograph, then quiet typography and a single clear action.
export default function PackageCard({ p, linked = true }: { p: Pkg; linked?: boolean }) {
  const deposit = payableItems.find((x) => x.id === p.id)?.deposit;
  const name = <>{p.name}</>;
  const cta = p.payOnline === false ? "Request a custom quote" : p.quoted ? "Get quote & pay deposit" : `Pay deposit${deposit ? ` $${deposit.toLocaleString("en-US")}` : ""}`;
  return (
    <article id={p.id} className="group flex h-full scroll-mt-24 flex-col">
      <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-ink">
        <Photo
          src={p.photo}
          alt={`${p.name} in Cabo`}
          position={p.photoPosition}
          className="absolute inset-0 transition duration-[1400ms] ease-out group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        {linked && (
          <Link href={p.href} onClick={() => trackPackage(p.name)} aria-label={`${p.name}: view details`} className="absolute inset-0 z-10" />
        )}
      </div>
      <div className="flex flex-1 flex-col border-b border-ink/15 pb-8 pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-terracotta">
          From ${p.from.toLocaleString("en-US")} USD{p.unit ? ` · ${p.unit}` : ""}
        </p>
        <h3 className="mt-3 font-serif text-[1.75rem] font-light leading-[1.12] tracking-tight">
          {linked ? (
            <Link href={p.href} onClick={() => trackPackage(p.name)} className="transition hover:text-terracotta">{name}</Link>
          ) : (
            name
          )}
        </h3>
        <p className="mt-3 text-[15px] font-light leading-relaxed text-ink/65">{p.blurb}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-7 gap-y-4 pt-6">
          <DepositLink item={p.id} className="btn-primary !px-6 !py-3.5">{cta}</DepositLink>
          <WhatsAppLink
            label={`package_${p.id}`}
            packageName={p.name}
            message={`Hi, I'd like to ask about "${p.name}" (from $${p.from} USD) in Cabo on [date].`}
            className="btn-link"
          >
            WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
