// components/layout/DashboardLayout.tsx
"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

// Define types for our navigation items
type SubItem = {
  name: string;
  slug: string;
  icon?: string;
  active?: boolean;
};

type NavItem = {
  name: string;
  slug: string;
  icon: string;
  expanded?: boolean;
  active?: boolean;
  subItems?: SubItem[];
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  // State to manage navigation items with slugs
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      name: "UI/UX",
      slug: "ui-ux",
      icon: "/images/icons/uiux.svg",
      active: false,
    },
    {
      name: "Graphic Design",
      slug: "graphic-design",
      icon: "/images/icons/graphics.svg",
      expanded: false,
      active: false,
      subItems: [
        {
          name: "Poster",
          slug: "poster",
          active: false,
        },
        {
          name: "Thumbnail",
          slug: "thumbnail",
          active: false,
        },
        {
          name: "Carousel",
          slug: "carousel",
          active: false,
        },
      ],
    },
    {
      name: "Shorts/Reels",
      slug: "shorts-reels",
      icon: "/images/icons/shorts.svg",
      active: false,
    },
    {
      name: "Websites",
      slug: "websites",
      icon: "/images/icons/website.svg",
      active: false,
    },
    {
      name: "Videos",
      slug: "videos",
      icon: "/images/icons/videos.svg",
      expanded: false,
      active: false,
      subItems: [
        {
          name: "Educational Videos",
          slug: "educational-videos",
          active: false,
        },
        {
          name: "Talking Head",
          slug: "talking-head",
          active: false,
        },
        {
          name: "Documentary",
          slug: "documentary",
          active: false,
        },
        {
          name: "Sports",
          slug: "sports",
          active: false,
        },
        {
          name: "Promo/Ad",
          slug: "promo-ad",
          active: false,
        },
      ],
    },
  ]);

  // Function to update nav item states based on pathname
  const updateNavItemStates = useCallback(() => {
    const pathSegments = pathname.replace(/^\//, "").split("/").filter(Boolean);

    // Handle /work prefix - skip it if present
    let targetSlug;

    if (pathSegments[0] === "work") {
      targetSlug = pathSegments[1];
    } else {
      targetSlug = pathSegments[0];
    }

    setNavItems((prevItems) => {
      return prevItems.map((item) => {
        // Check if this is the active main category
        const isCategoryActive = item.slug === targetSlug;

        // Check if any subcategory is active
        let hasActiveSubCategory = false;
        let shouldExpand = false;

        const updatedSubItems = item.subItems?.map((subItem) => {
          const isSubActive = subItem.slug === targetSlug;
          if (isSubActive) {
            hasActiveSubCategory = true;
            shouldExpand = true;
          }
          return {
            ...subItem,
            active: isSubActive,
          };
        });

        // Category is active if it's directly selected OR if one of its subcategories is active
        const isActive = isCategoryActive || hasActiveSubCategory;

        // Expand if category is active and has subitems, or if a subcategory is active
        if (isActive && item.subItems && item.subItems.length > 0) {
          shouldExpand = true;
        }

        return {
          ...item,
          active: isActive,
          expanded: shouldExpand,
          subItems: updatedSubItems,
        };
      });
    });
  }, [pathname]);

  // Effect to handle pathname changes
  useEffect(() => {
    updateNavItemStates();
  }, [pathname, updateNavItemStates]);

  // Memoized navigation handlers to prevent re-renders
  const handleNavigationMemo = useCallback(
    (categorySlug: string, subCategorySlug?: string) => {
      let newPath;
      if (subCategorySlug) {
        // For subcategories, navigate directly to /work/subcategory-slug
        newPath = `/work/${subCategorySlug}`;
      } else {
        // For main categories, navigate to /work/category-slug
        newPath = `/work/${categorySlug}`;
      }

      // Only navigate if the path is different from current path
      if (pathname !== newPath) {
        router.push(newPath);
      }
    },
    [router, pathname]
  );

  // Memoized toggle function
  const toggleExpandMemo = useCallback(
    (index: number) => {
      const item = navItems[index];

      if (!item.subItems) return;

      const hasActiveSubItem = item.subItems.some((subItem) => subItem.active);

      // If a subcategory is active, don't just toggle - navigate to parent first
      if (hasActiveSubItem) {
        handleNavigationMemo(item.slug);
        return;
      }

      // If item is not active, navigate to it first
      if (!item.active) {
        handleNavigationMemo(item.slug);
      } else {
        // If already active and no subcategory is active, toggle expansion state
        setNavItems((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[index] = {
            ...updatedItems[index],
            expanded: !updatedItems[index].expanded,
          };
          return updatedItems;
        });
      }
    },
    [navItems, handleNavigationMemo]
  );

  // Memoized parent click handler
  const handleParentItemClickMemo = useCallback(
    (index: number) => {
      const item = navItems[index];

      if (item.subItems && item.subItems.length > 0) {
        // For items with subitems
        const hasActiveSubItem = item.subItems.some(
          (subItem) => subItem.active
        );

        if (item.active && !hasActiveSubItem) {
          // If parent is active but no subcategory is active, toggle expansion
          toggleExpandMemo(index);
        } else if (hasActiveSubItem) {
          // If a subcategory is currently active, navigate to parent category
          handleNavigationMemo(item.slug);
        } else {
          // If parent is not active, navigate to the category
          handleNavigationMemo(item.slug);
        }
      } else {
        // For regular items without subitems
        handleNavigationMemo(item.slug);
      }
    },
    [navItems, toggleExpandMemo, handleNavigationMemo]
  );

  // Memoized subitem click handler
  const handleSubItemClickMemo = useCallback(
    (categoryIndex: number, subIndex: number) => {
      const categoryItem = navItems[categoryIndex];
      const subItem = categoryItem.subItems?.[subIndex];

      if (subItem) {
        handleNavigationMemo(categoryItem.slug, subItem.slug);
      }
    },
    [navItems, handleNavigationMemo]
  );

  return (
    <div className="flex min-h-screen bg-transparent text-white">
      {/* Sidebar - Fixed Layout */}
      <div className="w-[347px] bg-[#1B1B1B] border-r border-[#383838] fixed h-screen flex flex-col overflow-y-auto">
        {/* Logo */}
        <a href="/">
          <div className="px-[13.5px] w-full max-w-[302px] h-full max-h-[90px] cursor-pointer bg-[#141313] py-[13.5px] border hover:border-white/25 border-[#383838] rounded-[20.16px] mt-[24px] mx-[22.3px] mb-[19.3px] flex items-center">
            <div className="w-[63px] h-[63px] rounded-[9px] bg-white">
              <img
                src="/images/logo/ss.svg"
                alt="SS"
                className="w-full h-full object-fit cover"
              />
            </div>
            <div className="ml-[15.3px] text-left">
              <div className="font-bold text-[34.2px] text-[#F8F8F8] leading-[1.1]">
                SS Media
              </div>
              <div className="text-[12.6px] text-white/50 leading-tight">
                Your Growth, Your Goal.
              </div>
            </div>
          </div>
        </a>

        {/* Navigation */}
        <nav className="flex-1 mx-[22.3px]">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="mb-1">
                {/* Main nav item */}
                <div
                  className={`flex items-center justify-between px-[20.16px] py-[15.12px] rounded-[15.12px] cursor-pointer ${
                    item.active ||
                    (item.subItems && item.subItems.some((sub) => sub.active))
                      ? "bg-gradient-to-r from-[#DA67B4] via-[#FC5F67] to-[#FE955A] text-black"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => handleParentItemClickMemo(index)}
                >
                  <div className="flex items-center">
                    <img
                      src={item.icon}
                      className={`mr-[12.6px] w-[22px] h-[22px] ${
                        item.active ||
                        (item.subItems &&
                          item.subItems.some((sub) => sub.active))
                          ? "filter brightness-0" // Make SVG black when active
                          : ""
                      }`}
                    />
                    <span className="text-[17.64px]">{item.name}</span>
                  </div>
                  {item.subItems &&
                    (item.expanded ? (
                      <img
                        src="/images/icons/chevron-up.svg"
                        className="mr-[12.6px] w-[22px] h-[22px]"
                      />
                    ) : (
                      <img
                        src="/images/icons/chevron-down.svg"
                        className="mr-[12.6px] w-[22px] h-[22px]"
                      />
                    ))}
                </div>

                {/* Sub-items with circular bullets */}
                {item.subItems && item.expanded && (
                  <ul className="mx-[20.16px] my-[8px]">
                    {item.subItems.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={`flex items-center px-4 py-0 rounded-[15.12px] cursor-pointer ${
                          subItem.active
                            ? "bg-[#3C3C3C]"
                            : "hover:bg-gradient-to-r hover:from-[#DA67B4] hover:via-[#FC5F67] hover:to-[#FE955A] hover:bg-clip-text hover:text-transparent"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent parent click event
                          handleSubItemClickMemo(index, subIndex);
                        }}
                      >
                        {/* Circle bullet indicator */}
                        <div className="flex flex-col items-center mr-3">
                          {/* Vertical line above */}
                          <div
                            className="w-px flex-1"
                            style={{
                              minHeight: 18,
                              backgroundColor:
                                subIndex === 0
                                  ? "transparent"
                                  : "rgba(255,255,255,1)",
                              opacity: subIndex === 0 ? 0 : 1,
                            }}
                          />
                          {/* Circle bullet */}
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              subItem.active
                                ? "bg-red-500"
                                : "border border-white"
                            }`}
                          >
                            {subItem.active && (
                              <div className="w-4 h-4 rounded-full border-2 border-[#FC5F67] bg-white"></div>
                            )}
                          </div>
                          {/* Vertical line below */}
                          <div
                            className="w-px flex-1"
                            style={{
                              minHeight: 18,
                              backgroundColor:
                                item.subItems &&
                                subIndex === item.subItems.length - 1
                                  ? "transparent"
                                  : "rgba(255,255,255,1)",
                              opacity:
                                item.subItems &&
                                subIndex === item.subItems.length - 1
                                  ? 0
                                  : 1,
                            }}
                          />
                        </div>
                        <span
                          className={`text-[17.64px] ${
                            subItem.active ? "text-white" : ""
                          }`}
                        >
                          {subItem.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Book A Call Button */}
        <a href="/contact">
          <button className="w-full max-w-[302px] h-full max-h-[67.5px] bg-[#141313] cursor-pointer hover:text-white mx-[22.3px] mb-[24px] rounded-[20.16px] border hover:border-white/25 border-[#383838] text-white/70 py-[9px] px-[10.8px] flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white w-[49.5px] h-[49.5px] rounded-full p-2 mr-[21.6px]">
                <img
                  src="/images/icons/book-call.svg"
                  alt="Phone"
                  className="w-full h-full"
                />
              </div>
              <span className="text-[18.9px]">Book A Call</span>
            </div>
            <ChevronRight strokeWidth={3} size={20} className="opacity-60" />
          </button>
        </a>
      </div>

      {/* Main Content Area - Dynamic children */}
      <div className="flex-1 p-6 ml-[347px] overflow-auto">{children}</div>
    </div>
  );
}
