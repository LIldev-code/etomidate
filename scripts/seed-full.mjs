import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";

const ProductSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Product = mongoose.model("Product", ProductSchema);

// Remove old duplicates without sizes
const oldSlugs = ["etomidate", "etomidate-powder", "etomidate-moj9u867"];

const newProducts = [
  // ─── POWDER (4 new) ───
  {
    slug: "etomidate-powder-ultra-fine",
    name: "Etomidate Ultra-Fine Powder",
    price: 160,
    category: "powder",
    shortDescription: "Micronized ultra-fine etomidate powder for enhanced solubility and rapid absorption.",
    description: "Our Etomidate Ultra-Fine Powder undergoes an advanced micronization process that reduces particle size to sub-10 micron levels, dramatically improving solubility and bioavailability compared to standard-grade powders. This product is specifically engineered for researchers and professionals who require rapid dissolution and uniform dispersion in aqueous and organic solvents. Each batch is produced in a certified cleanroom environment and tested using laser diffraction particle size analysis to ensure consistent quality. The ultra-fine texture makes it ideal for formulation development, analytical reference standards, and advanced pharmacological studies. Packaged in pharmaceutical-grade amber glass vials with desiccant inserts to maintain optimal stability and prevent moisture absorption during storage.",
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Particle size: <10μm (laser diffraction)",
      "Form: Ultra-fine micronized white powder",
      "Packaging: Amber glass vial with desiccant",
      "Storage: 2–8°C recommended for long-term",
      "Certificate of Analysis included",
    ],
    sizes: [
      { label: "20g", price: 160 },
      { label: "50g", price: 350 },
      { label: "100g", price: 620 },
      { label: "200g", price: 1100 },
      { label: "500g", price: 2400 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-powder-bulk",
    name: "Etomidate Bulk Powder — Economy",
    price: 95,
    category: "powder",
    shortDescription: "Cost-effective bulk etomidate powder for large-scale research and institutional use.",
    description: "The Etomidate Bulk Powder — Economy is our most affordable option, designed for laboratories and institutions that require large quantities without premium pricing. Despite the competitive price point, this product maintains a purity level of ≥99.0%, making it suitable for a wide range of non-critical research applications, preliminary studies, and educational demonstrations. Each order is accompanied by a basic Certificate of Analysis confirming identity and purity. The powder is packaged in industrial-grade HDPE containers with tamper-evident seals for secure transport and storage. Bulk discounts are automatically applied at higher quantity tiers, offering exceptional value for recurring orders. This product is our best seller among academic research departments and training facilities across Europe.",
    specifications: [
      "Purity: ≥99.0% (HPLC verified)",
      "Form: White crystalline powder",
      "Packaging: HDPE container, tamper-evident",
      "Ideal for large-scale research",
      "Basic Certificate of Analysis included",
      "Bulk pricing available",
    ],
    sizes: [
      { label: "50g", price: 95 },
      { label: "100g", price: 170 },
      { label: "250g", price: 380 },
      { label: "500g", price: 680 },
      { label: "1kg", price: 1200 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-powder-pharma-grade",
    name: "Etomidate Pharma-Grade Powder",
    price: 195,
    category: "powder",
    shortDescription: "Highest-grade etomidate powder meeting pharmacopoeia standards for clinical applications.",
    description: "The Etomidate Pharma-Grade Powder represents the pinnacle of our powder product line, manufactured under full GMP conditions and meeting the strict specifications outlined in the European Pharmacopoeia. This product is intended for clinical research, advanced drug formulation, and applications where regulatory compliance is non-negotiable. Every batch undergoes a comprehensive testing panel including HPLC purity analysis, residual solvent testing, heavy metal screening, and endotoxin assessment. The accompanying documentation package includes a full Certificate of Analysis, Material Safety Data Sheet, and batch-specific stability data. Supplied in USP Type III amber glass bottles with PTFE-lined caps to prevent interaction and ensure maximum shelf life. Trusted by pharmaceutical companies and CROs across 15+ European countries.",
    specifications: [
      "Purity: ≥99.9% (Pharmacopoeia grade)",
      "Manufactured under GMP conditions",
      "Residual solvent tested",
      "Heavy metal screened",
      "Endotoxin assessed",
      "Full documentation package included",
    ],
    sizes: [
      { label: "20g", price: 195 },
      { label: "50g", price: 430 },
      { label: "100g", price: 780 },
      { label: "200g", price: 1400 },
      { label: "500g", price: 3100 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-powder-sample-kit",
    name: "Etomidate Powder Sample Kit",
    price: 75,
    category: "powder",
    shortDescription: "Starter sample kit with three different powder grades for evaluation and comparison.",
    description: "The Etomidate Powder Sample Kit is the perfect introduction for new customers or researchers who want to evaluate our product quality before committing to larger orders. This kit includes carefully measured samples of three different powder grades — Research, Pure, and Pharma — allowing you to directly compare purity levels, dissolution rates, and physical characteristics side by side. Each sample is individually sealed in pharmaceutical-grade pouches with full labeling including batch number, purity level, and expiration date. The kit also includes a detailed comparison guide highlighting the differences between grades and recommended applications for each. Ideal for procurement officers, lab managers, and independent researchers looking to establish a new supplier relationship with confidence.",
    specifications: [
      "Contains: 5g Research + 5g Pure + 5g Pharma grade",
      "Individually sealed and labeled",
      "Comparison guide included",
      "Certificate of Analysis for each grade",
      "One-time evaluation offer",
      "Perfect for new customers",
    ],
    sizes: [
      { label: "Sample Kit (15g total)", price: 75 },
      { label: "Double Kit (30g total)", price: 135 },
    ],
    inStock: true,
  },

  // ─── VAPE (4 new) ───
  {
    slug: "etomidate-vape-disposable-mini",
    name: "Etomidate Disposable Vape — Mini",
    price: 30,
    category: "vape",
    shortDescription: "Compact single-use disposable vape, pre-charged and ready to use out of the box.",
    description: "The Etomidate Disposable Vape — Mini is our most accessible vaporizer product, designed for users who want a hassle-free, no-maintenance experience. Each unit comes pre-charged and pre-filled with our proprietary etomidate blend, delivering approximately 200 puffs per device. The ultra-compact form factor fits discreetly in any pocket or bag, making it perfect for on-the-go use. The integrated ceramic coil ensures clean, consistent vapor production without the burnt taste associated with cotton-wick alternatives. The sleek matte-black casing features an LED indicator that shows remaining battery life. No charging, no refilling, no buttons — simply inhale to activate. Each device is individually sealed in a child-resistant pouch with batch information and usage guidelines printed on the packaging.",
    specifications: [
      "Approx. 200 puffs per device",
      "Pre-charged, draw-activated",
      "Ceramic coil technology",
      "LED battery indicator",
      "Child-resistant packaging",
      "Compact matte-black design",
    ],
    sizes: [
      { label: "1 Device", price: 30 },
      { label: "3 Devices", price: 80 },
      { label: "5 Devices", price: 125 },
      { label: "10 Devices", price: 230 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-vape-kpod-menthol",
    name: "K-Pod Vape Cartridge — Menthol",
    price: 48,
    category: "vape",
    shortDescription: "Menthol-infused K-Pod cartridge for a cool, refreshing vaping experience.",
    description: "The K-Pod Vape Cartridge — Menthol combines our trusted etomidate formulation with natural menthol extract for a smooth, cooling sensation with every draw. The menthol infusion not only enhances the user experience but also helps mask any residual chemical taste, resulting in a cleaner and more pleasant vapor profile. Built on the same reliable ceramic coil platform as our Classic and Strong lines, the Menthol variant uses a slightly modified PG/VG ratio optimized for flavor delivery without sacrificing vapor density. Compatible with all standard 510-thread batteries. Each cartridge is filled under nitrogen atmosphere to prevent oxidation and preserve freshness. The menthol flavoring is derived from natural peppermint oil and contains zero artificial additives. A favorite among users who prefer a refreshing twist on the standard experience.",
    specifications: [
      "Volume: 1.0ml per cartridge",
      "Natural menthol extract",
      "Ceramic coil technology",
      "510-thread compatible",
      "Nitrogen-sealed for freshness",
      "Zero artificial flavoring",
    ],
    sizes: [
      { label: "1 Pod", price: 48 },
      { label: "3 Pods", price: 130 },
      { label: "5 Pods", price: 200 },
      { label: "10 Pods", price: 365 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-vape-starter-kit",
    name: "Etomidate Vape Starter Kit",
    price: 65,
    category: "vape",
    shortDescription: "Complete starter kit with battery, charger, and 2 cartridges included.",
    description: "The Etomidate Vape Starter Kit is the all-in-one solution for users new to vaporizing. The kit includes a premium 510-thread variable-voltage battery with three power settings, a USB-C magnetic charger, and two K-Pod Classic cartridges to get you started immediately. The battery features a sleek brushed-aluminum finish with an OLED screen displaying voltage level and puff count. A preheat function warms the cartridge before use, ensuring smooth draws from the very first puff. The variable voltage settings (3.2V, 3.6V, 4.0V) allow you to customize vapor density and intensity to your preference. The kit comes in a premium magnetic-close presentation box, making it an excellent gift option. Detailed instructions and safety guidelines are included in multiple languages. Everything you need in one box — no additional purchases required.",
    specifications: [
      "510-thread variable-voltage battery",
      "USB-C magnetic charger included",
      "2x K-Pod Classic cartridges included",
      "OLED display with puff counter",
      "3 voltage settings (3.2V/3.6V/4.0V)",
      "Premium presentation packaging",
    ],
    sizes: [
      { label: "Starter Kit", price: 65 },
      { label: "Kit + 3 Extra Pods", price: 140 },
      { label: "Kit + 5 Extra Pods", price: 195 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-vape-kpod-max",
    name: "K-Pod Vape Cartridge — MAX",
    price: 68,
    category: "vape",
    shortDescription: "Double-capacity 2.0ml cartridge for extended use and maximum convenience.",
    description: "The K-Pod Vape Cartridge — MAX is our highest-capacity cartridge, holding a full 2.0ml of our premium etomidate blend — twice the volume of our standard pods. Designed for heavy users and those who simply don't want to swap cartridges frequently, the MAX delivers up to 800 puffs per unit. The dual-coil ceramic heating system provides thicker, more satisfying vapor clouds while maintaining the clean flavor profile our customers expect. The reinforced borosilicate glass tank is both heat-resistant and impact-resistant, with a clear window so you can always see your remaining liquid level. The wider drip tip improves airflow and comfort during extended sessions. Compatible with all 510-thread batteries, with optimized performance at 3.6V–4.0V settings. Each cartridge undergoes a 72-hour curing process before shipping to ensure optimal flavor development.",
    specifications: [
      "Volume: 2.0ml (double capacity)",
      "Approx. 800 puffs per cartridge",
      "Dual-coil ceramic heating system",
      "Borosilicate glass tank with level window",
      "Wide-bore drip tip for improved airflow",
      "72-hour pre-cured for optimal flavor",
    ],
    sizes: [
      { label: "1 Pod", price: 68 },
      { label: "3 Pods", price: 185 },
      { label: "5 Pods", price: 290 },
      { label: "10 Pods", price: 540 },
    ],
    inStock: true,
  },

  // ─── LIQUID (4 new) ───
  {
    slug: "etomidate-liquid-injectable-grade",
    name: "Etomidate Injectable-Grade Solution",
    price: 220,
    category: "liquid",
    shortDescription: "Sterile, pyrogen-free injectable-grade etomidate solution for clinical research.",
    description: "The Etomidate Injectable-Grade Solution is our most rigorously produced liquid product, manufactured in a Class 100 cleanroom under full aseptic conditions. This solution meets the stringent requirements for parenteral formulations, including sterility testing (USP <71>), bacterial endotoxin testing (USP <85>), and particulate matter assessment (USP <788>). The formulation uses a carefully optimized propylene glycol-water vehicle system that ensures both solubility and physiological compatibility. Each vial is terminally sterilized and individually inspected for particulate contamination. The product is supplied in Type I borosilicate glass vials with butyl rubber stoppers and aluminum crimp seals. Comprehensive batch documentation includes sterility certificates, endotoxin results, and full analytical data. Exclusively available for licensed research institutions and authorized professionals.",
    specifications: [
      "Sterile, pyrogen-free formulation",
      "USP <71> sterility tested",
      "USP <85> endotoxin tested",
      "Type I borosilicate glass vials",
      "Manufactured in Class 100 cleanroom",
      "For licensed research institutions only",
    ],
    sizes: [
      { label: "20ml", price: 220 },
      { label: "50ml", price: 480 },
      { label: "100ml", price: 850 },
      { label: "250ml", price: 1900 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-liquid-oral-solution",
    name: "Etomidate Oral Solution",
    price: 65,
    category: "liquid",
    shortDescription: "Flavored oral solution with precise dosing syringe for convenient sublingual use.",
    description: "The Etomidate Oral Solution is formulated for sublingual and oral administration, making it one of our most user-friendly liquid products. The solution features a mild vanilla flavoring that masks bitterness, making it far more palatable than unflavored alternatives. Each bottle comes with a precision-marked dosing syringe (0.1ml graduations) for accurate and repeatable dosing. The formulation uses a food-grade propylene glycol and purified water base with natural flavor compounds. The amber glass bottle with child-resistant dropper cap provides both safety and protection from light degradation. Stability testing confirms a minimum 18-month shelf life when stored at room temperature away from direct sunlight. Popular among individual researchers and health professionals who require a convenient, ready-to-use liquid format without the complexity of injectable preparations.",
    specifications: [
      "Mild vanilla flavoring",
      "Precision dosing syringe included (0.1ml)",
      "Food-grade PG/water base",
      "Amber glass with child-resistant cap",
      "18-month shelf life at room temperature",
      "Suitable for sublingual administration",
    ],
    sizes: [
      { label: "20ml", price: 65 },
      { label: "50ml", price: 140 },
      { label: "100ml", price: 250 },
      { label: "250ml", price: 560 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-liquid-nasal-spray",
    name: "Etomidate Nasal Spray Solution",
    price: 55,
    category: "liquid",
    shortDescription: "Pre-filled nasal spray with metered-dose pump for fast-acting intranasal delivery.",
    description: "The Etomidate Nasal Spray Solution offers a novel intranasal delivery method that provides rapid absorption through the highly vascularized nasal mucosa. Each bottle features a medical-grade metered-dose pump that delivers a precise, consistent volume with every actuation, eliminating the guesswork associated with droppers and syringes. The formulation includes pharmaceutical-grade excipients that enhance mucosal permeability and improve bioavailability compared to oral administration. The isotonic, pH-balanced solution minimizes nasal irritation, making it comfortable for repeated use. The compact bottle design fits easily in a pocket or bag for discreet, on-the-go use. Each unit is individually shrink-wrapped with a tamper-evident seal. Ideal for researchers studying intranasal drug delivery pharmacokinetics and for professionals seeking a fast-acting, needle-free alternative.",
    specifications: [
      "Metered-dose pump (0.1ml per spray)",
      "Isotonic, pH-balanced formula",
      "Enhanced mucosal permeability",
      "Medical-grade pump mechanism",
      "Tamper-evident shrink wrap",
      "Approx. 100 sprays per 10ml bottle",
    ],
    sizes: [
      { label: "10ml (100 sprays)", price: 55 },
      { label: "20ml (200 sprays)", price: 95 },
      { label: "3x 10ml Bundle", price: 145 },
      { label: "5x 10ml Bundle", price: 225 },
    ],
    inStock: true,
  },
  {
    slug: "etomidate-liquid-dropper-bottle",
    name: "Etomidate Precision Dropper Bottle",
    price: 48,
    category: "liquid",
    shortDescription: "Convenient dropper bottle with calibrated glass pipette for micro-dosing applications.",
    description: "The Etomidate Precision Dropper Bottle is designed for applications requiring exact micro-dosing capability. The calibrated borosilicate glass pipette features laser-etched measurement markings at 0.25ml intervals, enabling precise volume control down to a single drop. The solution is formulated in a stabilized PG/ethanol vehicle that maintains consistent viscosity across a wide temperature range, ensuring reliable drop formation regardless of ambient conditions. The amber glass bottle protects the contents from UV degradation while the natural rubber bulb provides smooth, controlled dispensing. Each bottle undergoes a fill-weight verification to guarantee accurate volume. The compact 30ml and 50ml sizes are popular among researchers performing dose-response studies and titration experiments. A replacement pipette and calibration chart are available as accessories.",
    specifications: [
      "Calibrated glass pipette (0.25ml markings)",
      "PG/ethanol stabilized vehicle",
      "Amber glass UV protection",
      "Fill-weight verified",
      "Consistent drop formation",
      "Replacement pipettes available",
    ],
    sizes: [
      { label: "20ml", price: 48 },
      { label: "30ml", price: 65 },
      { label: "50ml", price: 95 },
      { label: "100ml", price: 170 },
    ],
    inStock: true,
  },
];

async function run() {
  console.log("Connecting...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!\n");

  // Remove old duplicate products without proper sizes
  for (const slug of oldSlugs) {
    const result = await Product.deleteOne({ slug });
    if (result.deletedCount) console.log(`🗑️  Removed old product: ${slug}`);
  }

  // Add new products
  for (const p of newProducts) {
    const existing = await Product.findOne({ slug: p.slug });
    if (existing) {
      console.log(`⏭  Skipping "${p.name}" (already exists)`);
      continue;
    }
    await Product.create(p);
    console.log(`✅ Created: ${p.name} (${p.category}) — from €${p.price}`);
  }

  // Count final totals
  const counts = {};
  for (const cat of ["powder", "vape", "liquid"]) {
    counts[cat] = await Product.countDocuments({ category: cat });
  }
  console.log(`\n📊 Final count: Powder: ${counts.powder}, Vape: ${counts.vape}, Liquid: ${counts.liquid}`);
  console.log("🎉 Done!");
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
