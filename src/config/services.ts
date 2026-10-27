// Landing pages for ads. Each one gets its own page, packages, gallery and WhatsApp message.
export type Service = {
  slug: "birthday" | "bachelorette" | "honeymoon" | "packages";
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  heroPhoto: string;
  heroSubtitle: string;
  cta: string;
  packageIds: string[];
  message: string;
  galleryTitle: string;
  gallery: string[];
  og: string;
  note?: string;
};

export const services: Record<Service["slug"], Service> = {
  birthday: {
    slug: "birthday",
    path: "/birthday/",
    metaTitle: "Birthday Surprise Setups in Cabo | Cabo Surprise",
    metaDescription:
      "Plan a birthday surprise in Cabo: room setup, personalized balloons, cake and flowers at your villa, hotel or yacht in Los Cabos. Packages from $190 USD.",
    keywords: ["cabo birthday surprise", "birthday decor cabo", "birthday setup los cabos"],
    h1: "Birthday surprises in Cabo.",
    intro:
      "Their name in balloons, a cake and a room full of flowers, set up before they walk in. You enjoy the reveal while we handle every detail.",
    heroPhoto: "birthday/hero.jpg",
    heroSubtitle: "Balloons, cake and flowers, ready before they walk in.",
    cta: "Plan the birthday",
    packageIds: ["birthday", "welcome", "mariachi"],
    message: "Hi, I'd like to plan a birthday surprise in Cabo on [date].",
    galleryTitle: "Birthday setups",
    gallery: ["birthday/gallery-1.jpg", "birthday/gallery-2.jpg", "birthday/gallery-3.jpg", "birthday/gallery-4.jpg"],
    og: "og-birthday.jpg",
  },
  bachelorette: {
    slug: "bachelorette",
    path: "/bachelorette/",
    metaTitle: "Bachelorette Decor in Cabo San Lucas | Cabo Surprise",
    metaDescription:
      "Bachelorette decor in Cabo: room setup and bride-to-be styling at your villa or hotel in Los Cabos, ready when your group arrives. From $390 USD.",
    keywords: ["bachelorette cabo decor", "cabo bachelorette party setup", "girls trip cabo decor"],
    h1: "Bachelorette decor in Cabo.",
    intro:
      "Pink, loud and unforgettable. We style your villa or hotel room for the bride-to-be and her crew before the group arrives.",
    heroPhoto: "bachelorette/hero.jpg",
    heroSubtitle: "Room decor and a bride-to-be setup, ready when your group arrives.",
    cta: "Plan the bachelorette",
    packageIds: ["bachelorette", "welcome", "mariachi"],
    message: "Hi, I'd like to plan a bachelorette setup in Cabo on [date].",
    galleryTitle: "Bachelorette and girls trip setups",
    gallery: ["bachelorette/gallery-1.jpg", "bachelorette/gallery-2.jpg", "bachelorette/gallery-3.jpg", "bachelorette/gallery-4.jpg"],
    og: "og-bachelorette.jpg",
    note: "Optional add-on: next-morning recovery IV, available on request.",
  },
  honeymoon: {
    slug: "honeymoon",
    path: "/honeymoon/",
    metaTitle: "Honeymoon & Anniversary Setups in Los Cabos | Cabo Surprise",
    metaDescription:
      "Honeymoon and anniversary setups in Los Cabos: rose petals, candles, champagne or a private chef dinner on your terrace. Packages from $340 USD.",
    keywords: ["cabo honeymoon setup", "cabo room decoration", "anniversary dinner cabo"],
    h1: "Honeymoon & anniversary setups in Cabo.",
    intro:
      "Rose petals, candles and champagne, or a private chef dinner on your own terrace. We prepare the room or the table so you arrive to something special.",
    heroPhoto: "honeymoon/hero.jpg",
    heroSubtitle: "Candlelight, petals and champagne, set up before you arrive.",
    cta: "Plan our night",
    packageIds: ["honeymoon", "anniversary", "welcome"],
    message: "Hi, I'd like to plan a honeymoon or anniversary setup in Cabo on [date].",
    galleryTitle: "Romantic setups",
    gallery: ["honeymoon/gallery-1.jpg", "honeymoon/gallery-2.jpg", "honeymoon/gallery-3.jpg", "honeymoon/gallery-4.jpg"],
    og: "og-honeymoon.jpg",
  },
  packages: {
    slug: "packages",
    path: "/packages/",
    metaTitle: "Surprise Packages in Los Cabos | Cabo Surprise",
    metaDescription:
      "Surprise packages in Los Cabos: welcome setups, birthdays, bachelorettes, honeymoons, anniversary dinners and mariachi serenades. From $190 USD.",
    keywords: ["cabo room decoration", "los cabos surprise packages", "cabo celebration setup"],
    h1: "Surprise packages in Los Cabos.",
    intro:
      "Pick a package, tell us your date and where you are staying. We set everything up at your villa, hotel, beach, yacht or sunset ranch.",
    heroPhoto: "packages/hero.jpg",
    heroSubtitle: "Setups for every celebration, ready before you walk in.",
    cta: "Plan my surprise",
    packageIds: ["welcome", "birthday", "bachelorette", "honeymoon", "anniversary", "mariachi"],
    message: "Hi, I'd like to plan a surprise in Cabo on [date].",
    galleryTitle: "From our setups",
    gallery: ["packages/gallery-1.jpg", "packages/gallery-2.jpg", "packages/gallery-3.jpg", "packages/gallery-4.jpg"],
    og: "og-packages.jpg",
  },
};

export const proposalGallery = [
  "proposals/gallery-1.jpg",
  "proposals/gallery-2.jpg",
  "proposals/gallery-3.jpg",
  "proposals/gallery-4.jpg",
];
