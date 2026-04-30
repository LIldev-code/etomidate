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
    default: "BuyEtomidateOnline.com — Premium Etomidate Powder, Vape & Liquid",
    template: "%s | BuyEtomidateOnline.com",
  },
  description:
    "The most trusted source for pharmaceutical-grade etomidate. Lab-tested ≥99.8% purity powder, K-Pods vape cartridges & liquid solutions. COA with every order. Fast, discreet worldwide shipping.",
  keywords: [
    "etomidate",
    "buy etomidate",
    "etomidate online",
    "etomidate powder",
    "etomidate vape",
    "etomidate liquid",
    "research chemicals",
    "K-Pods",
    "pharmaceutical grade",
    "lab tested",
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
    title: "BuyEtomidateOnline.com — Premium Etomidate Products",
    description:
      "Pharmaceutical-grade etomidate powder, vape & liquid. ≥99.8% purity, COA included, discreet worldwide shipping within 24h.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuyEtomidateOnline.com — Premium Etomidate Products",
    description:
      "Lab-tested etomidate powder, K-Pods vape & liquid. Ships worldwide within 24 hours.",
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
