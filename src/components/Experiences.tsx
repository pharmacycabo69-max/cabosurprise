"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { featuredPackages, type Pkg } from "@/config/site";
import { payableItems } from "@/config/payments";
import { trackPackage } from "@/lib/whatsapp";
import Photo from "./Photo";
import Reveal from "./Reveal";
import DepositLink from "./DepositLink";
import WhatsAppLink from "./WhatsAppLink";

const pad = (n: number) => String(n).padStart(2, "0");

// One full-screen chapter per experience: the photograph, then quiet type and the actions.
function Chapter({ p, i, total }: { p: Pkg; i: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]); // slow parallax
  const pay = payableItems.find((x) => x.id === p.id);
  const deposit = pay?.stay ? undefined : pay?.deposit; // per-night stays: the deposit depends on the nights chosen
  const right = i % 2 === 1;
  const cta = p.payOnline === false ? "Request a custom quote" : p.quoted ? "Get quote & pay deposit" : `Pay deposit${deposit ? `${p.variants ? " from" : ""} $${deposit.toLocaleString("en-US")}` : ""}`;

  return (
    <section ref={ref} id={p.id} data-chapter={i} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
      <motion.div style={reduce ? undefined : { y }} className="absolute -inset-y-[8%] inset-x-0">
        <Photo src={p.photo} alt={`${p.name} in Cabo`} className="absolute inset-0" sizes="100vw" position={p.photoPosition} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/35" />
      <div className={`absolute inset-0 ${right ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-ink/55 via-transparent to-transparent`} />

      <div className={`relative mx-auto flex w-full max-w-6xl px-5 pb-14 pt-28 md:pb-16 ${right ? "md:justify-end" : ""}`}>
        <Reveal className="w-full max-w-2xl">
          <p className="font-serif text-lg italic text-champagne">
            {pad(i + 1)} <span className="text-white/45">/ {pad(total)}</span>
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/80">
            From ${p.from.toLocaleString("en-US")} USD{p.unit ? ` · ${p.unit}` : ""}
          </p>
          <h2 className="mt-3 font-serif text-[2.05rem] font-light leading-[1.04] tracking-tight [text-shadow:0_2px_30px_rgb(0_0_0/0.35)] md:text-[3.6rem]">{p.name}</h2>
          <p className="mt-4 line-clamp-2 max-w-lg text-base font-light leading-relaxed text-white/85 sm:line-clamp-none md:text-lg">{p.blurb}</p>
          <ul className="mt-4 hidden flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/75 sm:flex">
            {p.includes.slice(0, 3).map((x) => (
              <li key={x} className="flex items-center gap-2"><span className="text-[8px] text-champagne">◆</span>{x}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-7">
            <DepositLink item={p.id} className="btn-light">{cta}</DepositLink>
            <Link href={p.href} onClick={() => trackPackage(p.name)} className="inline-flex items-center gap-2 border-b border-white/60 pb-0.5 text-[12px] font-medium uppercase tracking-[0.2em] transition hover:border-champagne hover:text-champagne">
              View the experience <span aria-hidden>→</span>
            </Link>
            <WhatsAppLink
              label={`package_${p.id}`}
              packageName={p.name}
              message={`Hi, I'd like to ask about "${p.name}" (from $${p.from} USD) in Cabo on [date].`}
              className="hidden text-[12px] uppercase tracking-[0.2em] text-white/70 underline-offset-4 transition hover:text-white hover:underline sm:inline"
            >
              WhatsApp
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Experiences({ intro = true }: { intro?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  // Side index: highlights the chapter in view and only shows while the block is on screen.
  useEffect(() => {
    const els = wrap.current ? Array.from(wrap.current.querySelectorAll<HTMLElement>("[data-chapter]")) : [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.chapter);
          if (e.isIntersecting) setActive(idx);
          else setActive((a) => (a === idx ? -1 : a));
        });
      },
      { threshold: 0.5 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} id="packages">
      {intro && (
        <section className="section !pb-14 md:!pb-20">
          <Reveal>
            <p className="eyebrow">Signature experiences</p>
            <h2 className="h2 max-w-3xl">Six private experiences. <em className="text-terracotta">Fully customized.</em></h2>
          </Reveal>
        </section>
      )}
      {featuredPackages.map((p, i) => <Chapter key={p.id} p={p} i={i} total={featuredPackages.length} />)}

      <nav
        aria-label="Experiences"
        className={`fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 transition duration-300 md:flex ${active >= 0 ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {featuredPackages.map((p, i) => (
          <a key={p.id} href={`#${p.id}`} aria-label={p.name} title={p.name} className="group flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/0 transition group-hover:text-white">{pad(i + 1)}</span>
            <span className={`block h-1.5 rounded-full bg-white shadow transition-all ${active === i ? "w-7 opacity-100" : "w-1.5 opacity-50 group-hover:opacity-100"}`} />
          </a>
        ))}
      </nav>
    </div>
  );
}
