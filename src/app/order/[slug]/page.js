"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaFlask, FaVial, FaTint } from "react-icons/fa";
import { FiCheckCircle, FiUser, FiMail, FiMapPin, FiMessageSquare, FiShoppingBag, FiChevronRight, FiLoader, FiArrowLeft } from "react-icons/fi";

const categoryIcons = {
  powder: <FaFlask className="w-10 h-10 text-[#d4a038]" />,
  vape: <FaVial className="w-10 h-10 text-[#d4a038]" />,
  liquid: <FaTint className="w-10 h-10 text-[#d4a038]" />,
};

export default function OrderPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", message: "" });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const found = data.products?.find((p) => p.slug === slug);
        setProduct(found || null);
        // If size was passed via query param
        const sizeParam = searchParams.get("size");
        if (sizeParam && found?.sizes?.length) {
          const idx = found.sizes.findIndex((s) => s.label === sizeParam);
          if (idx >= 0) setSelectedSize(idx);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug, searchParams]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <FiLoader className="w-8 h-8 text-[#d4a038] animate-spin mx-auto mb-3" />
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/shop" className="text-[#d4a038] hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const handleOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.slug,
          productName: product.name,
          size: product.sizes?.[selectedSize]?.label || "Standard",
          price: product.sizes?.[selectedSize]?.price || product.price || 0,
          customerName: form.name,
          customerEmail: form.email,
          shippingAddress: form.address,
          message: form.message,
        }),
      });
      if (res.ok) {
        setOrderPlaced(true);
        toast.success("Order placed successfully!");
      } else {
        toast.error("Failed to place order. Try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const currentPrice = product.sizes?.[selectedSize]?.price || product.price || 0;

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto px-4 py-24 text-center"
      >
        <div className="bg-[#141414] border border-[#d4a038]/30 rounded-2xl p-10">
          <FiCheckCircle className="w-14 h-14 text-[#d4a038] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#d4a038] mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-300 mb-6">
            Thank you, {form.name}. We&apos;ve received your order for{" "}
            <strong>{product.name} ({product.sizes?.[selectedSize]?.label || "Standard"})</strong>.
            A confirmation will be sent to <strong>{form.email}</strong>.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#d4a038] hover:bg-[#b8862e] text-black font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <FiShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#d4a038] transition-colors">Home</Link>
          <FiChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-[#d4a038] transition-colors">Shop</Link>
          <FiChevronRight className="w-3 h-3" />
          <Link href={`/shop/${product.slug}`} className="hover:text-[#d4a038] transition-colors">{product.name}</Link>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-[#d4a038] font-medium">Order</span>
        </nav>

        {/* Back link */}
        <Link href={`/shop/${product.slug}`} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#d4a038] transition-colors mb-6">
          <FiArrowLeft className="w-3.5 h-3.5" />
          Back to product details
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Product summary */}
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  categoryIcons[product.category]
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-white truncate">{product.name}</h1>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
              </div>
            </div>

            {/* Selected quantity + price summary */}
            <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Selected Quantity</p>
                <p className="text-lg font-bold text-white">{product.sizes?.[selectedSize]?.label || "Standard"}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Price</p>
                <p className="text-2xl font-bold text-[#d4a038]">€{currentPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          {product.sizes?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Choose Quantity
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.sizes.map((size, i) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(i)}
                    className={`px-4 py-3.5 rounded-xl border text-sm font-medium transition-all text-center ${
                      selectedSize === i
                        ? "bg-[#d4a038] text-black border-[#d4a038] shadow-md shadow-[#d4a038]/20"
                        : "bg-[#141414] text-gray-300 border-[#262626] hover:border-[#d4a038]/50"
                    }`}
                  >
                    <span className="block text-base font-bold">{size.label}</span>
                    <span className={`text-sm ${selectedSize === i ? "text-black/70" : "text-[#d4a038]"}`}>€{size.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Order Form */}
          <form onSubmit={handleOrder} className="bg-[#141414] rounded-2xl p-6 border border-[#262626]">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-6">
              <FiShoppingBag className="w-5 h-5 text-[#d4a038]" />
              Your Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#0d0d0d] border border-[#262626] text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a038] focus:border-transparent placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#0d0d0d] border border-[#262626] text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a038] focus:border-transparent placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Shipping Address</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="123 Main St, Berlin, Germany"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-[#0d0d0d] border border-[#262626] text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a038] focus:border-transparent placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Message</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                  <textarea
                    placeholder="Tell us what you need, any special requests or questions..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#0d0d0d] border border-[#262626] text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a038] focus:border-transparent placeholder:text-gray-600 resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-[#d4a038] hover:bg-[#b8862e] disabled:bg-[#b8862e]/50 text-black font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#d4a038]/25 mt-6 text-base"
            >
              {submitting ? (
                <FiLoader className="w-5 h-5 animate-spin" />
              ) : (
                <FiShoppingBag className="w-5 h-5" />
              )}
              {submitting ? "Placing Order..." : `Place Order — €${currentPrice.toFixed(2)}`}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Payment instructions will be sent to your email after order confirmation.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
