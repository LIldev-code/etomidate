const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:T9SOZDL4tOxljQ7h@cluster0.vkmmuuo.mongodb.net/?appName=Cluster0";

// Product Schema
const SizeSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ["powder", "vape", "liquid"], required: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    specifications: [{ type: String }],
    sizes: [SizeSchema],
    inStock: { type: Boolean, default: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

// New liquid product names
const liquidProductUpdates = [
  "etomidate-liquid-solution-standard",
  "etomidate-liquid-concentrate",
  "etomidate-liquid-injectable-grade",
  "etomidate-liquid-oral-solution",
  "etomidate-liquid-nasal-spray",
  "etomidate-liquid-dropper-bottle"
];

async function updateLiquidProductNames() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Get all liquid products
    const liquidProducts = await Product.find({ category: 'liquid' }).sort({ createdAt: 1 });
    console.log(`Found ${liquidProducts.length} liquid products`);

    if (liquidProducts.length !== liquidProductUpdates.length) {
      console.log(`Warning: Found ${liquidProducts.length} products but have ${liquidProductUpdates.length} new names`);
    }

    // Update each liquid product
    for (let i = 0; i < Math.min(liquidProducts.length, liquidProductUpdates.length); i++) {
      const product = liquidProducts[i];
      const newName = liquidProductUpdates[i];
      
      // Create new slug from new name
      const newSlug = newName;
      
      // Update the product
      await Product.updateOne(
        { _id: product._id },
        { 
          $set: { 
            name: newName,
            slug: newSlug
          }
        }
      );
      
      console.log(`✓ Updated: "${product.name}" → "${newName}"`);
    }

    console.log('\n🎉 Liquid product names updated successfully!');
    
    // Verify the updates
    const updatedProducts = await Product.find({ category: 'liquid' }).sort({ createdAt: 1 });
    console.log('\nUpdated liquid products:');
    updatedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.slug})`);
    });

  } catch (error) {
    console.error('Error updating liquid product names:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the update function
updateLiquidProductNames();
