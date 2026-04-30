import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";
const Product = mongoose.model("Product", new mongoose.Schema({}, { strict: false }));

const sizes = [
  { label: "100g", price: 550 },
  { label: "250g", price: 1200 },
  { label: "500g", price: 2100 },
  { label: "1kg", price: 3800 },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  const result = await Product.updateMany(
    { category: "powder" },
    { $set: { sizes, price: 550 } }
  );
  console.log(`✅ Updated ${result.modifiedCount} powder products`);
  console.log("   All now: 100g → €550 | 250g → €1200 | 500g → €2100 | 1kg → €3800");
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
