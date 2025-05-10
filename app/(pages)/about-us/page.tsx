import AboutHero from "@/components/about-us/hero/AboutHero";
import Journey from "@/components/about-us/journey/Journey";
import OurTeam from "@/components/about-us/team/OurTeam";
import React from "react";

export default function Page() {
  return (
    <div className="bg-[#141313]">
      <AboutHero />
      <Journey />
      <OurTeam />
    </div>
  );
}
