"use client";
import { motion } from "framer-motion";
import Header from "./Header";
import WhatsAppLink from "./WhatsAppLink";

type Props = {
  title: string;
  subtitle: string;
  cta: string;
  message: string;
  label: string;
  photo: string;
};

export default function Hero({ title, subtitle, cta, message, label, photo }: Props) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-gradient-to-br from-terracotta via-[#D98466] to-blush">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/photos/${photo})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
      <Header dark />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl font-serif text-5xl [text-shadow:0_2px_24px_rgb(0_0_0/0.45)] leading-[1.05] md:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="mt-5 max-w-xl text-lg text-white/90 md:text-xl"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="mt-8"
        >
          <WhatsAppLink message={message} label={label} className="btn-primary">{cta}</WhatsAppLink>
        </motion.div>
      </div>
    </section>
  );
}
