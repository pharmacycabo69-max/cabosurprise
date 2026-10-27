import Reveal from "./Reveal";
import WhatsAppLink from "./WhatsAppLink";

export default function FinalCta({
  title = "Ready to make someone’s trip unforgettable?",
  text = "Tell us the occasion and the date. We’ll reply on WhatsApp with options and pricing.",
  message = "Hi, I'd like to plan a surprise in Cabo on [date].",
  label = "final_cta",
}: { title?: string; text?: string; message?: string; label?: string }) {
  return (
    <section className="bg-gradient-to-br from-terracotta to-[#D98466] text-white">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">{text}</p>
          <WhatsAppLink
            message={message}
            label={label}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-cream px-8 py-4 font-medium text-terracotta transition hover:scale-105"
          >
            Plan my surprise
          </WhatsAppLink>
        </Reveal>
      </div>
    </section>
  );
}
