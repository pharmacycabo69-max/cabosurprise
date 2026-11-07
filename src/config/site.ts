// Single source of truth for phone, prices and copy that changes often.
export const site = {
  name: "Cabo Surprise",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cabosurprise.com",
  // International format, digits only (52 = Mexico, 1 = mobile prefix for WhatsApp).
  whatsappNumber: "5216242261023",
  phoneDisplay: "+52 624 226 1023",
  email: "mccoyrancho@gmail.com",
  instagram: "https://www.instagram.com/rancho_mccoy/",
  tagline: "Private experiences in Los Cabos.",
  description:
    "Private experiences and exclusive celebrations in Los Cabos: ranch weddings, chef-led dinners and horseback experiences, designed around you.",
};

// Policy numbers shown on /terms/ and in the FAQs. Edit here to change them everywhere.
export const policy = {
  depositPercent: 50,
  /** Cancel more than this many days before the date and the amount paid is refunded. */
  refundDays: 2,
  /** The balance is due this many days before the date (weddings override it on the package). */
  balanceDays: 7,
};

// Rancho McCoy, from the Google Maps listing "Rancho Mc Coy | Cabo Wedding & Event Venue".
export const venueLocation = {
  name: "Rancho McCoy",
  lat: 22.9327953,
  lng: -109.8857111,
  share: "https://maps.app.goo.gl/tZLiZsPJfdhhTRKJ8",
};

export const occasions = [
  "Wedding",
  "Birthday",
  "Anniversary",
  "Bachelorette",
  "Honeymoon",
  "Proposal",
  "Quinceañera",
  "Just Because",
] as const;
export type Occasion = (typeof occasions)[number];

export type AddOn = { id: string; name: string; note?: string };
export type Party = { question: string; label: string; min: number; max: number; start: number; quick: number[] };
export const defaultParty: Party = { question: "How many guests?", label: "Number of guests", min: 1, max: 999, start: 2, quick: [2, 10, 25, 50, 100] };

/** Price by group size: the first tier whose upTo covers the guest count. Above the last tier the team quotes. */
export type PriceTier = { upTo: number; price: number };

/** A named package inside one experience (e.g. 1 hour / 1.5 hours / 2 hours). The visitor picks one when booking. */
export type Variant = { id: string; name: string; price: number; includes: string[]; popular?: boolean };

export type Pkg = {
  id: string;
  name: string;
  blurb: string;
  includes: string[];
  from: number;
  photo: string;
  photoPosition?: string;
  /** Price depends on guest count and comes from the ranch price sheet (src/lib/quote.ts). */
  quoted?: boolean;
  /** Price by number of guests (USD per event). `from` is the lowest tier. */
  tiers?: PriceTier[];
  /** Named packages with a fixed price each. `from` is the lowest one. The visitor picks one in the booking modal. */
  variants?: Variant[];
  /** "per experience", "per night"... shown next to the price. */
  unit?: string;
  /** Days before the date when the balance is due. Defaults to policy.balanceDays. */
  balanceDays?: number;
  /** Deposit % to hold the date. Defaults to policy.depositPercent. */
  depositPercent?: number;
  /** false = "Request a Custom Quote" only (no online deposit). Default true. */
  payOnline?: boolean;
  /** What the guest-count step asks. */
  party?: Party;
  /** Multi-night stay: the visitor picks check-in and check-out, the price is per night. */
  stay?: boolean;
  /** Optional extras the visitor can tick in the booking modal. Quoted separately, they do not change the deposit. */
  addons?: AddOn[];
  href: string;
  occasions: Occasion[];
};

