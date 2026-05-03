import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Settings from "@/models/Settings";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Buy Etomidate Online — Powder, K-Pods Vape & Liquid",
  description:
    "Buy etomidate powder, K-Pods vape cartridges & liquid solutions online. Lab-tested ≥99.8% purity. Etomidate K-Pods, etomidate vape pods — COA certified, fast discreet worldwide shipping within 24h.",
  keywords: [
    "buy etomidate online",
    "etomidate powder",
    "etomidate for sale",
    "etomidate vape",
    "etomidate K-Pods",
    "K-Pods vape",
    "K-Pods etomidate",
    "buy K-Pods online",
    "buy etomidate vape",
    "etomidate vape cartridge",
    "etomidate pod",
    "etomidate liquid solution",
    "pharmaceutical grade etomidate",
    "research chemical etomidate",
    "etomidate supplier",
    "order etomidate",
    "etomidate COA",
    "high purity etomidate",
    "discreet etomidate shipping",
    "etomidate worldwide delivery",
  ],
  openGraph: {
    title: "Buy Etomidate & K-Pods Online — Powder, Vape & Liquid",
    description:
      "Buy etomidate powder, K-Pods vape cartridges & liquid online. ≥99.8% purity, lab-tested with COA. Fast discreet shipping worldwide.",
    url: "https://buyetomidateonline.com",
    siteName: "BuyEtomidateOnline.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Etomidate Online — Powder, Vape & Liquid",
    description:
      "Pharmaceutical-grade etomidate. ≥99.8% purity, lab-tested, COA included. Ships worldwide within 24 hours.",
  },
  alternates: {
    canonical: "https://buyetomidateonline.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Home() {
  await dbConnect();
  const productsRaw = await Product.find({}).lean();
  const products = productsRaw.map((p) => ({
    _id: p._id.toString(),
    name: p.name || "",
    slug: p.slug || "",
    price: p.price || 0,
    category: p.category || "",
    shortDescription: p.shortDescription || "",
    description: p.description || "",
    specifications: p.specifications || [],
    sizes: (p.sizes || []).map((s) => ({ label: s.label, price: s.price })),
    inStock: p.inStock ?? true,
    image: p.image || "",
  }));

  let raw = await Settings.findOne({ key: "main" }).lean();
  const siteSettings = {
    announcement: raw?.announcement || "",
    heroSubtitle: raw?.heroSubtitle || "",
    siteName: raw?.siteName || "BuyEtomidateOnline",
    tagline: raw?.tagline || "",
  };

  return <HomeClient products={products} siteSettings={siteSettings} />;
}
