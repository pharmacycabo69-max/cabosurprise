"use client";
import Link from "next/link";
import type { Pkg } from "@/config/site";
import { trackPackage } from "@/lib/whatsapp";
import Photo from "./Photo";
import WhatsAppLink from "./WhatsAppLink";

export default function PackageCard({ p, linked = true }: { p: Pkg; linked?: boolean }) {
  const photo = <Photo src={p.photo} alt={`${p.name} setup in Cabo`} className="aspect-[4/3]" />;
  const title = <h3 className="font-serif text-2xl">{p.name}</h3>;
  return (
    <article id={p.id} className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl bg-white shadow-sm">
      {linked ? (
        <Link href={p.href} onClick={() => trackPackage(p.name)} aria-label={`${p.name}: view details`}>
          {photo}
        </Link>
      ) : (
        photo
      )}
      <div className="flex flex-1 flex-col p-6">
        {linked ? (
          <Link href={p.href} onClick={() => trackPackage(p.name)} className="hover:text-terracotta">{title}</Link>
        ) : (
          title
        )}
        <p className="mt-2 text-ink/70">{p.blurb}</p>
        <ul className="mt-4 space-y-1 text-sm text-ink/80">
          {p.includes.map((i) => (
            <li key={i} className="flex gap-2"><span className="text-terracotta">✦</span>{i}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <p className="font-serif text-xl">From ${p.from.toLocaleString("en-US")} USD</p>
          <WhatsAppLink
            label={`package_${p.id}`}
            packageName={p.name}
            message={`Hi, I'd like to book the "${p.name}" package (from $${p.from} USD) in Cabo on [date].`}
            className="btn-ghost"
          >
            Book on WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