export const packages: Pkg[] = [
  {
    id: "welcome",
    name: "Welcome to Cabo",
    blurb: "Arrive to a room that already feels like a celebration.",
    includes: ["Fresh flowers", "Cake", "Balloon decor"],
    from: 190,
    photo: "welcome-flowers.jpg",
    photoPosition: "50% 30%",
    href: "/packages/",
    occasions: ["Birthday", "Anniversary", "Just Because", "Honeymoon"],
  },
  {
    id: "birthday",
    name: "Birthday in Cabo",
    blurb: "Their name in balloons, a cake, and a room full of love.",
    includes: ["Room setup", "Personalized balloons", "Cake"],
    from: 290,
    photo: "birthday.jpg",
    href: "/birthday/",
    occasions: ["Birthday", "Quinceañera", "Just Because"],
  },
  {
    id: "bachelorette",
    name: "Girls Trip / Bachelorette",
    blurb: "Pink, loud and unforgettable. A room your whole crew walks into together.",
    includes: ["Room decor", "Bride-to-be setup", "Custom balloons and signage"],
    from: 390,
    photo: "bachelorette.jpg",
    href: "/bachelorette/",
    occasions: ["Bachelorette", "Birthday"],
  },
  {
    id: "honeymoon",
    name: "Honeymoon Night",
    blurb: "The first night as newlyweds, set to candlelight.",
    includes: ["Rose petals", "Candles", "Champagne setup"],
    from: 340,
    photo: "honeymoon.jpg",
    href: "/honeymoon/",
    occasions: ["Honeymoon", "Anniversary", "Proposal"],
  },
  {
    id: "anniversary",
    name: "Anniversary Dinner",
    blurb: "A private chef-cooked dinner on your own terrace.",
    includes: ["Private chef dinner", "Terrace table styling", "Candles & flowers"],
    from: 590,
    photo: "anniversary.jpg",
    href: "/honeymoon/",
    occasions: ["Anniversary", "Honeymoon", "Proposal", "Just Because"],
  },
  {
    id: "mariachi",
    name: "Mariachi Surprise",
    blurb: "A live serenade at your villa. Goosebumps guaranteed.",
    includes: ["Mariachi serenade", "Song list of their favorites", "Up to 30 minutes"],
    from: 350,
    photo: "mariachi.jpg",
    href: "/packages/",
    occasions: ["Birthday", "Anniversary", "Quinceañera", "Just Because", "Proposal"],
  },
];

