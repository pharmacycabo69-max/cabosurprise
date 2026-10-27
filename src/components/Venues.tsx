import { venues } from "@/config/site";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Venues() {
  return (
    <section className="bg-blush/25">
      <div className="section">
        <Reveal>
          <p className="eyebrow">Where we set up</p>
          <h2 className="h2 max-w-2xl">Anywhere in Los Cabos.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.06} className={i === venues.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <div className="group relative overflow-hidden rounded-3xl">
                <Photo src={v.photo} alt={v.name} className="aspect-[4/5] transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="font-serif text-2xl">{v.name}</h3>
                  <p className="mt-1 text-sm text-white/85">{v.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
