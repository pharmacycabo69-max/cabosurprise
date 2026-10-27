"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { occasions, packages, type Occasion } from "@/config/site";
import PackageCard from "./PackageCard";
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
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
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