// The six signature products (home, /packages/ and one dedicated page each).
// Online deposit is ON for every group size: the client pays the deposit, then we confirm availability and the final price.
export const featuredPackages: Pkg[] = [
  {
    id: "private-anniversary-dinner",
    name: "Private Anniversary Dinner & Celebrations",
    blurb: "A romantic private dinner for two, with chef, flowers and candlelight.",
    includes: ["Three-course private dinner", "Private area, furniture and service", "Floral decoration and candles", "Coordination"],
    from: 790,
    tiers: [{ upTo: 2, price: 790 }, { upTo: 5, price: 1790 }, { upTo: 8, price: 2790 }, { upTo: 12, price: 3790 }, { upTo: 15, price: 4490 }],
    unit: "per experience",
    depositPercent: 50,
    payOnline: true,
    party: { question: "How many guests?", label: "Number of guests", min: 2, max: 15, start: 2, quick: [2, 4, 6, 10, 15] },
    addons: [
      { id: "signature", name: "Signature Dinner upgrade", note: "Richer decoration and service for two, $1,300 in total" },
      { id: "photographer", name: "Photographer" },
      { id: "mariachi", name: "Live mariachi" },
      { id: "cake", name: "Custom cake" },
      { id: "flowers", name: "Premium flowers" },
    ],
    photo: "anniversary.jpg",
    href: "/private-anniversary-dinner/",
    occasions: ["Anniversary", "Honeymoon", "Proposal", "Just Because"],
  },
  {
    id: "private-beach-horse-photoshoot",
    name: "Private Beach Horse Photoshoot",
    blurb: "A private session on the beach with two horses and a professional photographer. Choose 1 hour, 1.5 hours or 2 hours.",
    includes: ["Two horses", "Professional photographer", "30 to 100 professional photos", "Coordination"],
    from: 999,
    unit: "per session",
    variants: [
      { id: "essential", name: "Essential", price: 999, includes: ["1-hour private session", "30 professional photos", "Two horses"] },
      { id: "signature", name: "Signature", price: 1450, popular: true, includes: ["1.5-hour private session", "60 professional photos", "Two horses"] },
      { id: "premium", name: "Premium", price: 1950, includes: ["2-hour session with sunset light", "100 professional photos", "Two horses", "Short vertical video for social media"] },
    ],
    depositPercent: 50,
    payOnline: true,
    party: { question: "How many people will be in the session?", label: "People in the session", min: 1, max: 2, start: 2, quick: [1, 2] },
    addons: [
      { id: "videographer", name: "Videographer" },
      { id: "ranch-session", name: "Ranch photo session", note: "1 hour, with horses and a videographer" },
    ],
    photo: "ranch/red-dusk.jpg",
    photoPosition: "50% 45%",
    href: "/private-beach-horse-photoshoot/",
    occasions: ["Proposal", "Honeymoon", "Anniversary", "Just Because"],
  },
  {
    id: "ranch-wedding-reception",
    name: "Exclusive Ranch Wedding Reception",
    blurb: "Exclusive use of Rancho McCoy for six hours, with dinner, DJ, lighting and service.",
    includes: ["Exclusive Rancho McCoy rental, 6 hours", "Furniture and decoration", "Dinner, DJ and lighting", "Service staff"],
    from: 6500,
    tiers: [{ upTo: 30, price: 6500 }, { upTo: 50, price: 9500 }, { upTo: 80, price: 13500 }, { upTo: 120, price: 18500 }, { upTo: 150, price: 23500 }, { upTo: 180, price: 27500 }],
    unit: "per event",
    depositPercent: 50,
    balanceDays: 30,
    payOnline: true,
    party: { question: "How many guests?", label: "Number of guests", min: 10, max: 180, start: 50, quick: [30, 50, 80, 120, 180] },
    addons: [
      { id: "cabins", name: "Private cabins", note: "One or two cabins" },
      { id: "extra-hours", name: "Extra ranch hours" },
      { id: "horse-experience", name: "Two-horse experience" },
      { id: "ranch-session", name: "Ranch photo session", note: "1 hour, with horses and a videographer" },
      { id: "beach-session", name: "Beach photo session", note: "1.5 hours, with horses and a videographer" },
      { id: "open-bar", name: "Open bar" },
    ],
    photo: "ranch/long-table.jpg",
    photoPosition: "50% 50%",
    href: "/ranch-wedding-reception/",
    occasions: ["Wedding", "Anniversary"],
  },
  {
    id: "ranch-cabin-stay",
    name: "Private Ranch Cabin Stay",
    blurb: "Two private cabins at Rancho McCoy for up to four guests.",
    includes: ["Two private cabins", "Up to 4 guests in total, 2 per cabin", "Access to permitted ranch areas"],
    from: 425,
    unit: "per night",
    depositPercent: 50,
    stay: true,
    payOnline: true,
    party: { question: "How many guests?", label: "Number of guests", min: 1, max: 4, start: 2, quick: [1, 2, 3, 4] },
    addons: [
      { id: "chef", name: "Private chef" },
      { id: "photographer", name: "Photographer" },
      { id: "horses", name: "Horse experience" },
    ],
    photo: "ranch/cabin-facade.jpg",
    photoPosition: "50% 50%",
    href: "/ranch-cabin-stay/",
    occasions: ["Wedding", "Bachelorette", "Honeymoon", "Birthday", "Just Because"],
  },
  {
    id: "private-beach-horse-experience",
    name: "Private Beach Horse Experience",
    blurb: "A private experience for up to four participants, with four horses and a guide.",
    includes: ["Up to 4 participants", "Four horses", "Guide and coordination"],
    from: 1600,
    unit: "per experience",
    depositPercent: 50,
    payOnline: true,
    party: { question: "How many participants?", label: "Participants", min: 1, max: 4, start: 2, quick: [1, 2, 3, 4] },
    addons: [
      { id: "photographer", name: "Photographer" },
    ],
    photo: "ranch/rider-ranch.jpg",
    photoPosition: "50% 50%",
    href: "/private-beach-horse-experience/",
    occasions: ["Birthday", "Bachelorette", "Honeymoon", "Just Because"],
  },
  {
    id: "bachelorette-ranch-party",
    name: "Cabo Bachelorette Ranch Party",
    blurb: "A private ranch space with DJ and bartender, priced by group size from five to thirty.",
    includes: ["Private space at the ranch", "DJ and bartender", "Service staff", "Simple setup"],
    from: 1490,
    tiers: [{ upTo: 5, price: 1490 }, { upTo: 10, price: 1990 }, { upTo: 20, price: 2790 }, { upTo: 30, price: 3800 }],
    unit: "per group",
    depositPercent: 50,
    payOnline: true,
    party: { question: "How many guests?", label: "Number of guests", min: 1, max: 30, start: 5, quick: [5, 10, 15, 20, 30] },
    addons: [
      { id: "decoration", name: "Themed decoration" },
      { id: "drinks", name: "Drinks" },
      { id: "horses", name: "Horses" },
      { id: "photography", name: "Photography" },
      { id: "catering", name: "Catering" },
    ],
    photo: "ranch/white-set-horse.jpg",
    photoPosition: "50% 38%",
    href: "/bachelorette-ranch-party/",
    occasions: ["Bachelorette", "Birthday"],
  },
];

export const venues = [
  { name: "Your villa", photo: "venue-villa.jpg", text: "Terrace, pool deck or living room, styled before you arrive." },
  { name: "Hotel room", photo: "venue-hotel.jpg", text: "We coordinate with the hotel so the room is ready at check-in." },
  { name: "The beach", photo: "venue-beach.jpg", text: "Golden-hour setups with the Pacific behind you." },
  { name: "A yacht", photo: "venue-yacht.jpg", text: "Decor and details onboard for a celebration at sea." },
  { name: "Sunset ranch", photo: "venue-ranch.jpg", text: "Horse show, cabin and viewpoint, all to yourselves." },
];

