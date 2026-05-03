import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

const powderProducts = [
  {
    name: "Premium Crystal Powder",
    shortDescription: "Exquisite crystalline powder with exceptional purity and smooth texture",
    description: "Our Premium Crystal Powder represents the pinnacle of quality and refinement. Each batch is carefully processed to create stunning crystalline structures that sparkle with brilliance. The powder flows like silk and dissolves effortlessly, making it perfect for discerning researchers who demand only the finest materials. With a sweet, clean profile and consistent molecular structure, this product delivers exceptional results in every application.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  },
  {
    name: "Diamond Dust Elite",
    shortDescription: "Ultra-fine crystalline powder with diamond-like clarity and purity",
    description: "Diamond Dust Elite is crafted for those who seek perfection. This ultra-fine powder exhibits diamond-like clarity and exceptional purity levels that set it apart from conventional products. Each particle is meticulously processed to achieve optimal size and shape, resulting in a powder that handles beautifully and performs consistently. The sweet, clean aroma and smooth texture make it a favorite among researchers who value excellence.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  },
  {
    name: "Sweet Crystal Bliss",
    shortDescription: "Delightfully sweet crystalline powder with exceptional molecular structure",
    description: "Sweet Crystal Bliss combines exceptional purity with a delightful sweet profile that makes it truly special. The crystalline structure is carefully controlled to ensure consistency and reliability, while the sweet undertones provide a pleasant working experience. This product is perfect for researchers who appreciate both quality and comfort in their materials. Each batch undergoes rigorous testing to ensure it meets our exacting standards.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  },
  {
    name: "Lunar Crystal Powder",
    shortDescription: "Moon-inspired crystalline powder with ethereal purity and smooth flow",
    description: "Inspired by the ethereal beauty of moonlight, Lunar Crystal Powder offers a unique combination of purity and elegance. The crystalline structure captures light beautifully, creating a mesmerizing visual effect. Its smooth flow and consistent particle size make it exceptionally easy to work with, while the sweet, clean profile ensures a pleasant experience. This premium product is perfect for researchers who demand both beauty and performance.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  },
  {
    name: "Velvet Touch Crystal",
    shortDescription: "Luxuriously smooth crystalline powder with velvet-like texture",
    description: "Velvet Touch Crystal is the epitome of luxury and refinement. Each batch is processed to achieve a velvet-like texture that feels incredibly smooth to the touch. The crystalline structure is perfectly uniform, ensuring consistent performance and reliable results. With its sweet, delicate profile and exceptional purity, this product is ideal for researchers who appreciate the finer things in their work.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  },
  {
    name: "Starlight Crystal Premium",
    shortDescription: "Premium crystalline powder that sparkles like captured starlight",
    description: "Starlight Crystal Premium captures the essence of celestial beauty in every particle. This premium powder exhibits a stunning sparkle that resembles captured starlight, making it visually striking and exceptionally pure. The crystalline structure is carefully controlled to ensure optimal performance, while the sweet, clean profile provides a pleasant working experience. Each batch is meticulously tested to guarantee exceptional quality and consistency.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  }
];

const liquidProducts = [
  {
    name: "Sweet Nectar Liquid",
    shortDescription: "Deliciously sweet liquid formulation with smooth, flowing consistency",
    description: "Sweet Nectar Liquid is a premium liquid formulation that combines exceptional purity with a delightful sweet profile. The liquid flows smoothly and consistently, making it perfect for precise applications. Each batch is carefully formulated to ensure optimal concentration and stability, while the sweet undertones provide a pleasant working experience. This product is ideal for researchers who value both quality and comfort in their liquid materials.",
    sizes: [
      { label: "20ml", price: 75.00 },
      { label: "50ml", price: 165.00 },
      { label: "100ml", price: 290.00 },
      { label: "250ml", price: 650.00 },
      { label: "500ml", price: 1150.00 }
    ]
  },
  {
    name: "Honey Gold Elixir",
    shortDescription: "Golden liquid with honey-like sweetness and exceptional purity",
    description: "Honey Gold Elixir is a luxurious liquid formulation that combines the rich color of gold with the sweetness of honey. The liquid has a smooth, flowing consistency that makes it easy to work with, while the honey-like sweetness provides a pleasant experience. Each batch is meticulously crafted to ensure optimal purity and consistency, making it perfect for researchers who demand the finest liquid materials.",
    sizes: [
      { label: "20ml", price: 75.00 },
      { label: "50ml", price: 165.00 },
      { label: "100ml", price: 290.00 },
      { label: "250ml", price: 650.00 },
      { label: "500ml", price: 1150.00 }
    ]
  },
  {
    name: "Crystal Clear Solution",
    shortDescription: "Perfectly clear liquid with crystalline purity and sweet undertones",
    description: "Crystal Clear Solution represents the pinnacle of liquid purity. This perfectly clear formulation exhibits exceptional clarity and consistency, making it ideal for precise applications. The subtle sweet undertones provide a pleasant working experience, while the crystalline purity ensures reliable results. Each batch undergoes rigorous testing to guarantee exceptional quality and performance.",
    sizes: [
      { label: "20ml", price: 75.00 },
      { label: "50ml", price: 165.00 },
      { label: "100ml", price: 290.00 },
      { label: "250ml", price: 650.00 },
      { label: "500ml", price: 1150.00 }
    ]
  },
  {
    name: "Ambrosia Liquid Premium",
    shortDescription: "Divine liquid formulation with sweet, nectar-like qualities",
    description: "Ambrosia Liquid Premium is crafted to deliver a truly divine experience. This premium liquid formulation combines exceptional purity with sweet, nectar-like qualities that make it truly special. The liquid flows smoothly and consistently, while the sweet profile provides a pleasant working experience. Each batch is carefully formulated to ensure optimal concentration and stability, making it perfect for discerning researchers.",
    sizes: [
      { label: "20ml", price: 75.00 },
      { label: "50ml", price: 165.00 },
      { label: "100ml", price: 290.00 },
      { label: "250ml", price: 650.00 },
      { label: "500ml", price: 1150.00 }
    ]
  },
  {
    name: "Silk Stream Liquid",
    shortDescription: "Silky smooth liquid that flows like liquid silk",
    description: "Silk Stream Liquid is engineered to provide an exceptionally smooth flowing experience. The liquid has a silky consistency that makes it easy to handle and apply, while the sweet undertones ensure a pleasant working experience. Each batch is carefully formulated to maintain optimal viscosity and stability, making it perfect for researchers who value both performance and comfort in their liquid materials.",
    sizes: [
      { label: "20ml", price: 75.00 },
      { label: "50ml", price: 165.00 },
      { label: "100ml", price: 290.00 },
      { label: "250ml", price: 650.00 },
      { label: "500ml", price: 1150.00 }
    ]
  },
  {
    name: "Elixir Divine Sweet",
    shortDescription: "Divinely sweet liquid elixir with exceptional molecular structure",
    description: "Elixir Divine Sweet is a premium liquid formulation that combines exceptional purity with divine sweetness. The liquid has a smooth, flowing consistency that makes it perfect for precise applications, while the sweet profile provides a truly pleasant experience. Each batch is meticulously crafted to ensure optimal concentration and stability, making it ideal for researchers who demand the finest liquid materials.",
    sizes: [
      { label: "20ml", price: 75.00 },
      { label: "50ml", price: 165.00 },
      { label: "100ml", price: 290.00 },
      { label: "250ml", price: 650.00 },
      { label: "500ml", price: 1150.00 }
    ]
  }
];

const vapeProducts = [
  {
    name: "Sweet Cloud Vape",
    shortDescription: "Deliciously sweet vape formulation with smooth, satisfying clouds",
    description: "Sweet Cloud Vape delivers an exceptionally smooth and satisfying experience with every puff. The sweet profile is carefully balanced to provide maximum enjoyment without being overwhelming, while the cloud production is consistently impressive. Each cartridge is filled with premium formulation that ensures optimal performance and reliability. Perfect for those who appreciate both quality and comfort in their vaping experience.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  },
  {
    name: "Crystal Mist Premium",
    shortDescription: "Premium vape mist with crystalline purity and sweet undertones",
    description: "Crystal Mist Premium represents the pinnacle of vaping excellence. This premium formulation combines exceptional purity with sweet undertones that create a truly delightful experience. The mist production is consistently smooth and satisfying, while the crystalline structure ensures reliable performance. Each cartridge is carefully filled to provide optimal flavor and vapor production.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  },
  {
    name: "Honey Dew Vapor",
    shortDescription: "Sweet honey-flavored vapor with dew-like freshness",
    description: "Honey Dew Vapor combines the natural sweetness of honey with the refreshing quality of morning dew. The flavor profile is carefully crafted to provide a delightful experience that's both sweet and refreshing. Each puff delivers consistent vapor production and exceptional flavor, making it perfect for those who appreciate quality and sophistication in their vaping experience.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  },
  {
    name: "Velvet Cloud Elite",
    shortDescription: "Luxuriously smooth vape clouds with velvet-like texture",
    description: "Velvet Cloud Elite is crafted for those who demand the ultimate vaping experience. The formulation produces luxuriously smooth clouds with a velvet-like texture that's incredibly satisfying. The sweet profile is perfectly balanced to provide maximum enjoyment, while the consistent performance ensures reliability with every use. Each cartridge is filled with premium formulation for optimal results.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  },
  {
    name: "Starlight Mist Sweet",
    shortDescription: "Sweet vapor mist that sparkles like captured starlight",
    description: "Starlight Mist Sweet captures the magic of starlight in every puff. This premium formulation produces sweet, sparkling vapor that's both visually impressive and exceptionally satisfying. The flavor profile is carefully crafted to provide a delightful experience, while the consistent performance ensures reliability. Each cartridge is filled with premium formulation for optimal vapor production and flavor.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  },
  {
    name: "Divine Nectar Vape",
    shortDescription: "Divinely sweet vape nectar with exceptional purity",
    description: "Divine Nectar Vape is formulated to deliver a truly divine vaping experience. The sweet nectar profile is carefully balanced to provide maximum enjoyment, while the exceptional purity ensures reliable performance. Each puff delivers smooth, satisfying vapor with consistent flavor and impressive cloud production. Perfect for those who appreciate the finest quality in their vaping materials.",
    sizes: [
      { label: "100g", price: 550.00 },
      { label: "250g", price: 1200.00 },
      { label: "500g", price: 2100.00 },
      { label: "1kg", price: 3800.00 }
    ]
  }
];

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const user = verifyToken(token);
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  
  const allProducts = [
    ...powderProducts.map(p => ({ ...p, category: 'powder' })),
    ...liquidProducts.map(p => ({ ...p, category: 'liquid' })),
    ...vapeProducts.map(p => ({ ...p, category: 'vape' }))
  ];

  const results = [];
  
  for (const product of allProducts) {
    let slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Ensure unique slug
    const existing = await Product.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const createdProduct = await Product.create({
      slug,
      name: product.name,
      price: product.sizes[0].price, // Use smallest size as base price
      category: product.category,
      shortDescription: product.shortDescription,
      description: product.description,
      specifications: [],
      sizes: product.sizes,
      inStock: true,
      image: ""
    });

    results.push(createdProduct);
  }

  return NextResponse.json({ 
    success: true, 
    message: `Added ${results.length} products successfully`,
    products: results 
  });
}
