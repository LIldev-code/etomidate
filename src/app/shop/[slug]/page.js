"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaFlask, FaVial, FaTint } from "react-icons/fa";
import { FiCheckCircle, FiXCircle, FiShoppingBag, FiChevronRight, FiLoader, FiArrowRight, FiStar } from "react-icons/fi";
import { BsListCheck } from "react-icons/bs";

const categoryIcons = {
  powder: <FaFlask className="w-16 h-16 text-[#10b981]" />,
  vape: <FaVial className="w-16 h-16 text-[#10b981]" />,
  liquid: <FaTint className="w-16 h-16 text-[#10b981]" />,
};

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const found = data.products?.find((p) => p.slug === slug);
        setProduct(found || null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <FiLoader className="w-8 h-8 text-[#10b981] animate-spin mx-auto mb-3" />
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/shop" className="text-[#10b981] hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const currentPrice = product.sizes?.[selectedSize]?.price || product.price || 0;
  const currentLabel = product.sizes?.[selectedSize]?.label || "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#10b981] transition-colors">Home</Link>
        <FiChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-[#10b981] transition-colors">Shop</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-[#10b981] font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#262626] rounded-2xl flex items-center justify-center h-80 lg:h-[500px] overflow-hidden relative"
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="mb-4">
                {categoryIcons[product.category]}
              </div>
              <span className="text-sm font-semibold text-[#10b981] uppercase tracking-widest">
                {product.category}
              </span>
            </div>
          )}
          {/* Stock badge */}
          <div className="absolute top-4 left-4">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-green-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-red-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                Out of Stock
              </span>
            )}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Rating */}
          <div className="flex items-center gap-0.5 mb-3">
            {[1,2,3,4,5].map((s) => (
              <FiStar key={s} className="w-4 h-4 text-[#10b981] fill-[#10b981]" />
            ))}
            <span className="text-xs text-gray-500 ml-1.5">5.0 (128 reviews)</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {product.name}
          </h1>

          <p className="text-gray-400 leading-relaxed mb-6">{product.description}</p>

          {/* Specifications */}
          {product.specifications?.length > 0 && (
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[#10b981] uppercase tracking-wider mb-3">
                <BsListCheck className="w-4 h-4 text-[#10b981]" />
                Specifications
              </h3>
              <ul className="space-y-2">
                {product.specifications.map((spec) => (
                  <li key={spec} className="text-sm text-gray-400 flex items-start gap-2.5">
                    <FiCheckCircle className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Choose Quantity
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size, i) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(i)}
                    className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      selectedSize === i
                        ? "bg-[#10b981] text-black border-[#10b981] shadow-md shadow-[#10b981]/20"
                        : "bg-[#1a1a1a] text-gray-300 border-[#262626] hover:border-[#10b981]/50"
                    }`}
                  >
                    {size.label} — €{size.price.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="text-3xl font-extrabold text-[#10b981] mb-8">
            €{currentPrice.toFixed(2)}
          </div>

          {/* Order Button */}
          <Link
            href={`/order/${product.slug}${currentLabel ? `?size=${encodeURIComponent(currentLabel)}` : ""}`}
            className="w-full flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-black font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#10b981]/25 text-lg"
          >
            <FiShoppingBag className="w-5 h-5" />
            Order Now — €{currentPrice.toFixed(2)}
            <FiArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-gray-500 text-center mt-3">
            You&apos;ll be taken to the order page to complete your purchase.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
