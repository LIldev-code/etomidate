import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";

const ProductSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Product = mongoose.model("Product", ProductSchema);

const updates = [
  {
    slug: "etomidate-powder-pure",
    name: "Etomidate Powder — Pure Grade",
    price: 150,
    sizes: [
      { label: "20g", price: 150 },
      { label: "50g", price: 320 },
      { label: "100g", price: 580 },
      { label: "250g", price: 1200 },
    ],
  },
  {
    slug: "etomidate-powder-research",
    name: "Etomidate Research Powder",
    price: 120,
    sizes: [
      { label: "20g", price: 120 },
      { label: "50g", price: 260 },
      { label: "100g", price: 470 },
      { label: "250g", price: 980 },
    ],
  },
  {
    slug: "etomidate-vape-kpod-classic",
    name: "K-Pod Vape Cartridge — Classic",
    price: 45,
    sizes: [
      { label: "1 Pod", price: 45 },
      { label: "3 Pods", price: 120 },
      { label: "5 Pods", price: 185 },
      { label: "10 Pods", price: 340 },
    ],
  },
  {
    slug: "etomidate-vape-kpod-strong",
    name: "K-Pod Vape Cartridge — Strong",
    price: 55,
    sizes: [
      { label: "1 Pod", price: 55 },
      { label: "3 Pods", price: 145 },
      { label: "5 Pods", price: 230 },
      { label: "10 Pods", price: 420 },
    ],
  },
  {
    slug: "etomidate-liquid-solution-standard",
    name: "Etomidate Liquid Solution — Standard",
    price: 85,
    sizes: [
      { label: "20ml", price: 85 },
      { label: "50ml", price: 180 },
      { label: "100ml", price: 320 },
      { label: "250ml", price: 700 },
    ],
  },
  {
    slug: "etomidate-liquid-concentrate",
    name: "Etomidate Liquid Concentrate",
    price: 130,
    sizes: [
      { label: "20ml", price: 130 },
      { label: "50ml", price: 280 },
      { label: "100ml", price: 500 },
      { label: "250ml", price: 1050 },
    ],
  },
];

async function run() {
  console.log("Connecting...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!\n");

  for (const u of updates) {
    const result = await Product.findOneAndUpdate(
      { slug: u.slug },
      { $set: { price: u.price, sizes: u.sizes } },
      { new: true }
    );
    if (result) {
      console.log(`✅ Updated: ${u.name} — starts at €${u.price}`);
    } else {
      console.log(`⚠️  Not found: ${u.slug}`);
    }
  }

  console.log("\n🎉 Done!");
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
