"use client";
import Image from "next/image";

interface TimelineItem {
  year: string;
  description: string;
}

const Journey: React.FC = () => {
  const timelineItems: TimelineItem[] = [
    {
      year: "2020",
      description: "Learning Graphic Design, SEO, YouTube Optimization.",
    },
    {
      year: "2021",
      description:
        "Start Working For Real Clients On Fiverr And Mastering The YouTube Algorithm.",
    },
    {
      year: "2022",
      description:
        "Developing Expertise In Video Editing As A Creative Passion, Alongside Delivering Professional Work As A Level Two Fiverr Freelancer.",
    },
    {
      year: "2023",
      description:
        "Along With Video Editing, I Start Learning UI/UX. I Quit Fiverr And Start Working For Companies And Individual Clients.",
    },
    {
      year: "2024",
      description:
        "Full Focused On Mastering Top-Notch Video Editing And UI Design, And Helping My Clients Grow On YouTube And Other Social Media.",
    },
    {
      year: "Present",
      description:
        'I Found A Few Extremely Talented People With High Skill, So I Started "SS Media" With Them.',
    },
  ];

  return (
    <section className="mb-20">
      <h2 className="text-5xl md:text-[60px] syne-unique text-white font-bold mb-16 text-center">
        Journey
      </h2>

      <div className="relative">
        {/* Colorful gradient blob in background */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 blur-3xl opacity-20"></div>

        {/* Person image in middle */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
          <div className="relative h-[625px] w-[528px]">
            <Image
              src="/images/team/journey1.png"
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className=" shadow-lg"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative  max-w-[1686px] items-center mx-auto z-0">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col h-[112px] md:flex-row md:items-center justify-between relative group pb-4 mb-4 ${
                index !== timelineItems.length - 1
                  ? "border-b-2 border-white/70 hover:border-white"
                  : ""
              }`}
            >
              {/* Year */}
              <div className="md:w-1/2 md:text-left md:pr-16">
                <h3 className="text-4xl md:text-[60px] syne-unique text-white/70 font-bold group-hover:text-white transition-colors duration-300">
                  {item.year}
                </h3>
              </div>

              {/* Description */}
              <div className="md:w-[547px] md:text-right ">
                <p className="text-white/70 text-[24px] tracking-tight group-hover:text-white transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
