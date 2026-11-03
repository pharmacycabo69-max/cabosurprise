import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const pages: [string, number][] = [
  ["/", 1],
  ["/proposals/", 0.9],
  ["/birthday/", 0.9],
  ["/bachelorette/", 0.9],
  ["/honeymoon/", 0.9],
  ["/packages/", 0.9],
  ["/anniversary-dinner/", 0.8],
  ["/beach-horse-photo-session/", 0.8],
  ["/wedding-reception/", 0.8],
  ["/ranch-cabin-stay/", 0.8],
  ["/beach-horse-activity/", 0.8],
  ["/quote/", 0.8],
  ["/iv-therapy/", 0.8],
  ["/pharmacy-delivery/", 0.8],
  ["/consultations/", 0.8],
  ["/privacy/", 0.3],
  ["/terms/", 0.3],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(([p, priority]) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority }));
}
