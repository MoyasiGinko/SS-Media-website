"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Enhanced ShamratText component with GSAP for scroll effects
const ShamratText = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const charactersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Create refs for each character
  const setCharRef = (el: HTMLSpanElement | null, index: number): void => {
    charactersRef.current[index] = el;
  };

  useEffect(() => {
    // Make sure we're in the browser environment
    if (
      typeof window === "undefined" ||
      !sectionRef.current ||
      !textRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Initial animation for characters coming in
      gsap.fromTo(
        charactersRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Create the scroll-based animation
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: textRef.current
          ? `bottom-=${textRef.current.offsetHeight} top`
          : "bottom top",
        pin: textRef.current,
        pinSpacing: false,
        // No onUpdate effects for characters as requested
      });

      return () => {
        // Clean up ScrollTrigger when component unmounts
        scrollTrigger.kill();
      };
    }, sectionRef);

    // Clean up context when component unmounts
    return () => ctx.revert();
  }, []);

  // Split "SHAMRAT" into individual characters for animation
  const characters = "SHAMRAT".split("");

  return (
    <div ref={sectionRef} className="relative min-h-[100vh]">
      <div ref={textRef} className="w-full text-center pt-[144px]">
        <div className="flex justify-center items-center">
          {characters.map((char, index) => (
            <span
              key={index}
              ref={(el) => setCharRef(el, index)}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[250px] syne-unique font-bold tracking-tighter inline-block mix-blend-difference"
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const backgroundRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null); // Add reference for the main section element

  useEffect(() => {
    // Set visible after a short delay for entrance animations
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Create scroll animation for background image opacity and content elements
    if (
      typeof window !== "undefined" &&
      backgroundRef.current &&
      contentRef.current &&
      sectionRef.current
    ) {
      const animations = gsap.context(() => {
        // Background opacity animation - MODIFIED FOR SLOWER FADE
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          // Extended end point for slower fade effect
          end: "bottom+=50% bottom",
          scrub: true,
          // markers: true, // Uncomment for debugging
          onUpdate: (self) => {
            // Modified opacity calculation for slower fade
            // Using a smaller factor (0.4 instead of 0.7) and power function for non-linear fading
            const fadeProgress = Math.pow(self.progress, 1.5); // Non-linear easing
            gsap.to(backgroundRef.current, {
              opacity: 1 - fadeProgress * 0.8, // Fade to 0.6 opacity at bottom (less fade)
              duration: 0.3, // Slightly longer duration for smoother transition
              ease: "power1.out", // Gentle easing function
            });
          },
        });

        // Content elements animation on scroll
        const contentElements = contentRef.current
          ? contentRef.current.querySelectorAll("h2, p")
          : [];

        contentElements.forEach((element, index) => {
          gsap.fromTo(
            element,
            {
              y: 0,
              opacity: 1,
            },
            {
              y: -20,
              opacity: 0.7 + index * 0.05,
              scrollTrigger: {
                trigger: element,
                start: "top 70%",
                end: "bottom top",
                scrub: true,
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });

      return () => {
        animations.revert();
        clearTimeout(timeout);
      };
    }

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
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Background Image with parallax effect and scroll opacity animation */}
      <motion.div
        ref={backgroundRef}
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

      {/* Content with enhanced scroll animations */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col md:flex-row justify-between w-full px-4 sm:px-8 md:px-16 space-y-8 md:space-y-0 items-center md:items-center"
      >
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
const TextReveal: React.FC<{ text: string }> = ({ text }) => {
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
