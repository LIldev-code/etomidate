import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/etomidate";

// ─── Inline schemas (can't use Next.js aliases in standalone script) ───

const SizeSchema = new mongoose.Schema(
  { label: String, price: Number },
  { _id: false }
);

const ProductSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  name: String,
  price: Number,
  category: String,
  shortDescription: String,
  description: String,
  specifications: [String],
  sizes: [SizeSchema],
  inStock: { type: Boolean, default: true },
  image: String,
});

const SettingsSchema = new mongoose.Schema({
  key: { type: String, default: "main", unique: true },
  siteName: String,
  tagline: String,
  heroSubtitle: String,
  contactEmail: String,
  contactPhone: String,
  shippingNote: String,
  aboutText: String,
  announcement: String,
});

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
const Settings = mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

// ─── Seed Data ───

const products = [
  {
    slug: "etomidate-powder",
    name: "Etomidate Powder",
    price: 150.0,
    category: "powder",
    shortDescription:
      "Pharmaceutical-grade etomidate powder, 99.8% purity. Ideal for research and compounding.",
    description:
      "Our Etomidate Powder is sourced directly from certified laboratories and undergoes rigorous third-party testing to guarantee 99.8%+ purity. Each batch is sealed in moisture-resistant packaging to preserve potency. Available in 5g, 25g, and 100g quantities. Certificate of Analysis (COA) included with every order.",
    specifications: [
      "Purity: ≥99.8%",
      "Form: Fine crystalline powder",
      "CAS Number: 33125-97-2",
      "Molecular Formula: C₁₄H₁₆N₂O₂",
      "Storage: Cool, dry place away from light",
    ],
    sizes: [
      { label: "5g", price: 150 },
      { label: "25g", price: 600 },
      { label: "100g", price: 2000 },
    ],
    inStock: true,
    image: "/images/powder.jpg",
  },
  {
    slug: "etomidate-kpods",
    name: "Etomidate K-Pods (Vape)",
    price: 45.0,
    category: "vape",
    shortDescription:
      "Pre-filled etomidate vape pods — smooth, discreet, and ready to use. Compatible with most pod systems.",
    description:
      "Etomidate K-Pods deliver a precise, consistent dose in a sleek vape format. Each pod is pre-filled with lab-tested etomidate e-liquid and sealed for freshness. The ceramic coil ensures smooth vapor with no harsh burn. Sold individually or in packs of 3 and 5.",
    specifications: [
      "Volume: 1ml per pod",
      "Concentration: Standard formulation",
      "Coil: Ceramic mesh",
      "Compatibility: Universal 510 & proprietary pod systems",
      "Puffs: ~300 per pod",
    ],
    sizes: [
      { label: "1 Pod", price: 45 },
      { label: "3-Pack", price: 120 },
      { label: "5-Pack", price: 185 },
    ],
    inStock: true,
    image: "/images/kpods.jpg",
  },
  {
    slug: "etomidate-liquid",
    name: "Etomidate Liquid Solution",
    price: 200.0,
    category: "liquid",
    shortDescription:
      "Ready-to-use etomidate liquid solution — lab-tested, precisely dosed, and sealed for safety.",
    description:
      "Our Etomidate Liquid Solution is prepared under strict laboratory conditions with pharmaceutical-grade solvents. Every vial is individually sealed, labeled with lot number, and ships with a Certificate of Analysis. Perfect for researchers and licensed practitioners who need a ready-to-use formulation.",
    specifications: [
      "Concentration: 2 mg/ml (standard)",
      "Volume: 10ml / 50ml / 100ml",
      "Solvent: Propylene glycol base",
      "Appearance: Clear, colorless to pale yellow",
      "Storage: Refrigerate after opening",
    ],
    sizes: [
      { label: "10ml Vial", price: 200 },
      { label: "50ml Vial", price: 850 },
      { label: "100ml Vial", price: 1500 },
    ],
    inStock: true,
    image: "/images/liquid.jpg",
  },
];

const settings = {
  key: "main",
  siteName: "BuyEtomidateOnline",
  tagline: "Premium Etomidate Products — Trusted Worldwide",
  heroSubtitle:
    "We supply pharmaceutical-grade etomidate powder, K-Pods vape, and liquid solutions to researchers and licensed buyers across the globe. Fast, discreet shipping with every order.",
  contactEmail: "orders@buyetomidateonline.com",
  contactPhone: "+1 (555) 902-4481",
  shippingNote:
    "All orders are shipped within 24 hours via tracked, discreet packaging. International delivery available.",
  aboutText:
    "BuyEtomidateOnline has been a trusted name in the research chemical industry since 2019. We work directly with GMP-certified laboratories to source only the highest-purity etomidate products. Our team includes licensed chemists and logistics specialists who ensure every order meets strict quality and safety standards before it leaves our facility.",
  announcement: "Free shipping on orders over $500 — limited time offer!",
};

// ─── Run Seed ───

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  // Products
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products.`);

  // Settings
  await Settings.deleteMany({});
  await Settings.create(settings);
  console.log("Seeded site settings.");

  // Admin (username: admin, password: admin123)
  await Admin.deleteMany({});
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await Admin.create({ username: "admin", password: hashedPassword });
  console.log('Seeded admin user (username: "admin", password: "admin123").');

  await mongoose.disconnect();
  console.log("Done! Database seeded successfully.");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
