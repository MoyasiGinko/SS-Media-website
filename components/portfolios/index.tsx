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
      expanded: true,
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
      active: false,
      subItems: [
        {
          name: "Educational Videos",
          active: false,
        },
        {
          name: "Talking Head",
          active: false,
        },
        { name: "Documentary", active: true },
        { name: "Sports", active: false },
        { name: "Promo/Ad", active: false },
      ],
    },
  ]);

  // State to track active category and subcategory
  const [activeCategory, setActiveCategory] = useState("Videos");
  const [activeSubCategory, setActiveSubCategory] = useState<
    string | undefined
  >("Documentary");

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
    updatedNavItems.forEach((item) => {
      item.active = false;
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          subItem.active = false;
        });
      }
    });

    // Set active state for clicked item
    if (subIndex !== undefined && updatedNavItems[index].subItems) {
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

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-[347px] bg-black border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="px-[15.12px] py-[13.5px] border border-gray-800 rounded-[20.16px] mt-[24px] mx-[22.3px] mb-[19.3px] flex items-center">
          <div className="w-[63px] h-[63px] rounded-[9px] bg-white">
            <img src="/images/logo/ss.svg" alt="SS" className="w-full h-full" />
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

        {/* Navigation */}
        <nav className="flex-1 mx-[22.3px]">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="mb-1">
                {/* Main nav item */}
                <div
                  className={`flex items-center justify-between px-[20.16px] py-[15.12px] rounded-md cursor-pointer ${
                    item.active ||
                    (item.subItems && item.subItems.some((sub) => sub.active))
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-black"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() =>
                    item.subItems ? toggleExpand(index) : setActive(index)
                  }
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
                            : "hover:bg-gradient-to-r hover:from-[#BB6FFB] hover:via-[#FC5F67] hover:to-[#FFB054] hover:bg-clip-text hover:text-transparent"
                        }`}
                        onClick={() => setActive(index, subIndex)}
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
                              <div className="w-4 h-4 rounded-full border border-[#FC5F67] bg-white"></div>
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
        <div className="p-3">
          <button className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-full py-2 px-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-indigo-500 rounded-full p-1 mr-2">
                <Phone size={16} />
              </div>
              <span>Book A Call</span>
            </div>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <ContentDisplay
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          items={sampleData}
        />
      </div>
    </div>
  );
}
