import React from "react";

const Portfolio = () => (
  <section id="work" className="w-full py-16 px-4 flex flex-col items-center">
    <h2 className="text-2xl md:text-3xl font-bold mb-8">
      Explore Our Portfolio
    </h2>
    <p className="text-gray-400 mb-8 text-center max-w-2xl">
      Your Content Deserves To Stand Out. Our Portfolio Highlights The
      High-Quality Edits We've Delivered For Clients Who Trusted Us To Elevate
      Their Videos.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <div className="bg-[#181818] rounded-xl p-6 flex flex-col items-center shadow-md border border-gray-700">
        <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
          {/* Placeholder for video/image */}
          <span className="text-4xl text-gray-400">🎥</span>
        </div>
        <div className="font-semibold text-lg text-white">Videos</div>
      </div>
      <div className="bg-[#181818] rounded-xl p-6 flex flex-col items-center shadow-md border border-gray-700">
        <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
          {/* Placeholder for graphic/image */}
          <span className="text-4xl text-gray-400">🎨</span>
        </div>
        <div className="font-semibold text-lg text-white">Graphic Design</div>
      </div>
    </div>
  </section>
);

export default Portfolio;
