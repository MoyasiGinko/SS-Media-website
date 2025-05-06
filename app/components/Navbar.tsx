import React from "react";

const Navbar = () => (
  <nav className="w-full bg-[#181818] py-3 px-4 flex items-center justify-between shadow-md z-50">
    <div className="flex items-center gap-2">
      <div className="bg-orange-500 rounded-md w-8 h-8 flex items-center justify-center font-bold text-lg">
        SS
      </div>
      <span className="font-semibold text-lg tracking-wide">SS Media</span>
    </div>
    <ul className="hidden md:flex gap-8 text-sm font-medium">
      <li>
        <a href="#services" className="hover:text-orange-400 transition">
          Services
        </a>
      </li>
      <li>
        <a href="#reviews" className="hover:text-orange-400 transition">
          Reviews
        </a>
      </li>
      <li>
        <a href="#work" className="hover:text-orange-400 transition">
          Work
        </a>
      </li>
      <li>
        <a href="#faqs" className="hover:text-orange-400 transition">
          FAQs
        </a>
      </li>
      <li>
        <a href="#about" className="hover:text-orange-400 transition">
          About Us
        </a>
      </li>
    </ul>
    <a
      href="#book"
      className="ml-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition"
    >
      Book A Call
    </a>
  </nav>
);

export default Navbar;
