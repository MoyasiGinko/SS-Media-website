"use client";
import Image from "next/image";

const AboutHero: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center mb-20">
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        <h1 className="text-7xl md:text-9xl font-bold mb-8">SHAMRAT</h1>
        <div className="mb-4">
          <h2 className="text-2xl font-medium mb-1">Founder</h2>
          <p className="text-gray-400">SS Media</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 relative">
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent z-10"></div>
          <Image
            src="/founder.jpg"
            alt="Founder"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
        </div>
        <div className="absolute top-6 right-6 bg-black/80 p-6 max-w-xs z-20">
          <h3 className="text-xl font-bold mb-2">FROM IDEA TO IMPACT</h3>
          <p className="text-sm text-gray-300">
            From Stunning Thumbnails To Sleek Interfaces, We Craft Digital
            Content That Connects, Converts, And Leaves A Lasting Mark.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
