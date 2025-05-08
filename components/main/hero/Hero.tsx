"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TextSwapButton from "@/components/common/Button";
import Stats from "../stats/Stats";

const Hero = () => {
  const glowRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Updated state to store colors from specific regions
  const [videoColors, setVideoColors] = useState({
    topLeft: "rgba(147, 51, 234, 0.3)",
    topCenter: "rgba(249, 115, 22, 0.3)",
    topRight: "rgba(219, 39, 119, 0.3)",
    middleLeft: "rgba(59, 130, 246, 0.3)",
    center: "rgba(16, 185, 129, 0.3)",
    middleRight: "rgba(239, 68, 68, 0.3)",
    bottomLeft: "rgba(139, 92, 246, 0.3)",
    bottomCenter: "rgba(234, 179, 8, 0.3)",
    bottomRight: "rgba(236, 72, 153, 0.3)",
  });

  const previousColorsRef = useRef(videoColors);

  // State for video hover
  const [isHovering, setIsHovering] = useState(false);

  // Function to toggle play/pause with sound
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.muted = false; // Unmute when playing
      videoRef.current.play();
      if (!hasStartedPlaying) {
        setHasStartedPlaying(true);
      }
    }

    setIsPlaying(!isPlaying);
  };

  // Mouse handlers for video container
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  // Video click handler to play/pause
  const handleVideoClick = (e: React.MouseEvent) => {
    // Prevent clicks on the play/pause button from triggering this
    if ((e.target as HTMLElement).closest(".play-pause-button")) {
      return;
    }
    togglePlayPause();
  };

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

  // Extract dominant colors from video frames - enhanced version
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (!ctx) return;

    // Set canvas size (can be smaller than video for performance)
    canvas.width = 300; // Increased for better sampling
    canvas.height = 168; // Maintain aspect ratio

    // Color enhancement function to make colors more vibrant
    const enhanceColor = (r: number, g: number, b: number) => {
      // Calculate color luminance
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

      // Boost saturation
      const saturationBoost = 1.5; // Increased for more vibrant colors
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

    // Define regions to sample from the video
    const regions = [
      { name: "topLeft", x: 0, y: 0, width: 50, height: 50 },
      { name: "topCenter", x: 125, y: 0, width: 50, height: 50 },
      { name: "topRight", x: 250, y: 0, width: 50, height: 50 },
      { name: "middleLeft", x: 0, y: 59, width: 50, height: 50 },
      { name: "center", x: 125, y: 59, width: 50, height: 50 },
      { name: "middleRight", x: 250, y: 59, width: 50, height: 50 },
      { name: "bottomLeft", x: 0, y: 118, width: 50, height: 50 },
      { name: "bottomCenter", x: 125, y: 118, width: 50, height: 50 },
      { name: "bottomRight", x: 250, y: 118, width: 50, height: 50 },
    ];

    // Function to get dominant color from a specific region
    const getRegionDominantColor = (region: any) => {
      try {
        // Get image data for the region
        const imageData = ctx.getImageData(
          region.x,
          region.y,
          region.width,
          region.height
        );
        const data = imageData.data;

        // Color binning for the region
        const colorBins: {
          [key: string]: { count: number; r: number; g: number; b: number };
        } = {};

        // Process pixels to find dominant colors
        for (let i = 0; i < data.length; i += 4) {
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
          if (saturation < 0.1) continue; // Skip grayish colors

          // Enhance color vibrance
          const enhanced = enhanceColor(r, g, b);

          // Create a color key with reduced precision for better grouping
          const colorKey = `${Math.floor(enhanced.r / 5) * 5},${
            Math.floor(enhanced.g / 5) * 5
          },${Math.floor(enhanced.b / 5) * 5}`;

          // Count occurrences with weighted importance
          if (!colorBins[colorKey]) {
            colorBins[colorKey] = {
              count: 0,
              r: enhanced.r,
              g: enhanced.g,
              b: enhanced.b,
            };
          }

          // Weight by saturation and brightness to favor vibrant colors
          const brightness = (r + g + b) / 3 / 255;
          const importance = saturation * (0.6 + brightness * 0.4) * 2.5;

          colorBins[colorKey].count += importance;
        }

        // Find most dominant color in the region
        const sortedColors = Object.entries(colorBins).sort(
          (a, b) => b[1].count - a[1].count
        );

        // Return the most dominant color, or a fallback if none found
        if (sortedColors.length > 0) {
          const dominant = sortedColors[0][1];
          return `rgba(${Math.round(dominant.r)}, ${Math.round(
            dominant.g
          )}, ${Math.round(dominant.b)}, 0.35)`;
        } else {
          // Fallback to a semi-random color if no dominant color found
          return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.35)`;
        }
      } catch (error) {
        console.error(
          `Error extracting color for region ${region.name}:`,
          error
        );
        return `rgba(100, 100, 100, 0.35)`;
      }
    };

    // Weighted color transition for smoother changes
    const blendWithPreviousColors = (newColors: any) => {
      const prev = previousColorsRef.current;
      // Lower blend factor for faster transitions (was 0.85)
      const blendFactor = 0.75;

      const blendedColors: any = {};

      // Blend each color with its previous value for smoother transitions
      for (const key in newColors) {
        const prevColor = prev[key as keyof typeof prev] || newColors[key];

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

    // Function to extract colors from all regions of a frame
    const extractColors = () => {
      try {
        // Draw current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Extract dominant color from each region
        const newColors: any = {};

        // Process each region to get its dominant color
        regions.forEach((region) => {
          newColors[region.name] = getRegionDominantColor(region);
        });

        // Blend with previous colors for smoother transitions
        const blendedColors = blendWithPreviousColors(newColors);

        // Update state with extracted colors
        setVideoColors(blendedColors);
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };

    // Extract colors when the video is loaded
    video.addEventListener("loadeddata", extractColors);

    // Update colors more frequently for responsive changes
    const intervalId = setInterval(extractColors, 300); // Faster sampling for more responsive transitions

    // Extract colors on seek/timeupdate for more responsiveness
    video.addEventListener("seeked", extractColors);
    video.addEventListener("timeupdate", () => {
      // More frequent extraction for smoother color transitions
      if (Math.floor(video.currentTime * 4) % 2 === 0) {
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

  // Creating the gradient play icon SVG
  const PlayIcon = () => (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="40"
        cy="40"
        r="38"
        fill="rgba(0, 0, 0, 0.5)"
        stroke="url(#playButtonGradient)"
        strokeWidth="3"
      />
      <path d="M53 40L33 52V28L53 40Z" fill="url(#playButtonGradient)" />
      <defs>
        <linearGradient
          id="playButtonGradient"
          x1="10"
          y1="10"
          x2="70"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BB6FFB" />
          <stop offset="0.5" stopColor="#FC5F67" />
          <stop offset="1" stopColor="#FFB054" />
        </linearGradient>
      </defs>
    </svg>
  );

  // Creating a pause icon
  const PauseIcon = () => (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="40"
        cy="40"
        r="38"
        fill="rgba(0, 0, 0, 0.5)"
        stroke="url(#pauseButtonGradient)"
        strokeWidth="3"
      />
      <rect
        x="30"
        y="25"
        width="8"
        height="30"
        rx="2"
        fill="url(#pauseButtonGradient)"
      />
      <rect
        x="42"
        y="25"
        width="8"
        height="30"
        rx="2"
        fill="url(#pauseButtonGradient)"
      />
      <defs>
        <linearGradient
          id="pauseButtonGradient"
          x1="10"
          y1="10"
          x2="70"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BB6FFB" />
          <stop offset="0.5" stopColor="#FC5F67" />
          <stop offset="1" stopColor="#FFB054" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <section className="w-full flex flex-col items-center justify-center pt-34 py-16 px-4 text-center relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] z-0"></div>

      {/* Hidden canvas for color extraction */}
      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* Enhanced 3D Gradient Glow Effect using strategically extracted colors */}
      <div
        ref={glowRef}
        style={{
          background: `radial-gradient(circle at center,
            ${videoColors.center} 0%,
            ${videoColors.topCenter} 25%,
            ${videoColors.middleRight} 50%,
            ${videoColors.bottomRight} 75%,
            ${videoColors.bottomLeft} 100%)`,
          transition: "background 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        className="absolute bottom-1/5 left-1/2 -translate-x-1/2 translate-y-1/6 w-[900px] h-[900px] rounded-full blur-[120px] opacity-75 z-5 transition-transform duration-300 ease-out"
      ></div>

      {/* Bottom gradient background with video-extracted colors */}
      <div
        style={{
          background: `linear-gradient(135deg,
            ${videoColors.topLeft} 0%,
            ${videoColors.center} 35%,
            ${videoColors.bottomRight} 65%,
            ${videoColors.bottomCenter} 100%)`,
          transition: "background 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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
            className="bg-white/15 text-white h-10 w-32 text-md font-medium flex items-center justify-center rounded-xl border-2 border-gray-50  hover:bg-white/20 transition-all duration-300"
          >
            Works
          </motion.a>
        </motion.div>

        {/* Video container with dynamic color-responsive background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-7xl mx-auto aspect-video rounded-3xl border-7 border-white/20 bg-transparent flex items-center justify-center relative shadow-2xl shadow-orange-500/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>

          {/* Enhanced dynamic background that responds to video colors */}
          <motion.div
            style={{
              background: `
                radial-gradient(circle at 25% 25%, ${videoColors.topLeft} 0%, transparent 50%),
                radial-gradient(circle at 75% 25%, ${videoColors.topRight} 0%, transparent 50%),
                radial-gradient(circle at 25% 75%, ${videoColors.bottomLeft} 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, ${videoColors.bottomRight} 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, ${videoColors.center} 0%, transparent 70%)
              `,
              transition: "background 0.5s ease-out",
            }}
            animate={{
              opacity: [0.4, 0.65, 0.4],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 blur-md"
          ></motion.div>

          {/* Video container with mouse events */}
          <div
            className="relative w-full h-full cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleVideoClick}
          >
            {/* Video element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-xl"
              src="/videos/intro.mp4"
              playsInline
              loop
              muted={!isPlaying} // Only muted when not playing
              onLoadedData={() =>
                console.log("Video loaded - extracting colors and thumbnail")
              }
            ></video>

            {/* Custom Thumbnail Overlay - only shown in initial state */}
            {!hasStartedPlaying && !isPlaying && (
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity duration-300">
                {/* Thumbnail Image */}
                <div className="w-full h-full">
                  <img
                    src="/videos/thumbnail.png"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover rounded-xl"
                  />

                  {/* Gradient overlay on thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>

                  {/* Video duration badge - shown on thumbnail */}
                  {/* <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                    2:45
                  </div> */}
                </div>
              </div>
            )}

            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 hover:scale-110 play-pause-button ${
                !isPlaying || (isPlaying && isHovering)
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              onClick={togglePlayPause}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </div>
          </div>
        </motion.div>
      </div>
      <Stats />
    </section>
  );
};

export default Hero;
