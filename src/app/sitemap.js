import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function sitemap() {
  const baseUrl = "https://buyetomidateonline.com";

  await dbConnect();
  const products = await Product.find({}).lean();

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/shop/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

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
