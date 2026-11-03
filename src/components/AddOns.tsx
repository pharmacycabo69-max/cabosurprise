import { addOns } from "@/config/site";
import Reveal from "./Reveal";

export default function AddOns() {
  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Add-ons</p>
        <h2 className="h2 max-w-3xl">Make it <em className="text-terracotta">bigger.</em></h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-10 max-w-5xl font-serif text-3xl leading-[1.35] md:text-5xl md:leading-[1.3]">
          {addOns.map((a, i) => (
            <span key={a}>
              <span className="whitespace-nowrap transition hover:text-terracotta">{a}</span>
              {i < addOns.length - 1 && <>{" "}<span className="text-blush">✦</span>{" "}</>}
            </span>
          ))}
        </p>
      </Reveal>
    </section>
  );
}
