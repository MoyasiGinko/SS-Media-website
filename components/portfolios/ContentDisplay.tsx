// components/ContentDisplay.tsx
"use client";
import React from "react";
import { MediaItem } from "./sampleData";
import UIUXLayout from "./UIUXLayout";
import GraphicDesignLayout from "./GraphicsLayout";
import ShortsReelsLayout from "./ReelsLayout";
import WebsitesLayout from "./WebDevLayout";
import VideosLayout from "./VideosLayout";

interface ContentDisplayProps {
  activeCategory: string;
  activeSubCategory?: string;
  items: MediaItem[];
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  activeCategory,
  activeSubCategory,
  items,
}) => {
  // Filter items by active category and subcategory if applicable
  const filteredItems = items.filter((item) => {
    if (item.category !== activeCategory) return false;
    if (activeSubCategory && item.subCategory !== activeSubCategory)
      return false;
    return true;
  });

  // Display appropriate layout based on active category
  const renderLayout = () => {
    switch (activeCategory) {
      case "UI/UX":
        return <UIUXLayout items={filteredItems} />;
      case "Graphic Design":
        return <GraphicDesignLayout items={filteredItems} />;
      case "Shorts/Reels":
        return <ShortsReelsLayout items={filteredItems} />;
      case "Websites":
        return <WebsitesLayout items={filteredItems} />;
      case "Videos":
        return <VideosLayout items={filteredItems} />;
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-900 rounded-xl">
            <p className="text-gray-400">Select a category to view content</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">{activeCategory}</h1>
        {activeSubCategory && (
          <p className="text-gray-400 mt-1">Filtered by: {activeSubCategory}</p>
        )}
      </div>

      {/* Layout Renderer */}
      {filteredItems.length > 0 ? (
        renderLayout()
      ) : (
        <div className="flex items-center justify-center h-64 bg-gray-900 rounded-xl">
          <p className="text-gray-400">No items found in this category</p>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
