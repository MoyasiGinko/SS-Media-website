"use client";
import React, { useState } from "react";

const faqs = [
  {
    q: "Why Should I Trust You?",
    a: "We Will Not Accept Any Payment From You Before We Have Earned Your Trust. We Will First Prove Our Work And Then Proceed With Taking Payment From You.",
  },
  {
    q: "Do I Need To Share Any Email Or Passwords?",
    a: "No, You Do Not Need To Share Any Sensitive Information. We Ensure Your Privacy And Security.",
  },
  {
    q: "What Is Your Prices?",
    a: "Our Prices Are Competitive And Depend On The Scope Of The Project. Contact Us For A Custom Quote.",
  },
  {
    q: "What Is The Payment Process?",
    a: "We Accept Payments After Delivering The Work And Your Satisfaction. Payment Methods Will Be Discussed During Onboarding.",
  },
  {
    q: "Can I Make Changes On Project?",
    a: "Yes, We Offer Revisions To Ensure The Final Output Matches Your Expectations.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="w-full py-16 px-4 flex flex-col items-center">
      <h2 className="text-3xl text-white md:text-6xl font-bold mb-8 text-center">
        FAQ's
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {faqs.map((faq, i) => (
          <div
            key={faq.q}
            className="bg-[#181818] rounded-xl border border-gray-700 shadow-md"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-white font-semibold focus:outline-none"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-[24px] text-white">{faq.q}</span>
              <span
                className={`ml-4 transition-transform ${
                  open === i ? "rotate-180" : ""
                }`}
              >
                <img
                  src={open === i ? "/cross.svg" : "/down.svg"}
                  alt="FAQ Icon"
                  className="w-4 h-4"
                />
              </span>
            </button>
            {open === i && (
              <div className="px-6 pb-4 text-[18px] text-white/60">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
