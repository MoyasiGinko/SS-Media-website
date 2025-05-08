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
    highlight: true,
    desc: "Next-Gen UI Designs—Blending Today's Trends With End-User Functionality To Create Stunning, User-Friendly Apps And Websites.",
    image: "/images/services/s3_uiux.png", // Replace with your actual image path
    alt: "UI/UX design service illustration",
  },
  {
    title: "SEO & Management",
    desc: "We provide full YouTube SEO (titles, descriptions, tags, thumbnails), content advice for your niche, and social media management to boost your reach across all platforms.",
    image: "/images/services/s4_seo.png", // Replace with your actual image path
    alt: "SEO service illustration",
  },
  {
    title: "Website Development",
    desc: "We Will Create A Website For You That Is Fully Responsive And SEO Optimized. We Will Also Provide You Free Software Support For 3 Months.",
    image: "/images/services/s5_manage.png", // Replace with your actual image path
    alt: "Management service illustration",
  },
  {
    title: "Individual Services",
    highlight: true,
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
      <h2 className="text-3xl md:text-6xl font-bold mb-4 text-white">
        Services
      </h2>
      <p className="text-xl md:text-[28px] text-white/80 mb-12 text-center max-w-2xl">
        We Provide Benefits That Are Convenient For You.
      </p>
    </motion.div>

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-wrap justify-center gap-8 w-full max-w-6xl"
    >
      {services.map((service, i) => (
        // Outer container with padding on top to make space for the badge
        <div
          className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)]"
          key={i}
        >
          {/* Card wrapper with padding to make space for badge */}
          <div className="pt-4 h-full relative">
            {/* The badge positioned above the card */}
            {service.highlight && (
              <motion.div
                className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#FC5F67] text-black font-bold px-3 py-1 text-xs rounded-lg shadow-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                TOP CHOICE
              </motion.div>
            )}

            {/* Actual card */}
            <motion.div
              variants={item}
              className={`group rounded-xl p-4 overflow-hidden bg-[#1d1d1d] border transition-all shadow-lg h-full flex flex-col ${
                service.highlight
                  ? "border-[0.36px] border-[#FC5F67]"
                  : "border-[0.36px] border-white/90 hover:border-white"
              }`}
            >
              {/* Image container */}
              <div className="w-full h-60 overflow-hidden flex items-center justify-center">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full rounded-lg object-fit cover"
                />
              </div>

              {/* Content container */}
              <div className="pt-4 flex text-left flex-col flex-grow">
                <h3 className="font-bold text-3xl mb-3 text-white group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-xl flex-grow group-hover:text-white/90 transition-colors duration-300">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </motion.div>
  </section>
);

export default Services;
