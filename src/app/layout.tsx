import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { site } from "@/config/site";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Cabo Surprise | Birthday, Proposal & Room Decor in Los Cabos", template: "%s | Cabo Surprise" },
  description: site.description,
  keywords: ["proposal in cabo", "cabo birthday surprise", "bachelorette cabo decor", "cabo room decoration", "los cabos surprise planner"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Surprise someone in Cabo.",
    description: site.description,
    url: site.url,
    images: [{ url: "/photos/og.jpg", width: 1200, height: 630, alt: "Surprise setup in Los Cabos" }],
  },
  twitter: { card: "summary_large_image", title: "Surprise someone in Cabo.", description: site.description, images: ["/photos/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#FBF6EF" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  description: site.description,
  image: `${site.url}/photos/og.jpg`,
  email: site.email,
  areaServed: "Los Cabos, Baja California Sur, Mexico",
  address: { "@type": "PostalAddress", addressLocality: "Cabo San Lucas", addressRegion: "BCS", addressCountry: "MX" },
  priceRange: "$$",
  sameAs: [site.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
