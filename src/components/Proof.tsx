import { gallery } from "@/config/site";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Proof() {
  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Gallery</p>
        <h2 className="h2 max-w-2xl">Moments from our setups.</h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {gallery.map((g, i) => (
          <Reveal key={g} delay={(i % 4) * 0.05}>
            <Photo src={g} alt={`Cabo Surprise setup ${i + 1}`} className="aspect-square rounded-2xl" sizes="(min-width: 768px) 25vw, 50vw" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
