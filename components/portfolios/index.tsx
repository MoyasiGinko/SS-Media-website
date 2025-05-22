// app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Phone } from "lucide-react";
import sampleData from "./sampleData";
import ContentDisplay from "./ContentDisplay";

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

export default function Dashboard() {
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
      slug: "graphic-design", // Fixed: changed from "graphics-design" to match URL
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

  // State to track active category and subcategory
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("");

  // Function to parse pathname and determine active states
  const parsePathnameAndSetActive = () => {
    // Remove leading slash and split path
    const pathSegments = pathname.replace(/^\//, "").split("/").filter(Boolean);

    console.log("Parsing pathname:", pathname, "Segments:", pathSegments);

    if (pathSegments.length === 0) {
      // Root path - set default or clear active states
      setActiveCategory("");
      setActiveSubCategory("");
      return;
    }

    // Handle /work prefix - skip it if present
    let categorySlug, subCategorySlug;

    if (pathSegments[0] === "work") {
      categorySlug = pathSegments[1];
      subCategorySlug = pathSegments[2];
    } else {
      categorySlug = pathSegments[0];
      subCategorySlug = pathSegments[1];
    }

    console.log("Category slug:", categorySlug, "Sub slug:", subCategorySlug);

    // Find matching category
    const categoryItem = navItems.find((item) => item.slug === categorySlug);

    console.log("Found category item:", categoryItem);

    if (categoryItem) {
      setActiveCategory(categoryItem.name);

      // Check for subcategory
      if (subCategorySlug && categoryItem.subItems) {
        const subCategoryItem = categoryItem.subItems.find(
          (subItem) => subItem.slug === subCategorySlug
        );
        console.log("Found subcategory item:", subCategoryItem);
        if (subCategoryItem) {
          setActiveSubCategory(subCategoryItem.name);
        } else {
          setActiveSubCategory("");
        }
      } else {
        setActiveSubCategory("");
      }
    } else {
      // No matching category found
      console.log("No matching category found for slug:", categorySlug);
      setActiveCategory("");
      setActiveSubCategory("");
    }
  };

  // Function to update nav item states based on pathname
  const updateNavItemStates = () => {
    const pathSegments = pathname.replace(/^\//, "").split("/").filter(Boolean);

    // Handle /work prefix - skip it if present
    let categorySlug, subCategorySlug;

    if (pathSegments[0] === "work") {
      categorySlug = pathSegments[1];
      subCategorySlug = pathSegments[2];
    } else {
      categorySlug = pathSegments[0];
      subCategorySlug = pathSegments[1];
    }

    const updatedNavItems = navItems.map((item) => {
      const isCategoryActive = item.slug === categorySlug;
      const shouldExpand =
        isCategoryActive && item.subItems && item.subItems.length > 0;

      return {
        ...item,
        active: isCategoryActive,
        expanded: shouldExpand,
        subItems: item.subItems?.map((subItem) => ({
          ...subItem,
          active: subItem.slug === subCategorySlug && isCategoryActive,
        })),
      };
    });

    setNavItems(updatedNavItems);
  };

  // Effect to handle pathname changes
  useEffect(() => {
    console.log("Pathname changed:", pathname);
    console.log(
      "Current navItems:",
      navItems.map((item) => ({ name: item.name, slug: item.slug }))
    );
    parsePathnameAndSetActive();
    updateNavItemStates();
  }, [pathname]); // Remove navItems dependency to avoid infinite loop

  // Debug effect to log state changes
  useEffect(() => {
    console.log("Active states updated:", {
      activeCategory,
      activeSubCategory,
    });
  }, [activeCategory, activeSubCategory]);

  // Function to handle navigation
  const handleNavigation = (categorySlug: string, subCategorySlug?: string) => {
    let newPath = `/work/${categorySlug}`; // Added /work prefix
    if (subCategorySlug) {
      newPath += `/${subCategorySlug}`;
    }
    router.push(newPath);
  };

  // Function to toggle expansion of nav items with sub-items
  const toggleExpand = (index: number) => {
    const item = navItems[index];

    if (!item.subItems) return;

    // If item is not active, navigate to it first
    if (!item.active) {
      handleNavigation(item.slug);
    } else {
      // If already active, toggle expansion state
      const updatedNavItems = [...navItems];
      updatedNavItems[index].expanded = !updatedNavItems[index].expanded;
      setNavItems(updatedNavItems);
    }
  };

  // Modified click handler for parent items
  const handleParentItemClick = (index: number) => {
    const item = navItems[index];

    if (item.subItems && item.subItems.length > 0) {
      // For items with subitems
      if (item.active) {
        // If already active, toggle expansion
        toggleExpand(index);
      } else {
        // Navigate to the category
        handleNavigation(item.slug);
      }
    } else {
      // For regular items without subitems
      handleNavigation(item.slug);
    }
  };

  // Handler for subcategory clicks
  const handleSubItemClick = (categoryIndex: number, subIndex: number) => {
    const categoryItem = navItems[categoryIndex];
    const subItem = categoryItem.subItems?.[subIndex];

    if (subItem) {
      handleNavigation(categoryItem.slug, subItem.slug);
    }
  };

  return (
    <div className="flex min-h-screen bg-transparent text-white">
      {/* Sidebar - Made sticky with fixed height and overflow-y-auto */}
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
                          handleSubItemClick(index, subIndex);
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
