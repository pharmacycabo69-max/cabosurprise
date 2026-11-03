import Photo from "./Photo";
import Reveal from "./Reveal";
import WhatsAppLink from "./WhatsAppLink";

export default function FinalCta({
  title = "Let’s design your celebration.",
  text = "Tell us the occasion and the date. We reply on WhatsApp with options and your custom quote.",
  message = "Hi, I'd like to plan a private experience in Cabo on [date].",
  label = "final_cta",
  photo = "proposals-hero.jpg",
}: { title?: string; text?: string; message?: string; label?: string; photo?: string }) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <Photo src={photo} alt="" className="absolute inset-0" sizes="100vw" position="50% 45%" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/50" />
      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center md:py-44">
        <Reveal>
          <p className="mx-auto mb-6 text-[11px] font-medium uppercase tracking-[0.34em] text-champagne">Cabo Surprise · Los Cabos</p>
          <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-7xl">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">{text}</p>
          <WhatsAppLink message={message} label={label} className="btn-light mt-10">
            Request a custom quote
          </WhatsAppLink>
        </Reveal>
      </div>
    </section>
  );
}
