import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";

const ProductSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Product = mongoose.model("Product", ProductSchema);

const updates = [
  // POWDER — priced per gram
  {
    slug: "etomidate-powder-pure",
    price: 140,
    sizes: [
      { label: "20g", price: 140 },
      { label: "50g", price: 310 },
      { label: "100g", price: 550 },
      { label: "200g", price: 980 },
      { label: "500g", price: 2100 },
      { label: "1kg", price: 3800 },
    ],
  },
  {
    slug: "etomidate-powder-research",
    price: 110,
    sizes: [
      { label: "20g", price: 110 },
      { label: "50g", price: 245 },
      { label: "100g", price: 440 },
      { label: "200g", price: 790 },
      { label: "500g", price: 1700 },
      { label: "1kg", price: 3100 },
    ],
  },

  // VAPE — priced per pod
  {
    slug: "etomidate-vape-kpod-classic",
    price: 40,
    sizes: [
      { label: "1 Pod", price: 40 },
      { label: "3 Pods", price: 105 },
      { label: "5 Pods", price: 165 },
      { label: "10 Pods", price: 300 },
      { label: "20 Pods", price: 550 },
    ],
  },
  {
    slug: "etomidate-vape-kpod-strong",
    price: 50,
    sizes: [
      { label: "1 Pod", price: 50 },
      { label: "3 Pods", price: 135 },
      { label: "5 Pods", price: 210 },
      { label: "10 Pods", price: 380 },
      { label: "20 Pods", price: 700 },
    ],
  },

  // LIQUID — priced per ml
  {
    slug: "etomidate-liquid-solution-standard",
    price: 75,
    sizes: [
      { label: "20ml", price: 75 },
      { label: "50ml", price: 165 },
      { label: "100ml", price: 290 },
      { label: "250ml", price: 650 },
      { label: "500ml", price: 1150 },
    ],
  },
  {
    slug: "etomidate-liquid-concentrate",
    price: 120,
    sizes: [
      { label: "20ml", price: 120 },
      { label: "50ml", price: 265 },
      { label: "100ml", price: 470 },
      { label: "250ml", price: 1050 },
      { label: "500ml", price: 1850 },
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
      const range = u.sizes;
      console.log(`✅ ${result.name}: €${range[0].price} (${range[0].label}) → €${range[range.length-1].price} (${range[range.length-1].label})`);
    } else {
      console.log(`⚠️  Not found: ${u.slug}`);
    }
  }

  console.log("\n🎉 Done!");
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
