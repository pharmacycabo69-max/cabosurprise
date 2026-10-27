import { addOns } from "@/config/site";
import Reveal from "./Reveal";

export default function AddOns() {
  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Make it bigger</p>
        <h2 className="h2 max-w-2xl">Add-ons for the full experience.</h2>
      </Reveal>
      <div className="mt-8 flex flex-wrap gap-3">
        {addOns.map((a, i) => (
          <Reveal key={a} delay={i * 0.04}>
            <span className="inline-block rounded-full border border-terracotta/40 bg-white px-5 py-2.5 text-ink">{a}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
