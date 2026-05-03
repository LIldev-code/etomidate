"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiMail, FiArrowRight, FiCheckCircle, FiX, FiStar } from "react-icons/fi";
import { HiOutlineBeaker, HiOutlineTruck, HiOutlineLightningBolt, HiOutlineGlobe, HiOutlineSparkles } from "react-icons/hi";
import { BsShieldCheck, BsBoxSeam, BsHeadset, BsLightningCharge } from "react-icons/bs";
import { FaFlask, FaVial, FaTint } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProtectedImage from "@/components/ProtectedImage";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const productIcons = {
  powder: <FaFlask className="w-20 h-20 text-[#10b981]" />,
  vape: <FaVial className="w-20 h-20 text-[#10b981]" />,
  liquid: <FaTint className="w-20 h-20 text-[#10b981]" />,
};

export default function HomeClient({ products, siteSettings = {} }) {
  const settings = siteSettings || {};
  const carouselSlides = [
    {
      background: "/uploads/lab.webp",
      title: "Premium Quality Compounds",
      subtitle: "Pharmaceutical-grade products with exceptional 99.8% purity standards",
      cta: "Shop Now",
      href: "/shop",
    },
    {
      background: "/uploads/clinical-laboratory.webp",
      title: "Trusted Worldwide",
      subtitle: "Laboratory-tested quality with discreet international shipping available",
      cta: "Learn More",
      href: "/about",
    },
    {
      background: "/uploads/lab1.avif",
      title: "Multiple Options",
      subtitle: "Available in powder, vape cartridges, and liquid formulations",
      cta: "View Products",
      href: "/shop",
    },
  ];
  const [bannerVisible, setBannerVisible] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % carouselSlides.length);
  }, []);

  useEffect(() => {
    if (paused || !bannerVisible) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [paused, bannerVisible, nextSlide]);

  const slide = carouselSlides[slideIndex];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BuyEtomidateProducts.com",
    url: "https://buyetomidateproducts.com",
    description: "Premium pharmaceutical-grade etomidate products — powder, vape & liquid solutions.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://buyetomidateproducts.com/shop?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Carousel Banner */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background images with crossfade and animations */}
        <AnimatePresence mode="wait">
          {carouselSlides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: index === slideIndex ? 1 : 0,
                scale: index === slideIndex ? 1 : 1.1
              }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut",
                scale: { duration: 1.2, ease: "easeInOut" }
              }}
              className="absolute inset-0"
            >
              {/* Animated background image */}
              <motion.div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.background})` }}
                animate={{
                  scale: index === slideIndex ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Animated gradient overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"
                animate={{
                  opacity: index === slideIndex ? [0.5, 0.7, 0.5] : 0.5,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Clean star field effect */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Static stars - deterministic positions */}
                {[...Array(30)].map((_, i) => {
                  const seed = i * 137.5; // Golden angle for better distribution
                  const x = (seed * 9.7) % 100;
                  const y = (seed * 13.3) % 100;
                  const size = 1 + (i % 3) * 0.5;
                  const opacity = 0.3 + (i % 5) * 0.1;
                  
                  return (
                    <div
                      key={`star-${i}`}
                      className="absolute bg-white rounded-full"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${x}%`,
                        top: `${y}%`,
                        opacity,
                      }}
                    />
                  );
                })}
                
                {/* Animated twinkling stars - deterministic */}
                {[...Array(10)].map((_, i) => {
                  const seed = i * 89.7;
                  const x = (seed * 11.3) % 100;
                  const y = (seed * 7.9) % 100;
                  const size = 1.5 + (i % 2) * 0.5;
                  
                  return (
                    <motion.div
                      key={`twinkle-${i}`}
                      className="absolute bg-white rounded-full"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                      animate={{
                        opacity: index === slideIndex ? [0.3, 1, 0.3] : 0.3,
                        scale: index === slideIndex ? [1, 1.5, 1] : 1,
                      }}
                      transition={{
                        duration: 2 + (i % 3),
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}
                
                {/* Shooting stars - deterministic */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`shooting-${i}`}
                    className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                      width: '60px',
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 15}%`,
                    }}
                    animate={{
                      x: index === slideIndex ? [-100, 400] : -100,
                      opacity: index === slideIndex ? [0, 1, 0] : 0,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 4,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Content overlay */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center max-w-4xl mx-auto"
              >
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-3 bg-[#10b981] hover:bg-[#059669] text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-[#10b981]/25"
                >
                  {slide.cta}
                  <FiArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => setSlideIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === slideIndex
                  ? "w-8 bg-[#10b981]"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      
      {/* Trust Badges */}
      <section className="bg-gradient-to-br from-[#0a0a0a] to-[#111111] border-y border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <HiOutlineBeaker className="w-7 h-7 text-[#10b981]" />, title: "Lab Tested", sub: "99.8%+ purity verified" },
              { icon: <HiOutlineTruck className="w-7 h-7 text-[#10b981]" />, title: "Discreet Shipping", sub: "Tracked & sealed packaging" },
              { icon: <HiOutlineLightningBolt className="w-7 h-7 text-[#10b981]" />, title: "Fast Dispatch", sub: "Ships within 48h" },
              { icon: <HiOutlineGlobe className="w-7 h-7 text-[#10b981]" />, title: "Worldwide Delivery", sub: "International shipping available" },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[#262626] rounded-2xl p-6 hover:border-[#10b981]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#10b981]/10 hover:-translate-y-1">
                  {/* Icon container */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#10b981]/10 to-[#10b981]/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {b.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#10b981] transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {b.sub}
                  </p>
                  
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-[#10b981]/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products by Category — Tabbed */}
      <ProductTabs products={products} />

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-[#111] border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Client <span className="text-[#10b981]">Success Stories</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Discover why leading researchers choose BuyEtomidateProducts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Alexandra Chen",
                location: "Singapore",
                text: "Their products transformed our research workflow. The crystalline structure is exceptional, and their analytical documentation is comprehensive. Game-changer for our laboratory.",
                rating: 5,
              },
              {
                name: "Prof. Michael Sterling",
                location: "Cambridge, UK",
                text: "After trying multiple suppliers, this company stands alone. Their attention to detail, consistent purity, and rapid delivery to our institution is unmatched.",
                rating: 5,
              },
              {
                name: "Dr. Isabella Rodriguez",
                location: "Barcelona, Spain",
                text: "The liquid formulations are precisely what our clinical trials needed. Their quality control and packaging integrity exceeded all regulatory requirements.",
                rating: 5,
              },
              {
                name: "Dr. Kenji Yamamoto",
                location: "Tokyo, Japan",
                text: "Outstanding reliability for our pharmaceutical research. Every batch arrives with complete analytical data and maintains consistent molecular structure.",
                rating: 5,
              },
              {
                name: "Dr. Sarah Mitchell",
                location: "Toronto, Canada",
                text: "Their customer support and technical documentation are exceptional. They helped us optimize our experimental protocols with their compounds.",
                rating: 5,
              },
              {
                name: "Dr. Hans Mueller",
                location: "Munich, Germany",
                text: "The vaporizer cartridges provide consistent dosing for our studies. Their innovative delivery systems have revolutionized our research methodology.",
                rating: 5,
              },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-[#141414] border border-[#262626] rounded-2xl p-6 hover:border-[#10b981]/30 transition-all"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[1,2,3,4,5].map((s) => (
                    <FiStar key={s} className={`w-4 h-4 ${s <= review.rating ? "text-[#10b981] fill-[#10b981]" : "text-gray-700"}`} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-gray-300 leading-relaxed mb-5">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#1e1e1e]">
                  <div className="w-10 h-10 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#111111] text-white py-16 md:py-24 relative overflow-hidden border-t border-[#262626]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10b981] rounded-full blur-[180px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-12"
          >
            Why Choose <span className="text-[#10b981]">BuyEtomidateProducts</span>?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BsShieldCheck className="w-8 h-8 text-[#10b981]" />,
                title: "Laboratory Tested",
                desc: "All products are tested for purity and potency. Each order includes detailed analytical documentation.",
              },
              {
                icon: <BsBoxSeam className="w-8 h-8 text-[#10b981]" />,
                title: "Discreet Shipping",
                desc: "All packages are shipped in plain, unmarked packaging with tracking provided for your convenience.",
              },
              {
                icon: <BsHeadset className="w-8 h-8 text-[#10b981]" />,
                title: "24/7 Support",
                desc: "Our customer service team is available around the clock to assist with any questions or concerns.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-8 hover:border-[#10b981]/30 transition-colors"
              >
                <div className="w-14 h-14 bg-[#10b981]/10 rounded-xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

          </>
  );
}

/* ─── Product Tabs by Category ─── */
const categoryMeta = {
  powder: { label: "Powder / Crystal", icon: <FaFlask className="w-4 h-4" /> },
  vape: { label: "Vape / K-Pods", icon: <FaVial className="w-4 h-4" /> },
  liquid: { label: "Liquid", icon: <FaTint className="w-4 h-4" /> },
};

function ProductTabs({ products }) {
  const categories = ["powder", "vape", "liquid"].filter((cat) =>
    products.some((p) => p.category === cat)
  );
  const [activeTab, setActiveTab] = useState(categories[0] || "powder");
  const gridRef = useRef(null);

  const filtered = products.filter((p) => p.category === activeTab);

  useEffect(() => {
    if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".product-card");
    gsap.killTweensOf(cards);
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });
    gsap.to(cards, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.6, stagger: 0.12, ease: "power3.out",
      clearProps: "transform",
    });
  }, [activeTab, filtered.length]);

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Shop <span className="text-[#10b981]">Products</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Browse our collection of high-quality products in various formulations.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === cat
                  ? "bg-[#10b981] text-black shadow-lg shadow-[#10b981]/20"
                  : "bg-[#141414] text-gray-400 border border-[#262626] hover:border-[#10b981]/40 hover:text-white"
              }`}
            >
              {categoryMeta[cat]?.icon}
              {categoryMeta[cat]?.label || cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div ref={gridRef}>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No products in this category yet.</p>
            </div>
          ) : (
            <div className={`grid gap-8 ${filtered.length === 1 ? "grid-cols-1 max-w-xl mx-auto" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {filtered.map((product) => (
                <div key={product._id || product.slug} className="product-card group">
                  {/* Card Container */}
                  <div className="relative bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-[#262626] rounded-3xl overflow-hidden hover:border-[#10b981]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#10b981]/10 hover:-translate-y-1">
                    
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] image-container no-context-menu">
                      {product.image ? (
                        <ProtectedImage 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="scale-110 opacity-50">
                            {productIcons[product.category]}
                          </div>
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm ${
                          product.inStock 
                            ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}>
                          {product.inStock ? (
                            <>
                              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              In Stock
                            </>
                          ) : (
                            "Out of Stock"
                          )}
                        </span>
                      </div>
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center text-sm font-bold text-white bg-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                          From €{product.price?.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#10b981]">
                          {product.category}
                        </span>
                        <span className="text-gray-600">•</span>
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <FiStar key={s} className="w-3 h-3 text-[#10b981] fill-[#10b981]" />
                          ))}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#10b981] transition-colors duration-300">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {product.shortDescription || product.description || "Premium quality pharmaceutical-grade product"}
                      </p>

                      {/* Price Range */}
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-[#10b981]">
                          {product.sizes?.length > 1
                            ? `€${product.sizes[0].price?.toFixed(2)}`
                            : `€${product.price?.toFixed(2)}`
                          }
                        </span>
                        {product.sizes?.length > 1 && (
                          <span className="text-sm text-gray-500 ml-2">
                            — €{product.sizes[product.sizes.length - 1].price?.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={`/shop/${product.slug}`}
                        className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${
                          product.inStock
                            ? "bg-[#10b981] hover:bg-[#059669] text-black hover:shadow-lg hover:shadow-[#10b981]/25 hover:scale-105"
                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {product.inStock ? (
                          <>
                            View Details
                            <FiArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          "Out of Stock"
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
