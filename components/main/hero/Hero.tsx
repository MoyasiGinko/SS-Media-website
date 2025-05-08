"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TextSwapButton from "@/components/common/Button";

const Hero = () => {
  const glowRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dominantColors, setDominantColors] = useState({
    primary: "rgba(147, 51, 234, 0.2)",
    secondary: "rgba(249, 115, 22, 0.2)",
    tertiary: "rgba(219, 39, 119, 0.2)",
  });

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
    canvas.width = 150;
    canvas.height = 84;

    // Function to extract dominant colors from a frame
    const extractColors = () => {
      try {
        // Draw current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple color binning for performance
        const colorBins: { [key: string]: number } = {};
        const sampleRate = 10; // Sample every 10th pixel for performance

        // Process pixels to find dominant colors
        for (let i = 0; i < data.length; i += 4 * sampleRate) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Skip very dark (near black) and very light (near white) pixels
          if ((r < 20 && g < 20 && b < 20) || (r > 230 && g > 230 && b > 230))
            continue;

          // Create a simplified color key (reduce precision for binning)
          const colorKey = `${Math.floor(r / 10) * 10},${
            Math.floor(g / 10) * 10
          },${Math.floor(b / 10) * 10}`;

          // Count occurrences
          colorBins[colorKey] = (colorBins[colorKey] || 0) + 1;
        }

        // Sort and get top 3 colors
        const sortedColors = Object.entries(colorBins)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([color]) => {
            const [r, g, b] = color.split(",").map(Number);
            return `rgba(${r}, ${g}, ${b}, 0.2)`;
          });

        // Update state with extracted colors
        if (sortedColors.length >= 3) {
          setDominantColors({
            primary: sortedColors[0],
            secondary: sortedColors[1],
            tertiary: sortedColors[2],
          });
        } else if (sortedColors.length === 2) {
          setDominantColors({
            primary: sortedColors[0],
            secondary: sortedColors[1],
            tertiary: sortedColors[0],
          });
        } else if (sortedColors.length === 1) {
          setDominantColors({
            primary: sortedColors[0],
            secondary: sortedColors[0],
            tertiary: sortedColors[0],
          });
        }
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };

    // Extract colors when the video is loaded
    video.addEventListener("loadeddata", extractColors);

    // Update colors periodically
    const intervalId = setInterval(extractColors, 1000); // Analyze every second for performance

    // Extract colors on seek/timeupdate for more responsiveness
    video.addEventListener("seeked", extractColors);
    video.addEventListener("timeupdate", () => {
      // Only extract on certain intervals to avoid performance issues
      if (Math.floor(video.currentTime) % 2 === 0) {
        // Every 2 seconds
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
    <section className="w-full flex flex-col items-center justify-center pt-24 py-16 px-4 text-center relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] z-0"></div>

      {/* Hidden canvas for color extraction */}
      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* Dynamic 3D Gradient Glow Effect using extracted colors */}
      <div
        ref={glowRef}
        style={{
          background: `radial-gradient(circle, ${dominantColors.primary}, ${dominantColors.secondary}, ${dominantColors.tertiary})`,
          transition: "background 1s ease-out",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] opacity-60 z-0 transition-transform duration-300 ease-out"
      ></div>

      {/* Top gradient background with video-extracted colors */}
      <div
        style={{
          background: `linear-gradient(to bottom right, ${dominantColors.primary}, transparent, ${dominantColors.secondary})`,
          transition: "background 1s ease-out",
        }}
        className="absolute top-0 left-0 right-0 h-[500px] blur-[120px] opacity-60 z-0"
      ></div>

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.span
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255, 165, 0, 0.3)",
            }}
            className="text-xs bg-[#1a1a1a] text-orange-300 px-4 py-1.5 rounded-full font-semibold tracking-wide border border-orange-500/20 shadow-sm shadow-orange-500/10 inline-block"
          >
            Your Content Deserves The Best. And We Deliver It.
          </motion.span>
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
          Every Style And Platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          {/* Using the TextSwapButton component with props */}
          <TextSwapButton
            initialText="Book A Call"
            hoverText="Book A Call"
            textColor="#000"
            className="bg-gradient-to-r text-black from-[#BB6FFB] via-[#FC5F67] to-[#FFB054] h-12 w-40 text-xl font-medium"
            href="#services"
          />
          <motion.a
            href="#work"
            className="bg-white/15 text-white h-12 w-40 text-xl font-normal flex items-center justify-center rounded-2xl border-2 border-gray-50  hover:bg-white/20 transition-all duration-300"
          >
            Works
          </motion.a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-2xl mx-auto aspect-video rounded-xl border border-orange-500/30 bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f] flex items-center justify-center relative shadow-2xl shadow-orange-500/10 overflow-hidden"
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
    </section>
  );
};

export default Hero;
