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

// New powder product names
const powderProductUpdates = [
  "etomidate-powder-pure",
  "etomidate-powder-research", 
  "etomidate-powder-ultra-fine",
  "etomidate-powder-bulk",
  "etomidate-powder-pharma-grade",
  "etomidate-powder-sample-kit"
];

async function updatePowderProductNames() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Get all powder products
    const powderProducts = await Product.find({ category: 'powder' }).sort({ createdAt: 1 });
    console.log(`Found ${powderProducts.length} powder products`);

    if (powderProducts.length !== powderProductUpdates.length) {
      console.log(`Warning: Found ${powderProducts.length} products but have ${powderProductUpdates.length} new names`);
    }

    // Update each powder product
    for (let i = 0; i < Math.min(powderProducts.length, powderProductUpdates.length); i++) {
      const product = powderProducts[i];
      const newName = powderProductUpdates[i];
      
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

    console.log('\n🎉 Powder product names updated successfully!');
    
    // Verify the updates
    const updatedProducts = await Product.find({ category: 'powder' }).sort({ createdAt: 1 });
    console.log('\nUpdated powder products:');
    updatedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.slug})`);
    });

  } catch (error) {
    console.error('Error updating powder product names:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the update function
updatePowderProductNames();
