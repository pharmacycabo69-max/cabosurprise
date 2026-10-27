"use client";
import WhatsAppLink from "./WhatsAppLink";

export default function FloatingWhatsApp() {
  return (
    <WhatsAppLink
      message="Hi Cabo Surprise! I'd like to plan a surprise."
      label="floating_button"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-medium text-white shadow-xl transition hover:scale-105"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0 12 12 0 0 0 1.7 17.9L0 24l6.3-1.6A12 12 0 0 0 12 24a12 12 0 0 0 8.5-20.5ZM12 21.9a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.9Zm5.4-7.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6a.6.6 0 0 0 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 4.9c2 .8 2.7.9 3.7.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3Z" />
      </svg>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </WhatsAppLink>
  );
}
