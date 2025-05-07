"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  // 3D parallax effect for the glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;

      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate distance from center (normalized)
      const moveX = ((clientX - centerX) / centerX) * 25; // max 25px movement
      const moveY = ((clientY - centerY) / centerY) * 25;

      glowRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.1)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center pt-24 py-16 px-4 text-center relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] z-0"></div>

      {/* 3D Gradient Glow Effect */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-600/20 via-orange-500/20 to-pink-600/20 blur-[100px] opacity-60 z-0 transition-transform duration-300 ease-out"
      ></div>

      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-purple-900/20 via-transparent to-orange-900/20 blur-[120px] opacity-60 z-0"></div>

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.span
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255, 165, 0, 0.3)",
            }}
            className="text-xs bg-[#1a1a1a] text-orange-300 px-4 py-1.5 rounded-full font-semibold tracking-wide border border-orange-500/20 shadow-sm shadow-orange-500/10 inline-block"
          >
            Your Content Deserves The Best. And We Deliver It.
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 syne-unique"
        >
          Give Your Content
          <br />
          The{" "}
          <motion.span
            className="bg-gradient-to-r from-[#BB6FFB] via-[#FC5F67] to-[#FFB054] bg-clip-text text-transparent drop-shadow-sm"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 100%" }}
          >
            Spotlight
          </motion.span>{" "}
          It Deserves
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 opacity-90"
        >
          From Edits To Interfaces, Visuals To Vision. We Bring Your Brand To
          Life. UI/UX Design, Video Editing, And Graphic Design, Tailored For
          Every Style And Platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#book"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
          >
            Book A Call
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, borderColor: "rgba(255,165,0,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href="#work"
            className="border border-gray-700 bg-[#181818] hover:bg-[#202020] text-white px-8 py-3 rounded-lg font-semibold text-sm transition-all hover:border-gray-600"
          >
            Our Work
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-2xl mx-auto aspect-video rounded-xl border border-orange-500/30 bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f] flex items-center justify-center relative shadow-2xl shadow-orange-500/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
          <motion.div
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/10 to-orange-500/10 blur-sm"
          ></motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-20 h-20 bg-[#232323] bg-opacity-80 rounded-full flex items-center justify-center border-4 border-orange-400 shadow-lg hover:scale-105 transition-all duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#232323" />
              <motion.polygon
                initial={{ x: -2 }}
                animate={{ x: 0 }}
                whileHover={{ fill: "#FFA500" }}
                points="16,13 28,20 16,27"
                fill="#FF7849"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
