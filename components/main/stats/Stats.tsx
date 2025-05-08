"use client";
import React from "react";
import { motion } from "framer-motion";

const Stats = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const countVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="w-full flex flex-col items-center py-16 px-4 bg-transparent"
    >
      <motion.div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center mb-8 z-50">
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <motion.span
            variants={countVariants}
            className="text-6xl font-bold text-white"
          >
            15+
          </motion.span>
          <span className="text-lg font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DC66AF] via-[#FC5F67] to-[#FFAF54] mt-1">
            Satisfied Clients
          </span>
        </motion.div>

        <div className="hidden md:block w-1 h-18 bg-gray-50" />

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <motion.span
            variants={countVariants}
            className="text-6xl font-bold text-white"
          >
            6+
          </motion.span>
          <span className="text-lg font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DC66AF] via-[#FC5F67] to-[#FFAF54] mt-1">
            Years Of Experience
          </span>
        </motion.div>

        <div className="hidden md:block w-1 h-18 bg-gray-50" />

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <motion.span
            variants={countVariants}
            className="text-6xl font-bold text-white"
          >
            10+
          </motion.span>
          <span className="text-lg font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DC66AF] via-[#FC5F67] to-[#FFAF54] mt-1">
            Team Members
          </span>
        </motion.div>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-center text-gray-400 max-w-3xl text-3xl font-medium backdrop-blur-sm p-4 rounded-lg border border-gray-800/30"
      >
        Don't Need To Search Multiple Agency Or Freelancer For Your Projects. We
        Have Complete Solution For You.
      </motion.p>
    </motion.section>
  );
};

export default Stats;
