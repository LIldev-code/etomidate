"use client";
import Link from "next/link";
import { FaFlask, FaVial, FaTint } from "react-icons/fa";
import { FiArrowRight, FiCheckCircle, FiXCircle, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";

const categoryIcons = {
  powder: <FaFlask className="w-12 h-12 text-[#d4a038]" />,
  vape: <FaVial className="w-12 h-12 text-[#d4a038]" />,
  liquid: <FaTint className="w-12 h-12 text-[#d4a038]" />,
};

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-[#141414] rounded-2xl border border-[#262626] overflow-hidden hover:border-[#d4a038]/40 transition-all group"
    >
      {/* Product image */}
      <div className="h-56 bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="text-center">
            <div className="mb-2 transition-transform group-hover:scale-110 duration-300">
              {categoryIcons[product.category]}
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {product.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-white group-hover:text-[#d4a038] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <FiStar key={s} className="w-3.5 h-3.5 text-[#d4a038] fill-[#d4a038]" />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-[#d4a038]">
            €{product.price.toFixed(2)}
          </span>
          <Link
            href={`/shop/${product.slug}`}
            className="flex items-center gap-1.5 bg-[#d4a038] hover:bg-[#b8862e] text-black text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:shadow-md hover:shadow-[#d4a038]/20 group/btn"
          >
            View Details
            <FiArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {product.inStock ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
            <FiCheckCircle className="w-3 h-3" />
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full">
            <FiXCircle className="w-3 h-3" />
            Out of Stock
          </span>
        )}
      </div>
    </motion.div>
  );
}
