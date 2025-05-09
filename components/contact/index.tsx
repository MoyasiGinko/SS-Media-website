import React from "react";
import { ContactIntro } from "@/components/contact/intro/ContactIntro";
import { ZoomCallForm } from "@/components/contact/form/ContactForm";
import QuickChatSection from "@/components/contact/cta/QuickChatSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Top Section: Split Layout */}
      <div className="flex flex-col md:flex-row min-h-[70vh]">
        {/* Left: Intro */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <ContactIntro />
        </div>
        {/* Right: Form */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-200 via-purple-100 to-pink-200">
          <ZoomCallForm />
        </div>
      </div>
      {/* Bottom: Quick Chat */}
      <QuickChatSection />
    </div>
  );
}
