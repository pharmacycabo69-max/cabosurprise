// One dedicated landing page per signature product. Price, unit, includes and deposit come from
// featuredPackages (site.ts), so a price changes in one place: card, page, quote request and deposit.
export type Option = { title: string; price?: string; text?: string };

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
  /** Shown above the price box, e.g. availability and permits. */
  notice?: string;
  optionsTitle?: string;
  options?: Option[];
  goodToKnow: string[];
  faqExtra: { q: string; a: string }[];
  galleryTitle: string;
  gallery: string[];
  og: string;
};

const gal = (slug: string) => [1, 2, 3, 4].map((i) => `${slug}/gallery-${i}.jpg`);

export const products: Product[] = [
  {
    slug: "private-anniversary-dinner",
    path: "/private-anniversary-dinner/",
    packageId: "private-anniversary-dinner",
    metaTitle: "Private Anniversary Dinner in Cabo | Chef, Flowers & Candles | Cabo Surprise",
    metaDescription:
      "A private romantic dinner for two in Los Cabos with a chef, floral decoration, candles, setup and service. Custom celebrations for 6 to 30 guests.",
    keywords: ["private anniversary dinner cabo", "private chef dinner los cabos", "romantic dinner cabo san lucas"],
    h1: "Private anniversary dinner in Cabo.",
    intro:
      "A romantic private dinner for two, with a chef, floral decoration, candles, full setup and service. Celebrating with more people? We design a custom package for 6 to 30 guests.",
    heroSubtitle: "A chef, flowers and candlelight, just for you.",
    heroPhotos: [{ src: "anniversary.jpg", position: "50% 40%" }, "venue-villa.jpg", "honeymoon/hero.jpg"],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a private anniversary dinner in Cabo on [date].",
    optionsTitle: "Celebrations for larger groups",
    options: [
      {
        title: "Groups of 6 to 30 guests",
        price: "Custom packages from $3,500–$4,500 USD",
        text: "Anniversaries, milestone birthdays and private celebrations, designed around your guest list.",
      },
    ],
    goodToKnow: [
      "The starting price is per experience, for a dinner for two.",
      "Tell us your date, your group size and any food preferences or allergies.",
      "We confirm the menu, the details and your custom quote with you on WhatsApp.",
    ],
    faqExtra: [{ q: "Is the price per person?", a: "No. The starting price is per experience, for a private dinner for two. For groups of 6 to 30 guests we prepare a custom package." }],
    galleryTitle: "Dinner setups",
    gallery: gal("private-anniversary-dinner"),
    og: "og-private-anniversary-dinner.jpg",
  },
  {
    slug: "private-beach-horse-photoshoot",
    path: "/private-beach-horse-photoshoot/",
    packageId: "private-beach-horse-photoshoot",
    metaTitle: "Private Beach Horse Photoshoot in Los Cabos | Cabo Surprise",
    metaDescription:
      "A private 90-minute photoshoot on the beach in Los Cabos with two horses, a professional photographer and full coordination.",
    keywords: ["beach horse photoshoot cabo", "horse photo session los cabos", "private photoshoot cabo san lucas"],
    h1: "Private beach horse photoshoot.",
    intro:
      "A private 90-minute session on the beach with two horses, a professional photographer and full coordination, from planning to the final frame.",
    heroSubtitle: "Two horses, the Pacific and a professional photographer.",
    heroPhotos: [{ src: "proposals-hero.jpg", position: "50% 35%" }, { src: "hero.jpg", position: "60% 40%" }, "proposal-ranch.jpg"],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a private beach horse photoshoot in Cabo on [date].",
    goodToKnow: [
      "The starting price is per session: 90 minutes, two horses, a professional photographer and coordination.",
      "Tell us your date, how many people will be photographed and the look you have in mind.",
      "We confirm the time of day, the location and the details with you on WhatsApp.",
    ],
    faqExtra: [{ q: "How long is the session?", a: "The private session lasts 90 minutes, with two horses and a professional photographer." }],
    galleryTitle: "Sessions with horses",
    gallery: gal("private-beach-horse-photoshoot"),
    og: "og-private-beach-horse-photoshoot.jpg",
  },
  {
    slug: "ranch-wedding-reception",
    path: "/ranch-wedding-reception/",
    packageId: "ranch-wedding-reception",
    metaTitle: "Exclusive Ranch Wedding Reception in Los Cabos | Rancho McCoy | Cabo Surprise",
    metaDescription:
      "Host your wedding reception with exclusive use of Rancho McCoy in Cabo San Lucas for 6 hours: furniture, decoration, dinner, DJ, lighting and service. Up to 220 guests.",
    keywords: ["ranch wedding reception cabo", "rustic wedding venue cabo san lucas", "los cabos ranch wedding venue"],
    h1: "Exclusive ranch wedding reception.",
    intro:
      "Exclusive use of Rancho McCoy for six hours, with furniture, decoration, dinner, DJ, lighting and service staff. The starter package is designed for approximately 40 to 50 guests, and the ranch welcomes up to 220.",
    heroSubtitle: "The whole ranch, for your celebration.",
    heroPhotos: [{ src: "welcome-flowers.jpg", position: "50% 35%" }, { src: "hero/proposals-3.jpg", position: "50% 55%" }, "venue-ranch.jpg"],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a wedding reception at Rancho McCoy on [date] for [number] guests.",
    optionsTitle: "Packages",
    options: [
      { title: "Starter package", price: "From $9,500 USD", text: "Approximately 40 to 50 guests, 6 hours of exclusive use of the ranch." },
      { title: "Premium packages", price: "From $25,000 USD", text: "A fuller production for larger celebrations." },
      { title: "Premium packages", price: "From $50,000 USD", text: "Extended design, entertainment and service." },
      { title: "Custom productions", price: "Above $75,000 USD", text: "A fully bespoke event, designed with our team." },
    ],
    goodToKnow: [
      "Maximum capacity: 220 guests.",
      "The starting price is per event.",
      "Every wedding is customized. We confirm your guest count, date and details, and prepare your quote on WhatsApp.",
    ],
    faqExtra: [
      { q: "How many guests can the ranch host?", a: "Up to 220 guests. The starter package is designed for approximately 40 to 50 guests." },
      { q: "What is included in the starter package?", a: "Exclusive use of Rancho McCoy for 6 hours, furniture, decoration, dinner, DJ, lighting and service staff." },
    ],
    galleryTitle: "At the ranch",
    gallery: gal("ranch-wedding-reception"),
    og: "og-ranch-wedding-reception.jpg",
  },
  {
    slug: "ranch-cabin-stay",
    path: "/ranch-cabin-stay/",
    packageId: "ranch-cabin-stay",
    metaTitle: "Private Ranch Cabin Stay in Cabo San Lucas | Rancho McCoy | Cabo Surprise",
    metaDescription:
      "Two private cabins at Rancho McCoy in Cabo San Lucas for up to 6 guests, with access to permitted areas of the ranch. Priced per night.",
    keywords: ["rancho mccoy cabins", "ranch stay cabo san lucas", "private cabin cabo"],
    h1: "Private ranch cabin stay.",
    intro:
      "Two private cabins at Rancho McCoy in Cabo San Lucas for up to six guests, with access to the permitted areas of the ranch.",
    heroSubtitle: "Two private cabins, one ranch.",
    heroPhotos: [{ src: "venue-ranch.jpg", position: "50% 40%" }, "hero/proposals-3.jpg", "hero/proposals-4.jpg"],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a stay in the two cabins at Rancho McCoy for [dates], [number] guests.",
    goodToKnow: [
      "The starting price is per night, for both cabins.",
      "Total capacity: up to 6 guests.",
      "Share your dates and the number of guests. We confirm availability and the details on WhatsApp.",
    ],
    faqExtra: [
      { q: "How many people fit in the cabins?", a: "The two cabins host up to 6 guests in total." },
      { q: "Is the price per person?", a: "No. The starting price is per night for the two private cabins." },
    ],
    galleryTitle: "The ranch",
    gallery: gal("ranch-cabin-stay"),
    og: "og-ranch-cabin-stay.jpg",
  },
  {
    slug: "private-beach-horse-experience",
    path: "/private-beach-horse-experience/",
    packageId: "private-beach-horse-experience",
    metaTitle: "Private Beach Horse Experience in Los Cabos | Cabo Surprise",
    metaDescription:
      "A private beach horse experience in Los Cabos for up to 4 participants, with four horses, a guide and full coordination. Subject to availability and operator confirmation.",
    keywords: ["beach horseback riding cabo", "private horse experience los cabos", "cabo beach horse ride"],
    h1: "Private beach horse experience.",
    intro:
      "A private experience on the beach for up to four participants, with four horses, a guide and full coordination.",
    heroSubtitle: "Four horses, a guide and the open beach.",
    heroPhotos: [{ src: "hero.jpg", position: "60% 40%" }, { src: "proposals-hero.jpg", position: "50% 35%" }, "proposal-ranch.jpg"],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a private beach horse experience in Cabo on [date] for [number] participants.",
    notice: "This activity is subject to availability, permits and confirmation by the operator.",
    goodToKnow: [
      "The starting price is per experience, for a group of up to 4 participants.",
      "Tell us your date and how many people will ride.",
      "We confirm the time, the location and the details with you on WhatsApp.",
    ],
    faqExtra: [{ q: "How many people can join?", a: "The private experience is for a group of up to 4 participants, with four horses and a guide." }],
    galleryTitle: "Horses in Cabo",
    gallery: gal("private-beach-horse-experience"),
    og: "og-private-beach-horse-experience.jpg",
  },
  {
    slug: "bachelorette-ranch-party",
    path: "/bachelorette-ranch-party/",
    packageId: "bachelorette-ranch-party",
    metaTitle: "Cabo Bachelorette Ranch Party | Private Ranch Space | Cabo Surprise",
    metaDescription:
      "A private bachelorette party at the ranch in Los Cabos: private space, DJ, bartender, service staff and a simple setup. Add themed decoration, drinks, horses, photography and catering.",
    keywords: ["cabo bachelorette ranch party", "bachelorette party cabo san lucas", "private bachelorette cabo"],
    h1: "Cabo bachelorette ranch party.",
    intro:
      "A private ranch space for your crew, with a DJ, a bartender, service staff and a simple setup. The starter package is designed for 5 guests, and we customize it from there.",
    heroSubtitle: "Your own ranch, your own party.",
    heroPhotos: [{ src: "hero/bachelorette-1.jpg", position: "50% 35%" }, { src: "hero/bachelorette-2.jpg", position: "50% 40%" }, "hero/bachelorette-3.jpg"],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a bachelorette ranch party in Cabo on [date] for [number] guests.",
    optionsTitle: "Add extras",
    options: [
      { title: "Themed decoration" },
      { title: "Drinks" },
      { title: "Horses" },
      { title: "Photography" },
      { title: "Catering" },
    ],
    goodToKnow: [
      "The starting price is per group, for a starter package for 5 guests.",
      "Tell us your date, your group size and the vibe you want.",
      "We customize the package and confirm your quote on WhatsApp.",
    ],
    faqExtra: [{ q: "Is the price per person?", a: "No. The starting price is per group, for a starter package for 5 guests. We customize it for larger groups." }],
    galleryTitle: "Celebrations at the ranch",
    gallery: gal("bachelorette-ranch-party"),
    og: "og-bachelorette-ranch-party.jpg",
  },
];
