import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import SocialFloat from "@/components/SocialFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://buyetomidateonline.com"),
  title: {
    default: "Buy Etomidate Online — Powder, K-Pods Vape & Liquid | BuyEtomidateOnline.com",
    template: "%s | BuyEtomidateOnline.com",
  },
  description:
    "Buy etomidate powder, K-Pods vape cartridges & liquid solutions online. Lab-tested ≥99.8% purity. Etomidate K-Pods, etomidate vape, etomidate powder — COA certified, discreet worldwide shipping.",
  keywords: [
    "etomidate",
    "buy etomidate",
    "buy etomidate online",
    "etomidate online",
    "etomidate powder",
    "etomidate vape",
    "etomidate K-Pods",
    "K-Pods vape",
    "K-Pods etomidate",
    "buy K-Pods",
    "etomidate liquid",
    "etomidate cartridge",
    "etomidate vape cartridge",
    "research chemicals",
    "pharmaceutical grade etomidate",
    "lab tested etomidate",
    "COA certified",
    "discreet shipping",
  ],
  authors: [{ name: "BuyEtomidateOnline.com" }],
  creator: "BuyEtomidateOnline.com",
  publisher: "BuyEtomidateOnline.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buyetomidateonline.com",
    siteName: "BuyEtomidateOnline.com",
    title: "Buy Etomidate Online — Powder, K-Pods Vape & Liquid",
    description:
      "Buy etomidate powder, K-Pods vape cartridges & liquid solutions. ≥99.8% purity, COA included, discreet worldwide shipping within 24h.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Etomidate & K-Pods Online — Powder, Vape & Liquid",
    description:
      "Buy etomidate powder, K-Pods vape cartridges & liquid online. Lab-tested ≥99.8% purity. Ships worldwide within 24 hours.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://buyetomidateonline.com",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {},
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SocialFloat />
      </body>
    </html>
  );
}
