import React from "react";

const Portfolio = () => (
  <section id="work" className="w-full py-16 px-4 flex flex-col items-center">
    <h2 className="text-3xl text-white md:text-6xl font-bold mb-4 text-center">
      Explore Our Portfolio
    </h2>
    <p className="text-center text-xl md:text-[28px] text-white/80 max-w-5xl mx-auto mb-16">
      Your Content Deserves To Stand Out. Our Portfolio Highlights The
      High-Quality Edits We've Delivered For Clients Who Trusted Us To Elevate
      Their Videos.
    </p>
    <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
      <div
        className="relative bg-[#181818] rounded-xl overflow-hidden shadow-md border border-gray-700"
        style={{ width: "590px", height: "410px" }}
      >
        <button
          className="absolute border-[1px] border-[#FC5F67] rounded-full text-[30px] top-2 right-2 bg-white text-transparent bg-clip-text px-2 py-1  text-sm"
          style={{
            width: "245px",
            height: "60px",
            backgroundImage:
              "linear-gradient(to right, #BB6FFB, #FC5F67, #FFB054)",
          }}
        >
          Videos
        </button>
        <img
          src="/video_card.svg"
          alt="Video Thumbnail"
          className="w-full h-full object-fit cover"
        />
        <button
          className="absolute border-[1px] border-[#FC5F67] text-[30px] bottom-2 right-2 bg-[#1d1d1d] p-2 rounded-full flex items-center justify-center"
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
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BB6FFB" />
                <stop offset="50%" stopColor="#FC5F67" />
                <stop offset="100%" stopColor="#FFB054" />
              </linearGradient>
            </defs>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div
        className="relative bg-[#181818] rounded-xl overflow-hidden shadow-md border border-gray-700"
        style={{ width: "590px", height: "410px" }}
      >
        <button
          className="absolute border-[1px] border-[#FC5F67] rounded-full text-[30px] top-2 right-2 bg-white text-transparent bg-clip-text px-2 py-1  text-sm"
          style={{
            width: "245px",
            height: "60px",
            backgroundImage:
              "linear-gradient(to right, #BB6FFB, #FC5F67, #FFB054)",
          }}
        >
          Graphic Design
        </button>
        <img
          src="/graphics_card.svg"
          alt="Graphic Thumbnail"
          className="w-full h-full object-fit cover"
        />
        <button
          className="absolute border-[1px] border-[#FC5F67] text-[30px] bottom-2 right-2 bg-[#1d1d1d] p-2 rounded-full flex items-center justify-center"
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
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BB6FFB" />
                <stop offset="50%" stopColor="#FC5F67" />
                <stop offset="100%" stopColor="#FFB054" />
              </linearGradient>
            </defs>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
);

export default Portfolio;
