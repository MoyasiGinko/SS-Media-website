"use client";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: "/icons/facebook.svg",
      url: "https://facebook.com",
    },
    { name: "Twitter", icon: "/icons/twitter.svg", url: "https://twitter.com" },
    {
      name: "Instagram",
      icon: "/icons/instagram.svg",
      url: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: "/icons/linkedin.svg",
      url: "https://linkedin.com",
    },
  ];

  const footerLinks = [
    { name: "About Us", url: "#about" },
    { name: "Services", url: "#services" },
    { name: "Contact", url: "#contact" },
    { name: "Help", url: "#help" },
    { name: "Privacy Policy", url: "#privacy" },
    { name: "Disclaimer", url: "#disclaimer" },
  ];

  return (
    <footer className="w-full bg-[#181818] text-gray-400 pt-16 pb-8 px-4 mt-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Top Footer Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Logo and Tagline */}
          <div className="flex flex-col max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo/ss.svg"
                alt="SS Media Logo"
                className="w-12 h-12"
              />
              <div>
                <div className="font-semibold text-white text-xl">SS Media</div>
                <div className="text-sm text-gray-400">
                  Your Growth, Our Goal.
                </div>
              </div>
            </div>
            <p className="text-sm mt-4">
              We are dedicated to helping businesses grow through innovative
              digital solutions and strategic marketing approaches.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#home"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#faqs"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Info
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-orange-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Narsingdi Sadar, Bangladesh</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-orange-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:sharif.s.ahmed@outlook.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  sharif.s.ahmed@outlook.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-orange-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+880 1234-567890</span>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-white font-semibold text-sm mb-3">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-colors"
                    aria-label={social.name}
                  >
                    {social.name.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="max-w-xs">
            <h3 className="text-white font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-sm mb-4">
              Stay updated with our latest news and offers.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            Copyright © {currentYear} – SS Media. All Rights Reserved.
          </div>

          <div className="flex flex-wrap gap-6 text-xs">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="hover:text-orange-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
