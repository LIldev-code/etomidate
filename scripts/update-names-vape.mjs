import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";
const Product = mongoose.model("Product", new mongoose.Schema({}, { strict: false }));

async function run() {
  await mongoose.connect(MONGODB_URI);

  // Rename Pure Grade Powder to include / Krystal
  const powder = await Product.findOneAndUpdate(
    { slug: "etomidate-powder-pure" },
    { $set: { name: "Pure Grade Powder / Krystal" } },
    { new: true }
  );
  if (powder) console.log(`✅ Renamed: ${powder.name}`);

  // Update all vape products: minimum 10 pods at €400
  const vapes = await Product.find({ category: "vape" }).lean();
  for (const v of vapes) {
    // Keep existing sizes but make first tier 10 pods at 400
    const newSizes = [
      { label: "10 Pods", price: 400 },
      { label: "25 Pods", price: 900 },
      { label: "50 Pods", price: 1600 },
      { label: "100 Pods", price: 2800 },
    ];
    await Product.findByIdAndUpdate(v._id, { $set: { sizes: newSizes, price: 400 } });
    console.log(`✅ ${v.name}: 10 Pods → €400 | 25 Pods → €900 | 50 Pods → €1600 | 100 Pods → €2800`);
  }

  console.log("\n🎉 Done!");
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
