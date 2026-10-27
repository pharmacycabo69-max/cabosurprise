// Single source of truth for phone, prices and copy that changes often.
export const site = {
  name: "Cabo Surprise",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cabosurprise.com",
  // International format, digits only (52 = Mexico, 1 = mobile prefix for WhatsApp).
  whatsappNumber: "5216242261023",
  phoneDisplay: "+52 624 226 1023",
  // PLACEHOLDER: replace with the real domain inbox.
  email: "EMAIL@cabosurprise.com",
  instagram: "https://instagram.com/cabosurprise",
  tagline: "Surprise someone in Cabo.",
  description:
    "Room decor, flowers, cakes and proposals in Los Cabos, set up at your villa, hotel, yacht or private ranch before you walk in.",
};

// Policy numbers shown on /terms/ and in the FAQs. Edit here to change them everywhere.
export const policy = {
  depositPercent: 50,
  freeChangeDays: 7,
  fullRefundDays: 14,
};

export const occasions = [
  "Birthday",
  "Anniversary",
  "Bachelorette",
  "Honeymoon",
  "Proposal",
  "Quinceañera",
  "Just Because",
] as const;
export type Occasion = (typeof occasions)[number];

export type Pkg = {
  id: string;
  name: string;
  blurb: string;
  includes: string[];
  from: number;
  photo: string;
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
    photo: "welcome.jpg",
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

export const commonFaqs = [
  {
    q: "How far in advance should I book?",
    a: "We recommend two to three weeks, especially for weekends and sunset slots. Last-minute? Message us on WhatsApp and we will tell you what is possible.",
  },
  {
    q: "Can you set up inside my hotel room?",
    a: "Yes. We coordinate with your hotel or villa so everything is ready before you arrive. Share the hotel name, the reservation name and your check-in time. Some hotels require approval, and we help arrange it.",
  },
  {
    q: "How do the deposit and payment work?",
    a: `A ${policy.depositPercent}% deposit secures your date and the balance is due before the setup. We confirm exact amounts and payment options with you on WhatsApp. Full details are in our Terms.`,
  },
  {
    q: "What if it rains at the beach?",
    a: "Rain is rare in Los Cabos, but we watch the forecast. If conditions are not right, we move the setup to a covered spot, shift the time, or reschedule at no extra charge.",
  },
];

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
