"use client";

import React from "react";
import Image from "next/image";
import Button from "./Button";

const TestimonialSection: React.FC = () => {
  const clientImages = [
    "/images/testimonials/c1.png",
    "/images/testimonials/c1.png",
    "/images/testimonials/c1.png",
  ];

  return (
    <section className="flex flex-col w-full max-w-7xl mx-auto  lg:px-16 pt-20 md:pt-40 gap-8 md:flex-row md:items-center md:justify-between">
      <div className="space-y-4 md:max-w-lg lg:max-w-2xl">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {clientImages.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Profile picture of client ${index + 1}, circular`}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border-2 border-[#0c0c0c]"
              />
            ))}
          </div>
          <span className="text=[20px] xl:text-[28px] text-gray-400">
            20+ Satisfied Clients
          </span>
        </div>

        <h1 className="text-2xl lg:text-4xl xl:text-[60px] syne-unique font-semibold leading-tight">
          Testimonial From
          <br />
          Our Clients
        </h1>

        <p className="text-sm text-gray-400 max-w-sm">
          Hear What Our Clients Have To Say About The Quality Of Our Edits And
          How We Helped Bring Their Vision To Life.
        </p>

        <Button variant="purple" className="text-xs px-4 py-2 w-max">
          View All
        </Button>
      </div>

      <div className="flex-shrink-0 w-full max-w-[540px]">
        <img
          src="/images/testimonials/t1.png"
          alt="Smiling woman in green t-shirt sitting at desk with glasses in hand, laptop, and modern room background with plants and books"
          className="w-full h-full  rounded-xl object-cover"
        />
      </div>
    </section>
  );
};

export default TestimonialSection;
