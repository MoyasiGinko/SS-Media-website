import React from "react";

const Testimonials = () => (
  <section
    id="reviews"
    className="w-full py-16 px-4 flex flex-col items-center"
  >
    <h2 className="text-2xl md:text-3xl font-bold mb-8">
      What Our Clients Say
    </h2>
    <p className="text-gray-400 mb-8 text-center max-w-2xl">
      We Take Pride In Delivering High-Quality Edits That Make Content Truly
      Stand Out. But Don't Just Take Our Word For It. Hear From Real Clients Who
      Trusted Us With Their Vision And Saw Real Results.
    </p>
    <div className="flex flex-col md:flex-row items-center gap-8 max-w-2xl w-full">
      <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-700 flex items-center justify-center">
        {/* Placeholder for client image */}
        <span className="text-5xl text-gray-400">😊</span>
      </div>
      <div className="flex-1 bg-[#181818] rounded-xl p-6 border border-gray-700 shadow-md relative">
        <svg
          className="absolute -top-6 left-4 text-orange-400"
          width="40"
          height="40"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7.17 15H4.5A1.5 1.5 0 0 1 3 13.5v-2.25A6.25 6.25 0 0 1 9.25 5h.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-.5A4.75 4.75 0 0 0 5 11.25v2.25c0 .414.336.75.75.75h2.67a.75.75 0 0 1 0 1.5zm10 0h-2.67a.75.75 0 0 1 0-1.5H19.5a.75.75 0 0 0 .75-.75v-2.25A6.25 6.25 0 0 0 14.75 5h-.5a.75.75 0 0 0-.75.75v.5a.75.75 0 0 0 .75.75h.5A4.75 4.75 0 0 1 19 11.25v2.25c0 .414-.336.75-.75.75z" />
        </svg>
        <blockquote className="text-gray-200 text-base mb-4">
          I Wanted Someone To Help Me With My YouTube Channel, The Seller Did A
          Great Job And I'm Very Happy With The Result.
        </blockquote>
        <div className="font-semibold text-orange-400">Mikasa Ackerman</div>
        <div className="text-xs text-gray-400">CEO – Even Life</div>
      </div>
    </div>
  </section>
);

export default Testimonials;
