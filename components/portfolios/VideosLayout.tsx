// components/layouts/VideosLayout.tsx
"use client";
import React, { useState } from "react";
import { MediaItem } from "./sampleData";
import { Play, Clock, Tag, Calendar } from "lucide-react";

interface VideosLayoutProps {
  items: MediaItem[];
}

const VideosLayout: React.FC<VideosLayoutProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<string | undefined>("all");

  // Get unique subcategories
  const subCategories = [
    "all",
    ...new Set(items.map((item) => item.subCategory)),
  ].filter(Boolean) as string[];

  // Filter items by active subcategory
  const filteredItems =
    activeTab === "all"
      ? items
      : items.filter((item) => item.subCategory === activeTab);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      {/* <div className="border-b border-gray-800">
        <div className="flex overflow-x-auto hide-scrollbar">
          {subCategories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === category
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category === "all" ? "All Videos" : category}
            </button>
          ))}
        </div>
      </div> */}

      {/* Featured Video */}
      {filteredItems.length > 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="aspect-video relative group">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${filteredItems[0].imagePath})` }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-red-500 rounded-full p-4 cursor-pointer hover:bg-red-600 transition-colors">
                <Play size={36} className="text-white" fill="white" />
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm flex items-center">
              <Clock size={14} className="mr-1" />
              {filteredItems[0].duration}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-2">
              <span
                className={`
                px-3 py-1 rounded-full text-xs
                ${
                  filteredItems[0].subCategory === "Documentary"
                    ? "bg-red-500/20 text-red-400"
                    : filteredItems[0].subCategory === "Educational Videos"
                    ? "bg-blue-500/20 text-blue-400"
                    : filteredItems[0].subCategory === "Talking Head"
                    ? "bg-purple-500/20 text-purple-400"
                    : filteredItems[0].subCategory === "Sports"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-orange-500/20 text-orange-400"
                }
              `}
              >
                {filteredItems[0].subCategory}
              </span>
            </div>

            <h2 className="text-2xl font-bold">{filteredItems[0].title}</h2>
            <p className="text-gray-400 mt-2">{filteredItems[0].description}</p>

            <div className="flex flex-wrap items-center mt-4 text-sm text-gray-500 gap-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {filteredItems[0].date}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                {filteredItems[0].duration}
              </div>
              <div className="flex items-center">
                <Tag size={14} className="mr-1" />
                {filteredItems[0].client}
              </div>
            </div>

            <div className="mt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm flex items-center">
                <Play size={16} className="mr-1" />
                Watch Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.slice(1).map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl overflow-hidden group"
          >
            <div className="aspect-video relative">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.imagePath})` }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-red-500 rounded-full p-3 cursor-pointer hover:bg-red-600 transition-colors">
                  <Play size={24} className="text-white" fill="white" />
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-0.5 rounded-md text-xs flex items-center">
                {item.duration}
              </div>
              <div className="absolute top-3 left-3">
                <span
                  className={`
                  px-2 py-0.5 rounded-full text-xs
                  ${
                    item.subCategory === "Documentary"
                      ? "bg-red-500/80 text-white"
                      : item.subCategory === "Educational Videos"
                      ? "bg-blue-500/80 text-white"
                      : item.subCategory === "Talking Head"
                      ? "bg-purple-500/80 text-white"
                      : item.subCategory === "Sports"
                      ? "bg-green-500/80 text-white"
                      : "bg-orange-500/80 text-white"
                  }
                `}
                >
                  {item.subCategory}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold group-hover:text-red-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-gray-500">{item.date}</span>
                <span className="text-gray-500">{item.client}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosLayout;
