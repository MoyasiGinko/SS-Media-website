import React from "react";
import { ContactIntro } from "@/components/contact/intro/ContactIntro";
import { ZoomCallForm } from "@/components/contact/form/ContactForm";
import QuickChatSection from "@/components/contact/cta/QuickChatSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white relative ">
      {/* Top Section: Split Layout */}
      <div className="flex -z-0 flex-col md:flex-row min-h-[70vh]">
        {/* Left: Intro */}
        <div className="flex-1 flex flex-col bg-black items-center justify-center">
          <ContactIntro />
        </div>
        {/* Right: Form */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-[#BB6FFB]/50 to-[#FC5F67]/50">
          <ZoomCallForm />
        </div>
      </div>
      {/* Bottom: Quick Chat */}
      <div className="">
        <QuickChatSection />
      </div>
    </div>
  );
}
