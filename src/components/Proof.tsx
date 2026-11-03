import { gallery } from "@/config/site";
import Photo from "./Photo";
import Reveal from "./Reveal";

// Bento layout: varied tile sizes (md: 4 columns). Order matches gallery-1..8.
const tiles = [
  "md:col-span-2 md:row-span-2",
  "",
  "md:row-span-2",
  "",
  "md:col-span-2",
  "",
  "",
  "col-span-2 md:col-span-4",
];
const hideOnPhone = (i: number) => (i >= 6 ? "hidden md:block " : "");

export default function Proof() {
  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Gallery</p>
        <h2 className="h2 max-w-3xl">Moments from <em className="text-terracotta">our setups.</em></h2>
      </Reveal>
      <div className="mt-10 grid auto-rows-[150px] md:mt-14 grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[230px] md:grid-cols-4 md:gap-4">
        {gallery.map((g, i) => (
          <Reveal key={g} delay={(i % 4) * 0.05} className={hideOnPhone(i) + (tiles[i] ?? "")}>
            <Photo
              src={g}
              alt={`Cabo Surprise setup ${i + 1}`}
              className="h-full w-full rounded-sm"
              sizes={i === 7 ? "100vw" : "(min-width: 768px) 25vw, 50vw"}
              position={i === 7 ? "50% 40%" : undefined}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
