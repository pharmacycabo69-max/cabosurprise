import Photo from "./Photo";
import Reveal from "./Reveal";
import WhatsAppLink from "./WhatsAppLink";

export default function FinalCta({
  title = "Ready to make someone’s trip unforgettable?",
  text = "Tell us the occasion and the date. We’ll reply on WhatsApp with options and pricing.",
  message = "Hi, I'd like to plan a surprise in Cabo on [date].",
  label = "final_cta",
  photo = "proposals-hero.jpg",
}: { title?: string; text?: string; message?: string; label?: string; photo?: string }) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <Photo src={photo} alt="" className="absolute inset-0" sizes="100vw" position="50% 45%" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/50" />
      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center md:py-44">
        <Reveal>
          <p className="mx-auto mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-blush">Cabo Surprise · Los Cabos</p>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-7xl">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">{text}</p>
          <WhatsAppLink message={message} label={label} className="btn-primary mt-10 !px-9 !py-4 text-lg">
            Plan my surprise
          </WhatsAppLink>
        </Reveal>
      </div>
    </section>
  );
}
