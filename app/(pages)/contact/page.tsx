import ContactPage from "@/components/contact";
import React from "react";

export default function Page() {
  return (
    <div className="bg-[#141313] text-white min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center ">
        <ContactPage />
      </main>
    </div>
  );
}
