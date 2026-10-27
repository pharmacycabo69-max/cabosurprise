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
  title: "Cabo Surprise | Surprise Planner in Los Cabos",
  description: site.description,
};

export const viewport: Viewport = { themeColor: "#FBF6EF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
