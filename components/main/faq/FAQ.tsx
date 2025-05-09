"use client";
import React, { useState } from "react";

interface FAQ {
  q: string;
  a: string;
}

interface OpenItemsState {
  [key: number]: boolean;
}

const faqs: FAQ[] = [
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
  // Set initial state with no items expanded by default
  // To expand specific items initially, add their indices with true values
  // Example: {0: true} would expand the first item by default
  const [openItems, setOpenItems] = useState<OpenItemsState>({});

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Optional function to expand a specific item programmatically
  const expandItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Split FAQs into two columns for desktop
  const leftColumnFaqs = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightColumnFaqs = faqs.slice(Math.ceil(faqs.length / 2));

  const renderFaqItem = (faq: FAQ, i: number) => (
    <div
      key={i}
      className="flex flex-col bg-[#181818] rounded-xl border border-gray-700 shadow-md w-full max-w-[590px] mb-6"
    >
      <button
        className="w-full flex justify-between items-center px-6 py-4 text-left text-white font-semibold focus:outline-none"
        onClick={() => toggleItem(i)}
      >
        <span className="text-[24px] text-white">{faq.q}</span>
        <span
          className={`ml-4 transition-transform ${
            openItems[i] ? "rotate-180" : ""
          }`}
        >
          <img
            src={openItems[i] ? "/cross.svg" : "/down.svg"}
            alt="FAQ Icon"
            className="w-4 h-4"
          />
        </span>
      </button>
      {openItems[i] && (
        <div className="px-6 pb-4 text-[18px] text-white/60">{faq.a}</div>
      )}
    </div>
  );

  return (
    <section id="faqs" className="w-full py-16 px-4 flex flex-col items-center">
      <h2 className="text-3xl text-white md:text-6xl font-bold mb-8 text-center">
        FAQ's
      </h2>

      {/* Mobile: Single column layout */}
      <div className="w-full max-w-4xl block md:hidden">
        {faqs.map((faq, i) => renderFaqItem(faq, i))}
      </div>

      {/* Desktop: Two column layout */}
      <div className="w-full max-w-[1200px] hidden md:flex justify-between">
        <div className="w-[590px]">
          {leftColumnFaqs.map((faq, i) => renderFaqItem(faq, i))}
        </div>
        <div className="w-[590px]">
          {rightColumnFaqs.map((faq, i) =>
            renderFaqItem(faq, i + leftColumnFaqs.length)
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
