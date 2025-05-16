"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faSyncAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faClock as farClock } from "@fortawesome/free-regular-svg-icons";

// Define types for packages and services
interface Package {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

interface Service {
  title: string;
  description: string;
  imageUrl: string;
  deliveryTime: string;
  revisions: string;
  price: string;
}

const PackagesAndServices: React.FC = () => {
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

  // Individual services data
  const individualServices: Service[] = [
    {
      title: "Video Editing",
      description: "We Will Make A (8-10 Minutes) Long Video In Your Niche.",
      imageUrl: "/images/testimonials/t1.png",
      deliveryTime: "5-Day Delivery",
      revisions: "5 Revisions",
      price: "$350",
    },
    {
      title: "Thumbnail Design",
      description:
        "We Will Provide You 2 Different Thumbnails For Same Video, So You Will Be Able To Test Which One Perform Better.",
      imageUrl: "/images/testimonials/t1.png",
      deliveryTime: "2-Day Delivery",
      revisions: "1 Revision",
      price: "$30",
    },
    {
      title: "SEO",
      description:
        "We Will Modify Your Video Title, Description, Tags, Keywords. Etc.",
      imageUrl: "/images/testimonials/t1.png",
      deliveryTime: "1-Day Delivery",
      revisions: "No Revision",
      price: "$10",
    },
    {
      title: "Social Media Post Design",
      description:
        "We Will Design A Carousel With 10 Images According To Your Niche",
      imageUrl: "/images/testimonials/t1.png",
      deliveryTime: "3-Day Delivery",
      revisions: "2 Revisions",
      price: "$100",
    },
    {
      title: "App Ui Design",
      description: "We Will Do 15 Screens Of App Ui",
      imageUrl: "/images/testimonials/t1.png",
      deliveryTime: "15-Day Delivery",
      revisions: "Unlimited Revision",
      price: "$600",
    },
    {
      title: "Web Ui Design",
      description: "We Will Do 1 Page Ui Design With 5 Sections",
      imageUrl: "/images/testimonials/t1.png",
      deliveryTime: "4-Day Delivery",
      revisions: "Unlimited Revisions",
      price: "$130",
    },
  ];

  // State for active tab
  const [activeTab, setActiveTab] = React.useState<"youtube" | "website">(
    "youtube"
  );

  return (
    <div className="pt-30 md:pt-40">
      <Head>
        <title>Packages & Services</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Roboto:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="max-w-[1200px] mx-auto px-4 py-10 text-white bg-transparent font-['Roboto']">
        {/* Top Section: Triangle and How We Work */}
        <section className="flex flex-col md:flex-row md:justify-between md:items-center gap-10 md:gap-20 mb-20">
          {/* Triangle with circles and labels */}
          <div className="relative w-full max-w-[320px] md:max-w-[350px] h-[320px] md:h-[350px]">
            <svg
              className="w-full h-full"
              viewBox="0 0 320 320"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="true"
            >
              {/* Triangle lines */}
              <path
                className="stroke-white stroke-[1.5px] fill-none filter drop-shadow-[0_0_1px_white]"
                d="M160 20 L40 280 L280 280 Z"
              />
              {/* Circles */}
              <circle
                cx="160"
                cy="20"
                r="10"
                fill="#a3ff00"
                className="filter drop-shadow-[0_0_6px_#a3ff00]"
              />
              <circle
                cx="40"
                cy="280"
                r="10"
                fill="#ff4c4c"
                className="filter drop-shadow-[0_0_6px_#ff4c4c]"
              />
              <circle
                cx="280"
                cy="280"
                r="10"
                fill="#a3ff00"
                className="filter drop-shadow-[0_0_6px_#a3ff00]"
              />
            </svg>
            {/* Labels */}
            <span className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-sm select-none">
              Delivery Time
            </span>
            <span className="absolute bottom-1 left-1 text-white text-sm select-none">
              Budget
            </span>
            <span className="absolute bottom-1 right-1 text-white text-sm select-none">
              Quality
            </span>
          </div>

          {/* How We Work text and options */}
          <div className="max-w-[400px] space-y-4">
            <h2 className="font-['Orbitron'] text-2xl md:text-3xl font-semibold">
              That's How We Work?
            </h2>
            <p className="text-xs md:text-sm font-light">
              Select Any Two Options From Bellow
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-md px-3 py-2 text-xs md:text-sm">
                <span className="w-4 h-4 rounded-full bg-[#a3ff00] inline-block flex-shrink-0"></span>
                <span>I Want My Project Within My Deadline.</span>
              </div>
              <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-md px-3 py-2 text-xs md:text-sm">
                <span className="w-4 h-4 rounded-full bg-[#a3ff00] inline-block flex-shrink-0"></span>
                <span>I Have Specific Requirement For The Quality.</span>
              </div>
              <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-md px-3 py-2 text-xs md:text-sm">
                <span className="w-4 h-4 rounded-full bg-[#ff4c4c] inline-block flex-shrink-0"></span>
                <span>I Will Decide The Prize</span>
              </div>
            </div>
            <p className="text-[9px] md:text-[10px] text-gray-400 bg-[#2a2a2a] rounded-md p-3 max-w-[320px]">
              <span className="text-[#ff4c4c] font-semibold">Note:-</span> You
              Have Selected Two Options According To Your Comfort Zone. So, The
              Seller Will Decide The 3rd Option According To His Comfort Zone.
            </p>
          </div>
        </section>

        {/* Our Packages Section */}
        <section className="mb-20">
          <h3 className="font-['Orbitron'] text-xl md:text-2xl font-semibold text-center mb-2">
            Our Packages
          </h3>
          <p className="text-center text-gray-400 text-xs md:text-sm max-w-[600px] mx-auto mb-6">
            Weather You Want To Build A Website Or You Want To Start Your
            YouTube Journey Our Packages Will Provide You The Best Value.
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

          {/* Packages cards container */}
          <div className="rounded-2xl bg-[#2a2a2a]">
            <div className="flex flex-col md:flex-row max-w-[1100px] mx-auto">
              {youtubePackages.map((pkg, index) => (
                <article
                  key={index}
                  className={`relative flex-1 flex flex-col justify-between ${
                    pkg.highlight
                      ? "bg-white text-black md:scale-105 md:z-10 shadow-2xl"
                      : "bg-[#2a2a2a]"
                  } ${
                    pkg.highlight
                      ? "md:min-h-[520px] min-h-[480px]"
                      : "md:min-h-[460px] min-h-[420px]"
                  } p-6 transition-transform duration-300
                ${
                  index === 0
                    ? "md:rounded-l-2xl"
                    : index === youtubePackages.length - 1
                    ? "md:rounded-r-2xl"
                    : ""
                }
                ${index === 0 ? "rounded-t-2xl md:rounded-t-none" : ""}
                ${
                  index === youtubePackages.length - 1
                    ? "rounded-b-2xl md:rounded-b-none"
                    : ""
                }
                `}
                  style={
                    pkg.highlight
                      ? { marginTop: "-20px", marginBottom: "-20px" }
                      : undefined
                  }
                >
                  {pkg.highlight && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-[#ff4c4c] via-[#ff9a4c] to-[#ffb14c] rounded-bl-md px-3 py-1 text-[10px] font-semibold font-['Orbitron'] text-black select-none">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <p
                      className={`text-xs ${
                        pkg.highlight
                          ? 'font-["Orbitron"] font-semibold'
                          : "text-gray-300"
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
        </section>

        {/* Individuals Services Section */}
        <section>
          <h3 className="font-['Orbitron'] text-xl md:text-2xl font-semibold text-center mb-2">
            Individuals Services
          </h3>
          <p className="text-center text-gray-400 text-xs md:text-sm max-w-[600px] mx-auto mb-8">
            Tryout Every Services Individually, This Service Is Best For You To
            Build Your Trust With Us.
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto"
            role="list"
          >
            {individualServices.map((service, index) => (
              <article
                key={index}
                className="bg-white rounded-lg p-4 shadow-lg flex flex-col"
                role="listitem"
              >
                <div className="relative w-full h-[150px] mb-3">
                  <Image
                    src={service.imageUrl}
                    alt={`Placeholder image for ${service.title} service`}
                    className="rounded-md object-cover"
                    fill
                    sizes="(max-width: 600px) 100vw, 600px"
                    priority={index < 2}
                  />
                </div>
                <h4 className="font-semibold text-black mb-1 text-sm md:text-base">
                  {service.title}
                </h4>
                <p className="text-xs text-gray-700 mb-3 leading-tight">
                  {service.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-700 font-semibold mb-2">
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={farClock} />
                    {service.deliveryTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faSyncAlt} />
                    {service.revisions}
                  </span>
                </div>
                <p className="font-bold text-black text-lg text-right">
                  {service.price}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PackagesAndServices;
