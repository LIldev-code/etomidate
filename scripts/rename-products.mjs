import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";

const ProductSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Product = mongoose.model("Product", ProductSchema);

const renames = [
  // POWDER
  { slug: "etomidate-powder-pure", name: "Pure Grade Powder", shortDescription: "High-purity crystalline powder verified at ≥99.8% via HPLC, ideal for precision research." },
  { slug: "etomidate-powder-research", name: "Research Grade Powder", shortDescription: "Reliable research-grade powder suitable for laboratory studies and analytical work." },
  { slug: "etomidate-powder-ultra-fine", name: "Ultra-Fine Powder", shortDescription: "Micronized sub-10μm powder for enhanced solubility and rapid dissolution in solvents." },
  { slug: "etomidate-powder-bulk", name: "Economy Bulk Powder", shortDescription: "Cost-effective bulk powder for large-scale institutional and academic use." },
  { slug: "etomidate-powder-pharma-grade", name: "Pharma-Grade Powder", shortDescription: "Highest-grade GMP-manufactured powder meeting European Pharmacopoeia standards." },
  { slug: "etomidate-powder-sample-kit", name: "Sample Evaluation Kit", shortDescription: "Starter kit with three different powder grades for quality comparison and evaluation." },

  // VAPE
  { slug: "etomidate-vape-kpod-classic", name: "Classic Pod Cartridge", shortDescription: "Standard-strength ceramic coil pod cartridge with smooth, consistent vapor delivery." },
  { slug: "etomidate-vape-kpod-strong", name: "Strong Pod Cartridge", shortDescription: "Higher-concentration pod cartridge for experienced users seeking stronger effects." },
  { slug: "etomidate-vape-disposable-mini", name: "Disposable Mini Vape", shortDescription: "Compact pre-charged single-use vaporizer, ready to use straight out of the box." },
  { slug: "etomidate-vape-kpod-menthol", name: "Menthol Pod Cartridge", shortDescription: "Menthol-infused cartridge with natural peppermint extract for a cool, refreshing draw." },
  { slug: "etomidate-vape-starter-kit", name: "Vape Starter Kit", shortDescription: "Complete all-in-one kit with battery, USB-C charger, and two pod cartridges included." },
  { slug: "etomidate-vape-kpod-max", name: "MAX Double Cartridge", shortDescription: "Double-capacity 2.0ml cartridge with dual-coil system for extended use and thicker vapor." },

  // LIQUID
  { slug: "etomidate-liquid-solution-standard", name: "Standard Liquid Solution", shortDescription: "Pharmaceutical-grade liquid solution in propylene glycol base for general research use." },
  { slug: "etomidate-liquid-concentrate", name: "Concentrated Liquid", shortDescription: "High-concentration liquid formula for advanced applications requiring smaller volumes." },
  { slug: "etomidate-liquid-injectable-grade", name: "Injectable-Grade Solution", shortDescription: "Sterile pyrogen-free solution manufactured in a Class 100 cleanroom for clinical research." },
  { slug: "etomidate-liquid-oral-solution", name: "Oral Solution", shortDescription: "Vanilla-flavored sublingual solution with precision dosing syringe for convenient use." },
  { slug: "etomidate-liquid-nasal-spray", name: "Nasal Spray Solution", shortDescription: "Pre-filled metered-dose nasal spray for fast-acting intranasal delivery." },
  { slug: "etomidate-liquid-dropper-bottle", name: "Precision Dropper Bottle", shortDescription: "Calibrated glass pipette dropper bottle designed for accurate micro-dosing applications." },
];

async function run() {
  console.log("Connecting...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!\n");

  for (const r of renames) {
    const result = await Product.findOneAndUpdate(
      { slug: r.slug },
      { $set: { name: r.name, shortDescription: r.shortDescription } },
      { new: true }
    );
    if (result) {
      console.log(`✅ ${r.slug} → "${r.name}"`);
    } else {
      console.log(`⚠️  Not found: ${r.slug}`);
    }
  }

  console.log("\n🎉 Done!");
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
