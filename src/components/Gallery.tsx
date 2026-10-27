import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Gallery({ title, files, alt }: { title: string; files: string[]; alt: string }) {
  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Gallery</p>
        <h2 className="h2 max-w-2xl">{title}</h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {files.map((f, i) => (
          <Reveal key={f} delay={i * 0.05}>
            <Photo src={f} alt={`${alt} ${i + 1}`} className="aspect-[4/5] rounded-2xl" sizes="(min-width: 768px) 25vw, 50vw" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
