"use client";
import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sofik",
    role: "Video Editor",
    imageUrl: "/images/team/team1.png",
  },
  {
    name: "Jahid",
    role: "Graphic Designer",
    imageUrl: "/images/team/team2.png",
  },
  {
    name: "Sami",
    role: "Video Editor",
    imageUrl: "/images/team/team3.png",
  },
  {
    name: "Sayem",
    role: "SEO Expert",
    imageUrl: "/images/team/team4.png",
  },
  {
    name: "Sam",
    role: "UI Designer",
    imageUrl: "/images/team/team5.png",
  },
];

const OurTeam: React.FC = () => {
  return (
    <section className="mb-20">
      <h2 className="text-5xl md:text-[60px] syne-unique font-bold mb-[120px] text-center">
        Get To Know Our Amazing Team
      </h2>
      <div className="flex flex-wrap justify-center gap-6"></div>
      <div className="relative flex flex-wrap justify-center gap-[60px]">
        <img
          src="/images/rainbow.svg"
          alt="Team Background"
          className="absolute object-cover z-0"
        />
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative overflow-hidden h-[506px] w-[278px]  rounded-[24px] group cursor-pointer z-10 shadow-lg transition-transform duration-300 hover:scale-100"
          >
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "linear-gradient(-151deg, #FFAD54, #FC5F67, #BD6EF6)",
              }}
            ></div>
            <div className="absolute inset-0 bottom-0 overflow-hidden z-0">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="transition-transform object-fit cover w-full h-full duration-300 group-hover:scale-100"
              />
            </div>
            <div className="absolute bg-gradient-to-t rounded-b-[24px] h-[120px] from-black/80 to-transparent backdrop-blur-[5px] w-full bottom-0 left-0 p-4 z-2 flex flex-col justify-center items-left">
              <h3 className="text-[45px] mt-4 leading-[35px] syne-unique text-white font-bold mb-1">
                {member.name}
              </h3>
              <p className="text-[28px] leading-[35px] text-white/70">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
