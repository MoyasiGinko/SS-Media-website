import React from "react";

const Footer = () => (
  <footer className="w-full bg-[#181818] text-gray-400 py-10 px-4 mt-12 border-t border-gray-800">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <div className="bg-orange-500 rounded-md w-8 h-8 flex items-center justify-center font-bold text-lg text-white">
          SS
        </div>
        <div>
          <div className="font-semibold text-white text-lg">SS Media</div>
          <div className="text-xs">Your Growth, Our Goal.</div>
        </div>
      </div>
      <div className="text-sm text-center md:text-left">
        <div>Narsingdi Sadar, Bangladesh</div>
        <div>
          Email:{" "}
          <a
            href="mailto:sharif.s.ahmed@outlook.com"
            className="text-orange-400 hover:underline"
          >
            sharif.s.ahmed@outlook.com
          </a>
        </div>
        <div className="flex gap-3 mt-2 justify-center md:justify-start">
          {/* Social icons placeholders */}
          <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
            F
          </span>
          <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
            T
          </span>
          <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
            I
          </span>
          <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
            L
          </span>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
      <div className="flex gap-4 mb-2 md:mb-0">
        <a href="#about" className="hover:text-orange-400">
          About Us
        </a>
        <a href="#contact" className="hover:text-orange-400">
          Contact
        </a>
        <a href="#help" className="hover:text-orange-400">
          Help
        </a>
        <a href="#privacy" className="hover:text-orange-400">
          Privacy Policy
        </a>
        <a href="#disclaimer" className="hover:text-orange-400">
          Disclaimer
        </a>
      </div>
      <div>Copyright © 2024 – SS Media.</div>
    </div>
  </footer>
);

export default Footer;
