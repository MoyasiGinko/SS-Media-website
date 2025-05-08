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
    <section className="w-full py-16 bg-transparent text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Heading Section */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            variants={itemVariants}
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            className="text-center text-gray-300 max-w-3xl mx-auto mb-16"
            variants={itemVariants}
          >
            We Take Pride In Delivering High-Quality Edits That Make Content
            Truly Stand Out.
            <br />
            But Don't Just Take Our Word For It Hear From Real Clients Who
            Trusted Us
            <br />
            With Their Vision And Saw Real Results.
          </motion.p>

          {/* Testimonial Container */}
          <motion.div
            className="w-full flex flex-col md:flex-row gap-6 items-stretch"
            variants={itemVariants}
          >
            {/* Image Section */}
            <div
              className="w-full top-15 z-1 md:w-1/2 relative"
              style={{ marginLeft: "20px" }}
            >
              <div
                className="bg-transparent rounded-2xl overflow-hidden"
                style={{ width: "640px", height: "360px", marginLeft: "25px" }}
              >
                <img
                  src="/images/testimonials/t1.png"
                  alt="Mikasa Ackerman"
                  className="w-full h-full rounded-3xl object-cover"
                />
              </div>
            </div>

            {/* Quote Section */}
            <div className="w-full -z-0 md:w-[687px] bg-transparent relative flex items-center">
              <div
                className="bg-[#1D1D1D] border-1 border-gray-50 rounded-3xl relative flex items-center justify-center"
                style={{ width: "687px", height: "481px" }}
              >
                <div
                  style={{
                    paddingLeft: "138px",
                    paddingRight: "64px",
                  }}
                  className="flex flex-col justify-center h-full"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-pink-500"
                  >
                    <path
                      d="M12 28H4C2.89543 28 2 27.1046 2 26V20C2 13.3726 7.37258 8 14 8H16C17.1046 8 18 8.89543 18 10V12C18 13.1046 17.1046 14 16 14H14C10.6863 14 8 16.6863 8 20V24C8 24.5523 8.44772 25 9 25H12C13.1046 25 14 25.8954 14 27V28C14 29.1046 13.1046 30 12 30V28ZM32 28H24C22.8954 28 22 27.1046 22 26V20C22 13.3726 27.3726 8 34 8H36C37.1046 8 38 8.89543 38 10V12C38 13.1046 37.1046 14 36 14H34C30.6863 14 28 16.6863 28 20V24C28 24.5523 28.4477 25 29 25H32C33.1046 25 34 25.8954 34 27V28C34 29.1046 33.1046 30 32 30V28Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="text-[28px] font-medium text-gray-200 mb-6 text-left">
                    I Wanted Someone To Help Me With My YouTube Channel, The
                    Seller Did A Great Job And I'm Very Happy With The Result,
                  </p>

                  <div className="flex flex-col items-start">
                    <span className="text-base font-medium">
                      Mikasa Ackerman
                    </span>
                    <span className="text-sm text-gray-400">
                      CEO - Eren Life
                    </span>
                  </div>
                </div>

                <div className="absolute -right-3 -bottom-3 bg-black p-2 rounded-full border border-gray-800">
                  <div className="bg-pink-500 rounded-full p-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 8.25L14.5 12L21 15.75V8.25Z" fill="white" />
                      <path d="M10 8.25L3.5 12L10 15.75V8.25Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
