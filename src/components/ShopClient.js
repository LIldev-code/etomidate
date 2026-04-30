"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaFlask, FaVial, FaTint } from "react-icons/fa";
import { FiArrowRight, FiCheckCircle, FiXCircle, FiStar, FiFilter, FiShoppingBag, FiChevronRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const productIcons = {
  powder: <FaFlask className="w-16 h-16 text-[#d4a038]" />,
  vape: <FaVial className="w-16 h-16 text-[#d4a038]" />,
  liquid: <FaTint className="w-16 h-16 text-[#d4a038]" />,
};

const categoryInfo = {
  powder: { label: "Powder", icon: <FaFlask className="w-5 h-5" />, heading: "Etomidate Powder", desc: "High-purity etomidate powder for research and clinical use." },
  vape: { label: "Vape / K-Pods", icon: <FaVial className="w-5 h-5" />, heading: "Etomidate Vape / K-Pods", desc: "Precision-formulated etomidate vape cartridges and K-Pod systems." },
  liquid: { label: "Liquid", icon: <FaTint className="w-5 h-5" />, heading: "Etomidate Liquid", desc: "Pharmaceutical-grade etomidate liquid solutions." },
};

export default function ShopClient({ products }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);

  const categories = ["powder", "vape", "liquid"].filter((cat) =>
    products.some((p) => p.category === cat)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    if (heroRef.current) {
      const els = heroRef.current.querySelectorAll(".hero-anim");
      gsap.fromTo(els,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (!categoriesRef.current) return;
    const sections = categoriesRef.current.querySelectorAll(".category-section");
    sections.forEach((section) => {
      const cards = section.querySelectorAll(".shop-card");
      gsap.killTweensOf(cards);
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [activeFilter]);

  const displayCategories = activeFilter === "all"
    ? categories
    : categories.filter((c) => c === activeFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <div ref={heroRef} className="relative overflow-hidden border-b border-[#1a1a1a]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4a038]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          {/* Breadcrumb */}
          <nav className="hero-anim flex items-center gap-1.5 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[#d4a038] transition-colors">Home</Link>
            <FiChevronRight className="w-3 h-3" />
            <span className="text-[#d4a038] font-medium">Shop</span>
          </nav>

          <h1 className="hero-anim text-4xl md:text-5xl font-extrabold text-white mb-4">
            All <span className="text-[#d4a038]">Products</span>
          </h1>
          <p className="hero-anim text-gray-400 max-w-xl text-lg mb-8">
            Lab-tested, COA-certified etomidate in three forms. Each product ships within 24 hours with discreet packaging.
          </p>

          {/* Filter pills */}
          <div className="hero-anim flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeFilter === "all"
                  ? "bg-[#d4a038] text-black shadow-lg shadow-[#d4a038]/20"
                  : "bg-[#141414] text-gray-400 border border-[#262626] hover:border-[#d4a038]/40 hover:text-white"
              }`}
            >
              <FiFilter className="w-3.5 h-3.5" />
              All Products
              <span className="text-xs opacity-70">({products.length})</span>
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeFilter === cat
                      ? "bg-[#d4a038] text-black shadow-lg shadow-[#d4a038]/20"
                      : "bg-[#141414] text-gray-400 border border-[#262626] hover:border-[#d4a038]/40 hover:text-white"
                  }`}
                >
                  {categoryInfo[cat]?.icon}
                  {categoryInfo[cat]?.label}
                  <span className="text-xs opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div ref={categoriesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {displayCategories.map((cat, catIdx) => {
          const catProducts = products.filter((p) => p.category === cat);
          if (catProducts.length === 0) return null;

          return (
            <div key={cat} className={`category-section ${catIdx > 0 ? "mt-16 pt-16 border-t border-[#1a1a1a]" : ""}`}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#d4a038]/10 border border-[#d4a038]/20 rounded-2xl flex items-center justify-center text-[#d4a038]">
                  {categoryInfo[cat]?.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {categoryInfo[cat]?.heading}
                  </h2>
                  <p className="text-sm text-gray-500">{categoryInfo[cat]?.desc}</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <span className="text-xs text-gray-600 bg-[#141414] border border-[#262626] px-3 py-1 rounded-full">
                    {catProducts.length} product{catProducts.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Product Cards */}
              <div className={`grid gap-6 ${catProducts.length === 1 ? "grid-cols-1 max-w-lg" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
                {catProducts.map((product) => (
                  <Link key={product._id} href={`/shop/${product.slug}`} className="block group">
                    <div className="shop-card bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden hover:border-[#d4a038]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d4a038]/5">
                      {/* Image */}
                      <div className="relative h-52 bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="text-center">
                            {productIcons[product.category]}
                          </div>
                        )}
                        {/* Stock indicator */}
                        <div className="absolute top-3 left-3">
                          {product.inStock ? (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-green-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-red-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Rating */}
                        <div className="flex items-center gap-0.5 mb-2">
                          {[1,2,3,4,5].map((s) => (
                            <FiStar key={s} className="w-3 h-3 text-[#d4a038] fill-[#d4a038]" />
                          ))}
                          <span className="text-[10px] text-gray-500 ml-1.5">(5.0)</span>
                        </div>

                        {/* Name + Price row */}
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-[#d4a038] transition-colors">{product.name}</h3>
                          <span className="text-lg font-bold text-[#d4a038]">€{product.price?.toFixed(2)}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                          {product.shortDescription || product.description || "Premium quality product"}
                        </p>

                        {/* Sizes */}
                        {product.sizes?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {product.sizes.map((s) => (
                              <span key={s.label} className="text-xs bg-[#0d0d0d] border border-[#262626] text-gray-400 px-2.5 py-1 rounded-md">
                                {s.label} — <span className="text-[#d4a038] font-semibold">€{s.price?.toFixed(2)}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#1e1e1e]">
                          <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500 group-hover:text-[#d4a038] transition-colors">
                            <FiShoppingBag className="w-3.5 h-3.5" />
                            Order Now
                          </span>
                          <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#262626] group-hover:bg-[#d4a038] group-hover:border-[#d4a038] flex items-center justify-center transition-all duration-300">
                            <FiArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-black transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {displayCategories.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
