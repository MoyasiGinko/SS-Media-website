// components/ContentDisplay.tsx
"use client";
import React, { useMemo } from "react";
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

const ContentDisplay: React.FC<ContentDisplayProps> = React.memo(
  ({ activeCategory, activeSubCategory, items }) => {
    // Debug logging - only in development
    if (process.env.NODE_ENV === "development") {
      console.log("ContentDisplay received:", {
        activeCategory,
        activeSubCategory,
        totalItems: items.length,
        categories: [...new Set(items.map((item) => item.category))],
      });
    }

    // Memoize filtered items to prevent recalculation on every render
    const filteredItems = useMemo(() => {
      const result = items.filter((item) => {
        // First filter by category
        if (item.category !== activeCategory) return false;

        // Then filter by subcategory if one is selected
        if (activeSubCategory && item.subCategory !== activeSubCategory) {
          return false;
        }

        return true;
      });

      if (process.env.NODE_ENV === "development") {
        console.log("Filtered items:", {
          count: result.length,
          items: result.map((item) => ({
            title: item.title,
            category: item.category,
            subCategory: item.subCategory,
          })),
        });
      }

      return result;
    }, [items, activeCategory, activeSubCategory]);

    // Memoize the layout component to prevent re-renders
    const layoutComponent = useMemo(() => {
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
    }, [activeCategory, filteredItems]);

    return (
      <div className="w-full">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            {activeCategory || "Portfolio"}
          </h1>
          {activeSubCategory && (
            <p className="text-gray-400 mt-1">
              Filtered by: {activeSubCategory}
            </p>
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
            layoutComponent
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
  }
);

ContentDisplay.displayName = "ContentDisplay";

export default ContentDisplay;
