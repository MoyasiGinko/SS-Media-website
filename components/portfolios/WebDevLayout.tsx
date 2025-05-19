// components/layouts/WebsitesLayout.tsx
"use client";
import React from "react";
import { MediaItem } from "./sampleData";
import { Globe, ArrowUpRight } from "lucide-react";

interface WebsitesLayoutProps {
  items: MediaItem[];
}

const WebsitesLayout: React.FC<WebsitesLayoutProps> = ({ items }) => {
  return (
    <div className="space-y-8">
      {/* Browser Preview */}
      {items.length > 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          {/* Browser Header */}
          <div className="bg-gray-950 px-4 py-3 flex items-center border-b border-gray-800">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 bg-gray-800 rounded-md px-3 py-1 text-gray-400 text-sm flex items-center">
              <Globe size={14} className="mr-2 text-gray-400" />
              <span>{items[0].url}</span>
            </div>
          </div>

          {/* Browser Content */}
          <div className="aspect-video relative">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${items[0].imagePath})` }}
            />
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{items[0].title}</h2>
                <p className="text-gray-400 mt-2">{items[0].description}</p>
              </div>
              <a
                href={items[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
              >
                Visit Site
                <ArrowUpRight size={16} className="ml-1" />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {items[0].tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>Client: {items[0].client}</span>
              <span className="mx-2">•</span>
              <span>{items[0].date}</span>
            </div>
          </div>
        </div>
      )}

      {/* Website Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.slice(1).map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl overflow-hidden group border border-gray-800 hover:border-green-500 transition-colors"
          >
            {/* Mini Browser Header */}
            <div className="bg-gray-950 px-3 py-2 flex items-center border-b border-gray-800">
              <div className="flex space-x-1.5 mr-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-gray-800 rounded-sm px-2 py-0.5 text-gray-400 text-xs truncate">
                {item.url}
              </div>
            </div>

            {/* Preview Image */}
            <div className="aspect-video relative">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${item.imagePath})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
                >
                  View Live Site
                  <ArrowUpRight size={14} className="ml-1" />
                </a>
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">{item.client}</span>
                <div className="flex items-center text-green-500 text-xs">
                  <Globe size={12} className="mr-1" />
                  <span>Website</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsitesLayout;
