"use client";
import Image from "next/image";

const AboutHero: React.FC = () => {
  return (
    <section
      className="relative max-h-[1024px] flex items-center justify-center text-white"
      style={{ height: "100vh" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/team/hero.png"
          alt="Founder"
          layout="fill"
          className="fixed object-fit cover"
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center lg:text-left">
        {/* Centered Name and Title */}
        <div className="absolute top-[144px] left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-7xl md:text-[250px] leading-[125px] syne-unique max-w-[1433px] font-bold mb-4">
            SHAMRAT
          </h1>
        </div>

        {/* Side Texts */}
        <div className="flex justify-between items-center mt-20">
          <div className="max-w-sm">
            <h2 className="text-2xl max-w-[470px] md:text-[35px] font-bold syne-unique mb-2">
              Founder
            </h2>
            <p className="text-[24px] leading-tight tracking-tight text-white/70">
              SS Media
            </p>
          </div>
          <div className="max-w-[470px] text-left">
            <h2 className="text-2xl max-w-[470px] md:text-[35px] font-bold syne-unique mb-2">
              FROM IDEA TO IMPACT
            </h2>
            <p className="text-[24px] leading-tight tracking-tight text-white/70">
              From Stunning Thumbnails To Sleek Interfaces, We Craft Digital
              Content That Connects, Converts, And Leaves A Lasting Mark.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
