"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Enhanced ShamratText component with continuous blend effect and animations
const ShamratText = () => {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current || !sectionRef.current) return;

      const textElement = textRef.current;
      const sectionElement = sectionRef.current;
      const sectionRect = sectionElement.getBoundingClientRect();
      const textHeight = textElement.offsetHeight;

      // Calculate the point at which the text should stop (section bottom minus text height)
      const stopPoint = sectionRect.height - textHeight;

      // Calculate scroll progress (0 to 1)
      const progress = Math.min(
        Math.max(Math.abs(sectionRect.top) / stopPoint, 0),
        1
      );
      setScrollProgress(progress);

      // When section top enters viewport
      if (sectionRect.top <= 0) {
        setIsSticky(true);

        // If we've scrolled past the stop point, pin to bottom
        if (Math.abs(sectionRect.top) >= stopPoint) {
          setReachedBottom(true);
        } else {
          setReachedBottom(false);
        }
      } else {
        setIsSticky(false);
        setReachedBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Split "SHAMRAT" into individual characters for animation
  const characters = "SHAMRAT".split("");

  return (
    <div ref={sectionRef} className="relative min-h-[100vh]">
      <div
        ref={textRef}
        className={`w-full text-center pt-[144px] ${
          isSticky
            ? reachedBottom
              ? "absolute bottom-0"
              : "fixed top-0 left-0 right-0 z-10"
            : "relative"
        }`}
      >
        <div className="flex justify-center items-center">
          {characters.map((char, index) => (
            <motion.span
              key={index}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[250px] syne-unique font-bold tracking-tighter inline-block mix-blend-difference"
              style={{
                textShadow: "0 0 15px rgba(255,255,255,0.3)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1 * index,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after a short delay for entrance animations
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  // Text animations variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth feel
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with parallax effect */}
      <motion.div
        className="absolute inset-0 -z-10 isolation-auto"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/team/hero.png"
          alt="Founder"
          layout="fill"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col md:flex-row justify-between w-full px-4 sm:px-8 md:px-16 space-y-8 md:space-y-0 items-center md:items-center">
        <motion.div
          className="md:max-w-[470px] md:ml-4 lg:ml-16 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] font-bold syne-unique mb-2"
            variants={itemVariants}
          >
            Founder
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-[24px] leading-tight tracking-tight text-white/70"
            variants={itemVariants}
          >
            SS Media
          </motion.p>
        </motion.div>

        <motion.div
          className="md:max-w-[470px] md:mr-4 lg:mr-16 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] font-bold syne-unique mb-2"
            variants={itemVariants}
          >
            FROM IDEA TO IMPACT
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-[24px] leading-tight tracking-tight text-white/70"
            variants={itemVariants}
          >
            <TextReveal text="From Stunning Thumbnails To Sleek Interfaces, We Craft Digital Content That Connects, Converts, And Leaves A Lasting Mark." />
          </motion.p>
        </motion.div>
      </div>
      <ShamratText />
    </section>
  );
};

// Text reveal animation component
const TextReveal = ({ text }) => {
  // Split text into words
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.6 + index * 0.03,
            ease: "easeOut",
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </>
  );
};

export default AboutHero;
