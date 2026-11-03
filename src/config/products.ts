// One landing page per featured product. Price, includes and the card come from featuredPackages (site.ts),
// so updating a price there updates the card, this page and the deposit button.
export type Product = {
  slug: string;
  path: string;
  packageId: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  heroSubtitle: string;
  heroPhotos: (string | { src: string; position?: string })[];
  cta: string;
  message: string;
  goodToKnow: string[];
  faqExtra: { q: string; a: string }[];
  quote?: { text: string; label: string };
  galleryTitle: string;
  gallery: string[];
  og: string;
};

const gal = (slug: string) => [1, 2, 3, 4].map((i) => `${slug}/gallery-${i}.jpg`);

export const products: Product[] = [
  {
    slug: "anniversary-dinner",
    path: "/anniversary-dinner/",
    packageId: "anniversary-dinner",
    metaTitle: "Anniversary Dinner in Cabo | Private Chef Dinner | Cabo Surprise",
    metaDescription:
      "A private chef-cooked anniversary dinner on your own terrace in Los Cabos, with the table styled with candles and flowers. Plan it on WhatsApp.",
    keywords: ["anniversary dinner cabo", "private chef dinner cabo", "romantic dinner los cabos"],
    h1: "Anniversary dinner in Cabo.",
    intro:
      "A private dinner cooked by a chef on your own terrace, with the table styled with candles and flowers. We set everything up before you sit down.",
    heroSubtitle: "Private chef, styled table, candlelight.",
    heroPhotos: [{ src: "anniversary.jpg", position: "50% 40%" }, "venue-villa.jpg", "honeymoon/hero.jpg"],
    cta: "Plan our dinner",
    message: "Hi, I'd like to plan an anniversary dinner in Cabo on [date].",
    goodToKnow: [
      "Held on your terrace at your villa or hotel.",
      "Tell us your date, your group size and any food preferences or allergies.",
      "We confirm the menu, the price and the setup details with you on WhatsApp.",
    ],
    faqExtra: [{ q: "Can the dinner be on my hotel terrace?", a: "Yes, as long as your hotel or villa allows a private chef and a styled table. Send us the name and we coordinate with them." }],
    galleryTitle: "Dinner setups",
    gallery: gal("anniversary-dinner"),
    og: "og-anniversary-dinner.jpg",
  },
  {
    slug: "beach-horse-photo-session",
    path: "/beach-horse-photo-session/",
    packageId: "beach-horse-photo-session",
    metaTitle: "Beach Horse Photo Session in Cabo | Cabo Surprise",
    metaDescription:
      "A 1.5-hour photo session on the beach in Los Cabos with horses and a videographer. Message us your date to book.",
    keywords: ["horse photo session cabo", "beach horse photoshoot los cabos", "cabo beach photo session"],
    h1: "Beach horse photo session in Cabo.",
    intro:
      "A 1.5-hour portrait session on the beach with horses and a videographer. Message us your date and we confirm the time, the spot and the details.",
    heroSubtitle: "Horses, the Pacific and a videographer.",
    heroPhotos: [{ src: "proposals-hero.jpg", position: "50% 35%" }, { src: "hero.jpg", position: "60% 40%" }, "proposal-ranch.jpg"],
    cta: "Book the session",
    message: "Hi, I'd like to book a beach horse photo session in Cabo on [date].",
    goodToKnow: [
      "1.5 hours on the beach, with horses and a videographer.",
      "Prefer the ranch? A 1-hour ranch session with horses and a videographer can be added to your Rancho McCoy quote.",
      "We confirm the time of day, the beach and what you receive on WhatsApp.",
    ],
    faqExtra: [{ q: "Can I book the session at the ranch instead?", a: "Yes. A 1-hour ranch session with horses and a videographer is available. Ask us, or add it in the ranch quote calculator." }],
    quote: { text: "Planning an event at the ranch? Add photo sessions to your quote.", label: "Build my ranch quote" },
    galleryTitle: "Sessions with horses",
    gallery: gal("beach-horse-photo-session"),
    og: "og-beach-horse-photo-session.jpg",
  },
  {
    slug: "wedding-reception",
    path: "/wedding-reception/",
    packageId: "wedding-reception",
    metaTitle: "Wedding Reception at Rancho McCoy | Los Cabos | Cabo Surprise",
    metaDescription:
      "Host your wedding reception at Rancho McCoy in Cabo San Lucas: ranch, furniture and 6 hours, for up to 199 guests. Build an estimate online.",
    keywords: ["wedding reception cabo", "ranch wedding venue los cabos", "rustic wedding venue cabo san lucas"],
    h1: "Wedding reception at Rancho McCoy.",
    intro:
      "Celebrate at the ranch: the venue, the furniture and six hours are included, with options for dinner, open bar, staff, music and more.",
    heroSubtitle: "The ranch, the furniture and six hours.",
    heroPhotos: [{ src: "welcome-flowers.jpg", position: "50% 35%" }, { src: "hero/proposals-3.jpg", position: "50% 55%" }, "venue-ranch.jpg"],
    cta: "Plan my reception",
    message: "Hi, I'd like to ask about a wedding reception at Rancho McCoy on [date] for [number] guests.",
    goodToKnow: [
      "Ranch rental, furniture and 6 hours, priced by guest count: 1–30, 31–60, 61–90, 91–120, 121–150 and 151–199.",
      "For more than 199 guests our team prepares a custom quote.",
      "Options: one or two cabins, extra hours, a two-horse experience, ranch or beach photo sessions, audio equipment, dinner, open bar, crossback chairs and staff.",
      "Decoration and lighting are quoted separately with our team.",
    ],
    faqExtra: [{ q: "How do I get a price for my guest count?", a: "Use the ranch quote calculator for an instant estimate, then send it to us on WhatsApp or hold your date with a deposit." }],
    quote: { text: "Choose your guest count and extras to see an instant estimate.", label: "Build my ranch quote" },
    galleryTitle: "At the ranch",
    gallery: gal("wedding-reception"),
    og: "og-wedding-reception.jpg",
  },
  {
    slug: "ranch-cabin-stay",
    path: "/ranch-cabin-stay/",
    packageId: "ranch-two-cabins",
    metaTitle: "Rancho McCoy 2-Cabin Stay | Cabo San Lucas | Cabo Surprise",
    metaDescription:
      "Stay in two cabins at Rancho McCoy in Cabo San Lucas, priced per night. Message us your dates to check availability.",
    keywords: ["rancho mccoy cabins", "ranch stay cabo san lucas", "cabo ranch cabin"],
    h1: "Stay in two cabins at Rancho McCoy.",
    intro:
      "Two cabins at the ranch in Cabo San Lucas, priced per night. Message us your dates and we confirm availability and details.",
    heroSubtitle: "Two cabins, one ranch, per night.",
    heroPhotos: [{ src: "venue-ranch.jpg", position: "50% 40%" }, "hero/proposals-3.jpg", "hero/proposals-4.jpg"],
    cta: "Check availability",
    message: "Hi, I'd like to ask about the 2-cabin stay at Rancho McCoy for [dates], [number] guests.",
    goodToKnow: [
      "Two cabins at Rancho McCoy, Cabo San Lucas. Priced per night.",
      "Share your dates and the number of guests.",
      "We confirm availability, check-in details and what is included on WhatsApp.",
    ],
    faqExtra: [{ q: "Can I add the cabins to an event at the ranch?", a: "Yes. One or two cabins can be added to a ranch event quote." }],
    quote: { text: "Planning an event? Add the cabins to your ranch quote.", label: "Build my ranch quote" },
    galleryTitle: "The ranch",
    gallery: gal("ranch-cabin-stay"),
    og: "og-ranch-cabin-stay.jpg",
  },
  {
    slug: "beach-horse-activity",
    path: "/beach-horse-activity/",
    packageId: "beach-horse-activity",
    metaTitle: "Beach Horseback Activity in Los Cabos | Cabo Surprise",
    metaDescription:
      "A horseback experience on the beach in Los Cabos. Message us your date and group size to book.",
    keywords: ["horseback riding cabo", "beach horse ride los cabos", "cabo horse activity"],
    h1: "Horses on the beach in Cabo.",
    intro:
      "A horseback experience on the beach in Los Cabos. Message us your date and group size and we confirm the details.",
    heroSubtitle: "A horseback experience by the sea.",
    heroPhotos: [{ src: "hero.jpg", position: "60% 40%" }, { src: "proposals-hero.jpg", position: "50% 35%" }, "proposal-ranch.jpg"],
    cta: "Book the activity",
    message: "Hi, I'd like to book the beach horse activity in Cabo on [date] for [number] people.",
    goodToKnow: [
      "Horseback experience on the beach in Los Cabos.",
      "Tell us your date, how many people ride and their experience level.",
      "We confirm the time, duration and price on WhatsApp.",
    ],
    faqExtra: [{ q: "Do I need riding experience?", a: "Tell us your group's experience level when you message us and we advise you on the best option." }],
    galleryTitle: "Horses in Cabo",
    gallery: gal("beach-horse-activity"),
    og: "og-beach-horse-activity.jpg",
  },
];
