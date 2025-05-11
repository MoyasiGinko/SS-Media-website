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
      <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
        Get To Know Our Amazing Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-50 z-0"></div>
            <div className="relative aspect-[3/4] overflow-hidden z-0">
              <Image
                src={member.imageUrl}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-0 left-0 p-4 z-20">
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-sm text-gray-300">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
