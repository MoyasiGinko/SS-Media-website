"use client";
import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Video Editing",
    desc: "Videos Are Valuable Assets. Therefore, We Make Sure Exceptional Video Editing Services To Help You Stay Updated On Evolving Trends.",
    highlight: true,
    icon: "✂️",
  },
  {
    title: "Graphics Design",
    desc: "We Will Provide You With High Quality Thumbnails, Banners, And Posters That Meet Your Specific Requirements.",
    icon: "🎨",
  },
  {
    title: "UI/UX",
    desc: "Next-Gen UI Designs—Blending Today's Trends With End-User Functionality To Create Stunning, User-Friendly Apps And Websites.",
    icon: "📱",
  },
  {
    title: "SEO",
    desc: "We Do Full SEO For YouTube Videos. (Title, Description, Tags) Along With Off Page SEO For Thumbnails.",
    icon: "🔍",
  },
  {
    title: "Management",
    desc: "We Can Advise You On Creating Better Video Content For Your Niche And Manage Your Social Media To Ensure Your Content Reaches All Platforms.",
    icon: "📊",
  },
  {
    title: "Individual Services",
    desc: "If You Want To Try Every Single Services Individually, This Will Be A Better Option For You.",
    icon: "👤",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const Services = () => (
  <section
    id="services"
    className="w-full py-20 px-4 flex flex-col items-center bg-gradient-to-b from-black to-[#121212]"
  >
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
        Our Services
      </h2>
      <p className="text-gray-400 mb-12 text-center max-w-2xl">
        We Provide Benefits That Are Convenient For You.
      </p>
    </motion.div>

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
    >
      {services.map((service, i) => (
        <motion.div
          key={service.title}
          variants={item}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          className={`rounded-xl p-8 bg-[#181818] border transition-all shadow-lg h-full flex flex-col relative overflow-hidden ${
            service.highlight
              ? "border-2 border-orange-400 bg-gradient-to-br from-[#232323] to-[#181818]"
              : "border border-gray-700 hover:border-gray-500"
          }`}
        >
          {service.highlight && (
            <motion.div
              className="absolute top-0 right-0 bg-orange-400 text-black font-bold px-3 py-1 text-xs rounded-bl-lg"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5 }}
            >
              POPULAR
            </motion.div>
          )}
          <div className="text-3xl mb-4">{service.icon}</div>
          <h3 className="font-bold text-xl mb-3 text-white">{service.title}</h3>
          <p className="text-gray-400 text-sm flex-grow">{service.desc}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-4 px-4 py-2 rounded-md text-sm font-medium ${
              service.highlight
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Learn More
          </motion.button>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Services;
