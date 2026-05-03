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
    icon: <FiTarget className="w-6 h-6 text-[#10b981]" />,
    title: "Our Purpose",
    text: "We are dedicated to providing premium quality products to researchers and professionals worldwide. Through direct partnerships with certified manufacturers, we ensure consistent quality while maintaining competitive pricing. Our focus is on reliability, discretion, and exceptional service.",
  },
  {
    icon: <HiOutlineShieldCheck className="w-6 h-6 text-[#10b981]" />,
    title: "Quality Standards",
    text: "All our products undergo comprehensive testing procedures. We verify purity levels through laboratory analysis and ensure consistent quality across all formulations. Each shipment includes detailed documentation so you can be confident in the products you receive.",
  },
  {
    icon: <BsBoxSeam className="w-6 h-6 text-[#10b981]" />,
    title: "Discreet Delivery",
    text: "Privacy is our priority. All orders are packaged in plain, unmarked materials with no external indicators. We provide tracking information for all shipments and handle international deliveries with proper documentation to ensure smooth customs clearance.",
  },
  {
    icon: <BsPeople className="w-6 h-6 text-[#10b981]" />,
    title: "Professional Team",
    text: "Our company is operated by experienced professionals with extensive knowledge in pharmaceutical logistics and quality control. We are committed to maintaining high standards of service and are available to assist with any questions or concerns you may have.",
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
          <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center">
            <HiOutlineBeaker className="w-6 h-6 text-[#10b981]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            About <span className="text-[#10b981]">BuyEtomidateProducts</span>
          </h1>
        </div>

        {aboutText && (
          <p className="text-gray-400 text-lg leading-relaxed mb-10 border-l-4 border-[#10b981] pl-5">
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
            className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8 hover:border-[#10b981]/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#10b981]/10 rounded-lg flex items-center justify-center shrink-0">
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
