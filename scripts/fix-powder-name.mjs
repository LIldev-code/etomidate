import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";
const Product = mongoose.model("Product", new mongoose.Schema({}, { strict: false }));

async function run() {
  await mongoose.connect(MONGODB_URI);
  // Revert product name back to just "Pure Grade Powder"
  const result = await Product.findOneAndUpdate(
    { slug: "etomidate-powder-pure" },
    { $set: { name: "Pure Grade Powder" } },
    { new: true }
  );
  if (result) console.log(`✅ Reverted to: ${result.name}`);
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
