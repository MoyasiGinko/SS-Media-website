"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Separate ShamratText component with sticky scroll effect
const ShamratText = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current || !sectionRef.current) return;

      const textElement = textRef.current;
      const sectionElement = sectionRef.current;
      const sectionRect = sectionElement.getBoundingClientRect();
      const textHeight = textElement.offsetHeight;

      // Calculate the point at which the text should stop (section bottom minus text height)
      const stopPoint = sectionRect.height - textHeight;

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

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[100vh]" // Give the section enough height for scrolling
    >
      <div
        ref={textRef}
        className={`w-full text-center  pt-[144px] ${
          isSticky
            ? reachedBottom
              ? "absolute bottom-0"
              : "fixed top-0 left-0 right-0 z-10"
            : "relative"
        }`}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[250px]  syne-unique leading-[200px] font-bold tracking-tighter mix-blend-difference syne-unique"
          style={{
            textShadow: "0 0 15px rgba(255,255,255,0.3)",
          }}
        >
          SHAMRAT
        </h1>
      </div>
    </div>
  );
};

const AboutHero = () => {
  return (
    <section className="relative min-h-screen">
      {/* Main title with sticky behavior */}

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 to-black/50"></div>
        <Image
          src="/images/team/hero.png"
          alt="Founder"
          layout="fill"
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col md:flex-row justify-between w-full px-4 sm:px-8 md:px-16 space-y-8 md:space-y-0 items-center md:items-center">
        <div className="md:max-w-[470px] md:ml-4 lg:ml-16 flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] font-bold syne-unique mb-2">
            Founder
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-[24px] leading-tight tracking-tight text-white/70">
            SS Media
          </p>
        </div>

        <div className="md:max-w-[470px] md:mr-4 lg:mr-16 flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] font-bold syne-unique mb-2">
            FROM IDEA TO IMPACT
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-[24px] leading-tight tracking-tight text-white/70">
            From Stunning Thumbnails To Sleek Interfaces, We Craft Digital
            Content That Connects, Converts, And Leaves A Lasting Mark.
          </p>
        </div>
      </div>
      <ShamratText />
    </section>
  );
};

export default AboutHero;
