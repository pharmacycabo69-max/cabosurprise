import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const pages: [string, number][] = [
  ["/", 1],
  ["/proposals/", 0.9],
  ["/birthday/", 0.9],
  ["/bachelorette/", 0.9],
  ["/honeymoon/", 0.9],
  ["/packages/", 0.9],
  ["/private-anniversary-dinner/", 0.9],
  ["/private-beach-horse-photoshoot/", 0.9],
  ["/ranch-wedding-reception/", 0.9],
  ["/ranch-cabin-stay/", 0.9],
  ["/private-beach-horse-experience/", 0.9],
  ["/bachelorette-ranch-party/", 0.9],
  ["/quote/", 0.8],
  ["/privacy/", 0.3],
  ["/terms/", 0.3],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(([p, priority]) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority }));
}
