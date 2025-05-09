import React from "react";

export const ContactIntro = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-7xl max-w-[691px] syne-unique font-bold text-white mb-5">
        We Are Here
        <br />
        For Your Success!
      </h1>
      <p className="text-white/70 max-w-[673px] text-[28px] mb-15">
        Fill The Contact Form Or Scan Those QR. It's An Honor To Support You In
        Your Content Creation Journey.
      </p>
      <button className="w-[160px] h-[50px] rounded-2xl text-2xl text-center border-[1.5px] border-white bg-gradient-to-r from-[#BB6FFB]/30 via-[#FC5F67]/30 to-[#FFB054]/30 text-white font-medium  items-center">
        Quick Chat
      </button>
    </div>
  );
};
