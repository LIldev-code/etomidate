"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiMail, FiPhone, FiTruck, FiClock, FiUser, FiSend, FiMessageSquare, FiLoader } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [siteSettings, setSiteSettings] = useState({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setSiteSettings(data.settings || {}))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactItems = [
    { icon: <FiMail className="w-5 h-5 text-[#d4a038]" />, label: "Email", value: siteSettings.contactEmail },
    { icon: <FiPhone className="w-5 h-5 text-[#d4a038]" />, label: "Phone", value: siteSettings.contactPhone },
    { icon: <FiTruck className="w-5 h-5 text-[#d4a038]" />, label: "Shipping", value: siteSettings.shippingNote },
    { icon: <FiClock className="w-5 h-5 text-[#d4a038]" />, label: "Business Hours", value: "Monday – Sunday, 9:00 AM – 9:00 PM (EST)" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Contact Us
        </h1>
        <p className="text-gray-500 mb-10 max-w-xl">
          Have a question about our products, need help with an order, or want to discuss bulk pricing? Reach out and we&apos;ll respond within 24 hours.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-5">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-start gap-4 p-4 bg-[#141414] rounded-xl border border-[#262626]"
            >
              <div className="w-10 h-10 bg-[#d4a038]/10 rounded-lg flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-0.5">{item.label}</h3>
                <p className="text-gray-400 text-sm">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#141414] border border-[#d4a038]/30 rounded-2xl p-8 text-center flex flex-col items-center justify-center"
          >
            <FiCheckCircle className="w-12 h-12 text-[#d4a038] mb-4" />
            <h3 className="text-lg font-bold text-[#d4a038] mb-1">Message Sent!</h3>
            <p className="text-sm text-gray-300">We&apos;ll get back to you within 24 hours.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm text-[#d4a038] hover:underline font-medium"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="relative">
              <FiUser className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#262626] text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a038] focus:border-transparent placeholder:text-gray-600"
              />
            </div>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#262626] text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a038] focus:border-transparent placeholder:text-gray-600"
              />
            </div>
            <div className="relative">
              <FiMessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Subject"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#262626] text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a038] focus:border-transparent placeholder:text-gray-600"
              />
            </div>
            <textarea
              placeholder="Your Message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#262626] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a038] focus:border-transparent placeholder:text-gray-600"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-[#d4a038] hover:bg-[#b8862e] disabled:bg-[#b8862e]/50 text-black font-semibold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-[#d4a038]/25"
            >
              {submitting ? (
                <FiLoader className="w-5 h-5 animate-spin" />
              ) : (
                <FiSend className="w-5 h-5" />
              )}
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
