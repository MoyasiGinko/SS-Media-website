"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// Define types for packages and services
interface Package {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

// YouTube packages data
const youtubePackages: Package[] = [
  {
    title: "Single Video",
    price: "$350",
    description:
      'It\'s best to request a sample service from our other <span class="text-[#ff4c4c] font-semibold">YouTube</span> plans.',
    features: [
      "1 Long Video (10 mins long)",
      "Thumbnail",
      "SEO",
      "7 Days Delivery",
    ],
  },
  {
    title: "Basic Plan",
    price: "$700",
    description:
      'Get a solid start to your YouTube journey with our <span class="text-[#ff4c4c] font-semibold">15-day plan</span>.',
    features: [
      "2 Long videos (10 mins long)",
      "Thumbnail",
      "SEO",
      "Managing time",
      "15 Days Delivery",
    ],
  },
  {
    title: "Standard Plan",
    price: "$1500",
    description:
      "Our best offer ensures consistency for a month – we'll schedule your videos in a sequence to help your channel start a strong and successful journey",
    features: [
      "Advanced Editing",
      "5 Long Video (10-12) Mins",
      "Better SEO Optimization",
      "Title and Description Optimization",
      "High CTR Thumbnails (Clickbait)",
      "Scheduling Videos",
      "35 Days Delivery",
    ],
    highlight: true,
  },
  {
    title: "Premium Plan",
    price: "$3250",
    description:
      "We'll take full responsibility for managing your channel and do our absolute best to grow it within 2 months.",
    features: [
      "Advanced Editing",
      "10 Long Video (10-12) Mins",
      "10 Shorts/Reels",
      "Better SEO Optimization",
      "Title and Description Optimization",
      "High CTR Thumbnails (Clickbait)",
      "Scheduling Videos",
      "70 Days Delivery",
    ],
  },
];

// Website packages data
const websitePackages: Package[] = [
  {
    title: "Basic Website",
    price: "$550",
    description:
      'Perfect for small businesses looking to establish an <span class="text-[#ff4c4c] font-semibold">online presence</span> with a professional touch.',
    features: [
      "3-5 Pages",
      "Mobile Responsive",
      "Contact Form",
      "Basic SEO Setup",
      "14 Days Delivery",
    ],
  },
  {
    title: "Business Website",
    price: "$1200",
    description:
      'Comprehensive solution for growing businesses requiring more <span class="text-[#ff4c4c] font-semibold">features and functionality</span>.',
    features: [
      "5-8 Pages",
      "Mobile Responsive",
      "Contact Form",
      "Blog Setup",
      "Social Media Integration",
      "Advanced SEO",
      "21 Days Delivery",
    ],
  },
  {
    title: "E-Commerce Website",
    price: "$2500",
    description:
      "Full-featured online store with everything you need to start selling products online and grow your business digitally.",
    features: [
      "Up to 100 Products",
      "Secure Payment Gateway",
      "Inventory Management",
      "Customer Accounts",
      "Mobile Responsive",
      "Advanced SEO",
      "Product Search & Filtering",
      "35 Days Delivery",
    ],
    highlight: true,
  },
  {
    title: "Enterprise Solution",
    price: "$5000+",
    description:
      "Custom-built website solution tailored specifically to your enterprise needs with advanced functionality.",
    features: [
      "Unlimited Pages",
      "Custom Features & Integrations",
      "Advanced Analytics",
      "User Authentication",
      "Database Integration",
      "API Development",
      "Ongoing Support Package",
      "60+ Days Delivery",
    ],
  },
];

const PlansSection = () => {
  // State for active tab
  const [activeTab, setActiveTab] = React.useState<"youtube" | "website">(
    "youtube"
  );

  // Get active packages based on selected tab
  const activePackages =
    activeTab === "youtube" ? youtubePackages : websitePackages;

  return (
    <>
      {/* Our Packages Section */}
      <section className="mb-10">
        <h2 className="text-3xl text-white md:text-6xl font-bold mb-4 text-center">
          Our Packages
        </h2>
        <p className="text-center text-xl md:text-[28px] text-white/80 max-w-5xl mx-auto mb-16">
          Weather You Want To Build A Website Or You Want To Start Your YouTube
          Journey Our Packages Will Provide You The Best Value.
        </p>

        <div className="flex border border-gray-600 w-[314px] h-[52px] mx-auto rounded-[16.5px] p-1 justify-center items-center gap-2 text-xs md:text-sm font-semibold">
          <button
            type="button"
            className={`w-[153px] text-[20px] rounded-[14.25px] leading-tight h-[45px] px-4 py-1 ${
              activeTab === "youtube"
                ? "bg-gradient-to-r from-[#D469C3] via-[#FC5F67] to-[#FFAB55] text-black"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("youtube")}
          >
            Youtube
          </button>
          <button
            type="button"
            className={`w-[153px] text-[20px] rounded-[14.25px] leading-tight h-[45px] px-4 py-1 ${
              activeTab === "website"
                ? "bg-gradient-to-r from-[#D469C3] via-[#FC5F67] to-[#FFAB55] text-black"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("website")}
          >
            Website
          </button>
        </div>
      </section>

      <div className="rounded-2xl bg-transparent mx-auto">
        {/* Wrapper for cards - using overflow-x-auto for mobile scrolling */}
        <div className="overflow-x-auto pb-6">
          <div className="flex flex-row max-w-full md:max-w-[1305px] mx-auto min-w-max py-12">
            {activePackages.map((pkg, index) => {
              const isHighlight = pkg.highlight;
              return (
                <article
                  key={index}
                  className={`relative flex flex-col justify-between ${
                    isHighlight
                      ? "bg-white px-[46px] text-black shadow-2xl z-10 transform-none"
                      : "bg-[#2a2a2a] px-[43px] self-center"
                  }  py-[38px] transition-transform duration-300
          ${
            index === 0
              ? "rounded-l-2xl"
              : index === activePackages.length - 1
              ? "rounded-r-2xl"
              : ""
          }
          ${isHighlight ? "rounded-2xl" : ""}
          `}
                  style={{
                    width: isHighlight ? "380px" : "315px",
                    height: isHighlight ? "900px" : "762px",
                  }}
                >
                  {isHighlight && (
                    <div className="absolute rounded-tr-[13.5px] text-center rounded-bl-[13.5px] w-[120px] h-[28px] md:w-[156px] md:h-[36px] top-0 right-0 bg-gradient-to-r from-[#D469C3] via-[#FC5F67] to-[#FFAB55] text-[13px] md:text-[15px] font-semibold text-black select-none flex items-center justify-center">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <p
                      className={`text-[23px] ${
                        isHighlight ? " font-semibold" : "text-gray-300"
                      } mb-1`}
                    >
                      {pkg.title}
                    </p>
                    <div className="flex items-center mb-[40px]">
                      <p
                        className={`font-bold leading-tight  ${
                          isHighlight
                            ? "text-[52.5px] text-[#00A832]"
                            : "text-[38px]"
                        }`}
                      >
                        {pkg.price}
                      </p>
                      {isHighlight && (
                        <span className="ml-2 flex flex-col">
                          <span className="text-xs text-[#00A832] font-semibold">
                            Limited Offer
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {activeTab === "youtube" ? "$1750" : "$3000"}
                          </span>
                        </span>
                      )}
                    </div>
                    <hr
                      className={`border-${
                        isHighlight ? "gray-300" : "gray-600"
                      } mb-[40px]`}
                    />
                    <p
                      className={` ${
                        isHighlight ? "text-[15.5px]" : "text-[13px] text-white"
                      } mb-[40px] leading-tight`}
                      dangerouslySetInnerHTML={{ __html: pkg.description }}
                    />
                    <button
                      type="button"
                      className={`${
                        isHighlight
                          ? "w-[240px] h-[58px]"
                          : "w-[190px] h-[48px]"
                      }   text-[15.73px] bg-gradient-to-r from-[#D469C3] via-[#FC5F67] to-[#FFAB55] rounded-[13.5px] py-2 text-black font-semibold mb-[40px] `}
                    >
                      Get Started
                    </button>
                    <p
                      className={`text-[21px] ${
                        isHighlight ? "text-gray-600" : "text-gray-400"
                      } mb-4 font-semibold`}
                    >
                      Features
                    </p>
                    <hr
                      className={`border-${
                        isHighlight ? "gray-300" : "gray-600"
                      } mb-[20px]`}
                    />
                    <ul
                      className={`${
                        isHighlight
                          ? "text-[15.73px]"
                          : "text-[12.5px] text-gray-300"
                      } space-y-${isHighlight ? "2" : "1"}`}
                    >
                      {pkg.features.map((feature, i) => (
                        <li
                          key={i}
                          className={`flex items-center ${
                            isHighlight
                              ? "mb-[25px] gap-2"
                              : "mb-[13px] gap-1.5"
                          }`}
                        >
                          {isHighlight ? (
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="text-black w-3 h-3"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="text-[#BFFF00] w-3 h-3"
                            />
                          )}
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlansSection;
