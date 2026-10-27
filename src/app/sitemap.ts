import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/proposals"].map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p ? 0.8 : 1 }));
}
