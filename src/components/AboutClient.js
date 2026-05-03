"use client";
import { motion } from "framer-motion";
import { HiOutlineBeaker, HiOutlineShieldCheck } from "react-icons/hi";
import { BsBoxSeam, BsPeople } from "react-icons/bs";
import { FiTarget } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const sections = [
  {
    icon: <FiTarget className="w-6 h-6 text-[#d4a038]" />,
    title: "Our Mission",
    text: "We exist to make high-purity etomidate accessible to qualified researchers, compounding pharmacies, and licensed practitioners around the world. By maintaining direct relationships with GMP-certified manufacturers, we eliminate unnecessary middlemen and pass the savings on to our customers — without ever cutting corners on quality.",
  },
  {
    icon: <HiOutlineShieldCheck className="w-6 h-6 text-[#d4a038]" />,
    title: "Quality Assurance",
    text: "Every product we sell is subjected to rigorous third-party testing. Our etomidate powder is verified at ≥99.8% purity via HPLC analysis. K-Pods and liquid solutions undergo additional stability and consistency testing. A Certificate of Analysis (COA) is included with every shipment, so you always know exactly what you're receiving.",
  },
  {
    icon: <BsBoxSeam className="w-6 h-6 text-[#d4a038]" />,
    title: "Shipping & Privacy",
    text: "We understand the importance of discretion. All orders are double-sealed in plain, unmarked packaging with no external indication of contents. We ship via tracked courier services and provide real-time tracking updates. International orders are processed with full customs documentation to ensure smooth delivery.",
  },
  {
    icon: <BsPeople className="w-6 h-6 text-[#d4a038]" />,
    title: "Our Team",
    text: "BuyEtomidateOnline was founded by a team of analytical chemists and pharmaceutical logistics professionals with over 15 years of combined experience in the research chemical sector. We are passionate about product integrity and customer service. Our support team is available 7 days a week to assist with orders, product questions, and shipping inquiries.",
  },
];

export default function AboutClient({ aboutText }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#d4a038]/10 rounded-xl flex items-center justify-center">
            <HiOutlineBeaker className="w-6 h-6 text-[#d4a038]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            About <span className="text-[#d4a038]">BuyEtomidateOnline</span>
          </h1>
        </div>

        {aboutText && (
          <p className="text-gray-400 text-lg leading-relaxed mb-10 border-l-4 border-[#d4a038] pl-5">
            {aboutText}
          </p>
        )}
      </motion.div>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8 hover:border-[#d4a038]/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#d4a038]/10 rounded-lg flex items-center justify-center shrink-0">
                {section.icon}
              </div>
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">{section.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
