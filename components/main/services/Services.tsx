import React from "react";

const services = [
  {
    title: "Video Editing",
    desc: "Videos Are Valuable Assets. Therefore, We Make Sure Exceptional Video Editing Services To Help You Stay Updated On Evolving Trends.",
    highlight: true,
  },
  {
    title: "Graphics Design",
    desc: "We Will Provide You With High Quality Thumbnails, Banners, And Posters That Meet Your Specific Requirements.",
  },
  {
    title: "UI/UX",
    desc: "Next-Gen UI Designs—Blending Today's Trends With End-User Functionality To Create Stunning, User-Friendly Apps And Websites.",
  },
  {
    title: "SEO",
    desc: "We Do Full SEO For YouTube Videos. (Title, Description, Tags) Along With Off Page SEO For Thumbnails.",
  },
  {
    title: "Management",
    desc: "We Can Advise You On Creating Better Video Content For Your Niche And Manage Your Social Media To Ensure Your Content Reaches All Platforms.",
  },
  {
    title: "Individual Services",
    desc: "If You Want To Try Every Single Services Individually, This Will Be A Better Option For You.",
  },
];

const Services = () => (
  <section
    id="services"
    className="w-full py-16 px-4 flex flex-col items-center"
  >
    <h2 className="text-2xl md:text-3xl font-bold mb-8">Services</h2>
    <p className="text-gray-400 mb-8 text-center max-w-2xl">
      We Provide Benefits That Are Convenient For You.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      {services.map((service, i) => (
        <div
          key={service.title}
          className={`rounded-xl p-6 bg-[#181818] border transition shadow-md h-full ${
            service.highlight
              ? "border-2 border-orange-400 bg-gradient-to-br from-[#232323] to-[#181818]"
              : "border border-gray-700"
          }`}
        >
          <h3 className="font-semibold text-lg mb-2 text-white">
            {service.title}
          </h3>
          <p className="text-gray-400 text-sm">{service.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Services;
