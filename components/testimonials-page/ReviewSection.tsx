"use client";

import React from "react";
import Image from "next/image";

const ReviewsGrid: React.FC = () => {
  // Array of 4 reviews with unique images and alt texts
  const reviews = [
    {
      src: "/images/testimonials/t1.png",
      alt: "Smiling woman in green t-shirt sitting at desk with glasses in hand, laptop, and modern room background with plants and books",
    },
    {
      src: "/images/testimonials/t1.png",
      alt: "Man in a blue shirt working on a laptop in a cozy office space with bookshelves in the background",
    },
    {
      src: "/images/testimonials/t1.png",
      alt: "Woman in a white blouse giving a presentation in a modern conference room with a projector screen",
    },
    {
      src: "/images/testimonials/t1.png",
      alt: "Young man in a casual outfit sitting on a couch with a tablet in hand and a bright living room background",
    },
  ];

  return (
    <div className="mb-20 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-20 md:pt-30">
      <h2 className="text-center syne-unique text-[60px] font-semibold mt-16 mb-8">
        Reviews
      </h2>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mx-auto">
        {reviews.map((review, index) => (
          <img
            key={index}
            src={review.src}
            alt={review.alt}
            className="w-[500px] h-full rounded-xl  object-cover"
          />
        ))}
      </section>
    </div>
  );
};

export default ReviewsGrid;
