// components/layouts/UIUXLayout.tsx
"use client";
import React from "react";
import { MediaItem } from "./sampleData";
interface UIUXLayoutProps {
  items: MediaItem[];
}

const UIUXLayout: React.FC<UIUXLayoutProps> = ({ items }) => {
  return (
    <div className="space-y-8">
      {/* Featured Project */}
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-square md:aspect-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 mix-blend-overlay" />
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${items[0].imagePath})` }}
              />
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                    Featured Project
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{items[0].title}</h2>
                <p className="text-gray-400">{items[0].description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {items[0].tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 px-2 py-1 rounded-md text-xs text-gray-300"
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
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                    View Case Study
                  </button>
                  {items[0].pdfPath && (
                    <button className="ml-3 border border-blue-600 text-blue-600 hover:bg-blue-600/10 px-4 py-2 rounded-md text-sm">
                      Download PDF
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.slice(1).map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl overflow-hidden group hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <div className="aspect-video relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 mix-blend-overlay" />
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${item.imagePath})` }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {item.tags?.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-800 px-2 py-0.5 rounded-md text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {(item.tags?.length || 0) > 3 && (
                  <span className="bg-gray-800 px-2 py-0.5 rounded-md text-xs text-gray-300">
                    +{(item.tags?.length || 0) - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UIUXLayout;
