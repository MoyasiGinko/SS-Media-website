"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  // Transform values based on scroll position
  const navWidth = useTransform(scrollY, [0, 100], ["90%", "80%"]);
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navPadding = useTransform(
    scrollY,
    [0, 100],
    ["0.4rem 0.8rem", "0.4rem 0.8rem"]
  );

  // Update scroll state for conditional class changes
  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", updateScrollState);
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const sections = ["services", "reviews", "work", "faqs", "aboutus"];

    const handleScroll = () => {
      // Find all section elements
      const sectionElements = sections
        .map((section) => document.getElementById(section))
        .filter(Boolean);

      if (sectionElements.length === 0) return;

      // Calculate which section is currently most visible in the viewport
      let currentSection = "";
      let maxVisibleHeight = 0;

      sectionElements.forEach((section) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

        // Consider a section visible if at least 100px is showing or it's at the top
        if (
          visibleHeight > maxVisibleHeight ||
          (rect.top <= 100 && rect.bottom >= 100)
        ) {
          maxVisibleHeight = visibleHeight;
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50 px-4 py-3">
      <motion.nav
        className={`${
          isScrolled
            ? "bg-black max-w-2xl shadow-lg border border-white/10"
            : "bg-black max-w-6xl border border-white/5"
        } flex items-center justify-between rounded-2xl w-full transition-all duration-300 backdrop-blur-xl relative overflow-hidden`}
        style={{
          width: navWidth,
          opacity: navOpacity,
          padding: navPadding,
          boxShadow: isScrolled ? "0 0 20px rgba(255, 128, 0, 0.15)" : "none",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 flex-shrink-0 relative z-10"
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img src="/images/logo/ss.svg" alt="Logo" className="h-10 w-10" />
          <span
            className={`${
              isScrolled ? "block md:hidden" : "hidden md:block "
            } font-semibold text-lg tracking-wide text-white
        drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]`}
          >
            SS Media
          </span>
        </motion.div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium justify-center flex-grow mx-4 relative z-10">
          {[
            { name: "Services", id: "services" },
            { name: "Reviews", id: "reviews" },
            { name: "Work", id: "work" },
            { name: "FAQs", id: "faqs" },
            { name: "About Us", id: "aboutus" },
          ].map((item) => (
            <motion.li key={item.name}>
              <a
                href={`#${item.id}`}
                className={`relative group transition-colors ${
                  activeSection === item.id
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#C76CDE] via-[#FC5F67] to-[#FE925B]"
                    : "text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#C76CDE] hover:via-[#FC5F67] hover:to-[#FE925B]"
                }`}
              >
                {item.name}
                <span
                  className={`absolute inset-x-0 -bottom-1 h-[0.5px] bg-gradient-to-r from-[#C76CDE]/0 via-[#FC5F67]/70 to-[#FE925B]/0 transition-transform duration-300 ${
                    activeSection === item.id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            </motion.li>
          ))}
        </ul>
        {/* CTA Button */}
        <motion.a
          href="#book"
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-lg font-semibold text-sm flex-shrink-0 relative z-10 shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]"
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Book A Call
        </motion.a>
      </motion.nav>
    </div>
  );
};

export default Navbar;
