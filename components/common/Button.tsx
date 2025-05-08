"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TextSwapButton = ({
  initialText = "Our Services",
  hoverText = "View Services",
  href = "#services",
  textColor = "white",
  className = "",
  icon = "arrow", // "arrow" or "none"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Measure both text variants to get the largest dimensions
  useEffect(() => {
    if (buttonRef.current) {
      // Set fixed dimensions based on the largest possible content
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.display = "inline-block";
      tempSpan.style.whiteSpace = "nowrap";

      // Add icon width estimation if needed
      const iconWidth = icon === "arrow" ? 28 : 0;

      // Test initial text
      tempSpan.textContent = initialText;
      document.body.appendChild(tempSpan);
      const initialWidth = tempSpan.offsetWidth + iconWidth;

      // Test hover text
      tempSpan.textContent = hoverText;
      const hoverWidth = tempSpan.offsetWidth + iconWidth;

      document.body.removeChild(tempSpan);

      // Get maximum width needed
      const maxWidth = Math.max(initialWidth, hoverWidth);

      setDimensions({
        width: maxWidth + 40, // Add padding
        height: 48, // Fixed height
      });
    }
  }, [initialText, hoverText, icon]);

  // Base button styles
  const buttonStyles = {
    // border: "1px solid rgba(255, 255, 255, 0.1)",
    // borderRadius: "8px",
    // width: dimensions.width > 0 ? `${dimensions.width}px` : "auto",
    // height: dimensions.height > 0 ? `${dimensions.height}px` : "auto",
  };

  // Icon components
  const ArrowIcon = ({ isActive }: { isActive: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={textColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 ml-1"
    >
      {isActive ? (
        <>
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </>
      ) : (
        <>
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </>
      )}
    </svg>
  );

  return (
    <motion.a
      href={href}
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl ${
        textColor === `text-${textColor}`
      } ${className}`}
      style={buttonStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
    >
      {/* Text container with pure sliding animations */}
      <div className="relative flex items-center justify-center overflow-hidden h-8">
        <AnimatePresence initial={false} mode="wait">
          {!isHovered ? (
            <motion.div
              key="initial-content"
              className="flex items-center "
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <span className="whitespace-nowrap">{initialText}</span>
              {icon === "arrow" && <ArrowIcon isActive={false} />}
            </motion.div>
          ) : (
            <motion.div
              key="hover-content"
              className="flex items-center "
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <span className="whitespace-nowrap">{hoverText}</span>
              {icon === "arrow" && <ArrowIcon isActive={true} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  );
};

export default TextSwapButton;
