// components/layouts/GraphicDesignLayout.tsx
"use client";
import React from "react";
import { MediaItem } from "./sampleData";

interface GraphicDesignLayoutProps {
  items: MediaItem[];
}

const GraphicDesignLayout: React.FC<GraphicDesignLayoutProps> = ({ items }) => {
  return (
    <div className="space-y-8">
      {/* Featured Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl overflow-hidden group hover:ring-2 hover:ring-rose-500 cursor-pointer transition-all ${
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <div className="relative aspect-square w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-orange-500/10 mix-blend-overlay z-10" />
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${item.imagePath})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end z-20">
                <div className="p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-xs text-gray-200 mt-1">{item.client}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={`detail-${index}`} className="bg-gray-900 rounded-xl p-5">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{item.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags?.slice(0, 4).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gradient-to-r from-rose-500 to-orange-500 px-3 py-1 rounded-full text-xs text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center text-sm">
              <span className="text-gray-500">{item.date}</span>
              {item.pdfPath ? (
                <button className="text-rose-500 hover:text-rose-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  Brand Guide
                </button>
              ) : (
                <button className="text-rose-500 hover:text-rose-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View Project
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphicDesignLayout;
