import React from "react";

const Hero = () => (
  <section className="w-full flex flex-col items-center justify-center py-16 px-4 text-center relative">
    <div className="mb-6">
      <span className="text-xs bg-[#232323] text-orange-300 px-3 py-1 rounded-full font-semibold tracking-wide">
        Your Content Deserves The Best. And We Deliver It.
      </span>
    </div>
    <h1 className="text-3xl md:text-5xl font-bold mb-2">
      Give Your Content
      <br />
      The{" "}
      <span className="bg-gradient-to-r from-purple-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
        Spotlight
      </span>{" "}
      It Deserves
    </h1>
    <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-6">
      From Edits To Interfaces, Visuals To Vision. We Bring Your Brand To Life.
      UI/UX Design, Video Editing, And Graphic Design, Tailored For Every Style
      And Platform.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
      <a
        href="#book"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition"
      >
        Book A Call
      </a>
      <a
        href="#work"
        className="border border-gray-400 text-white px-6 py-2 rounded-lg font-semibold text-sm transition hover:bg-gray-800"
      >
        Work
      </a>
    </div>
    <div className="w-full max-w-2xl aspect-video rounded-xl border border-orange-400 bg-gradient-to-br from-[#232323] to-[#181818] flex items-center justify-center relative shadow-lg">
      <button className="w-20 h-20 bg-[#232323] bg-opacity-80 rounded-full flex items-center justify-center border-4 border-orange-400 shadow-lg hover:scale-105 transition absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="#232323" />
          <polygon points="16,13 28,20 16,27" fill="#FF7849" />
        </svg>
      </button>
    </div>
  </section>
);

export default Hero;