export const addOns = [
  "Photographer",
  "Private chef",
  "Bartender",
  "Massage",
  "Mariachi",
  "Magician",
  "Custom cake",
  "Premium flowers",
];

export const steps = [
  { title: "Tell us the occasion and date", text: "A quick WhatsApp message is all it takes." },
  { title: "We send options and price", text: "Clear USD pricing, no surprises (except the good ones)." },
  { title: "We set up before you arrive", text: "Our team handles every detail, on site." },
  { title: "You walk in", text: "And everything is exactly as you imagined." },
];

export const gallery = Array.from({ length: 8 }, (_, i) => `gallery-${i + 1}.jpg`);

export const serviceSteps = [
  { title: "Message us", text: "Tell us the occasion and your date on WhatsApp." },
  { title: "We confirm date, venue and details", text: "You get clear options and a price in USD." },
  { title: "We set it up before you arrive", text: "You walk in and everything is ready." },
];

export type Proposal = {
  id: string;
  name: string;
  from: number;
  photo: string;
  intro: string;
  includes: string[];
};

export const proposals: Proposal[] = [
  {
    id: "villa",
    name: "Villa Proposal",
    from: 1190,
    photo: "proposal-villa.jpg",
    intro: "Private, intimate, and completely yours. We transform your villa terrace while you are out.",
    includes: [
      "Custom floral arch or heart backdrop",
      "Candles and rose-petal aisle",
      "Champagne and chocolate-dipped strawberries",
      "\"Marry me\" sign or letter lights",
      "On-site coordinator to cue the moment",
    ],
  },
  {
    id: "beach",
    name: "Beach Proposal at Sunset",
    from: 1650,
    photo: "proposal-beach.jpg",
    intro: "Toes in the sand, golden light, and the ocean as your witness.",
    includes: [
      "Private beach setup at golden hour",
      "Floral arch, lanterns and petal path",
      "Champagne toast and bites",
      "Permit and logistics handled",
      "On-site coordinator and hidden-spot planning",
    ],
  },
  {
    id: "ranch",
    name: "Ranch Proposal with horses & mariachi",
    from: 1990,
    photo: "proposal-ranch.jpg",
    intro: "Our signature. A private ranch at sunset, horses, and a live mariachi to celebrate the yes.",
    includes: [
      "Private ranch access at sunset",
      "Horse arrival or horse show",
      "Live mariachi after the question",
      "Styled viewpoint with florals and candles",
      "Champagne and toast setup",
    ],
  },
];

export const secretSteps = [
  { title: "One private chat", text: "You talk only to us, on WhatsApp. No group threads, no leaks." },
  { title: "Coded timeline", text: "We share a minute-by-minute plan with only the code names you choose." },
  { title: "Set up out of sight", text: "Decor is built while your partner is away, behind screens or in a closed-off area." },
  { title: "Photographer in disguise", text: "Our photographer blends in as staff or as a guest taking photos." },
  { title: "A cue only you know", text: "You give a signal, we start the moment. Nothing happens early." },
];

export const faqsFor = (depositPercent: number) => [
  {
    q: "How far in advance should I book?",
    a: "We recommend booking as early as you can, especially for weekends and sunset slots. Last-minute? Message us on WhatsApp and we will tell you what is possible.",
  },
  {
    q: "Can you set up at my hotel or villa?",
    a: "Where it applies, yes. We coordinate with your hotel, villa or residence so everything is ready. Share the name of the property and your dates. Some properties require approval, and we help arrange it.",
  },
  {
    q: "How do the deposit and payment work?",
    a: `A ${depositPercent}% deposit starts your booking. We then confirm availability and your final price, and send your booking confirmation with the total. If you cancel more than ${policy.refundDays} days before your date, your payment is refunded.`,
  },
  {
    q: "What if the weather changes?",
    a: "Rain is rare in Los Cabos, but we watch the forecast. If conditions are not right, we adjust the plan with you: a covered spot, a different time or a new date.",
  },
];

export const commonFaqs = faqsFor(policy.depositPercent);

export const proposalFaqs = [
  ...commonFaqs,
  {
    q: "Can you photograph the proposal without them knowing?",
    a: "Yes. Our photographer and videographer blend in and capture the build-up, the question and the reaction. It is our most popular add-on.",
  },
];


export const proposalAddOns = [
  { name: "Hidden photographer", text: "30–45 minutes of candid coverage, delivered in 48 hours." },
  { name: "Hidden video", text: "A short cinematic clip of the moment for you to relive." },
];
