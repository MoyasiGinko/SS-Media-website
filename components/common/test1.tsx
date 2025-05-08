"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TextSwapButton = ({
  initialText = "Our Services",
  hoverText = "View Services",
  href = "#services",
  bgColor = "rgb(81, 47, 235)",
  textColor = "white",
  className = "",
  icon = "arrow", // "arrow" or "none"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);

  // Calculate the maximum width needed for both text states
  const onButtonMount = (node: HTMLAnchorElement | null): void => {
    if (node) {
      // Get the initial dimensions to prevent layout shifts
      setButtonWidth(node.offsetWidth);
      setButtonHeight(node.offsetHeight);
    }
  };

  // Base button styles
  const buttonStyles = {
    backgroundColor: bgColor,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 0.7px 0.7px -0.6px, rgba(0, 0, 0, 0.145) 0px 1.8px 1.8px -1.25px, rgba(0, 0, 0, 0.137) 0px 3.6px 3.6px -1.9px, rgba(0, 0, 0, 0.125) 0px 6.9px 6.9px -2.5px, rgba(0, 0, 0, 0.106) 0px 13.6px 13.6px -3.1px, rgba(0, 0, 0, 0.05) 0px 30px 30px -3.75px",
    minWidth: buttonWidth > 0 ? `${buttonWidth}px` : "auto",
    minHeight: buttonHeight > 0 ? `${buttonHeight}px` : "auto",
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
      ref={onButtonMount}
      className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-lg ${
        textColor === "white" ? "text-white" : `text-${textColor}`
      } ${className}`}
      style={buttonStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
    >
      {/* Text container with animations */}
      <div className="relative flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="initial-content"
              className="flex items-center"
              initial={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -24, opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.25 }}
              style={{
                transformOrigin: "bottom center",
                backfaceVisibility: "hidden",
              }}
            >
              <span className="whitespace-nowrap">{initialText}</span>
              {icon === "arrow" && <ArrowIcon isActive={false} />}
            </motion.div>
          ) : (
            <motion.div
              key="hover-content"
              className="flex items-center"
              initial={{ y: 24, opacity: 0, rotateX: 90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -24, opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.25 }}
              style={{
                transformOrigin: "top center",
                backfaceVisibility: "hidden",
              }}
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
