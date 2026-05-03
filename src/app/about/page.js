import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import AboutClient from "@/components/AboutClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us — Quality Standards & Our Mission",
  description:
    "BuyEtomidateProducts.com has been a trusted name in pharmaceutical-grade etomidate since 2019. Learn about our GMP-certified lab sourcing, rigorous quality testing, and commitment to ≥99.8% purity with every product.",
  keywords: [
    "about BuyEtomidateProducts",
    "etomidate quality standards",
    "GMP certified etomidate",
    "etomidate supplier history",
    "trusted etomidate source",
    "pharmaceutical grade research chemicals",
  ],
  openGraph: {
    title: "About BuyEtomidateProducts — Quality & Trust Since 2019",
    description:
      "GMP-certified lab sourcing, ≥99.8% purity, COA with every order. Learn why researchers worldwide trust BuyEtomidateProducts.com.",
    url: "https://buyetomidateproducts.com/about",
  },
  alternates: {
    canonical: "https://buyetomidateproducts.com/about",
  },
};

export default async function AboutPage() {
  await dbConnect();
  let siteSettings = await Settings.findOne({ key: "main" }).lean();
  if (!siteSettings) {
    siteSettings = { aboutText: "" };
  }

  return <AboutClient aboutText={siteSettings.aboutText || ""} />;
}
