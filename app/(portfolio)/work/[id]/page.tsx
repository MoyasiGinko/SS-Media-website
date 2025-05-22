// app/work/[...slug]/page.tsx
"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import ContentDisplay from "@/components/portfolios/ContentDisplay";
import sampleData from "@/components/portfolios/sampleData";

// Define the navigation structure to parse URLs
const NAV_STRUCTURE = [
  {
    name: "UI/UX",
    slug: "ui-ux",
    subItems: [],
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    subItems: [
      { name: "Poster", slug: "poster" },
      { name: "Thumbnail", slug: "thumbnail" },
      { name: "Carousel", slug: "carousel" },
    ],
  },
  {
    name: "Shorts/Reels",
    slug: "shorts-reels",
    subItems: [],
  },
  {
    name: "Websites",
    slug: "websites",
    subItems: [],
  },
  {
    name: "Videos",
    slug: "videos",
    subItems: [
      { name: "Educational Videos", slug: "educational-videos" },
      { name: "Talking Head", slug: "talking-head" },
      { name: "Documentary", slug: "documentary" },
      { name: "Sports", slug: "sports" },
      { name: "Promo/Ad", slug: "promo-ad" },
    ],
  },
];

export default function WorkPage() {
  const pathname = usePathname();

  // Parse the current route to determine active category and subcategory
  const { activeCategory, activeSubCategory } = useMemo(() => {
    const pathSegments = pathname.replace(/^\//, "").split("/").filter(Boolean);

    // Skip the 'work' prefix
    const targetSlug = pathSegments[1];

    if (!targetSlug) {
      return { activeCategory: "", activeSubCategory: "" };
    }

    // First, try to find a matching main category
    const categoryItem = NAV_STRUCTURE.find((item) => item.slug === targetSlug);

    if (categoryItem) {
      // Found a main category
      return {
        activeCategory: categoryItem.name,
        activeSubCategory: "",
      };
    }

    // If not found in main categories, search in subcategories
    for (const navItem of NAV_STRUCTURE) {
      const subCategoryItem = navItem.subItems.find(
        (subItem) => subItem.slug === targetSlug
      );
      if (subCategoryItem) {
        // Found a subcategory
        return {
          activeCategory: navItem.name,
          activeSubCategory: subCategoryItem.name,
        };
      }
    }

    // No matching category or subcategory found
    return { activeCategory: "", activeSubCategory: "" };
  }, [pathname]);

  return (
    <ContentDisplay
      activeCategory={activeCategory}
      activeSubCategory={activeSubCategory}
      items={sampleData}
    />
  );
}
