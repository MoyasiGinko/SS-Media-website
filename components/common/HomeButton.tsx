import React from "react";
export const BackHomeButton = () => {
  return (
    <div className="max-w-6xl fixed top-0 z-999 flex justify-start mx-auto pl-16 pt-14">
      <button className="w-[160px] h-[50px] rounded-[22px] text-xl text-center bg-gradient-to-r from-[#BB6FFB] via-[#FC5F67] to-[#FFB054] text-black font-medium justify-center self-start flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Home
      </button>
    </div>
  );
};
