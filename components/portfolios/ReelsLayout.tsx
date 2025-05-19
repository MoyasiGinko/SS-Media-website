// components/layouts/ShortsReelsLayout.tsx
"use client";
import React from "react";
import { MediaItem } from "./sampleData";
import { Play, Heart, Eye } from "lucide-react";

interface ShortsReelsLayoutProps {
  items: MediaItem[];
}

const ShortsReelsLayout: React.FC<ShortsReelsLayoutProps> = ({ items }) => {
  return (
    <div className="space-y-8">
      {/* Featured Reel */}
      {items.length > 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 aspect-[9/16] md:aspect-video relative group">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${items[0].imagePath})` }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 cursor-pointer hover:bg-white/30 transition-colors">
                  <Play size={36} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center space-x-3 text-white">
                  <div className="flex items-center">
                    <Eye size={16} className="mr-1" />
                    <span className="text-sm">
                      {items[0].views?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Heart size={16} className="mr-1" />
                    <span className="text-sm">
                      {items[0].likes?.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-sm">{items[0].duration}</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold">{items[0].title}</h2>
                <p className="text-gray-400 mt-2">{items[0].description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {items[0].tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Client: {items[0].client}</span>
                  <span>{items[0].date}</span>
                </div>
                <div className="mt-4">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm flex items-center">
                    <Play size={16} className="mr-1" />
                    Watch Reel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vertical Reels Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.slice(1).map((item, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden relative group"
          >
            <div className="aspect-[9/16] relative">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.imagePath})` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Play size={24} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <h3 className="text-white font-medium text-sm truncate">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2 text-white mt-1">
                  <div className="flex items-center">
                    <Eye size={12} className="mr-1" />
                    <span className="text-xs">
                      {item.views?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Heart size={12} className="mr-1" />
                    <span className="text-xs">
                      {item.likes?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortsReelsLayout;
