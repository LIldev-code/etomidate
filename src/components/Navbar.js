"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiShoppingBag, FiHome, FiInfo, FiMail, FiChevronDown } from "react-icons/fi";
import { GiChemicalDrop } from "react-icons/gi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: <FiHome className="w-4 h-4" /> },
    { href: "/shop", label: "Shop", icon: <FiShoppingBag className="w-4 h-4" /> },
    { href: "/about", label: "About", icon: <FiInfo className="w-4 h-4" /> },
    { href: "/contact", label: "Contact", icon: <FiMail className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#0a0a0a] via-[#111] to-[#0a0a0a] text-white sticky top-0 z-50 shadow-lg shadow-black/30 border-b border-[#1e1e1e] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img src="/logo.svg" alt="BuyEtomidateProducts.com" className="h-12 transition-all duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#10b981]/10 rounded-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#10b981] transition-all duration-200 hover:bg-[#10b981]/5 px-3 py-2 rounded-lg"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  {l.icon}
                </div>
                <span>{l.label}</span>
              </Link>
            ))}
            <Link
              href="/shop"
              className="flex items-center gap-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-black text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10b981]/25 hover:scale-105"
            >
              <FiShoppingBag className="w-4 h-4" />
              Shop Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-[#262626]"
            aria-label="Toggle menu"
          >
            {open ? <HiX className="w-6 h-6" /> : <HiOutlineMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-gradient-to-b from-[#111] to-[#0a0a0a] border-t border-[#1e1e1e] overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#10b981]/5 rounded-xl px-4 py-3 transition-all duration-200 border border-transparent hover:border-[#10b981]/20"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      {l.icon}
                    </div>
                    <span>{l.label}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-black text-sm font-bold px-6 py-3.5 rounded-xl mt-4 transition-all duration-300 hover:shadow-lg hover:shadow-[#10b981]/25"
                >
                  <FiShoppingBag className="w-4 h-4" />
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
