import mongoose from "mongoose";
const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";
const Product = mongoose.model("Product", new mongoose.Schema({}, { strict: false }));
async function run() {
  await mongoose.connect(MONGODB_URI);
  const products = await Product.find({ category: "powder" }).lean();
  products.forEach(p => console.log(`\n${p.name}\nSlug: ${p.slug}\nShort: ${p.shortDescription}\nDesc: ${p.description?.slice(0,100)}`));
  await mongoose.disconnect();
}
run().catch(console.error);
