import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";
const ProductSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Product = mongoose.model("Product", ProductSchema);

// Each powder gets 100g, 250g, 500g, 1kg
// Price scales: 100g = base, 250g ~2.2x, 500g ~3.8x, 1kg ~6.5x
const updates = [
  {
    slug: "etomidate-powder-pure",
    sizes: [
      { label: "100g", price: 550 },
      { label: "250g", price: 1200 },
      { label: "500g", price: 2100 },
      { label: "1kg", price: 3800 },
    ],
    price: 550,
  },
  {
    slug: "etomidate-powder-research",
    sizes: [
      { label: "100g", price: 440 },
      { label: "250g", price: 980 },
      { label: "500g", price: 1700 },
      { label: "1kg", price: 3100 },
    ],
    price: 440,
  },
  {
    slug: "etomidate-powder-ultra-fine",
    sizes: [
      { label: "100g", price: 620 },
      { label: "250g", price: 1350 },
      { label: "500g", price: 2400 },
      { label: "1kg", price: 4200 },
    ],
    price: 620,
  },
  {
    slug: "etomidate-powder-bulk",
    sizes: [
      { label: "100g", price: 170 },
      { label: "250g", price: 380 },
      { label: "500g", price: 680 },
      { label: "1kg", price: 1200 },
    ],
    price: 170,
  },
  {
    slug: "etomidate-powder-pharma-grade",
    sizes: [
      { label: "100g", price: 780 },
      { label: "250g", price: 1700 },
      { label: "500g", price: 3100 },
      { label: "1kg", price: 5500 },
    ],
    price: 780,
  },
  {
    slug: "etomidate-powder-sample-kit",
    sizes: [
      { label: "100g", price: 450 },
      { label: "250g", price: 1000 },
      { label: "500g", price: 1800 },
      { label: "1kg", price: 3200 },
    ],
    price: 450,
  },
];

async function run() {
  console.log("Connecting...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!\n");

  for (const u of updates) {
    const result = await Product.findOneAndUpdate(
      { slug: u.slug },
      { $set: { sizes: u.sizes, price: u.price } },
      { new: true }
    );
    if (result) {
      console.log(`✅ ${result.name}: ${u.sizes.map(s => s.label).join(", ")}`);
    } else {
      console.log(`⚠️  Not found: ${u.slug}`);
    }
  }

  console.log("\n🎉 Done!");
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
