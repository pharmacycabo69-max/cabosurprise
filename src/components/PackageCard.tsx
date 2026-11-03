"use client";
import Link from "next/link";
import type { Pkg } from "@/config/site";
import { payableItems } from "@/config/payments";
import { trackPackage } from "@/lib/whatsapp";
import Photo from "./Photo";
import WhatsAppLink from "./WhatsAppLink";
import DepositLink from "./DepositLink";

// Image-led card: the photo fills it, the copy sits on a gradient.
export default function PackageCard({ p, linked = true }: { p: Pkg; linked?: boolean }) {
  const deposit = payableItems.find((x) => x.id === p.id)?.deposit;
  return (
    <article id={p.id} className="group relative isolate aspect-[4/5] scroll-mt-24 overflow-hidden rounded-[2rem] bg-ink shadow-[0_20px_50px_-25px_rgba(43,36,32,0.55)]">
      <Photo
        src={p.photo}
        alt={`${p.name} setup in Cabo`}
        position={p.photoPosition}
        className="absolute inset-0 transition duration-[900ms] ease-out group-hover:scale-[1.06]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/60 via-55% to-ink/5" />
      {linked && (
        <Link href={p.href} onClick={() => trackPackage(p.name)} aria-label={`${p.name}: view details`} className="absolute inset-0 z-10" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 text-white md:p-7">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-blush">From ${p.from.toLocaleString("en-US")} USD</p>
        <h3 className="mt-2 font-serif text-3xl leading-[1.05]">{p.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{p.includes.join(" · ")}</p>
        <div className="pointer-events-auto mt-5 flex flex-wrap gap-2">
          <DepositLink item={p.id} className="btn-primary !px-5 !py-2.5 text-sm">
            Pay deposit{deposit ? ` $${deposit.toLocaleString("en-US")}` : ""}
          </DepositLink>
          <WhatsAppLink
            label={`package_${p.id}`}
            packageName={p.name}
            message={`Hi, I'd like to book the "${p.name}" package (from $${p.from} USD) in Cabo on [date].`}
            className="btn-glass !py-2.5"
          >
            Ask on WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
