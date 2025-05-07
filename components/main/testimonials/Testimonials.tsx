"use client";
import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="reviews"
      className="w-full py-16 px-4 flex flex-col items-center"
    >
      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
          variants={itemVariants}
        >
          What Our Clients Say
        </motion.h2>

        <motion.p
          className="text-gray-400 mb-12 text-right max-w-2xl mx-auto"
          variants={itemVariants}
        >
          We Take Pride In Delivering High-Quality Edits That Make Content Truly
          Stand Out. But Don't Just Take Our Word For It. Hear From Real Clients
          Who Trusted Us With Their Vision And Saw Real Results.
        </motion.p>

        <motion.div
          className="relative w-full flex flex-col md:flex-row items-center md:items-start gap-8 mt-12"
          variants={itemVariants}
        >
          {/* Video container positioned to overlap with text */}
          <motion.div
            className="w-full md:w-1/2 h-64 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center shadow-lg z-10 md:absolute md:left-0 md:top-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Placeholder for client image/video */}
            <span className="text-7xl text-gray-400">😊</span>
            {/* You could replace with: <video className="w-full h-full object-cover" src="..." /> */}
          </motion.div>

          {/* Text container positioned to be partially under the video */}
          <motion.div
            className="w-full md:w-3/5 bg-[#181818] rounded-xl p-8 border border-gray-700 shadow-xl relative md:ml-auto md:mt-20"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="absolute -top-6 right-8 text-orange-400"
              width="40"
              height="40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.17 15H4.5A1.5 1.5 0 0 1 3 13.5v-2.25A6.25 6.25 0 0 1 9.25 5h.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-.5A4.75 4.75 0 0 0 5 11.25v2.25c0 .414.336.75.75.75h2.67a.75.75 0 0 1 0 1.5zm10 0h-2.67a.75.75 0 0 1 0-1.5H19.5a.75.75 0 0 0 .75-.75v-2.25A6.25 6.25 0 0 0 14.75 5h-.5a.75.75 0 0 0-.75.75v.5a.75.75 0 0 0 .75.75h.5A4.75 4.75 0 0 1 19 11.25v2.25c0 .414-.336.75-.75.75z" />
            </svg>
            <blockquote className="text-gray-200 text-lg mb-4 text-right">
              I Wanted Someone To Help Me With My YouTube Channel, The Seller
              Did A Great Job And I'm Very Happy With The Result.
            </blockquote>
            <div className="font-semibold text-orange-400 text-right">
              Mikasa Ackerman
            </div>
            <div className="text-xs text-gray-400 text-right">
              CEO – Even Life
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
