"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { occasions, packages, type Occasion } from "@/config/site";
import Photo from "./Photo";
import WhatsAppLink from "./WhatsAppLink";
import Reveal from "./Reveal";

export default function Packages() {
  const [active, setActive] = useState<Occasion | "All">("All");
  const list = active === "All" ? packages : packages.filter((p) => p.occasions.includes(active));

  return (
    <section id="packages" className="section">
      <Reveal>
        <p className="eyebrow">What are we celebrating?</p>
        <h2 className="h2 max-w-2xl">Pick the moment. We handle the magic.</h2>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2">
        {["All", ...occasions].map((o) => (
          <button
            key={o}
            onClick={() => setActive(o as Occasion | "All")}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active === o ? "border-terracotta bg-terracotta text-white" : "border-ink/20 hover:border-terracotta"
            }`}
          >
            {o}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <Photo src={p.photo} alt={`${p.name} setup in Cabo`} className="aspect-[4/3]" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-2xl">{p.name}</h3>
                <p className="mt-2 text-ink/70">{p.blurb}</p>
                <ul className="mt-4 space-y-1 text-sm text-ink/80">
                  {p.includes.map((i) => (
                    <li key={i} className="flex gap-2"><span className="text-terracotta">✦</span>{i}</li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between pt-6">
                  <p className="font-serif text-xl">From ${p.from.toLocaleString("en-US")}</p>
                  <WhatsAppLink
                    label={`package_${p.id}`}
                    message={`Hi Cabo Surprise! I'm interested in the "${p.name}" package (from $${p.from} USD). Date: ___ . Where we're staying: ___ .`}
                    className="btn-ghost"
                  >
                    Book on WhatsApp
                  </WhatsAppLink>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
