import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ShopClient from "@/components/ShopClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop Etomidate Products — Powder, Vape & Liquid",
  description:
    "Browse and order pharmaceutical-grade etomidate powder, K-Pods vape cartridges, and liquid solutions. All products lab-tested with ≥99.8% purity and COA certified. Multiple sizes available.",
  keywords: [
    "buy etomidate powder",
    "etomidate vape for sale",
    "etomidate liquid solution",
    "order etomidate online",
    "K-Pods vape cartridge",
    "etomidate shop",
    "research chemical store",
  ],
  openGraph: {
    title: "Shop Etomidate Products — Powder, Vape & Liquid",
    description:
      "Pharmaceutical-grade etomidate in powder, vape & liquid forms. Lab-tested, COA included. Order now with discreet worldwide shipping.",
    url: "https://buyetomidateonline.com/shop",
  },
  alternates: {
    canonical: "https://buyetomidateonline.com/shop",
  },
};

export default async function ShopPage() {
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

  return <ShopClient products={products} />;
}
