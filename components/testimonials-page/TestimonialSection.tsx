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
    <section className="flex flex-col w-full max-w-7xl mx-auto px-4 lg:px-16 pt-30 md:pt-40 gap-8 md:flex-row md:items-center justify-center lg:justify-between">
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
          <span className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-400">
            20+ Satisfied Clients
          </span>
        </div>

        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-[60px] syne-unique font-semibold leading-tight">
          Testimonial From
          <br />
          Our Clients
        </h1>

        <p className="text-xs md:text-sm lg:text-base text-gray-400 max-w-sm">
          Hear What Our Clients Have To Say About The Quality Of Our Edits And
          How We Helped Bring Their Vision To Life.
        </p>

        <Button variant="purple" className="text-xs md:text-sm px-4 py-2 w-max">
          View All
        </Button>
      </div>

      <div className="flex-shrink-0 w-full md:max-w-[440px] lg:max-w-[540px]">
        <Image
          src="/images/testimonials/t1.png"
          alt="Smiling woman in green t-shirt sitting at desk with glasses in hand, laptop, and modern room background with plants and books"
          width={540}
          height={360}
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>
    </section>
  );
};

export default TestimonialSection;
