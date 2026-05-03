"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiShoppingBag, FiHome, FiInfo, FiMail } from "react-icons/fi";
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
    <nav className="bg-[#0a0a0a] text-white sticky top-0 z-50 shadow-lg shadow-black/40 border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="BuyEtomidateOnline.com" className="h-10" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-[#d4a038] transition-colors"
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="flex items-center gap-2 bg-[#d4a038] hover:bg-[#b8862e] text-black text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-[#d4a038]/25"
            >
              <FiShoppingBag className="w-4 h-4" />
              Order Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
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
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#111111] border-t border-[#262626] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
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
                    className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg px-3 py-2.5 transition-colors"
                  >
                    {l.icon}
                    {l.label}
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
                  className="flex items-center justify-center gap-2 bg-[#d4a038] hover:bg-[#b8862e] text-black text-sm font-semibold px-5 py-2.5 rounded-lg mt-2 transition-colors"
                >
                  <FiShoppingBag className="w-4 h-4" />
                  Order Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
