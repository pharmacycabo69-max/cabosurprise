import type { Metadata } from "next";
import { site } from "@/config/site";

export function pageMeta(o: {
  title: string;
  description: string;
  path: string;
  og: string;
  keywords?: string[];
  index?: boolean;
}): Metadata {
  return {
    title: { absolute: o.title },
    description: o.description,
    keywords: o.keywords,
    alternates: { canonical: o.path },
    robots: o.index === false ? { index: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: o.title,
      description: o.description,
      url: `${site.url}${o.path}`,
      images: [{ url: `/photos/${o.og}`, width: 1200, height: 630, alt: o.title }],
    },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, images: [`/photos/${o.og}`] },
  };
}
