import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import StickyNav from "@/components/StickyNav";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { site } from "@/config/site";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Cabo Surprise | Surprise Planner in Los Cabos",
  description: site.description,
  // Explicit icon set: Safari picks the .ico / apple-touch-icon and caches them hard, so the ?v bumps force a refetch.
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = { themeColor: "#FBF6EF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <StickyNav />
        {children}
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
