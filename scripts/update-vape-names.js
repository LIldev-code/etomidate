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

// New vape product names
const vapeProductUpdates = [
  "etomidate-vape-kpod-classic",
  "etomidate-vape-kpod-strong",
  "etomidate-vape-disposable-mini",
  "etomidate-vape-kpod-menthol",
  "etomidate-vape-starter-kit",
  "etomidate-vape-kpod-max"
];

async function updateVapeProductNames() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Get all vape products
    const vapeProducts = await Product.find({ category: 'vape' }).sort({ createdAt: 1 });
    console.log(`Found ${vapeProducts.length} vape products`);

    if (vapeProducts.length !== vapeProductUpdates.length) {
      console.log(`Warning: Found ${vapeProducts.length} products but have ${vapeProductUpdates.length} new names`);
    }

    // Update each vape product
    for (let i = 0; i < Math.min(vapeProducts.length, vapeProductUpdates.length); i++) {
      const product = vapeProducts[i];
      const newName = vapeProductUpdates[i];
      
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

    console.log('\n🎉 Vape product names updated successfully!');
    
    // Verify the updates
    const updatedProducts = await Product.find({ category: 'vape' }).sort({ createdAt: 1 });
    console.log('\nUpdated vape products:');
    updatedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.slug})`);
    });

  } catch (error) {
    console.error('Error updating vape product names:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the update function
updateVapeProductNames();
