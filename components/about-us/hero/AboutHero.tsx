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
  const backgroundRef = useRef<HTMLDivElement>(null);

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
      });

      // Create an animation to toggle background colors
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          backgroundColor: "rgba(255, 255, 255, 1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
            scrub: true,
          },
        });
      }

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
    <div
      ref={sectionRef}
      className="relative mix-blend-difference min-h-[100vh]"
    >
      {/* Background element that toggles between dark and light */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 transition-colors duration-500"
      />

      <div
        ref={textRef}
        className="w-full text-center pt-[144px] relative z-10 "
      >
        <div className="flex justify-center items-center">
          {characters.map((char, index) => (
            <span
              key={index}
              ref={(el) => setCharRef(el, index)}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[250px] leading-[200px] syne-unique font-bold tracking-tighter inline-block text-white"
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
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null); // Add reference for the main section element

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    if (
      typeof window !== "undefined" &&
      backgroundRef.current &&
      contentRef.current &&
      sectionRef.current
    ) {
      const animations = gsap.context(() => {
        // Background and side content opacity animation
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom+=50% bottom",
          scrub: true,
          onUpdate: (self) => {
            const fadeProgress = Math.pow(self.progress, 1.5); // Non-linear easing
            const imgOpacity = 1 - fadeProgress * 0.9; // Increased fade effect
            const textOpacity = 1 - fadeProgress * 5;

            // Fade background
            if (backgroundRef.current) {
              gsap.to(backgroundRef.current, {
                opacity: imgOpacity,
                duration: 0.3,
                ease: "power1.out",
              });
            }

            // Fade left content (move left and fade out)
            if (leftContentRef.current) {
              gsap.to(leftContentRef.current, {
                opacity: textOpacity,
                x: -fadeProgress * 1000, // Move left
                duration: 0.3,
                ease: "power1.out",
              });
            }

            // Fade right content (move right and fade out)
            if (rightContentRef.current) {
              gsap.to(rightContentRef.current, {
                opacity: textOpacity,
                x: fadeProgress * 1000, // Move right
                duration: 0.3,
                ease: "power1.out",
              });
            }
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
              opacity: 0.5 + index * 0.05, // Decreased base opacity for more fade
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
          ref={leftContentRef}
          className="md:max-w-[470px] md:ml-4 lg:ml-[220px] mt-[200px] flex flex-col justify-center"
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
          ref={rightContentRef}
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
