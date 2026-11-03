// Single source of truth for phone, prices and copy that changes often.
export const site = {
  name: "Cabo Surprise",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cabosurprise.com",
  // International format, digits only (52 = Mexico, 1 = mobile prefix for WhatsApp).
  whatsappNumber: "5216242261023",
  phoneDisplay: "+52 624 226 1023",
  // PLACEHOLDER: replace with the real domain inbox.
  email: "EMAIL@cabosurprise.com",
  instagram: "https://www.instagram.com/rancho_mccoy/",
  tagline: "Private experiences in Los Cabos.",
  description:
    "Private experiences and exclusive celebrations in Los Cabos: ranch weddings, chef-led dinners and horseback experiences, designed around you.",
};

// Policy numbers shown on /terms/ and in the FAQs. Edit here to change them everywhere.
export const policy = {
  depositPercent: 50,
  freeChangeDays: 7,
  fullRefundDays: 14,
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

export type Party = { question: string; label: string; min: number; max: number; start: number; quick: number[] };
export const defaultParty: Party = { question: "How many guests?", label: "Number of guests", min: 1, max: 999, start: 2, quick: [2, 10, 25, 50, 100] };

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
  /** "per experience", "per night"... shown next to the price. */
  unit?: string;
  /** Deposit % to hold the date. Defaults to policy.depositPercent. */
  depositPercent?: number;
  /** false = "Request a Custom Quote" only; the online deposit stays off until prices are validated. Default true. */
  payOnline?: boolean;
  /** What the guest-count step asks. */
  party?: Party;
  /** Multi-night stay: the visitor picks check-in and check-out, the price is per night. */
  stay?: boolean;
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
// Prices are proposals: validate with suppliers before turning payOnline on.
export const featuredPackages: Pkg[] = [
  {
    id: "private-anniversary-dinner",
    name: "Private Anniversary Dinner & Celebrations",
    blurb: "A romantic private dinner for two, with chef, flowers and candlelight.",
    includes: ["Private dinner for 2", "Chef", "Floral decoration and candles", "Setup and service"],
    from: 2000,
    unit: "per experience",
    depositPercent: 50,
    payOnline: false,
    party: { question: "How many guests?", label: "Number of guests", min: 2, max: 30, start: 2, quick: [2, 6, 10, 20, 30] },
    photo: "anniversary.jpg",
    href: "/private-anniversary-dinner/",
    occasions: ["Anniversary", "Honeymoon", "Proposal", "Just Because"],
  },
  {
    id: "private-beach-horse-photoshoot",
    name: "Private Beach Horse Photoshoot",
    blurb: "A private 90-minute session on the beach with two horses and a professional photographer.",
    includes: ["90-minute private session", "Two horses", "Professional photographer", "Coordination"],
    from: 1450,
    unit: "per session",
    depositPercent: 50,
    payOnline: false,
    party: { question: "How many people will be in the session?", label: "People in the session", min: 1, max: 99, start: 2, quick: [1, 2, 3, 4, 6] },
    photo: "proposals-hero.jpg",
    photoPosition: "50% 35%",
    href: "/private-beach-horse-photoshoot/",
    occasions: ["Proposal", "Honeymoon", "Anniversary", "Just Because"],
  },
  {
    id: "ranch-wedding-reception",
    name: "Exclusive Ranch Wedding Reception",
    blurb: "Exclusive use of Rancho McCoy for six hours, with dinner, DJ, lighting and service.",
    includes: ["Exclusive Rancho McCoy rental, 6 hours", "Furniture and decoration", "Dinner, DJ and lighting", "Service staff"],
    from: 9500,
    unit: "per event",
    depositPercent: 40,
    payOnline: false,
    party: { question: "How many guests?", label: "Number of guests", min: 1, max: 220, start: 50, quick: [40, 50, 80, 120, 220] },
    photo: "hero/flowers-wide.jpg",
    photoPosition: "50% 28%",
    href: "/ranch-wedding-reception/",
    occasions: ["Wedding", "Anniversary"],
  },
  {
    id: "ranch-cabin-stay",
    name: "Private Ranch Cabin Stay",
    blurb: "Two private cabins at Rancho McCoy for up to six guests.",
    includes: ["Two private cabins", "Up to 6 guests in total", "Access to permitted ranch areas"],
    from: 425,
    unit: "per night",
    depositPercent: 50,
    stay: true,
    payOnline: false,
    party: { question: "How many guests?", label: "Number of guests", min: 1, max: 6, start: 2, quick: [2, 4, 6] },
    photo: "venue-ranch.jpg",
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
    payOnline: false,
    party: { question: "How many participants?", label: "Participants", min: 1, max: 4, start: 2, quick: [1, 2, 3, 4] },
    photo: "hero/beach-horse-experience.jpg",
    photoPosition: "62% 50%",
    href: "/private-beach-horse-experience/",
    occasions: ["Birthday", "Bachelorette", "Honeymoon", "Just Because"],
  },
  {
    id: "bachelorette-ranch-party",
    name: "Cabo Bachelorette Ranch Party",
    blurb: "A private ranch space with DJ and bartender, a starter package for five.",
    includes: ["Private space at the ranch", "DJ and bartender", "Service staff", "Simple setup"],
    from: 1200,
    unit: "per group",
    depositPercent: 50,
    payOnline: false,
    party: { question: "How many guests?", label: "Number of guests", min: 1, max: 99, start: 5, quick: [5, 8, 10, 15, 20] },
    photo: "bachelorette.jpg",
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
    a: `A ${depositPercent}% deposit secures your date. The balance and the cancellation conditions are set out in your contract. We confirm the exact amounts and payment options with you on WhatsApp.`,
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
