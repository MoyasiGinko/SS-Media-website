"use client";
import React from "react";

const PriceHero = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row md:justify-between md:items-center gap-10 md:gap-20 mb-20">
        {/* Triangle with circles and labels */}
        <div className="relative w-full max-w-[320px] md:max-w-[350px] h-[320px] md:h-[350px]">
          <svg
            className="w-full h-full"
            viewBox="0 0 320 320"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
          >
            {/* Triangle lines */}
            <path
              className="stroke-white stroke-[1.5px] fill-none filter drop-shadow-[0_0_1px_white]"
              d="M160 20 L40 280 L280 280 Z"
            />
            {/* Circles */}
            <circle
              cx="160"
              cy="20"
              r="10"
              fill="#a3ff00"
              className="filter drop-shadow-[0_0_6px_#a3ff00]"
            />
            <circle
              cx="40"
              cy="280"
              r="10"
              fill="#ff4c4c"
              className="filter drop-shadow-[0_0_6px_#ff4c4c]"
            />
            <circle
              cx="280"
              cy="280"
              r="10"
              fill="#a3ff00"
              className="filter drop-shadow-[0_0_6px_#a3ff00]"
            />
          </svg>
          {/* Labels */}
          <span className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-sm select-none">
            Delivery Time
          </span>
          <span className="absolute bottom-1 left-1 text-white text-sm select-none">
            Budget
          </span>
          <span className="absolute bottom-1 right-1 text-white text-sm select-none">
            Quality
          </span>
        </div>

        {/* How We Work text and options */}
        <div className="max-w-[400px] space-y-4">
          <h2 className=" text-2xl md:text-3xl font-semibold">
            That's How We Work?
          </h2>
          <p className="text-xs md:text-sm font-light">
            Select Any Two Options From Bellow
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-md px-3 py-2 text-xs md:text-sm">
              <span className="w-4 h-4 rounded-full bg-[#a3ff00] inline-block flex-shrink-0"></span>
              <span>I Want My Project Within My Deadline.</span>
            </div>
            <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-md px-3 py-2 text-xs md:text-sm">
              <span className="w-4 h-4 rounded-full bg-[#a3ff00] inline-block flex-shrink-0"></span>
              <span>I Have Specific Requirement For The Quality.</span>
            </div>
            <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-md px-3 py-2 text-xs md:text-sm">
              <span className="w-4 h-4 rounded-full bg-[#ff4c4c] inline-block flex-shrink-0"></span>
              <span>I Will Decide The Prize</span>
            </div>
          </div>
          <p className="text-[9px] md:text-[10px] text-gray-400 bg-[#2a2a2a] rounded-md p-3 max-w-[320px]">
            <span className="text-[#ff4c4c] font-semibold">Note:-</span> You
            Have Selected Two Options According To Your Comfort Zone. So, The
            Seller Will Decide The 3rd Option According To His Comfort Zone.
          </p>
        </div>
      </section>
    </>
  );
};
export default PriceHero;
