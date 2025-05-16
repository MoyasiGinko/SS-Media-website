"use client";

import React from "react";
import Image from "next/image";
import Button from "./Button";

const TestimonialSection: React.FC = () => {
  return (
    <section className="flex pt-40 flex-col md:flex-row md:items-center md:justify-between gap-8">
      <div className="max-w-md space-y-3">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            <Image
              src="/images/client1.jpg"
              alt="Profile picture of client 1, circular"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border-2 border-[#0c0c0c]"
            />
            <Image
              src="/images/client2.jpg"
              alt="Profile picture of client 2, circular"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border-2 border-[#0c0c0c]"
            />
            <Image
              src="/images/client3.jpg"
              alt="Profile picture of client 3, circular"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border-2 border-[#0c0c0c]"
            />
          </div>
          <span className="text-xs text-gray-400">20+ Satisfied Clients</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Testimonial From
          <br />
          Our Clients
        </h1>

        <p className="text-sm text-gray-400 max-w-sm">
          Hear What Our Clients Have To Say About The Quality Of Our Edits And
          How We Helped Bring Their Vision To Life.
        </p>

        <Button variant="purple" className="text-xs px-4 py-1 w-max">
          View All
        </Button>
      </div>

      <div className="flex-shrink-0">
        <Image
          src="/images/testimonials/t1.png"
          alt="Smiling woman in green t-shirt sitting at desk with glasses in hand, laptop, and modern room background with plants and books"
          width={480}
          height={280}
          className="rounded-xl w-full max-w-[480px] object-cover"
        />
      </div>
    </section>
  );
};

export default TestimonialSection;
