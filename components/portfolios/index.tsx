// app/page.tsx
"use client";
import React, { useState } from "react";
import { ChevronRight, Phone } from "lucide-react";
import sampleData from "./sampleData";
import ContentDisplay from "./ContentDisplay";

// Define types for our navigation items
type SubItem = {
  name: string;
  icon?: string;
  active?: boolean;
};

type NavItem = {
  name: string;
  icon: string;
  expanded?: boolean;
  active?: boolean;
  subItems?: SubItem[];
};

export default function Dashboard() {
  // State to manage navigation items
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      name: "UI/UX",
      icon: "/images/icons/uiux.svg",
      active: false,
    },
    {
      name: "Graphic Design",
      icon: "/images/icons/graphics.svg",
      expanded: false,
      active: false,
      subItems: [
        {
          name: "Poster",
          active: false,
        },
        {
          name: "Thumbnail",
          active: false,
        },
      ],
    },
    {
      name: "Shorts/Reels",
      icon: "/images/icons/shorts.svg",
      active: false,
    },
    {
      name: "Websites",
      icon: "/images/icons/website.svg",
      active: false,
    },
    {
      name: "Videos",
      icon: "/images/icons/videos.svg",
      expanded: true,
      active: true,
      subItems: [
        {
          name: "Educational Videos",
          active: false,
        },
        {
          name: "Talking Head",
          active: false,
        },
        { name: "Documentary", active: false },
        { name: "Sports", active: false },
        { name: "Promo/Ad", active: false },
      ],
    },
  ]);

  // State to track active category and subcategory
  const [activeCategory, setActiveCategory] = useState("Videos");
  const [activeSubCategory, setActiveSubCategory] = useState<
    string | undefined
  >("");

  // Function to toggle expansion of nav items with sub-items
  const toggleExpand = (index: number) => {
    const updatedNavItems = [...navItems];

    // Close all other expanded items
    updatedNavItems.forEach((item, i) => {
      if (i !== index && item.expanded) {
        item.expanded = false;
      }
    });

    // Toggle current item
    updatedNavItems[index].expanded = !updatedNavItems[index].expanded;
    setNavItems(updatedNavItems);
  };

  // Function to set active item
  const setActive = (index: number, subIndex?: number) => {
    const updatedNavItems = [...navItems];

    // Reset all active states
    updatedNavItems.forEach((item, i) => {
      item.active = false;
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          subItem.active = false;
        });
      }

      // Close all dropdowns except the current one
      if (i !== index) {
        item.expanded = false;
      }
    });

    // Set active state for clicked item
    if (subIndex !== undefined && updatedNavItems[index].subItems) {
      // Also activate the parent item when a subitem is clicked
      updatedNavItems[index].active = true;
      updatedNavItems[index].subItems![subIndex].active = true;
      setActiveCategory(updatedNavItems[index].name);
      setActiveSubCategory(updatedNavItems[index].subItems![subIndex].name);
    } else {
      updatedNavItems[index].active = true;
      setActiveCategory(updatedNavItems[index].name);
      setActiveSubCategory(undefined);
    }

    setNavItems(updatedNavItems);
  };

  // Modified click handler for parent items
  const handleParentItemClick = (index: number) => {
    const item = navItems[index];

    if (item.subItems) {
      // If the item is already active, just toggle expansion
      if (item.active) {
        toggleExpand(index);
      } else {
        // For items with subitems, toggle expansion and set active
        toggleExpand(index);
        setActive(index);
      }
    } else {
      // For regular items, just set active (which will close other dropdowns)
      setActive(index);
    }
  };

  return (
    <div className="flex min-h-screen bg-transparent text-white">
      {/* Sidebar - Made sticky with fixed height and overflow-y-auto */}
      <div className="w-[347px] bg-[#1B1B1B] border-r border-[#383838] fixed h-screen flex flex-col overflow-y-auto">
        {/* Logo */}
        <a href="/">
          <div className="px-[15.12px] w-full max-w-[302px] h-full max-h-[90px] cursor-pointer bg-[#141313] py-[13.5px] border hover:border-white/25 border-[#383838] rounded-[20.16px] mt-[24px] mx-[22.3px] mb-[19.3px] flex items-center">
            <div className="w-[63px] h-[63px] rounded-[9px] bg-white">
              <img
                src="/images/logo/ss.svg"
                alt="SS"
                className="w-full h-full"
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

        {/* Search Bar */}

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
                  onClick={() => handleParentItemClick(index)}
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
                          setActive(index, subIndex);
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

      {/* Main Content - Added left margin to account for fixed sidebar */}
      <div className="flex-1 p-6 ml-[347px] overflow-auto">
        <ContentDisplay
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          items={sampleData}
        />
      </div>
    </div>
  );
}
