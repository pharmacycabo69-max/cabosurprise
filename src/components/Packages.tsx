"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { featuredPackages, occasions, type Occasion } from "@/config/site";
import PackageCard from "./PackageCard";
import Reveal from "./Reveal";

export default function Packages() {
  const [active, setActive] = useState<Occasion | "All">("All");
  const list = active === "All" ? featuredPackages : featuredPackages.filter((p) => p.occasions.includes(active));

  return (
    <section id="packages" className="section scroll-mt-16 !pt-10 md:!pt-16">
      <Reveal>
        <p className="eyebrow">Packages</p>
        <h2 className="h2 max-w-3xl">Pick the moment. <em className="text-terracotta">We handle the magic.</em></h2>
      </Reveal>

      <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {["All", ...occasions].map((o) => (
          <button
            key={o}
            onClick={() => setActive(o as Occasion | "All")}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition ${
              active === o ? "border-ink bg-ink text-cream" : "border-ink/20 text-ink/75 hover:border-ink hover:text-ink"
            }`}
          >
            {o}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <PackageCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
