import React from "react";

export const ContactIntro = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        We Are Here
        <br />
        For Your Success!
      </h1>
      <p className="text-gray-300 mb-6">
        Fill The Contact Form Or Scan Those QR. It's An Honor To Support You In
        Your Content Creation Journey.
      </p>
      <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-orange-400 text-white font-semibold shadow">
        Quick Chat!
      </button>
    </div>
  );
};
