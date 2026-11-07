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
  /** Show the "Find us" map (ranch products). */
  showMap?: boolean;
};

const gal = (slug: string) => [1, 2, 3, 4].map((i) => `${slug}/gallery-${i}.jpg`);

export const products: Product[] = [
  {
    slug: "private-anniversary-dinner",
    path: "/private-anniversary-dinner/",
    packageId: "private-anniversary-dinner",
    metaTitle: "Private Anniversary Dinner in Cabo | Chef, Flowers & Candles | Cabo Surprise",
    metaDescription:
      "A private three-course anniversary dinner in Los Cabos with a private area, floral decoration, candles, service and coordination. For 2 to 15 guests, from $790 USD.",
    keywords: ["private anniversary dinner cabo", "private chef dinner los cabos", "romantic dinner cabo san lucas"],
    h1: "Private anniversary dinner in Cabo.",
    intro:
      "A three-course private dinner in your own area of the ranch, with furniture, floral decoration, candles, service and coordination. Choose your guest count and the price adjusts, from a dinner for two to a celebration for fifteen.",
    heroSubtitle: "A chef, flowers and candlelight, just for you.",
    heroPhotos: [{ src: "anniversary.jpg", position: "50% 40%" }, { src: "ranch/terrace-sunset.jpg", position: "50% 50%" }, "ranch/table-setting.jpg"],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a private anniversary dinner in Cabo on [date].",
    optionsTitle: "Packages by group size",
    options: [
      { title: "Romantic Dinner · 2 guests", price: "$790 USD" },
      { title: "Signature Dinner · 2 guests", price: "$1,300 USD", text: "Richer decoration and service for two." },
      { title: "Intimate Anniversary · 3 to 5 guests", price: "$1,790 USD" },
      { title: "Luxury Anniversary · 6 to 8 guests", price: "$2,790 USD" },
      { title: "Luxury Group Celebration · 9 to 12 guests", price: "$3,790 USD" },
      { title: "Grand Anniversary Dinner · 13 to 15 guests", price: "$4,490 USD" },
    ],
    goodToKnow: [
      "The price is per event and depends on your group size, from $790 USD for two.",
      "Tell us your date, your group size and any food preferences or allergies.",
      "We confirm availability, the menu and the final details with you on WhatsApp after your deposit.",
    ],
    faqExtra: [{ q: "Is the price per person?", a: "No. The price is per event and changes with your group size, from $790 USD for two guests up to $4,490 USD for 13 to 15 guests. Larger groups are quoted by our team." }],
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
      "A private photoshoot on the beach in Los Cabos with two horses and a professional photographer. Choose 1 hour, 1.5 hours or 2 hours, from $999 USD.",
    keywords: ["beach horse photoshoot cabo", "horse photo session los cabos", "private photoshoot cabo san lucas"],
    h1: "Private beach horse photoshoot.",
    intro:
      "A private session on the beach with two horses, a professional photographer and full coordination, from planning to the final frame. Three packages, from $999 USD.",
    heroSubtitle: "Two horses, the Pacific and a professional photographer.",
    heroPhotos: [{ src: "ranch/red-dusk.jpg", position: "50% 45%" }, { src: "ranch/red-dusk-2.jpg", position: "50% 50%" }, { src: "ranch/rider-sunset.jpg", position: "50% 45%" }],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a private beach horse photoshoot in Cabo on [date].",
    optionsTitle: "Packages",
    options: [
      { title: "Essential", price: "$999 USD", text: "1-hour private session, 30 professional photos and two horses." },
      { title: "Signature", price: "$1,450 USD", text: "1.5-hour private session, 60 professional photos and two horses. Our most booked." },
      { title: "Premium", price: "$1,950 USD", text: "2-hour session with sunset light, 100 professional photos, two horses and a short vertical video for social media." },
    ],
    goodToKnow: [
      "Every package includes two horses, a professional photographer and coordination.",
      "The price is per session for one or two people. Tell us your date and the look you have in mind.",
      "We confirm the time of day, the location and the details with you on WhatsApp.",
    ],
    faqExtra: [
      { q: "How long is the session?", a: "It depends on your package: 1 hour (Essential), 1.5 hours (Signature) or 2 hours (Premium), always with two horses and a professional photographer." },
      { q: "How many photos are included?", a: "Essential includes 30 professional photos, Signature 60 and Premium 100." },
    ],
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
      "Host your wedding reception with exclusive use of Rancho McCoy in Cabo San Lucas for 6 hours: furniture, decoration, dinner, DJ, lighting and service. Up to 180 guests.",
    keywords: ["ranch wedding reception cabo", "rustic wedding venue cabo san lucas", "los cabos ranch wedding venue"],
    h1: "Exclusive ranch wedding reception.",
    intro:
      "Exclusive use of Rancho McCoy for six hours, with furniture, decoration, dinner, DJ, lighting and service staff. The price depends on your guest count, from $6,500 USD for up to 30 guests, and the ranch welcomes up to 180.",
    heroSubtitle: "The whole ranch, for your celebration.",
    heroPhotos: [{ src: "ranch/long-table.jpg", position: "50% 50%" }, { src: "ranch/palapa-dusk.jpg", position: "50% 55%" }, "ranch/palapa-table.jpg"],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a wedding reception at Rancho McCoy on [date] for [number] guests.",
    optionsTitle: "Packages",
    options: [
      { title: "10 to 30 guests", price: "$6,500 USD" },
      { title: "31 to 50 guests", price: "$9,500 USD" },
      { title: "51 to 80 guests", price: "$13,500 USD" },
      { title: "81 to 120 guests", price: "$18,500 USD" },
      { title: "121 to 150 guests", price: "$23,500 USD" },
      { title: "151 to 180 guests", price: "$27,500 USD" },
      { title: "Premium Wedding", price: "From $15,000 USD", text: "A fuller production. Custom quote only." },
      { title: "Luxury Wedding", price: "From $25,000 USD", text: "Extended design, entertainment and service. Custom quote only." },
    ],
    goodToKnow: [
      "Maximum capacity: 180 guests.",
      "The price is per event, six hours, and depends on your guest count.",
      "Every wedding is customized. We confirm your guest count, date and details, and prepare your quote on WhatsApp.",
    ],
    faqExtra: [
      { q: "How many guests can the ranch host?", a: "Up to 180 guests. The price is set by your guest count, from $6,500 USD for 10 to 30 guests." },
      { q: "What is included?", a: "Exclusive use of Rancho McCoy for 6 hours, furniture, decoration, dinner, DJ, lighting and service staff." },
    ],
    galleryTitle: "At the ranch",
    gallery: gal("ranch-wedding-reception"),
    og: "og-ranch-wedding-reception.jpg",
    showMap: true,
  },
  {
    slug: "ranch-cabin-stay",
    path: "/ranch-cabin-stay/",
    packageId: "ranch-cabin-stay",
    metaTitle: "Private Ranch Cabin Stay in Cabo San Lucas | Rancho McCoy | Cabo Surprise",
    metaDescription:
      "Two private cabins at Rancho McCoy in Cabo San Lucas for up to 4 guests, with access to permitted areas of the ranch. $425 USD per night.",
    keywords: ["rancho mccoy cabins", "ranch stay cabo san lucas", "private cabin cabo"],
    h1: "Private ranch cabin stay.",
    intro:
      "Two private cabins at Rancho McCoy in Cabo San Lucas for up to four guests (two per cabin), with access to the permitted areas of the ranch. $425 USD per night.",
    heroSubtitle: "Two private cabins, one ranch.",
    heroPhotos: [{ src: "ranch/cabin-balcony.jpg", position: "50% 50%" }, { src: "ranch/cabin-deck-table.jpg", position: "50% 55%" }, { src: "ranch/cabin-front.jpg", position: "50% 50%" }],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a stay in the two cabins at Rancho McCoy for [dates], [number] guests.",
    goodToKnow: [
      "The starting price is per night, for both cabins.",
      "Total capacity: up to 4 guests, 2 per cabin.",
      "Choose your check-in and check-out days and we calculate the nights. We confirm availability and your quote on WhatsApp.",
    ],
    faqExtra: [
      { q: "How many people fit in the cabins?", a: "The two cabins host up to 4 guests in total, two per cabin." },
      { q: "Is the price per person?", a: "No. The starting price is per night for the two private cabins." },
    ],
    galleryTitle: "The ranch",
    gallery: gal("ranch-cabin-stay"),
    og: "og-ranch-cabin-stay.jpg",
    showMap: true,
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
    heroPhotos: [{ src: "ranch/rider-ranch.jpg", position: "50% 50%" }, { src: "ranch/rider-sunset.jpg", position: "50% 45%" }, { src: "ranch/model-portrait.jpg", position: "50% 30%" }],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a private beach horse experience in Cabo on [date] for [number] participants.",
    notice: "This activity is subject to availability, permits and confirmation by the operator.",
    goodToKnow: [
      "The price is per experience, for a group of up to 4 participants.",
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
      "A private ranch space for your crew, with a DJ, a bartender, service staff and a simple setup. The price depends on your group size, from $1,490 USD for up to 5 guests.",
    heroSubtitle: "Your own ranch, your own party.",
    heroPhotos: [{ src: "ranch/white-set-horse.jpg", position: "50% 40%" }, { src: "ranch/cowgirl-fence.jpg", position: "50% 40%" }, { src: "ranch/silver-horse.jpg", position: "50% 40%" }],
    cta: "Request a custom quote",
    message: "Hi, I'd like a custom quote for a bachelorette ranch party in Cabo on [date] for [number] guests.",
    optionsTitle: "Packages and extras",
    options: [
      { title: "Up to 5 guests", price: "$1,490 USD" },
      { title: "6 to 10 guests", price: "$1,990 USD" },
      { title: "11 to 20 guests", price: "$2,790 USD" },
      { title: "21 to 30 guests", price: "$3,800 USD" },
      { title: "Themed decoration" },
      { title: "Drinks" },
      { title: "Horses" },
      { title: "Photography" },
      { title: "Catering" },
    ],
    goodToKnow: [
      "The price is per group and depends on your group size. Drinks and food are not included unless quoted.",
      "Tell us your date, your group size and the vibe you want.",
      "We customize the package and confirm your quote on WhatsApp.",
    ],
    faqExtra: [{ q: "Is the price per person?", a: "No. The price is per group: $1,490 USD up to 5 guests, $1,990 USD for 6 to 10, $2,790 USD for 11 to 20 and $3,800 USD for 21 to 30. Larger groups are quoted by our team." }],
    galleryTitle: "Celebrations at the ranch",
    gallery: gal("bachelorette-ranch-party"),
    og: "og-bachelorette-ranch-party.jpg",
    showMap: true,
  },
];
