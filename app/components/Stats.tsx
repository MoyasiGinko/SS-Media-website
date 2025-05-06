import React from "react";

const Stats = () => (
  <section className="w-full flex flex-col items-center py-10 px-4">
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center mb-4">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-orange-400">15+</span>
        <span className="text-sm text-gray-300 mt-1">Satisfied Clients</span>
      </div>
      <div className="hidden md:block w-px h-10 bg-gradient-to-b from-orange-400 to-transparent" />
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-orange-400">6+</span>
        <span className="text-sm text-gray-300 mt-1">Year Of Experience</span>
      </div>
      <div className="hidden md:block w-px h-10 bg-gradient-to-b from-orange-400 to-transparent" />
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-orange-400">10+</span>
        <span className="text-sm text-gray-300 mt-1">Team Mates</span>
      </div>
    </div>
    <p className="text-center text-gray-400 max-w-2xl text-base">
      Don't Need To Search Multiple Agency Or Freelancer For Your Projects. We
      Have Complete Solution For You.
    </p>
  </section>
);

export default Stats;
