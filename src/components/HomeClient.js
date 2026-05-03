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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const productIcons = {
  powder: <FaFlask className="w-20 h-20 text-[#d4a038]" />,
  vape: <FaVial className="w-20 h-20 text-[#d4a038]" />,
  liquid: <FaTint className="w-20 h-20 text-[#d4a038]" />,
};

export default function HomeClient({ products, siteSettings = {} }) {
  const settings = siteSettings || {};
  const carouselSlides = [
    {
      icon: <HiOutlineSparkles className="w-4 h-4" />,
      text: settings.announcement || "Premium Etomidate Products — Order Today",
      cta: "Shop Now",
      href: "/shop",
    },
    {
      icon: <HiOutlineTruck className="w-4 h-4" />,
      text: "Discreet Tracked Shipping Worldwide — Orders Ship Within 48h",
      cta: "Learn More",
      href: "/about",
    },
    {
      icon: <BsShieldCheck className="w-4 h-4" />,
      text: "Lab-Tested ≥99.8% Purity — Certificate of Analysis With Every Order",
      cta: "View Products",
      href: "/shop",
    },
    {
      icon: <BsLightningCharge className="w-4 h-4" />,
      text: "Powder / Krystal • Vape / K-Pods • Liquid — Available in Multiple Sizes",
      cta: "Browse All",
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
    name: "BuyEtomidateOnline.com",
    url: "https://buyetomidateonline.com",
    description: "Premium pharmaceutical-grade etomidate products — powder, vape & liquid solutions.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://buyetomidateonline.com/shop?q={search_term_string}",
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

      {/* Carousel Banner */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative bg-gradient-to-r from-[#0a0a0a] via-[#1a1508] to-[#0a0a0a] border-b border-[#d4a038]/20">
              {/* Shimmer */}
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(212,160,56,0.08)_50%,transparent_75%)] bg-[length:250%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center">
                {/* Left: prev arrow */}
                <button
                  onClick={() => setSlideIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-gray-600 hover:text-[#d4a038] transition-colors"
                  aria-label="Previous slide"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>

                {/* Slide content — text always centered */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slideIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="w-full flex items-center justify-center gap-2 min-h-[28px] text-center"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#d4a038]/15 text-[#d4a038] shrink-0">
                      {slide.icon}
                    </span>
                    <p className="text-sm font-medium text-[#d4a038]">
                      {slide.text}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Right: next arrow */}
                <button
                  onClick={nextSlide}
                  className="absolute right-10 sm:right-12 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-gray-600 hover:text-[#d4a038] transition-colors"
                  aria-label="Next slide"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>

                {/* Close */}
                <button
                  onClick={() => setBannerVisible(false)}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-gray-600 hover:text-white transition-colors"
                  aria-label="Close banner"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Dots indicator */}
              <div className="flex items-center justify-center gap-1.5 pb-1.5">
                {carouselSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === slideIndex
                        ? "w-4 h-1.5 bg-[#d4a038]"
                        : "w-1.5 h-1.5 bg-gray-700 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="bg-[#0a0a0a] text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Dot grid pattern */}
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(#d4a038 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }} />

          {/* Floating orbs — bigger, brighter */}
          <motion.div
            animate={{ x: [0, 60, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.3, 0.85, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-[#d4a038] rounded-full blur-[120px] opacity-30"
          />
          <motion.div
            animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0], scale: [1, 0.75, 1.2, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[0%] right-[5%] w-[450px] h-[450px] bg-[#b8862e] rounded-full blur-[130px] opacity-30"
          />
          <motion.div
            animate={{ x: [0, 40, -50, 0], y: [0, -60, 40, 0], scale: [1, 1.15, 0.9, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[35%] left-[45%] w-[350px] h-[350px] bg-[#e8c468] rounded-full blur-[120px] opacity-20"
          />

          {/* Animated rings — more visible */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-2 border-[#d4a038]/[0.12]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#d4a038]/[0.08]"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-dashed border-[#d4a038]/[0.06]"
          />

          {/* Pulsing center glow */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#d4a038] rounded-full blur-[100px]"
          />

          {/* Floating particles — bigger, more visible */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100 - i * 15, 0],
                x: [0, (i % 2 === 0 ? 40 : -40), 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
              className="absolute w-1.5 h-1.5 bg-[#d4a038] rounded-full"
              style={{ left: `${8 + i * 9}%`, top: `${20 + (i % 4) * 18}%` }}
            />
          ))}

          {/* Horizontal gold line sweeps */}
          <motion.div
            animate={{ x: ["-100%", "250%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            className="absolute top-[40%] left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#d4a038]/30 to-transparent"
          />
          <motion.div
            animate={{ x: ["250%", "-100%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
            className="absolute top-[60%] left-0 w-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#d4a038]/20 to-transparent"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
            >
              Premium <span className="text-[#d4a038]">Etomidate</span>
              <br />
              Trusted Worldwide
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              {settings.heroSubtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 bg-[#d4a038] hover:bg-[#b8862e] text-black font-semibold px-8 py-3.5 rounded-lg transition-all hover:shadow-lg hover:shadow-[#d4a038]/25"
              >
                <FiShoppingBag className="w-5 h-5" />
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 border border-[#d4a038]/40 hover:bg-[#d4a038]/10 text-[#d4a038] font-semibold px-8 py-3.5 rounded-lg transition-colors"
              >
                <FiMail className="w-5 h-5" />
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-[#111111] border-y border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <HiOutlineBeaker className="w-8 h-8 text-[#d4a038]" />, title: "Lab Tested", sub: "99.8%+ purity verified" },
              { icon: <HiOutlineTruck className="w-8 h-8 text-[#d4a038]" />, title: "Discreet Shipping", sub: "Tracked & sealed packaging" },
              { icon: <HiOutlineLightningBolt className="w-8 h-8 text-[#d4a038]" />, title: "Fast Dispatch", sub: "Ships within 48h" },
              { icon: <HiOutlineGlobe className="w-8 h-8 text-[#d4a038]" />, title: "Worldwide Delivery", sub: "International shipping available" },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex flex-col items-center gap-2.5 p-4"
              >
                <div className="w-14 h-14 bg-[#d4a038]/10 rounded-xl flex items-center justify-center">
                  {b.icon}
                </div>
                <h3 className="text-sm font-bold text-white">{b.title}</h3>
                <p className="text-xs text-gray-500">{b.sub}</p>
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
              What Our <span className="text-[#d4a038]">Customers Say</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Trusted by researchers and professionals worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Marcus W.",
                location: "Berlin, Germany",
                text: "The purity is outstanding — tested it in our lab and results matched the COA perfectly. Shipping was fast and completely discreet. Will be ordering again.",
                rating: 5,
              },
              {
                name: "Sophie L.",
                location: "Amsterdam, Netherlands",
                text: "I was skeptical ordering online, but these guys are legit. Product arrived in 2 days, well-packaged, and the quality is top-notch. Customer support was also very responsive.",
                rating: 5,
              },
              {
                name: "James R.",
                location: "London, UK",
                text: "Best supplier I've found. Consistent quality across multiple orders, fair pricing, and they always include the certificate of analysis. Highly recommended.",
                rating: 5,
              },
              {
                name: "Elena M.",
                location: "Zurich, Switzerland",
                text: "Ordered the powder form for our research project. Arrived within 48 hours with full documentation. The purity exceeded our expectations. Excellent service.",
                rating: 5,
              },
              {
                name: "Thomas K.",
                location: "Vienna, Austria",
                text: "Third order now and always the same great quality. Communication is excellent, packaging is professional and discreet. They really care about their customers.",
                rating: 5,
              },
              {
                name: "Anna B.",
                location: "Paris, France",
                text: "Fast delivery, great product, and the support team answered all my questions before I placed my order. This is how online business should be done.",
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
                className="bg-[#141414] border border-[#262626] rounded-2xl p-6 hover:border-[#d4a038]/30 transition-all"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[1,2,3,4,5].map((s) => (
                    <FiStar key={s} className={`w-4 h-4 ${s <= review.rating ? "text-[#d4a038] fill-[#d4a038]" : "text-gray-700"}`} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-gray-300 leading-relaxed mb-5">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#1e1e1e]">
                  <div className="w-10 h-10 rounded-full bg-[#d4a038]/10 border border-[#d4a038]/20 flex items-center justify-center text-[#d4a038] font-bold text-sm">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a038] rounded-full blur-[180px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-12"
          >
            Why Choose <span className="text-[#d4a038]">BuyEtomidateOnline</span>?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BsShieldCheck className="w-8 h-8 text-[#d4a038]" />,
                title: "Pharmaceutical-Grade Quality",
                desc: "Every batch undergoes HPLC testing and comes with a Certificate of Analysis. We never compromise on purity.",
              },
              {
                icon: <BsBoxSeam className="w-8 h-8 text-[#d4a038]" />,
                title: "Secure & Discreet",
                desc: "Orders are double-sealed in plain packaging with no external markings. Your privacy is our priority.",
              },
              {
                icon: <BsHeadset className="w-8 h-8 text-[#d4a038]" />,
                title: "Dedicated Support",
                desc: "Our team of specialists is available 7 days a week to answer questions, guide orders, and resolve any issues.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-8 hover:border-[#d4a038]/30 transition-colors"
              >
                <div className="w-14 h-14 bg-[#d4a038]/10 rounded-xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 text-center bg-[#0a0a0a]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto px-4"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Order?
          </h2>
          <p className="text-gray-500 mb-8">
            Browse our catalog, select your product and quantity, and place your order. We handle the rest — fast, discreet, and reliable.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#d4a038] hover:bg-[#b8862e] text-black font-semibold px-10 py-4 rounded-lg transition-all hover:shadow-lg hover:shadow-[#d4a038]/25 text-lg"
          >
            <FiShoppingBag className="w-5 h-5" />
            Shop Now
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}

/* ─── Product Tabs by Category ─── */
const categoryMeta = {
  powder: { label: "Powder / Krystal", icon: <FaFlask className="w-4 h-4" /> },
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
            Our <span className="text-[#d4a038]">Products</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Browse our range of premium etomidate products by category.
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
                  ? "bg-[#d4a038] text-black shadow-lg shadow-[#d4a038]/20"
                  : "bg-[#141414] text-gray-400 border border-[#262626] hover:border-[#d4a038]/40 hover:text-white"
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
                <div key={product._id || product.slug} className="product-card bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden hover:border-[#d4a038]/40 transition-all group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#d4a038]/8 duration-300">
                  {/* Image */}
                  <div className="relative h-56 bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="text-center">
                        {productIcons[product.category]}
                      </div>
                    )}
                    {/* Badges on image */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.inStock ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-green-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          In Stock
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-red-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                          Sold Out
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-bold text-[#d4a038] bg-black/60 backdrop-blur-sm border border-[#d4a038]/20 px-3 py-1 rounded-full">
                        From €{product.price?.toFixed(2)}
                      </span>
                    </div>
                    {/* Category tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-0.5 mb-2">
                      {[1,2,3,4,5].map((s) => (
                        <FiStar key={s} className="w-3.5 h-3.5 text-[#d4a038] fill-[#d4a038]" />
                      ))}
                      <span className="text-[11px] text-gray-500 ml-1.5">5.0</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#d4a038] transition-colors">{product.name}</h3>

                    {/* Price range */}
                    <p className="text-sm font-semibold text-[#d4a038] mb-2">
                      {product.sizes?.length > 1
                        ? `€${product.sizes[0].price?.toFixed(2)} — €${product.sizes[product.sizes.length - 1].price?.toFixed(2)}`
                        : `€${product.price?.toFixed(2)}`
                      }
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {product.shortDescription || product.description || "Premium quality product"}
                    </p>

                    {/* CTA */}
                    <Link
                      href={`/shop/${product.slug}`}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#d4a038] hover:bg-[#b8862e] text-black text-sm font-semibold px-4 py-2.5 rounded-lg transition-all hover:shadow-md hover:shadow-[#d4a038]/20"
                    >
                      Order Now
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
