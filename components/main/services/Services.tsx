"use client";
import React from "react";
import { motion } from "framer-motion";

// Updated services array with image URLs
const services = [
  {
    title: "Video Editing",
    desc: "Videos Are Valuable Assets. Therefore, We Make Sure Exceptional Video Editing Services To Help You Stay Updated On Evolving Trends.",
    highlight: true,
    image: "/images/services/s1_video.png", // Replace with your actual image path
    alt: "Video editing service illustration",
  },
  {
    title: "Graphics Design",
    desc: "We Will Provide You With High Quality Thumbnails, Banners, And Posters That Meet Your Specific Requirements.",
    image: "/images/services/s2_graphics.png", // Replace with your actual image path
    alt: "Graphics design service illustration",
  },
  {
    title: "UI/UX",
    desc: "Next-Gen UI Designs—Blending Today's Trends With End-User Functionality To Create Stunning, User-Friendly Apps And Websites.",
    image: "/images/services/s3_uiux.png", // Replace with your actual image path
    alt: "UI/UX design service illustration",
  },
  {
    title: "SEO",
    desc: "We Do Full SEO For YouTube Videos. (Title, Description, Tags) Along With Off Page SEO For Thumbnails.",
    image: "/images/services/s4_seo.png", // Replace with your actual image path
    alt: "SEO service illustration",
  },
  {
    title: "Management",
    highlight: true,
    desc: "We Can Advise You On Creating Better Video Content For Your Niche And Manage Your Social Media To Ensure Your Content Reaches All Platforms.",
    image: "/images/services/s5_manage.png", // Replace with your actual image path
    alt: "Management service illustration",
  },
  {
    title: "Individual Services",
    desc: "If You Want To Try Every Single Services Individually, This Will Be A Better Option For You.",
    image: "/images/services/s6_others.png", // Replace with your actual image path
    alt: "Individual services illustration",
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
    className="w-full py-20 px-4 flex flex-col items-center bg-transparent"
  >
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-white">
        Services
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
          className={`group rounded-xl overflow-hidden bg-[#181818] hover:bg-gradient-to-br hover:from-[#BB6FFB] hover:via-[#FC5F67] hover:to-[#FFB054] border transition-all shadow-lg h-full flex flex-col relative ${
            service.highlight
              ? "border-2 border-orange-400"
              : "border border-gray-700 hover:border-gray-500"
          }`}
        >
          {service.highlight && (
            <motion.div
              className="absolute top-0 right-0 z-10 bg-orange-400 text-black font-bold px-3 py-1 text-xs rounded-bl-lg"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5 }}
            >
              POPULAR
            </motion.div>
          )}

          {/* Image container */}
          <div className="w-full h-60 overflow-hidden flex items-center justify-center">
            <img
              src={service.image}
              alt={service.alt}
              className="w-full h-full p-2 rounded-2xl object-fit cover "
            />
          </div>

          {/* Content container */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-bold text-xl mb-3 text-white group-hover:text-black transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm flex-grow group-hover:text-black transition-colors duration-300">
              {service.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Services;
