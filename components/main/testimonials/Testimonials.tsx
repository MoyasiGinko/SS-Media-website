"use client";
import React from "react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  // State for video hover
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  // Mouse handlers for video container
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  // Video click handler to play/pause
  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent clicks on the play/pause button from triggering this
    if ((e.target as HTMLElement).closest(".play-pause-button")) {
      return;
    }
    togglePlayPause();
  };

  // Updated togglePlayPause function
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      // The small video will be paused via the onPause event handler
    } else {
      videoRef.current.muted = false; // Unmute the main video when playing
      videoRef.current.play();
      // The small video will be played via the onPlay event handler
      // (and will remain muted due to its muted attribute)
      if (!hasStartedPlaying) {
        setHasStartedPlaying(true);
      }
    }

    setIsPlaying(!isPlaying);
  };

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
    <section className="w-full py-16 bg-transparent text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Heading Section */}
          <motion.h2
            className="text-3xl text-white md:text-6xl font-bold mb-4 text-center"
            variants={itemVariants}
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            className="text-center text-xl md:text-[28px] text-white/80 max-w-6xl mx-auto mb-16"
            variants={itemVariants}
          >
            We Take Pride In Delivering High-Quality Edits That Make Content
            Truly Stand Out.
            <br />
            But Don't Just Take Our Word For It Hear From Real Clients Who
            Trusted Us
            <br />
            With Their Vision And Saw Real Results.
          </motion.p>

          {/* Testimonial Container with overlapping elements */}
          <motion.div
            className="w-7xl flex flex-col md:flex-row gap-6 items-stretch relative"
            variants={itemVariants}
          >
            {/* Quote Section (positioned behind) */}
            <div className="w-full md:w-[687px] bg-transparent relative ml-auto">
              <div
                className="bg-[#1D1D1D] border-1 border-white rounded-[21px] relative flex items-center justify-center"
                style={{ width: "687px", height: "481px" }}
              >
                <div
                  style={{
                    paddingLeft: "138px",
                    paddingRight: "64px",
                  }}
                  className="flex flex-col justify-center h-full"
                >
                  <img
                    src="/images/logo/quote.svg"
                    alt="Quote"
                    className="mb-4 w-15 h-15"
                  />
                  <p className="text-[28px] leading-tight font-medium text-white/80 mb-6 text-left">
                    I Wanted Someone To Help Me With My YouTube Channel, The
                    Seller Did A Great Job And I'm Very Happy With The Result,
                  </p>

                  <div className="flex flex-col items-start">
                    <span className="text-xl text-white font-medium">
                      Mikasa Ackerman
                    </span>
                    <span className="text-xl text-white/70">
                      CEO - Eren Life
                    </span>
                  </div>
                </div>
                <a href="#services">
                  <div className="absolute w-[109px] h-[109px] -right-14 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-[#241E20] rounded-full shadow-[0px_0px_45px_-9px_rgba(0,0,0,0.5)]">
                    <img
                      src="/images/logo/gallery.svg"
                      alt="Quote"
                      className="w-12 h-12"
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Video container with mouse events (positioned on top with z-index) */}
            <div
              className="w-full md:w-[640px] rounded-[21px] md:h-[360px] cursor-pointer absolute left-10 top-16 z-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleVideoClick}
            >
              {/* Video element */}
              {/* Bigger Video */}
              <video
                ref={videoRef}
                className="w-full h-full z-10 object-cover rounded-[21px] backdrop-blur-[2px] shadow-[0px_0px_200px_30px_rgba(255,255,255,0.1)]"
                src="/videos/intro.mp4"
                playsInline
                loop
                muted={!isPlaying} // Only muted when not playing
                onPlay={() => {
                  const smallVideo = document.getElementById(
                    "smallVideo"
                  ) as HTMLVideoElement;
                  if (smallVideo && smallVideo.paused) {
                    smallVideo.play();
                  }
                }}
                onPause={() => {
                  const smallVideo = document.getElementById(
                    "smallVideo"
                  ) as HTMLVideoElement;
                  if (smallVideo && !smallVideo.paused) {
                    smallVideo.pause();
                  }
                }}
              ></video>

              {/* Smaller Video */}
              <video
                id="smallVideo"
                className="w-[570px] h-[320px] absolute -z-1 left-1/2 bottom-4 transform -translate-x-1/2 blur-[80px] object-cover"
                src="/videos/intro.mp4"
                playsInline
                loop
                muted
              ></video>

              {/* Custom Thumbnail Overlay - only shown in initial state */}
              {!hasStartedPlaying && !isPlaying && (
                <div className="absolute inset-0 bg-transparent backdrop-blur-[2px] transition-opacity duration-300 rounded-[21px]  shadow-[0px_0px_200px_30px_rgba(255,255,255,0.1)]">
                  {/* Thumbnail Image */}
                  <div className="w-full h-full">
                    <img
                      src="/videos/thumbnail.png"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover rounded-[21px]"
                    />

                    {/* Gradient overlay on thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-[21px]"></div>
                  </div>
                </div>
              )}

              {/* Play/Pause Button */}
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
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
