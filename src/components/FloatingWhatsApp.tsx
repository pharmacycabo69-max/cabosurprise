"use client";
import WhatsAppLink from "./WhatsAppLink";

// A quiet circle instead of a wide pill: always reachable, never loud.
export default function FloatingWhatsApp() {
  return (
    <WhatsAppLink
      message="Hi, I'd like to plan a private experience in Cabo on [date]."
      label="floating_button"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F6F52] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/25 transition hover:scale-105 hover:bg-[#25855f]"
    >
      <span className="sr-only">Chat on WhatsApp</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0 12 12 0 0 0 1.7 17.9L0 24l6.3-1.6A12 12 0 0 0 12 24a12 12 0 0 0 8.5-20.5ZM12 21.9a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.9Zm5.4-7.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6a.6.6 0 0 0 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 4.9c2 .8 2.7.9 3.7.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3Z" />
      </svg>
    </WhatsAppLink>
  );
}
