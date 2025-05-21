"use client";
import React, { useEffect, useRef, useState } from "react";

const Portfolio = () => {
  // Sample portfolio data - this could come from an API, props, or context
  const portfolioItems = [
    {
      id: 1,
      title: "Videos",
      image: "/video_card.svg",
      alt: "Video Thumbnail",
      categoryUrl: "/videos",
      detailUrl: "/videos/details",
    },
    {
      id: 2,
      title: "Graphic Design",
      image: "/graphics_card.svg",
      alt: "Graphic Thumbnail",
      categoryUrl: "/graphic-design",
      detailUrl: "/graphic-design/details",
    },
    {
      id: 3,
      title: "Websites",
      image: "/video_card.svg",
      alt: "Video Thumbnail",
      categoryUrl: "/videos",
      detailUrl: "/videos/details",
    },
    {
      id: 4,
      title: "UI/UX",
      image: "/graphics_card.svg",
      alt: "Graphic Thumbnail",
      categoryUrl: "/graphic-design",
      detailUrl: "/graphic-design/details",
    },
  ];

  // Create ref array for cards
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Track the progress of each card (0-1) where 0.5 is center screen
  const [cardProgress, setCardProgress] = useState<Record<number, number>>({});

  useEffect(() => {
    // Function to calculate card progress based on viewport position
    const calculateCardProgress = () => {
      const viewportHeight = window.innerHeight;
      const centerZoneStart = viewportHeight * 0.1; // Zone starts at 40% down the screen
      const centerZoneEnd = viewportHeight * 0.9; // Zone ends at 60% down the screen

      const newProgress: Record<number, number> = {};

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;

        // Calculate progress based on card's position relative to viewport
        let progress;

        if (cardCenter <= centerZoneStart) {
          // Card is above center zone - scale from 0 to 0.4
          progress = Math.max(0, (cardCenter / centerZoneStart) * 0.4);
        } else if (cardCenter <= centerZoneEnd) {
          // Card is in center zone - stay at 0.5 (normal state)
          progress = 0.5;
        } else if (cardCenter <= viewportHeight) {
          // Card is below center zone but still in viewport - scale from 0.6 to 1
          progress =
            0.6 +
            ((cardCenter - centerZoneEnd) / (viewportHeight - centerZoneEnd)) *
              0.4;
        } else {
          // Card is below viewport
          progress = 1;
        }

        newProgress[index] = progress;
      });

      setCardProgress(newProgress);
    };

    // Calculate initial progress
    calculateCardProgress();

    // Add scroll event listener
    window.addEventListener("scroll", calculateCardProgress);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", calculateCardProgress);
    };
  }, []);

  // Function to calculate card transform based on progress
  const getCardStyle = (index: number) => {
    const progress = cardProgress[index] || 0;
    const isEvenCard = index % 2 === 0;
    const rotationDirection = isEvenCard ? -1 : 1; // -2deg for even, +2deg for odd
    const translationDirection = isEvenCard ? -1 : 1; // -200px for even, +200px for odd

    let rotation, translation, opacity;

    if (progress <= 0.4) {
      // Coming in from top
      const entryFactor = 1 - progress / 0.4;
      rotation = rotationDirection * 2 * entryFactor;
      translation = translationDirection * 200 * entryFactor;
      opacity = 1 - entryFactor * 0.5; // Fade in (0.5 to 1)
    } else if (progress >= 0.6) {
      // Going out to bottom
      const exitFactor = (progress - 0.6) / 0.4;
      rotation = rotationDirection * 2 * exitFactor;
      translation = translationDirection * 200 * exitFactor;
      opacity = 1 - exitFactor * 0.5; // Fade out (1 to 0.5)
    } else {
      // Center zone - normal state
      rotation = 0;
      translation = 0;
      opacity = 1;
    }

    // Add delay for 3rd and 4th cards (affects only the initial animation)
    const transitionDelay = index >= 2 ? "300ms" : "0ms";

    return {
      transform: `rotate(${rotation}deg) translateX(${translation}px)`,
      opacity,
      transition: "transform 1800ms ease, opacity 1800ms ease",
      transitionDelay:
        cardProgress[index] === undefined ? transitionDelay : "0ms", // Only apply delay on initial load
      transformOrigin: isEvenCard ? "top left" : "top right", // Set anchor points based on card position
    };
  };

  return (
    <section id="work" className="w-full py-16 px-4 flex flex-col items-center">
      <h2 className="text-3xl text-white md:text-6xl font-bold mb-4 text-center">
        Explore Our Portfolio
      </h2>
      <p className="text-center text-xl md:text-[28px] text-white/80 max-w-5xl mx-auto mb-16">
        Your Content Deserves To Stand Out. Our Portfolio Highlights The
        High-Quality Edits We've Delivered For Clients Who Trusted Us To Elevate
        Their Videos.
      </p>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        {portfolioItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            data-index={index}
            className="relative bg-transparent rounded-xl overflow-hidden w-full md:w-[590px] h-[410px]"
            style={getCardStyle(index)}
          >
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-fit cover"
            />
            <a
              href={item.categoryUrl}
              className="absolute border-[1px] border-[#FC5F67] rounded-full text-[30px] top-2 right-2 bg-white text-transparent bg-clip-text px-2 py-1 cursor-pointer text-sm"
              style={{
                width: "245px",
                height: "60px",
                backgroundImage:
                  "linear-gradient(to right, #BB6FFB, #FC5F67, #FFB054)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.title}
            </a>
            <a
              href={item.detailUrl}
              className="absolute border-[1px] border-[#FC5F67] text-[30px] bottom-2 right-2 bg-[#1d1d1d] p-2 rounded-full flex items-center cursor-pointer justify-center"
              style={{ width: "60px", height: "60px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-6"
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#BB6FFB" />
                    <stop offset="50%" stopColor="#FC5F67" />
                    <stop offset="100%" stopColor="#FFB054" />
                  </linearGradient>
                </defs>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
