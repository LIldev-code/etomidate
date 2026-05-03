export const dynamic = "force-dynamic";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function sitemap() {
  const baseUrl = "https://buyetomidateproducts.com";

  let productUrls = [];
  try {
    await dbConnect();
    const products = await Product.find({}).lean();
    productUrls = products.map((p) => ({
      url: `${baseUrl}/shop/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // DB unavailable during build — skip product URLs
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...productUrls,
  ];
}
