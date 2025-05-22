import React from "react";
import { MediaItem } from "./sampleData";

interface GraphicDesignLayoutProps {
  items: MediaItem[];
}

const COLS = 4; // md:grid-cols-4

// Define aspect ratios and sizing for different subcategories
const SUBCATEGORY_CONFIG = {
  thumbnail: {
    aspectRatio: "16/9", // 16:9 landscape for thumbnails
    preferredColSpan: [2, 4],
    preferredRowSpan: [1, 2],
    weight: { 2: 0.7, 4: 0.3, 1: 0.0 },
  },
  poster: {
    aspectRatio: "3/4", // Typical poster ratio (portrait)
    preferredColSpan: [1, 2],
    preferredRowSpan: [2, 3],
    weight: { 2: 0.7, 3: 0.3 },
  },
  carousel: {
    aspectRatio: "3/4", // Typical carousel ratio (portrait)
    preferredColSpan: [1, 2],
    preferredRowSpan: [2, 3],
    weight: { 2: 0.7, 3: 0.3 },
  },
  default: {
    aspectRatio: "1/1", // Square fallback
    preferredColSpan: [1, 2],
    preferredRowSpan: [1, 2],
    weight: { 1: 0.5, 2: 0.5 },
  },
};

// Helper to get weighted random span based on subcategory
const getRandomSpan = (spans: number[], weights: Record<number, number>) => {
  const rand = Math.random();
  let cumulative = 0;

  for (const span of spans) {
    cumulative += weights[span] || 0;
    if (rand <= cumulative) {
      return span;
    }
  }
  return spans[0]; // fallback
};

interface PlacedItem {
  item: MediaItem;
  colSpan: number;
  rowSpan: number;
  colStart: number;
  rowStart: number;
  config: (typeof SUBCATEGORY_CONFIG)[keyof typeof SUBCATEGORY_CONFIG];
}

function placeItems(items: MediaItem[]): PlacedItem[] {
  const grid: number[][] = [];
  const placed: PlacedItem[] = [];
  let maxRow = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Get configuration based on subcategory
    const config =
      SUBCATEGORY_CONFIG[item.subCategory as keyof typeof SUBCATEGORY_CONFIG] ||
      SUBCATEGORY_CONFIG.default;

    // Generate spans based on subcategory preferences
    let colSpan: number;
    let rowSpan: number;

    if (i === 0) {
      // First item gets prominent placement
      colSpan = 2;
      rowSpan = 2;
    } else {
      colSpan = getRandomSpan(config.preferredColSpan, config.weight);
      rowSpan = getRandomSpan(config.preferredRowSpan, config.weight);
    }

    // Ensure spans don't exceed grid boundaries
    colSpan = Math.min(colSpan, COLS);

    // Find first available position
    let placedFlag = false;
    for (let row = 0; !placedFlag; row++) {
      for (let col = 0; col <= COLS - colSpan; col++) {
        // Check if space is free
        let fits = true;
        for (let r = 0; r < rowSpan; r++) {
          for (let c = 0; c < colSpan; c++) {
            if ((grid[row + r]?.[col + c] ?? 0) === 1) {
              fits = false;
              break;
            }
          }
          if (!fits) break;
        }
        if (fits) {
          // Mark cells as filled
          for (let r = 0; r < rowSpan; r++) {
            if (!grid[row + r]) grid[row + r] = Array(COLS).fill(0);
            for (let c = 0; c < colSpan; c++) {
              grid[row + r][col + c] = 1;
            }
          }
          placed.push({
            item: items[i],
            colSpan,
            rowSpan,
            colStart: col + 1,
            rowStart: row + 1,
            config,
          });
          maxRow = Math.max(maxRow, row + rowSpan);
          placedFlag = true;
          break;
        }
      }
    }
  }
  return placed;
}

const GraphicDesignLayout: React.FC<GraphicDesignLayoutProps> = ({ items }) => {
  const placedItems = placeItems(items);

  return (
    <div className="space-y-8">
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        style={{
          gridAutoRows: "minmax(100px, auto)",
        }}
      >
        {placedItems.map(
          ({ item, colSpan, rowSpan, colStart, rowStart, config }, index) => {
            // Get subcategory-specific styling
            const getSubcategoryStyles = () => {
              switch (item.subCategory) {
                case "thumbnail":
                  return {
                    aspectRatio: config.aspectRatio,
                    className: "rounded-lg",
                    overlayGradient: "from-blue-500/20 to-purple-500/10",
                  };
                case "poster":
                  return {
                    aspectRatio: config.aspectRatio,
                    className: "rounded-xl",
                    overlayGradient: "from-rose-500/20 to-pink-500/10",
                  };
                case "carousel":
                  return {
                    aspectRatio: config.aspectRatio,
                    className: "rounded-2xl",
                    overlayGradient: "from-emerald-500/20 to-teal-500/10",
                  };
                default:
                  return {
                    aspectRatio: config.aspectRatio,
                    className: "rounded-lg",
                    overlayGradient: "from-gray-500/20 to-slate-500/10",
                  };
              }
            };

            const styles = getSubcategoryStyles();

            return (
              <div
                key={index}
                className={`
                  ${styles.className} overflow-hidden group hover:ring-2 hover:ring-rose-500 cursor-pointer transition-all
                `}
                style={{
                  gridColumn: `span ${colSpan} / span ${colSpan}`,
                  gridRow: `span ${rowSpan} / span ${rowSpan}`,
                  gridColumnStart: colStart,
                  gridRowStart: rowStart,
                  aspectRatio: styles.aspectRatio,
                }}
              >
                <div className="relative w-full h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${styles.overlayGradient} mix-blend-overlay z-10`}
                  />
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    className="w-full h-full object-fit cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end z-20">
                    <div className="p-3 md:p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-1 bg-white/20 rounded-full capitalize">
                          {item.subCategory}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm md:text-base">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-200 mt-1">
                        {item.client}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default GraphicDesignLayout;
