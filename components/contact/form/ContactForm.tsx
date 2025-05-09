import React from "react";

export const ZoomCallForm = () => {
  return (
    <form className="bg-white rounded-3xl shadow-lg p-10 w-[694px] h-[794px] mx-auto mt-10 mb-10">
      <h2 className="text-[58px] leading-tight text-black font-medium mb-10 text-center">
        Book A Zoom Call
      </h2>
      <div className="text-black flex flex-col gap-5 mb-5">
        <div className="flex gap-4">
          <input
            className="input h-[84px] w-1/2 rounded-[10px] border-[2px] border-black/40 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Full Name*"
          />
          <input
            className="input h-[84px] w-1/2 rounded-[10px] border-[2px] border-black/40 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="WhatsApp Number*"
          />
        </div>
        <div className="flex gap-4">
          <input
            className="input h-[84px] w-1/2 rounded-[10px] border-[2px] border-black/40 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Work Email*"
          />
          <input
            className="input h-[84px] w-1/2 rounded-[10px] border-[2px] border-black/40 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Company Name*"
          />
        </div>
        <div>
          <select
            className="input h-[84px] w-full rounded-[10px] border-[2px] border-black/40 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            defaultValue=""
          >
            <option value="" disabled>
              What Is Your Budget
            </option>
          </select>
        </div>
        <div className="flex gap-4">
          <input
            className="input h-[84px] w-1/2 rounded-[10px] border-[2px] border-black/40 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Website*"
          />
          <select
            className="input h-[84px] w-1/2 rounded-[10px] border-[2px] border-black/40 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            defaultValue=""
          >
            <option value="" disabled>
              Industry*
            </option>
          </select>
        </div>
      </div>
      <p className="text-gray-500 text-[24px] text-sm mb-10">
        Let's Have A Chat And Work Together. Fill Up The Form And I Will Get
        Back To You Within 3 Hours.
      </p>
      <button className="w-full h-[84px] rounded-[10px] bg-gradient-to-r from-[#BB6FFB] via-[#FC5F67] to-[#FFB054] text-white font-medium text-[35px]">
        Submit
      </button>
    </form>
  );
};
