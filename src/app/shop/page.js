import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ShopClient from "@/components/ShopClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop Etomidate & K-Pods — Powder, Vape Cartridges & Liquid",
  description:
    "Buy etomidate powder, K-Pods vape cartridges & liquid solutions. Browse all etomidate products — lab-tested ≥99.8% purity, COA certified. Multiple quantities available with discreet shipping.",
  keywords: [
    "buy etomidate powder",
    "etomidate vape for sale",
    "buy K-Pods",
    "K-Pods vape cartridge",
    "K-Pods etomidate",
    "etomidate vape cartridge",
    "etomidate pod",
    "etomidate liquid solution",
    "order etomidate online",
    "etomidate shop",
    "buy etomidate vape",
    "research chemical store",
  ],
  openGraph: {
    title: "Shop Etomidate & K-Pods — Powder, Vape & Liquid",
    description:
      "Buy etomidate powder, K-Pods vape cartridges & liquid online. Lab-tested, COA included. Order now with discreet worldwide shipping.",
    url: "https://buyetomidateproducts.com/shop",
  },
  alternates: {
    canonical: "https://buyetomidateproducts.com/shop",
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
