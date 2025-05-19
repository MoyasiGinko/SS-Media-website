"use client";
import React, { useState } from "react";

type DotKey = "deliveryTime" | "budget" | "quality";

const PriceHero = () => {
  // State to track which dots are selected
  const [selectedDots, setSelectedDots] = useState<{
    deliveryTime: boolean;
    budget: boolean;
    quality: boolean;
  }>({
    deliveryTime: true, // Top dot (Delivery Time)
    budget: false, // Bottom left dot (Budget)
    quality: true, // Bottom right dot (Quality)
  });

  // Determine which dot should be red (the unselected one when exactly 2 are selected)
  const selectedCount = Object.values(selectedDots).filter(Boolean).length;
  const redDot =
    selectedCount === 2
      ? (Object.keys(selectedDots).find(
          (key) => !selectedDots[key as DotKey]
        ) as DotKey | null)
      : null;

  // Function to handle dot selection
  const toggleDot = (dot: DotKey) => {
    // Count currently selected dots
    const currentlySelected =
      Object.values(selectedDots).filter(Boolean).length;

    // If the dot is already selected, we can always deselect it
    if (selectedDots[dot]) {
      setSelectedDots({
        ...selectedDots,
        [dot]: false,
      });
    }
    // If the dot is not selected and we have less than 2 selected, we can select it
    else if (currentlySelected < 2) {
      setSelectedDots({
        ...selectedDots,
        [dot]: true,
      });
    }
    // If we already have 2 selected dots and want to select a third one,
    // we need to deselect one of the others to maintain only 2 selections
    else {
      // Find which dots are currently selected
      const selectedDotKeys = Object.keys(selectedDots).filter(
        (key) => selectedDots[key as DotKey]
      );
      // Create new state with first selected dot deselected and new dot selected
      const newState = {
        ...selectedDots,
        [selectedDotKeys[0]]: false,
        [dot]: true,
      };
      setSelectedDots(newState);
    }
  };

  return (
    <>
      <section className="flex flex-col w-full md:max-w-[1305px] md:flex-row md:justify-center md:items-center gap-10 md:gap-20 mb-20">
        {/* Triangle with interactive circles and labels */}
        <div className="relative w-full max-w-[320px] md:max-w-[350px] h-[320px] md:h-[350px]">
          <img
            src="/images/triangle2.svg"
            alt="Triangle"
            className=" absolute object-fit cover -z-0 w-full h-full"
          />

          {/* Triangle SVG */}
          {/* Interactive Circles as absolutely positioned divs */}
          {/* Delivery Time (Top) */}
          <div
            className={`absolute left-1/2 top-5 -translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300`}
            style={{ transform: "translate(1%, 0)" }} // moved dot more to the right
            onClick={() => toggleDot("deliveryTime")}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 border-[#222] ${
                selectedDots.deliveryTime
                  ? "bg-[#a3ff00] shadow-[0_0_8px_#a3ff00]"
                  : redDot === "deliveryTime"
                  ? "bg-[#ff4c4c] shadow-[0_0_8px_#ff4c4c]"
                  : "bg-[#444444]"
              } transition-all duration-300`}
            />
            {/* Labels */}
            <span className="absolute text-center w-[100px] -top-6 left-1/2 -translate-x-1/2 text-white text-sm select-none">
              Delivery Time
            </span>
          </div>
          {/* Budget (Bottom Left) */}
          <div
            className={`absolute left-1.5 bottom-7 z-10 w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300`}
            style={{ transform: "translate(-20%, 20%)" }}
            onClick={() => toggleDot("budget")}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 border-[#222] ${
                selectedDots.budget
                  ? "bg-[#a3ff00] shadow-[0_0_8px_#a3ff00]"
                  : redDot === "budget"
                  ? "bg-[#ff4c4c] shadow-[0_0_8px_#ff4c4c]"
                  : "bg-[#444444]"
              } transition-all duration-300`}
            />
            <span className="absolute -bottom-6 left-1 text-white text-sm select-none">
              Budget
            </span>
          </div>
          {/* Quality (Bottom Right) */}
          <div
            className={`absolute right-1.5 bottom-7 z-10 w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300`}
            style={{ transform: "translate(20%, 20%)" }}
            onClick={() => toggleDot("quality")}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 border-[#222] ${
                selectedDots.quality
                  ? "bg-[#a3ff00] shadow-[0_0_8px_#a3ff00]"
                  : redDot === "quality"
                  ? "bg-[#ff4c4c] shadow-[0_0_8px_#ff4c4c]"
                  : "bg-[#444444]"
              } transition-all duration-300`}
            />
            <span className="absolute -bottom-6 right-0 text-white text-sm select-none">
              Quality
            </span>
          </div>
        </div>

        {/* How We Work text and options - dynamically highlighting based on selections */}
        <div className="max-w-[400px] space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            That's How We Work!
          </h2>
          <p className="text-xs md:text-sm font-light">
            Select Any Two Options From Below
          </p>
          <div className="space-y-3">
            <div
              className={`flex items-center gap-3 ${
                selectedDots.deliveryTime
                  ? "bg-[#1a1a1a]"
                  : redDot === "deliveryTime"
                  ? "bg-[#1a1a1a]"
                  : "bg-[#111111]"
              } rounded-md px-3 py-2 text-xs md:text-sm transition-all duration-300 cursor-pointer`}
              onClick={() => toggleDot("deliveryTime")}
            >
              <span
                className={`w-4 h-4 rounded-full ${
                  selectedDots.deliveryTime
                    ? "bg-[#a3ff00]"
                    : redDot === "deliveryTime"
                    ? "bg-[#ff4c4c]"
                    : "bg-[#444444]"
                } inline-block flex-shrink-0 transition-all duration-300`}
              ></span>
              <span
                className={`${
                  selectedDots.deliveryTime || redDot === "deliveryTime"
                    ? "text-white"
                    : "text-gray-400"
                } transition-all duration-300`}
              >
                I Want My Project Within My Deadline.
              </span>
            </div>
            <div
              className={`flex items-center gap-3 ${
                selectedDots.quality
                  ? "bg-[#1a1a1a]"
                  : redDot === "quality"
                  ? "bg-[#1a1a1a]"
                  : "bg-[#111111]"
              } rounded-md px-3 py-2 text-xs md:text-sm transition-all duration-300 cursor-pointer`}
              onClick={() => toggleDot("quality")}
            >
              <span
                className={`w-4 h-4 rounded-full ${
                  selectedDots.quality
                    ? "bg-[#a3ff00]"
                    : redDot === "quality"
                    ? "bg-[#ff4c4c]"
                    : "bg-[#444444]"
                } inline-block flex-shrink-0 transition-all duration-300`}
              ></span>
              <span
                className={`${
                  selectedDots.quality || redDot === "quality"
                    ? "text-white"
                    : "text-gray-400"
                } transition-all duration-300`}
              >
                I Have Specific Requirement For The Quality.
              </span>
            </div>
            <div
              className={`flex items-center gap-3 ${
                selectedDots.budget
                  ? "bg-[#1a1a1a]"
                  : redDot === "budget"
                  ? "bg-[#1a1a1a]"
                  : "bg-[#111111]"
              } rounded-md px-3 py-2 text-xs md:text-sm transition-all duration-300 cursor-pointer`}
              onClick={() => toggleDot("budget")}
            >
              <span
                className={`w-4 h-4 rounded-full ${
                  selectedDots.budget
                    ? "bg-[#a3ff00]"
                    : redDot === "budget"
                    ? "bg-[#ff4c4c]"
                    : "bg-[#444444]"
                } inline-block flex-shrink-0 transition-all duration-300`}
              ></span>
              <span
                className={`${
                  selectedDots.budget || redDot === "budget"
                    ? "text-white"
                    : "text-gray-400"
                } transition-all duration-300`}
              >
                I Will Decide The Price
              </span>
            </div>
          </div>

          {/* Dynamic message based on selections */}
          <p className="text-[9px] md:text-[10px] text-gray-400 bg-[#2a2a2a] rounded-md p-3 max-w-[320px]">
            <span className="text-[#ff4c4c] font-semibold">Note:-</span> You
            Have Selected {Object.values(selectedDots).filter(Boolean).length}{" "}
            Options According To Your Comfort Zone.
            {selectedCount === 2
              ? ` The highlighted <span class="text-[#ff4c4c] font-semibold">RED</span> option will be decided by the seller according to their comfort zone.`
              : selectedCount < 2
              ? " Please Select One More Option."
              : " Please Deselect One Option As You Can Only Choose Two."}
          </p>
        </div>
      </section>
    </>
  );
};

export default PriceHero;
