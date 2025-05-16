"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock as farClock } from "@fortawesome/free-regular-svg-icons";

interface Service {
  title: string;
  description: string;
  imageUrl: string;
  deliveryTime: string;
  revisions: string;
  price: string;
}

const PackagesAndServices: React.FC = () => {
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

  return (
    <>
      {/* Individuals Services Section */}
      <section>
        <h3 className=" text-xl md:text-2xl font-semibold text-center mb-2">
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
    </>
  );
};

export default PackagesAndServices;
