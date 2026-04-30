import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";

const ProductSchema = new mongoose.Schema({
  slug: String,
  name: String,
  price: Number,
  category: String,
  shortDescription: { type: String, default: "" },
  description: { type: String, default: "" },
  specifications: [String],
  sizes: [{ label: String, price: Number }],
  inStock: { type: Boolean, default: true },
  image: { type: String, default: "" },
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

const products = [
  // ─── POWDER PRODUCTS ───
  {
    slug: "etomidate-powder-pure",
    name: "Etomidate Powder — Pure Grade",
    price: 300,
    category: "powder",
    shortDescription: "Ultra-pure etomidate powder with ≥99.8% purity, lab-tested and COA certified.",
    description: "Our flagship Etomidate Powder — Pure Grade is meticulously synthesized and refined to achieve a purity level of ≥99.8%, verified through independent HPLC analysis. Every batch is accompanied by a comprehensive Certificate of Analysis (COA), ensuring full transparency and trust. This powder is ideal for research applications, clinical studies, and professional use where uncompromising quality is essential. The fine crystalline powder dissolves readily and is packaged in airtight, light-resistant containers to preserve stability and potency. Whether you're conducting pharmacological research or require a reliable reference standard, this product delivers consistent results batch after batch. We source only pharmaceutical-grade precursors and employ rigorous quality control protocols at every stage of production.",
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Fine white crystalline powder",
      "Packaging: Airtight, light-resistant container",
      "Storage: Room temperature, away from moisture",
      "Certificate of Analysis included",
      "Batch-tracked for full traceability",
    ],
    sizes: [
      { label: "5g", price: 300 },
      { label: "10g", price: 520 },
      { label: "25g", price: 1100 },
      { label: "50g", price: 1900 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-powder-research",
    name: "Etomidate Research Powder",
    price: 250,
    category: "powder",
    shortDescription: "Research-grade etomidate powder for laboratory and academic applications.",
    description: "The Etomidate Research Powder is specifically formulated for laboratory environments, academic studies, and analytical testing. With a verified purity of ≥99.5%, this product meets the stringent requirements of modern research facilities worldwide. Each order includes detailed analytical documentation, including mass spectrometry and HPLC chromatograms, so you can integrate our product seamlessly into your experimental protocols. The powder is processed under controlled conditions to ensure uniform particle size and consistent dissolution rates. Ideal for dose-response studies, receptor binding assays, and pharmacokinetic research. Our dedicated quality assurance team reviews every batch before release, guaranteeing that what you receive matches the specifications exactly.",
    specifications: [
      "Purity: ≥99.5% (HPLC verified)",
      "Form: Micronized white powder",
      "Includes HPLC & MS documentation",
      "Suitable for in-vitro and analytical use",
      "Nitrogen-sealed packaging",
      "Stable at room temperature for 24+ months",
    ],
    sizes: [
      { label: "5g", price: 250 },
      { label: "10g", price: 440 },
      { label: "25g", price: 950 },
    ],
    inStock: true,
  },

  // ─── VAPE PRODUCTS ───
  {
    slug: "etomidate-vape-kpod-classic",
    name: "K-Pod Vape Cartridge — Classic",
    price: 85,
    category: "vape",
    shortDescription: "Premium K-Pod vape cartridge with precision-dosed etomidate formula.",
    description: "The K-Pod Vape Cartridge — Classic is our most popular vaporizer product, engineered for smooth, consistent delivery with every draw. Each cartridge is precision-filled with a proprietary etomidate blend using medical-grade PG/VG carriers, ensuring optimal vapor production and bioavailability. The ceramic coil technology prevents dry hits and delivers pure, clean flavor from the first puff to the last. Compatible with all standard 510-thread batteries, the K-Pod Classic features a sleek, discreet design that fits comfortably in your pocket. Every cartridge undergoes rigorous leak testing and potency verification before shipping. The formula is carefully calibrated to provide a reliable, measured experience each time. Whether you're a first-time user or an experienced enthusiast, the K-Pod Classic sets the standard for quality and convenience.",
    specifications: [
      "Volume: 1.0ml per cartridge",
      "Ceramic coil technology",
      "510-thread compatible",
      "Medical-grade PG/VG carrier",
      "Leak-tested and sealed",
      "Child-resistant packaging",
    ],
    sizes: [
      { label: "1 Pod", price: 85 },
      { label: "3 Pods", price: 230 },
      { label: "5 Pods", price: 370 },
      { label: "10 Pods", price: 680 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-vape-kpod-strong",
    name: "K-Pod Vape Cartridge — Strong",
    price: 110,
    category: "vape",
    shortDescription: "High-concentration K-Pod vape for experienced users seeking stronger effects.",
    description: "For those who require a more potent experience, the K-Pod Vape Cartridge — Strong delivers an enhanced concentration formula that packs significantly more power per draw. Built on the same trusted ceramic coil platform as our Classic line, the Strong variant features a higher etomidate concentration while maintaining the smooth, clean vapor quality our customers love. The advanced wicking system ensures even saturation and prevents hot spots, resulting in consistent delivery throughout the cartridge's life. Each unit is individually batch-tested for potency and purity, with results printed on the packaging for your reference. The cartridge is housed in a premium anodized aluminum shell that protects the contents from light and heat degradation. Recommended for experienced users who are already familiar with our Classic product line.",
    specifications: [
      "Volume: 1.0ml per cartridge",
      "Enhanced concentration formula",
      "Advanced ceramic coil with improved wicking",
      "Anodized aluminum housing",
      "Individual potency testing",
      "510-thread universal compatibility",
    ],
    sizes: [
      { label: "1 Pod", price: 110 },
      { label: "3 Pods", price: 300 },
      { label: "5 Pods", price: 480 },
    ],
    inStock: true,
  },

  // ─── LIQUID PRODUCTS ───
  {
    slug: "etomidate-liquid-solution-standard",
    name: "Etomidate Liquid Solution — Standard",
    price: 180,
    category: "liquid",
    shortDescription: "Pharmaceutical-grade etomidate liquid solution, ready for immediate use.",
    description: "Our Etomidate Liquid Solution — Standard is a ready-to-use formulation prepared under strict pharmaceutical conditions. The solution is precisely calibrated to a standardized concentration, ensuring accurate and reproducible dosing for every application. Manufactured using USP-grade solvents and filtered through 0.22μm sterile membranes, this product meets the highest standards of pharmaceutical preparation. The solution is packaged in amber glass vials with tamper-evident seals to protect against light degradation and contamination. Each vial includes a detailed label with concentration, batch number, expiration date, and storage instructions. Ideal for clinical research, pharmacological studies, and professional applications where a pre-made liquid formulation saves valuable preparation time without compromising quality or accuracy.",
    specifications: [
      "Concentration: Standardized and verified",
      "Solvent: USP-grade propylene glycol",
      "Filtration: 0.22μm sterile filtered",
      "Packaging: Amber glass vial with tamper seal",
      "Shelf life: 18 months from manufacture",
      "Full batch documentation included",
    ],
    sizes: [
      { label: "10ml", price: 180 },
      { label: "30ml", price: 450 },
      { label: "50ml", price: 700 },
      { label: "100ml", price: 1250 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-liquid-concentrate",
    name: "Etomidate Liquid Concentrate",
    price: 350,
    category: "liquid",
    shortDescription: "High-concentration etomidate liquid for dilution and custom formulations.",
    description: "The Etomidate Liquid Concentrate is designed for professionals who require a high-potency base solution for custom dilutions and specialized formulations. This concentrated product offers exceptional value and flexibility, allowing you to prepare working solutions at your desired concentration with precision. The concentrate is manufactured using a proprietary stabilization process that maintains potency and prevents crystallization over extended storage periods. Each bottle is produced in a controlled environment, tested for sterility, and verified for concentration accuracy using UV spectrophotometry. The product ships in pharmaceutical-grade HDPE bottles with precision dropper caps for accurate dispensing. Comprehensive dilution charts and handling guidelines are included with every order. This is our premium liquid product, trusted by laboratories and research institutions across Europe for its unmatched consistency and reliability.",
    specifications: [
      "High-concentration formula",
      "Proprietary stabilization technology",
      "UV spectrophotometry verified",
      "HDPE bottle with precision dropper",
      "Dilution charts included",
      "Shelf life: 24 months when stored correctly",
    ],
    sizes: [
      { label: "10ml", price: 350 },
      { label: "30ml", price: 900 },
      { label: "50ml", price: 1400 },
    ],
    inStock: true,
  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!\n");

  for (const p of products) {
    const existing = await Product.findOne({ slug: p.slug });
    if (existing) {
      console.log(`⏭  Skipping "${p.name}" (already exists)`);
      continue;
    }
    await Product.create(p);
    console.log(`✅ Created: ${p.name} (${p.category}) — €${p.price}`);
  }

  console.log("\n🎉 Seeding complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
