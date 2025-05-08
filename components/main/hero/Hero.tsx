"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TextSwapButton from "@/components/common/Button";
import Stats from "../stats/Stats";

const Hero = () => {
  const glowRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dominantColors, setDominantColors] = useState({
    primary: "rgba(147, 51, 234, 0.3)",
    secondary: "rgba(249, 115, 22, 0.3)",
    tertiary: "rgba(219, 39, 119, 0.3)",
    quaternary: "rgba(16, 185, 129, 0.3)",
    quinary: "rgba(239, 68, 68, 0.3)",
  });
  const previousColorsRef = useRef(dominantColors);

  // 3D parallax effect for the glow
  useEffect(() => {
    interface MouseMoveEvent extends MouseEvent {
      clientX: number;
      clientY: number;
    }

    const handleMouseMove = (e: MouseMoveEvent): void => {
      if (!glowRef.current) return;

      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate distance from center (normalized)
      const moveX = ((clientX - centerX) / centerX) * 25; // max 25px movement
      const moveY = ((clientY - centerY) / centerY) * 25;

      (
        glowRef.current as HTMLDivElement
      ).style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.1)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Extract dominant colors from video frames
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (!ctx) return;

    // Set canvas size (can be smaller than video for performance)
    canvas.width = 200;
    canvas.height = 112;

    // Color enhancement function to make colors more vibrant
    const enhanceColor = (r: number, g: number, b: number) => {
      // Calculate color luminance
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

      // Boost saturation
      const saturationBoost = 1.3; // Increase for more vibrant colors
      const avgColor = (r + g + b) / 3;

      let newR = r + (r - avgColor) * saturationBoost;
      let newG = g + (g - avgColor) * saturationBoost;
      let newB = b + (b - avgColor) * saturationBoost;

      // Ensure values stay within 0-255 range
      newR = Math.max(0, Math.min(255, newR));
      newG = Math.max(0, Math.min(255, newG));
      newB = Math.max(0, Math.min(255, newB));

      return { r: newR, g: newG, b: newB };
    };

    // Weighted color transition for smoother changes
    const blendWithPreviousColors = (newColors: any) => {
      const prev = previousColorsRef.current;
      const blendFactor = 0.85; // Higher = smoother transitions (0.7-0.9 is good)

      const blendedColors: any = {};

      // Blend each color with its previous value for smoother transitions
      for (const key in newColors) {
        const prevColor =
          prev[key as keyof typeof prev] ||
          newColors[key as keyof typeof newColors];

        // Parse RGBA values
        const prevMatch = prevColor.match(
          /rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
        );
        const newMatch = newColors[key].match(
          /rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
        );

        if (prevMatch && newMatch) {
          const prevR = parseInt(prevMatch[1], 10);
          const prevG = parseInt(prevMatch[2], 10);
          const prevB = parseInt(prevMatch[3], 10);
          const prevA = parseFloat(prevMatch[4]);

          const newR = parseInt(newMatch[1], 10);
          const newG = parseInt(newMatch[2], 10);
          const newB = parseInt(newMatch[3], 10);
          const newA = parseFloat(newMatch[4]);

          // Weighted average for smooth transition
          const blendedR = Math.round(
            prevR * blendFactor + newR * (1 - blendFactor)
          );
          const blendedG = Math.round(
            prevG * blendFactor + newG * (1 - blendFactor)
          );
          const blendedB = Math.round(
            prevB * blendFactor + newB * (1 - blendFactor)
          );
          const blendedA = prevA * blendFactor + newA * (1 - blendFactor);

          blendedColors[
            key
          ] = `rgba(${blendedR}, ${blendedG}, ${blendedB}, ${blendedA})`;
        } else {
          blendedColors[key] = newColors[key];
        }
      }

      // Update reference for next blend
      previousColorsRef.current = blendedColors;

      return blendedColors;
    };

    // Function to extract dominant colors from a frame
    const extractColors = () => {
      try {
        // Draw current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Advanced color binning with vibrance enhancement
        const colorBins: {
          [key: string]: { count: number; r: number; g: number; b: number };
        } = {};
        const sampleRate = 5; // Sample every 5th pixel for better accuracy

        // Process pixels to find dominant colors
        for (let i = 0; i < data.length; i += 4 * sampleRate) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Skip very dark (near black) pixels
          if (r < 15 && g < 15 && b < 15) continue;

          // Skip very light (near white) pixels
          if (r > 240 && g > 240 && b > 240) continue;

          // Skip low saturation (grayscale) pixels
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;
          if (saturation < 0.15) continue; // Skip grayish colors

          // Enhance color vibrance
          const enhanced = enhanceColor(r, g, b);

          // Create a color key with reduced precision for better grouping of similar colors
          const colorKey = `${Math.floor(enhanced.r / 8) * 8},${
            Math.floor(enhanced.g / 8) * 8
          },${Math.floor(enhanced.b / 8) * 8}`;

          // Count occurrences with weighted importance
          if (!colorBins[colorKey]) {
            colorBins[colorKey] = {
              count: 0,
              r: enhanced.r,
              g: enhanced.g,
              b: enhanced.b,
            };
          }

          // Weight by saturation and brightness to favor more vibrant colors
          const brightness = (r + g + b) / 3 / 255;
          const importance = saturation * (0.5 + brightness * 0.5) * 2;

          colorBins[colorKey].count += importance;
        }

        // Sort and get top 5 colors
        const sortedColors = Object.entries(colorBins)
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, 8) // Get more colors than needed for better diversity
          .map(([_, value]) => {
            // Increase opacity for more vibrant effect
            return `rgba(${Math.round(value.r)}, ${Math.round(
              value.g
            )}, ${Math.round(value.b)}, 0.3)`;
          });

        // Create a diverse color palette by selecting colors that are visually distinct
        const palette: string[] = [];
        if (sortedColors.length > 0) {
          // Always use the most dominant color
          palette.push(sortedColors[0]);

          // Try to find diverse colors from the remaining options
          for (let i = 1; i < sortedColors.length && palette.length < 5; i++) {
            palette.push(sortedColors[i]);
          }
        }

        // Fill with fallback colors if needed
        while (palette.length < 5) {
          palette.push(
            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
              Math.random() * 255
            }, 0.3)`
          );
        }

        // Create new color object
        const newColors = {
          primary: palette[0],
          secondary: palette[1],
          tertiary: palette[2],
          quaternary: palette[3],
          quinary: palette[4],
        };

        // Blend with previous colors for smoother transitions
        const blendedColors = blendWithPreviousColors(newColors);

        // Update state with extracted colors
        setDominantColors(blendedColors);
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };

    // Extract colors when the video is loaded
    video.addEventListener("loadeddata", extractColors);

    // Update colors periodically
    const intervalId = setInterval(extractColors, 800); // Sample more frequently for smoother transitions

    // Extract colors on seek/timeupdate for more responsiveness
    video.addEventListener("seeked", extractColors);
    video.addEventListener("timeupdate", () => {
      // Only extract on certain intervals to avoid performance issues
      if (Math.floor(video.currentTime * 2) % 3 === 0) {
        // About every 1.5 seconds
        extractColors();
      }
    });

    return () => {
      clearInterval(intervalId);
      video.removeEventListener("loadeddata", extractColors);
      video.removeEventListener("seeked", extractColors);
      video.removeEventListener("timeupdate", () => {});
    };
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center pt-34 py-16 px-4 text-center relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] z-0"></div>

      {/* Hidden canvas for color extraction */}
      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* Dynamic 3D Gradient Glow Effect using extracted colors */}
      <div
        ref={glowRef}
        style={{
          background: `radial-gradient(circle at center,
        ${dominantColors.primary} 0%,
        ${dominantColors.secondary} 25%,
        ${dominantColors.tertiary} 50%,
        ${dominantColors.quaternary} 75%,
        ${dominantColors.quinary} 100%)`,
          transition: "background 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        className="absolute bottom-1/5 left-1/2 -translate-x-1/2 translate-y-1/6 w-[900px] h-[900px] rounded-full blur-[120px] opacity-75 z-5 transition-transform duration-300 ease-out"
      ></div>

      {/* Bottom gradient background with video-extracted colors */}
      <div
        style={{
          background: `linear-gradient(135deg,
        ${dominantColors.primary} 0%,
        transparent 35%,
        ${dominantColors.tertiary} 65%,
        ${dominantColors.quaternary} 100%)`,
          transition: "background 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        className="absolute bottom-48 left-0 right-0 h-[600px] blur-[150px] opacity-70 z-5"
      ></div>

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 mx-auto inline-flex items-center justify-center relative"
        >
          {/* Gradient border created with pseudo-element */}
          <div className="relative rounded-md overflow-hidden">
            {/* Gradient background layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#BB6FFB]/30 via-[#FC5F67]/25 to-[#FFB054]/20"></div>

            {/* Content container with precise padding for exact 1px border */}
            <div className="relative bg-gray-800/20 mt-[1px] mx-[1px] mb-[0.5px] rounded-[5px]">
              <motion.span
                className="block text-xs md:text-sm bg-clip-text text-transparent px-2 py-1 font-sans font-normal tracking-wide text-center"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #BB6FFB, #FC5F67, #FFB054)",
                }}
              >
                Your Content Deserves The Best. And We Deliver It.
              </motion.span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 syne-unique"
        >
          Give Your Content
          <br />
          The{" "}
          <motion.span
            className="bg-gradient-to-r from-[#BB6FFB] via-[#FC5F67] to-[#FFB054] bg-clip-text text-transparent drop-shadow-sm"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 100%" }}
          >
            Spotlight
          </motion.span>{" "}
          It Deserves
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 opacity-90"
        >
          From Edits To Interfaces, Visuals To Vision. We Bring Your Brand To
          Life. UI/UX Design, Video Editing, And Graphic Design, Tailored For
          <span className="block"> Every Style And Platform.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8 mb-16"
        >
          {/* Using the TextSwapButton component with props */}
          <TextSwapButton
            initialText="Book A Call"
            hoverText="Book A Call"
            textColor="#000"
            className="bg-gradient-to-r text-black from-[#BB6FFB] via-[#FC5F67] to-[#FFB054] h-10 w-36 text-md font-medium"
            href="#services"
          />
          <motion.a
            href="#work"
            className="bg-white/15 text-white h-10 w-36 text-md font-medium flex items-center justify-center rounded-xl border-2 border-gray-50  hover:bg-white/20 transition-all duration-300"
          >
            Works
          </motion.a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-7xl mx-auto aspect-video rounded-3xl border-7 border-white/20 bg-transparent flex items-center justify-center relative shadow-2xl shadow-orange-500/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
          <motion.div
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/10 to-orange-500/10 blur-sm"
          ></motion.div>
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-xl"
            src="/videos/intro.mp4"
            autoPlay
            loop
            muted
            onLoadedData={() => console.log("Video loaded - extracting colors")}
          ></video>
        </motion.div>
      </div>
      <Stats />
    </section>
  );
};

export default Hero;
