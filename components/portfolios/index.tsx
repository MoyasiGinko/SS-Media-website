// app/page.tsx
"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Phone,
  Layout,
  Pen,
  Film,
  Globe,
  Video,
  BookOpen,
  MessageCircle,
  FileText,
  Activity,
  Award,
} from "lucide-react";
import sampleData from "./sampleData";
import ContentDisplay from "./ContentDisplay";

// Define types for our navigation items
type SubItem = {
  name: string;
  icon?: React.ReactNode;
  active?: boolean;
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  expanded?: boolean;
  active?: boolean;
  subItems?: SubItem[];
};

export default function Dashboard() {
  // State to manage navigation items
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      name: "UI/UX",
      icon: <Layout size={20} />,
      active: false,
    },
    {
      name: "Graphic Design",
      icon: <Pen size={20} />,
      expanded: false,
      active: false,
    },
    {
      name: "Shorts/Reels",
      icon: <Film size={20} />,
      active: false,
    },
    {
      name: "Websites",
      icon: <Globe size={20} />,
      active: false,
    },
    {
      name: "Videos",
      icon: <Video size={20} />,
      expanded: true,
      active: false,
      subItems: [
        {
          name: "Educational Videos",
          icon: <BookOpen size={18} />,
          active: false,
        },
        {
          name: "Talking Head",
          icon: <MessageCircle size={18} />,
          active: false,
        },
        { name: "Documentary", icon: <FileText size={18} />, active: true },
        { name: "Sports", icon: <Activity size={18} />, active: false },
        { name: "Promo/Ad", icon: <Award size={18} />, active: false },
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
        <div className="px-[15.12px] py-[13.5px] border border-gray-800 rounded-[20.16px] m-3 flex items-center">
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
        <nav className="flex-1 py-4">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="mb-1">
                {/* Main nav item */}
                <div
                  className={`flex items-center justify-between px-4 py-2 mx-3 rounded-md cursor-pointer ${
                    item.active
                      ? "bg-white text-black"
                      : item.expanded &&
                        item.subItems &&
                        item.subItems.some((sub) => sub.active)
                      ? "bg-gradient-to-r from-red-500 to-orange-500"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() =>
                    item.subItems ? toggleExpand(index) : setActive(index)
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {item.subItems &&
                    (item.expanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    ))}
                </div>

                {/* Sub-items */}
                {item.subItems && item.expanded && (
                  <ul className="ml-8 mt-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${
                          subItem.active
                            ? "bg-gradient-to-r from-red-500 to-orange-500"
                            : "hover:bg-gray-800"
                        }`}
                        onClick={() => setActive(index, subIndex)}
                      >
                        {subItem.icon && (
                          <span className="mr-2">{subItem.icon}</span>
                        )}
                        <span>{subItem.name}</span>
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
