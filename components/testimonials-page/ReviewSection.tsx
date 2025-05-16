"use client";

import React from "react";
import Image from "next/image";

const ReviewsGrid: React.FC = () => {
  // Array of 4 items to render 4 identical images
  // In a real application, you would use different images with different alts
  const reviews = Array(4).fill({
    src: "/images/testimonials/t1.png",
    alt: "Smiling woman in green t-shirt sitting at desk with glasses in hand, laptop, and modern room background with plants and books",
  });

  return (
    <>
      <h2 className="text-center text-2xl font-semibold mt-16 mb-8">Reviews</h2>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
        {reviews.map((review, index) => (
          <Image
            key={index}
            src={review.src}
            alt={review.alt}
            width={480}
            height={280}
            className="rounded-xl w-full object-cover"
          />
        ))}
      </section>
    </>
  );
};

export default ReviewsGrid;
