// components/Services.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Spotlight from "@/lib/spotlight";

// Updated services array with image URLs
const services = [
  {
    title: "Video Editing",
    desc: "Videos Are Valuable Assets. Therefore, We Make Sure Exceptional Video Editing Services To Help You Stay Updated On Evolving Trends.",
    highlight: true,
    image: "/images/services/s1_video.png",
    alt: "Video editing service illustration",
  },
  {
    title: "Graphics Design",
    desc: "We Will Provide You With High Quality Thumbnails, Banners, And Posters That Meet Your Specific Requirements.",
    image: "/images/services/s2_graphics.png",
    alt: "Graphics design service illustration",
  },
  {
    title: "UI/UX",
    highlight: true,
    desc: "Next-Gen UI Designs—Blending Today's Trends With End-User Functionality To Create Stunning, User-Friendly Apps And Websites.",
    image: "/images/services/s3_uiux.png",
    alt: "UI/UX design service illustration",
  },
  {
    title: "SEO & Management",
    desc: "We provide full YouTube SEO (titles, descriptions, tags, thumbnails), content advice for your niche, and social media management to boost your reach across all platforms.",
    image: "/images/services/s4_seo.png",
    alt: "SEO service illustration",
  },
  {
    title: "Website Development",
    desc: "We Will Create A Website For You That Is Fully Responsive And SEO Optimized. We Will Also Provide You Free Software Support For 3 Months.",
    image: "/images/services/s5_manage.png",
    alt: "Management service illustration",
  },
  {
    title: "Individual Services",
    highlight: true,
    desc: "If You Want To Try Every Single Services Individually, This Will Be A Better Option For You.",
    image: "/images/services/s6_others.png",
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

    {/* We're wrapping the service cards in the Spotlight component */}
    <Spotlight className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
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

            {/* Actual card with spotlight effect */}
            <motion.div
              variants={item}
              className={`group/card relative rounded-xl p-4 overflow-hidden bg-[#1d1d1d] border transition-all shadow-lg h-full flex flex-col
                ${
                  service.highlight
                    ? "border-[0.36px] border-[#FC5F67]"
                    : "border-[0.36px] border-white/90 hover:border-white"
                }
                before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80
                before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full
                before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500
                after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64
                after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full
                after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500
                after:hover:opacity-20 before:group-hover/card:opacity-100
              `}
            >
              {/* Image container */}
              <div className="w-full h-60 overflow-hidden flex items-center justify-center relative z-20">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full rounded-lg object-fit cover"
                />
              </div>

              {/* Content container */}
              <div className="pt-4 flex text-left flex-col flex-grow relative z-20">
                <h3 className="font-bold text-3xl mb-3 text-white group-hover/card:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-xl flex-grow group-hover/card:text-white/90 transition-colors duration-300">
                  {service.desc}
                </p>

                {/* Arrow icon that appears on hover (similar to the dummy cards) */}
                <div
                  className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={9}
                    height={8}
                    fill="none"
                  >
                    <path
                      fill="#F4F4F5"
                      d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </Spotlight>
  </section>
);

export default Services;
