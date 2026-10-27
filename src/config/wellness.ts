// Wellness and pharmacy pages. No prices yet: every page asks the visitor to message for a quote.
export type WellnessPage = {
  slug: "iv-therapy" | "pharmacy-delivery" | "consultations";
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  heroSubtitle: string;
  intro: string;
  heroPhoto: string;
  og: string;
  cta: string;
  message: string;
  cardTitle: string;
  cardText: string;
  offerings: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  disclaimer: string;
};

const emergency = "This service is not for emergencies. If you or someone with you needs urgent care, call 911 (or 066 in Mexico) or go to the nearest hospital.";

export const wellnessPages: Record<WellnessPage["slug"], WellnessPage> = {
  "iv-therapy": {
    slug: "iv-therapy",
    path: "/iv-therapy/",
    metaTitle: "IV Therapy in Los Cabos | Cabo Surprise",
    metaDescription:
      "Mobile IV therapy in Los Cabos at your villa, hotel or yacht. Message us on WhatsApp with your date and location to check availability and pricing.",
    keywords: ["iv therapy cabo", "iv drip los cabos", "mobile iv cabo san lucas"],
    h1: "IV therapy in Cabo.",
    heroSubtitle: "Hydration IV sessions where you are staying.",
    intro:
      "Book an IV session at your villa, hotel room or yacht in Los Cabos. Message us your date and location and we will confirm availability and pricing.",
    heroPhoto: "iv-therapy/hero.jpg",
    og: "og-iv-therapy.jpg",
    cta: "Ask about IV therapy",
    message: "Hi, I'd like to ask about IV therapy in Cabo on [date]. I'm staying at [hotel or villa].",
    cardTitle: "IV therapy",
    cardText: "IV sessions at your villa, hotel or yacht.",
    offerings: [
      { title: "At your place", text: "We come to your villa, hotel room or yacht at a time that suits your plans." },
      { title: "Group sessions", text: "Traveling with friends, a bachelorette group or a wedding party? Ask about booking several people at once." },
      { title: "Add it to a celebration", text: "Add an IV session the morning after to any of our surprise setups." },
    ],
    steps: [
      { title: "Message us", text: "Tell us your date, where you are staying and how many people." },
      { title: "We confirm date, location and details", text: "You get availability and pricing on WhatsApp before anything is booked." },
      { title: "We come to you", text: "Your session takes place at your villa, hotel or yacht." },
    ],
    faqs: [
      { q: "How far in advance should I book?", a: "As early as you can, especially for weekends and busy weeks. Same-day requests are possible depending on availability, so message us." },
      { q: "Can you come to my hotel room?", a: "Yes. Send us the hotel name and the reservation name and we coordinate the visit. Some hotels have visitor rules, and we tell you if any apply." },
      { q: "How do the deposit and payment work?", a: "We confirm the price and payment options with you on WhatsApp before booking. Full details are in our Terms." },
      { q: "What if I need to change the time or place?", a: "Message us as soon as you know and we will move your session if we can." },
    ],
    disclaimer: `Services are provided subject to availability and an assessment of the person receiving them. Information on this page is general and is not medical advice. ${emergency}`,
  },
  "pharmacy-delivery": {
    slug: "pharmacy-delivery",
    path: "/pharmacy-delivery/",
    metaTitle: "Pharmacy Delivery in Los Cabos | Cabo Surprise",
    metaDescription:
      "Pharmacy delivery to your hotel or villa in Los Cabos. Over-the-counter essentials and travel health items, delivered. Message us on WhatsApp.",
    keywords: ["pharmacy delivery cabo", "cabo pharmacy delivery hotel", "pharmacy los cabos"],
    h1: "Pharmacy delivery in Cabo.",
    heroSubtitle: "Everyday essentials, delivered to your door.",
    intro:
      "Need something from the pharmacy while you are on vacation? Message us what you need and we will deliver it to your hotel or villa in Los Cabos.",
    heroPhoto: "pharmacy-delivery/hero.jpg",
    og: "og-pharmacy-delivery.jpg",
    cta: "Order on WhatsApp",
    message: "Hi, I'd like a pharmacy delivery in Cabo. I'm staying at [hotel or villa]. I need: [items].",
    cardTitle: "Pharmacy delivery",
    cardText: "Essentials delivered to your hotel or villa.",
    offerings: [
      { title: "Over-the-counter essentials", text: "Sun care, first aid, travel items and everyday products, delivered." },
      { title: "Prescription items", text: "Where permitted, we can fill prescriptions. A valid prescription is required, and some items cannot be delivered." },
      { title: "To your hotel or villa", text: "Send us the hotel name and the reservation name, or your villa address, and we arrange the delivery." },
    ],
    steps: [
      { title: "Message us", text: "Send what you need and where you are staying." },
      { title: "We confirm items, price and delivery time", text: "You approve the order and total before we deliver." },
      { title: "We deliver to your door", text: "Your order arrives at your hotel or villa." },
    ],
    faqs: [
      { q: "How fast can you deliver?", a: "It depends on where you are and the time of day. We give you an estimate on WhatsApp when we confirm your order." },
      { q: "Can you deliver to my hotel room?", a: "Yes. Share the hotel name and the reservation name. Depending on the hotel, we may hand the order to the front desk." },
      { q: "How do payment and delivery fees work?", a: "We confirm the total, including any delivery fee, with you on WhatsApp before sending your order." },
      { q: "What if an item is not available?", a: "We tell you before delivering and suggest an alternative when there is one. You decide whether to continue." },
    ],
    disclaimer: `Prescription medications require a valid prescription, and some products cannot be sold or delivered. Information on this page is general and is not medical advice. ${emergency}`,
  },
  consultations: {
    slug: "consultations",
    path: "/consultations/",
    metaTitle: "Medical Consultations & Video Visits in Los Cabos | Cabo Surprise",
    metaDescription:
      "Consultations at your hotel or villa in Los Cabos, or by video call from anywhere. Message us on WhatsApp to book a time.",
    keywords: ["video consultation cabo", "medical consultation los cabos", "doctor visit cabo hotel"],
    h1: "Consultations in Cabo.",
    heroSubtitle: "In person at your hotel, or by video call.",
    intro:
      "Feeling unwell on vacation, or have a question? Book a consultation at your hotel or villa in Los Cabos, or a video consultation from wherever you are.",
    heroPhoto: "consultations/hero.jpg",
    og: "og-consultations.jpg",
    cta: "Book a consultation",
    message: "Hi, I'd like to book a [in-person / video] consultation in Cabo on [date].",
    cardTitle: "Consultations",
    cardText: "In person at your hotel or villa, or by video call.",
    offerings: [
      { title: "In-person consultation", text: "A visit at your hotel or villa in Los Cabos at a time that works for you." },
      { title: "Video consultation", text: "Talk by video call from your room, the pool or back home. All you need is a phone and an internet connection." },
      { title: "Follow-up", text: "Ask us about follow-up questions after your consultation." },
    ],
    steps: [
      { title: "Message us", text: "Tell us whether you prefer in person or video, and when." },
      { title: "We confirm time and details", text: "You get a time slot and the price on WhatsApp." },
      { title: "Your consultation takes place", text: "We visit you, or you join the video call." },
    ],
    faqs: [
      { q: "How far in advance should I book?", a: "Message us as soon as you need a consultation. We will tell you the next available time." },
      { q: "Can you come to my hotel room?", a: "Yes. Share the hotel name and the reservation name and we coordinate the visit." },
      { q: "How do the payment and booking work?", a: "We confirm the time and price with you on WhatsApp before booking. Full details are in our Terms." },
      { q: "How does a video consultation work?", a: "We send you a link on WhatsApp at the agreed time. You need a phone or laptop with a camera and an internet connection." },
    ],
    disclaimer: `Consultations are subject to availability and cannot replace emergency care. Information on this page is general and is not medical advice. ${emergency}`,
  },
};
