"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";

// Moving Border Component for the glowing effect
const MovingBorder = ({
  children,
  duration = 10000,
  rx,
  ry,
  className,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx: string | number;
  ry: string | number;
  className?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        className={className}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Transform values based on scroll position
  const navWidth = useTransform(scrollY, [0, 100], ["90%", "80%"]);
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navPadding = useTransform(
    scrollY,
    [0, 100],
    ["1rem 2rem", "0.75rem 1.5rem"]
  );

  // Update scroll state for conditional class changes
  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", updateScrollState);
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50 px-4 py-3">
      <motion.nav
        className={`${
          isScrolled
            ? "bg-gradient-to-r from-gray-900/80 to-gray-800/80 max-w-5xl shadow-lg border border-white/10"
            : "bg-gradient-to-r from-gray-900/60 to-gray-800/60 max-w-7xl border border-white/5"
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
        {/* Glowing border effect that follows the navbar shape */}
        <div className="absolute inset-0 pointer-events-none">
          <MovingBorder duration={15000} rx="1rem" ry="1rem">
            <div className="h-20 w-20 opacity-70 bg-[radial-gradient(#ff7e1f_20%,transparent_60%)]" />
          </MovingBorder>
        </div>

        {/* Secondary glowing border effect with different timing and color */}
        <div className="absolute inset-0 pointer-events-none">
          <MovingBorder duration={20000} rx="1rem" ry="1rem">
            <div className="h-16 w-16 opacity-70 bg-[radial-gradient(#3b82f6_20%,transparent_60%)]" />
          </MovingBorder>
        </div>

        {/* Base glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 opacity-30" />
        <div className="absolute -inset-x-[100%] -top-[250%] h-[500%] w-[300%] bg-gradient-radial from-orange-500/20 to-transparent opacity-30 transform rotate-45" />

        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 flex-shrink-0 relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-md w-8 h-8 flex items-center justify-center font-bold text-white text-lg shadow-[0_0_10px_rgba(249,115,22,0.5)]">
            SS
          </div>
          <span className="font-semibold text-lg tracking-wide text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
            SS Media
          </span>
        </motion.div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium justify-center flex-grow mx-4 relative z-10">
          {["Services", "Reviews", "Work", "FAQs", "About Us"].map((item) => (
            <motion.li key={item} whileHover={{ y: -2 }}>
              <a
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-gray-200 hover:text-orange-300 transition-colors relative group"
              >
                {item}
                <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-orange-300/0 via-orange-300/70 to-orange-300/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.a
          href="#book"
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-lg font-semibold text-sm flex-shrink-0 relative z-10 shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]"
          whileHover={{ scale: 1.05 }}
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
