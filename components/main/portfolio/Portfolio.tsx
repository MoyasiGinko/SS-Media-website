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

  // Create ref for the section
  const sectionRef = useRef<HTMLElement | null>(null);
  const [sectionInView, setSectionInView] = useState(false);

  // Effect to handle section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setSectionInView(true);
        } else {
          setSectionInView(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Determine if a card should be visible based on section visibility and card position
  const isCardVisible = (index: number) => {
    if (!sectionInView) return false;

    // Group cards by delay - 1st and 2nd have no delay, 3rd and 4th have delay
    const element = document.getElementById(`card-${index}`);
    if (element) {
      if (index >= 2) {
        // 3rd and 4th cards
        element.style.transitionDelay = "300ms";
      } else {
        // 1st and 2nd cards
        element.style.transitionDelay = "0ms";
      }
    }

    return true;
  };

  return (
    <section
      id="work"
      className="w-full py-16 px-4 flex flex-col items-center"
      ref={sectionRef}
    >
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
            id={`card-${index}`}
            className="relative bg-transparent rounded-xl overflow-hidden w-full md:w-[590px] h-[410px]"
            style={{
              transform: isCardVisible(index)
                ? "rotate(0deg) translateX(0px)"
                : index % 2 === 0
                ? "rotate(-2deg) translateX(-200px)"
                : "rotate(2deg) translateX(200px)",
              opacity: isCardVisible(index) ? 1 : 0,
              transition: "transform 1800ms ease, opacity 1800ms ease",
              transformOrigin: index % 2 === 0 ? "top left" : "top right", // Set anchor points based on card position
            }}
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
