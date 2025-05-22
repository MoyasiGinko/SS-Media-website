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
  // Debug logging
  console.log("ContentDisplay received:", {
    activeCategory,
    activeSubCategory,
    totalItems: items.length,
    categories: [...new Set(items.map((item) => item.category))],
  });

  // Filter items by active category and subcategory if applicable
  const filteredItems = items.filter((item) => {
    // First filter by category
    if (item.category !== activeCategory) return false;

    // Then filter by subcategory if one is selected
    if (activeSubCategory && item.subCategory !== activeSubCategory) {
      return false;
    }

    return true;
  });

  console.log("Filtered items:", {
    count: filteredItems.length,
    items: filteredItems.map((item) => ({
      title: item.title,
      category: item.category,
      subCategory: item.subCategory,
    })),
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
            <div className="text-center">
              <p className="text-gray-400 mb-2">
                Select a category to view content
              </p>
              <p className="text-sm text-gray-500">
                Available categories: UI/UX, Graphic Design, Shorts/Reels,
                Websites, Videos
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          {activeCategory || "Portfolio"}
        </h1>
        {activeSubCategory && (
          <p className="text-gray-400 mt-1">Filtered by: {activeSubCategory}</p>
        )}
        {activeCategory && (
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredItems.length} items
          </p>
        )}
      </div>

      {/* Layout Renderer */}
      {activeCategory ? (
        filteredItems.length > 0 ? (
          renderLayout()
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-900 rounded-xl">
            <div className="text-center">
              <p className="text-gray-400 mb-2">
                No items found in this{" "}
                {activeSubCategory ? "subcategory" : "category"}
              </p>
              <p className="text-sm text-gray-500">
                Category: {activeCategory}
                {activeSubCategory && (
                  <>
                    <br />
                    Subcategory: {activeSubCategory}
                  </>
                )}
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center h-64 bg-gray-900 rounded-xl">
          <div className="text-center">
            <p className="text-gray-400 mb-2">Welcome to our Portfolio</p>
            <p className="text-sm text-gray-500">
              Select a category from the sidebar to view our work
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
