"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Header from "./Header";
import WhatsAppLink from "./WhatsAppLink";
import QuoteLauncher from "./QuoteLauncher";

export type HeroPhoto = string | { src: string; position?: string };

type Props = {
  title: string;
  subtitle: string;
  cta: string;
  message: string;
  label: string;
  /** Single photo (legacy) or use `photos` for the crossfading slideshow. */
  photo?: string;
  photos?: HeroPhoto[];
  eyebrow?: string;
  secondary?: { label: string; href: string };
  /** Open the "choose your experience" quote flow instead of WhatsApp. */
  quote?: boolean;
};

const INTERVAL = 6500;
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function Hero({ title, subtitle, cta, message, label, photo, photos, eyebrow = "Los Cabos · Mexico", secondary, quote }: Props) {
  const slides = (photos ?? (photo ? [photo] : [])).map((p) => (typeof p === "string" ? { src: p, position: "center" } : { position: "center", ...p }));
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const multi = slides.length > 1;

  // Only the first photo loads up front; the rest mount once the page has settled.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!multi || !ready || reduce) return;
    const t = setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [multi, ready, reduce, slides.length, active]);

  const words = title.split(" ");

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
      {/* Photos */}
      {slides.map((s, i) => {
        if (i > 0 && !ready) return null;
        const on = i === active;
        return (
          <motion.div
            key={s.src}
            className="absolute inset-0"
            initial={{ opacity: i === 0 ? 1 : 0, scale: reduce ? 1 : 1.12 }}
            animate={
              on
                ? { opacity: 1, scale: 1, transition: { opacity: { duration: 1.4 }, scale: { duration: reduce ? 0 : 9, ease: "linear" } } }
                : { opacity: 0, scale: reduce ? 1 : 1.12, transition: { opacity: { duration: 1.4 }, scale: { delay: 1.4, duration: 0 } } }
            }
          >
            <Image
              src={`/photos/${s.src}`}
              alt=""
              fill
              priority={i === 0}
              sizes="(orientation: portrait) 120vh, 100vw"
              className="object-cover"
              style={{ objectPosition: s.position }}
            />
          </motion.div>
        );
      })}

      {/* Light, depth and grain */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/15" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(43,36,32,0.45)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

      <Header dark />

      {/* Copy */}
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-28 pt-32 text-white md:pb-32">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mb-7 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.34em] text-white/85"
        >
          <span className="h-px w-12 bg-champagne/80" />
          {eyebrow}
        </motion.div>

        <h1 className="max-w-4xl font-serif text-[2.8rem] font-light leading-[1.02] tracking-tight [text-shadow:0_2px_30px_rgb(0_0_0/0.35)] sm:text-6xl md:text-[5.5rem]">
          {words.map((w, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className={`inline-block ${i === words.length - 1 ? "italic text-champagne" : ""}`}
                initial={{ y: "110%", rotate: 3 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.25 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-7 max-w-xl text-lg font-light leading-relaxed text-white/90 md:text-xl"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
        >
          {quote ? (
            <QuoteLauncher source="hero" className="btn-light">{cta}</QuoteLauncher>
          ) : (
            <WhatsAppLink message={message} label={label} className="btn-light">{cta}</WhatsAppLink>
          )}
          {secondary && (
            <a
              href={secondary.href}
              className="inline-flex items-center gap-2 border-b border-white/60 pb-1 text-[12px] font-medium uppercase tracking-[0.2em] text-white transition hover:border-champagne hover:text-champagne"
            >
              {secondary.label} <span aria-hidden>↓</span>
            </a>
          )}
        </motion.div>
      </div>

      {/* Slide progress */}
      {multi && (
        <div className="absolute bottom-8 left-0 right-0 mx-auto flex w-full max-w-6xl items-center gap-2 px-5">
          {slides.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              className="group relative h-6 w-14 sm:w-[72px]"
            >
              <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded bg-white/30">
                <motion.span
                  key={`${i}-${active}`}
                  className="block h-full origin-left bg-white"
                  initial={{ scaleX: i < active ? 1 : 0 }}
                  animate={{ scaleX: i < active ? 1 : i === active ? 1 : 0 }}
                  transition={i === active && ready && !reduce ? { duration: INTERVAL / 1000, ease: "linear" } : { duration: 0 }}
                />
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70 md:flex">
        Scroll
        <motion.span
          className="block h-10 w-px origin-top bg-white/70"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
