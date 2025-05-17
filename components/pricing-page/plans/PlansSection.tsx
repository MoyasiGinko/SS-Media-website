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
    price: "$1600",
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

const PlansSection = () => {
  // State for active tab
  const [activeTab, setActiveTab] = React.useState<"youtube" | "website">(
    "youtube"
  );

  return (
    <>
      {/* Our Packages Section */}
      <section className="mb-20">
        <h3 className="text-xl md:text-2xl font-semibold text-center mb-2">
          Our Packages
        </h3>
        <p className="text-center text-gray-400 text-xs md:text-sm max-w-[600px] mx-auto mb-6">
          Weather You Want To Build A Website Or You Want To Start Your YouTube
          Journey Our Packages Will Provide You The Best Value.
        </p>

        <div className="flex justify-center mb-10 gap-2 text-xs md:text-sm font-semibold">
          <button
            type="button"
            className={`rounded-full px-4 py-1 ${
              activeTab === "youtube"
                ? "bg-gradient-to-r from-[#ff4c4c] via-[#ff9a4c] to-[#ffb14c] text-black"
                : "border border-gray-600 text-gray-400"
            }`}
            onClick={() => setActiveTab("youtube")}
          >
            Youtube
          </button>
          <button
            type="button"
            className={`rounded-full px-4 py-1 ${
              activeTab === "website"
                ? "bg-gradient-to-r from-[#ff4c4c] via-[#ff9a4c] to-[#ffb14c] text-black"
                : "border border-gray-600 text-gray-400"
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
            {youtubePackages.map((pkg, index) => (
              <article
                key={index}
                className={`relative flex flex-col justify-between ${
                  pkg.highlight
                    ? "bg-white text-black shadow-2xl z-10 transform-none"
                    : "bg-[#2a2a2a] self-center"
                } p-6 transition-transform duration-300
                ${
                  index === 0
                    ? "rounded-l-2xl"
                    : index === youtubePackages.length - 1
                    ? "rounded-r-2xl"
                    : ""
                }
                ${pkg.highlight ? "rounded-2xl" : ""}
                `}
                style={{
                  width: pkg.highlight ? "380px" : "315px",
                  height: pkg.highlight ? "900px" : "762px",
                  ...(!pkg.highlight ? {} : {}),
                }}
              >
                {pkg.highlight && (
                  <div className="absolute rounded-tr-[13.5px] text-center rounded-bl-[13.5px] w-[120px] h-[28px] md:w-[156px] md:h-[36px] top-0 right-0 bg-gradient-to-r from-[#D469C3] via-[#FC5F67] to-[#FFAB55] text-[13px] md:text-[15px] font-semibold text-black select-none flex items-center justify-center">
                    Most Popular
                  </div>
                )}

                <div>
                  <p
                    className={`text-[23px] ${
                      pkg.highlight ? " font-semibold" : "text-gray-300"
                    } mb-1`}
                  >
                    {pkg.title}
                  </p>
                  <p
                    className={`font-bold ${
                      pkg.highlight ? "text-2xl" : "text-lg"
                    } mb-4`}
                  >
                    {pkg.price}
                  </p>
                  <hr
                    className={`border-${
                      pkg.highlight ? "gray-300" : "gray-600"
                    } mb-4`}
                  />
                  <p
                    className={`text-xs ${
                      pkg.highlight ? "" : "text-gray-400"
                    } mb-4`}
                    dangerouslySetInnerHTML={{ __html: pkg.description }}
                  />
                  <button
                    type="button"
                    className="w-full bg-gradient-to-r from-[#ff4c4c] via-[#ff9a4c] to-[#ffb14c] rounded-full py-2 text-black font-semibold mb-6"
                  >
                    Get Started
                  </button>
                  <p
                    className={`text-xs ${
                      pkg.highlight ? "text-gray-600" : "text-gray-400"
                    } mb-2 font-semibold`}
                  >
                    Features
                  </p>
                  <hr
                    className={`border-${
                      pkg.highlight ? "gray-300" : "gray-600"
                    } mb-3`}
                  />
                  <ul
                    className={`text-xs ${
                      pkg.highlight ? "" : "text-gray-300"
                    } space-y-${pkg.highlight ? "2" : "1"}`}
                  >
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {pkg.highlight ? (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-gray-600 w-3 h-3"
                          />
                        ) : (
                          <span className="w-4 h-4 rounded-full bg-[#a3ff00] inline-block flex-shrink-0"></span>
                        )}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlansSection;
