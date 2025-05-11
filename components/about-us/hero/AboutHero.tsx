"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const shamratRef = useRef<HTMLHeadingElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Make sure all refs are available
    if (!sectionRef.current || !imageRef.current || !shamratRef.current) return;

    // Create a main timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5, // Smoother scrubbing with a slight delay for more natural feel
        pin: true, // Pin the section during scroll
        pinSpacing: true,
      },
    });

    // Animation for the SHAMRAT text
    tl.fromTo(
      shamratRef.current,
      {
        y: "0%", // Start at the top of the viewport
        opacity: 1,
        scale: 1,
      },
      {
        y: "50vh", // Move to the bottom
        opacity: 1, // Keep fully visible
        scale: 1,
        ease: "power2.inOut", // Smooth easing
        duration: 1, // Adjusted duration for smoother transition
      }
    );

    // Animation for image opacity - smoother and faster fade
    tl.fromTo(
      imageRef.current,
      {
        opacity: 1,
      },
      {
        opacity: 0.1, // Fade to almost completely transparent
        ease: "power3.inOut", // Smoother easing
        duration: 0.8, // Faster transition
      },
      "<" // Start at the same time as the first text animation
    );

    // Side content animations
    if (leftContentRef.current && rightContentRef.current) {
      tl.fromTo(
        [leftContentRef.current, rightContentRef.current],
        {
          y: "50px",
          opacity: 0,
        },
        {
          y: "0",
          opacity: 1,
          stagger: 0.2, // Staggered animation for visual interest
          ease: "back.out(1.2)", // Slightly bouncy effect
          duration: 0.4,
        },
        "<0.2" // Start slightly after the main animations
      ).to(
        [leftContentRef.current, rightContentRef.current],
        {
          y: "-30px",
          opacity: 0,
          stagger: 0.1,
          ease: "power2.in",
          duration: 0.3,
        },
        ">0.3" // Start after previous animation with a slight delay
      );
    }

    // Clean up animations when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative max-h-[1024px] flex items-center justify-center text-white"
      style={{ height: "100vh" }}
    >
      {/* Background Image with Parallax Effect */}
      <div ref={imageRef} className="absolute inset-0 -z-10 transition-opacity">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 to-black/50"></div>
        <Image
          src="/images/team/hero.png"
          alt="Founder"
          layout="fill"
          className="object-cover scale-110 transition-transform duration-1000"
          priority
        />
      </div>
      <div className="fixed-center top-[144px] w-full">
        <h1
          ref={shamratRef}
          className="text-7xl md:text-[250px] leading-[125px] syne-unique font-bold tracking-tighter mix-blend-difference text-center"
          style={{
            position: "absolute",
            top: "144px", // Adjusted to be 144px from the top
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "100%",
            textShadow: "0 0 15px rgba(255,255,255,0.3)",
          }}
        >
          SHAMRAT
        </h1>
      </div>

      {/* Side Texts */}
      <div className="flex justify-between  items-start mt-20 absolute  w-full left-0 px-8 md:px-16">
        <div
          ref={leftContentRef}
          className="max-w-[470px] opacity-0 ml-[260px]"
        >
          <h2 className="text-2xl max-w-[470px] md:text-[35px] font-bold syne-unique mb-2">
            Founder
          </h2>
          <p className="text-[24px] leading-tight tracking-tight text-white/70">
            SS Media
          </p>
        </div>
        <div
          ref={rightContentRef}
          className="max-w-[470px] text-left mr-[80px] opacity-0"
        >
          <h2 className="text-2xl max-w-[470px] md:text-[35px] font-bold syne-unique mb-2">
            FROM IDEA TO IMPACT
          </h2>
          <p className="text-[24px] leading-tight tracking-tight text-white/70">
            From Stunning Thumbnails To Sleek Interfaces, We Craft Digital
            Content That Connects, Converts, And Leaves A Lasting Mark.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
