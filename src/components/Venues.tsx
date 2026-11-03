import { venues } from "@/config/site";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Venues() {
  return (
    <section className="overflow-hidden bg-[#F4E9DD]">
      <div className="section">
        <Reveal>
          <p className="eyebrow">Where we set up</p>
          <h2 className="h2 max-w-3xl">Anywhere in <em className="text-terracotta">Los Cabos.</em></h2>
        </Reveal>
        <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {venues.map((v, i) => (
            <div key={v.name} className={`group relative aspect-[3/5] w-[72%] shrink-0 snap-start overflow-hidden rounded-sm sm:w-[44%] lg:w-auto lg:shrink ${i % 2 ? "lg:mt-10" : ""}`}>
              <Photo src={v.photo} alt={v.name} className="absolute inset-0 transition duration-[900ms] ease-out group-hover:scale-105" sizes="(min-width: 1024px) 20vw, 72vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <span className="absolute left-5 top-5 font-serif text-sm italic text-white/85">{String(i + 1).padStart(2, "0")}</span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-serif text-2xl leading-tight">{v.name}</h3>
                <p className="mt-1.5 text-[13px] leading-snug text-white/80">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
