import React from "react";
import { MediaItem } from "./sampleData";

interface GraphicDesignLayoutProps {
  items: MediaItem[];
}

const COLS = 4; // md:grid-cols-4

// Define 4 main layout patterns that will be randomly selected
const LAYOUT_PATTERNS = [
  // Pattern 3: Big left (2x2) + 4 small right (1x1 each)
  {
    name: "big-left-small-right",
    items: [
      { colSpan: 2, rowSpan: 2, position: "left" }, // Big
      { colSpan: 1, rowSpan: 1, position: "right" }, // Small
      { colSpan: 1, rowSpan: 1, position: "right" }, // Small
      { colSpan: 1, rowSpan: 1, position: "right" }, // Small
      { colSpan: 1, rowSpan: 1, position: "right" }, // Small
    ],
  },
  // Pattern 4: 4 small left (1x1 each) + Big right (2x2)
  {
    name: "small-left-big-right",
    items: [
      { colSpan: 1, rowSpan: 1, position: "left" }, // Small
      { colSpan: 1, rowSpan: 1, position: "left" }, // Small
      { colSpan: 1, rowSpan: 1, position: "left" }, // Small
      { colSpan: 1, rowSpan: 1, position: "left" }, // Small
      { colSpan: 2, rowSpan: 2, position: "right" }, // Big
    ],
  },
];

// Helper function to get random pattern
const getRandomPattern = () => {
  return LAYOUT_PATTERNS[Math.floor(Math.random() * LAYOUT_PATTERNS.length)];
};

interface PlacedItem {
  item: MediaItem;
  colSpan: number;
  rowSpan: number;
  colStart: number;
  rowStart: number;
  naturalAspectRatio?: number;
}

function placeItems(items: MediaItem[]): PlacedItem[] {
  const grid: number[][] = [];
  const placed: PlacedItem[] = [];
  let currentRow = 0;

  // Process items in groups based on pattern sizes
  let itemIndex = 0;

  while (itemIndex < items.length) {
    const pattern = getRandomPattern();
    const patternItems = items.slice(
      itemIndex,
      itemIndex + pattern.items.length
    );

    if (patternItems.length === 0) break;

    // Calculate the required rows for this pattern
    const maxRowSpan = Math.max(...pattern.items.map((item) => item.rowSpan));

    // Ensure we have enough grid rows
    while (grid.length < currentRow + maxRowSpan) {
      grid.push(Array(COLS).fill(0));
    }

    // Place items according to the pattern
    let leftCol = 0;
    let rightCol = 2; // Right side starts at column 2 (since left side can use 0-1)
    let leftRowOffset = 0;
    let rightRowOffset = 0;

    pattern.items.forEach((patternItem, patternIndex) => {
      if (patternIndex >= patternItems.length) return; // Skip if we don't have enough items

      const item = patternItems[patternIndex];
      let { colSpan, rowSpan } = patternItem;
      let colStart: number;
      let rowStart: number;

      if (patternItem.position === "left") {
        colStart = leftCol;
        rowStart = currentRow + leftRowOffset;

        // Update left column position for next left item
        if (colSpan === 1) {
          leftCol = leftCol === 0 ? 1 : 0; // Alternate between columns 0 and 1
          if (leftCol === 0) leftRowOffset += rowSpan; // Move to next row when wrapping
        } else {
          leftRowOffset += rowSpan; // Big item takes full width, move down
        }
      } else {
        colStart = rightCol;
        rowStart = currentRow + rightRowOffset;

        // Update right column position for next right item
        if (colSpan === 1) {
          rightCol = rightCol === 2 ? 3 : 2; // Alternate between columns 2 and 3
          if (rightCol === 2) rightRowOffset += rowSpan; // Move to next row when wrapping
        } else {
          rightRowOffset += rowSpan; // Big item takes full width, move down
        }
      }

      // Ensure the item fits within grid bounds
      colStart = Math.min(colStart, COLS - colSpan);

      // Mark grid cells as occupied
      for (let r = 0; r < rowSpan; r++) {
        if (!grid[rowStart + r]) {
          while (grid.length <= rowStart + r) {
            grid.push(Array(COLS).fill(0));
          }
        }
        for (let c = 0; c < colSpan; c++) {
          if (colStart + c < COLS) {
            grid[rowStart + r][colStart + c] = 1;
          }
        }
      }

      placed.push({
        item,
        colSpan,
        rowSpan,
        colStart: colStart + 1, // CSS Grid is 1-indexed
        rowStart: rowStart + 1, // CSS Grid is 1-indexed
      });
    });

    // Move to next pattern starting row
    currentRow += maxRowSpan;
    itemIndex += pattern.items.length;
  }

  return placed;
}

const GraphicDesignLayout: React.FC<GraphicDesignLayoutProps> = ({ items }) => {
  const placedItems = placeItems(items);
  const [imageAspectRatios, setImageAspectRatios] = React.useState<
    Record<string, number>
  >({});

  // Function to handle image load and calculate natural aspect ratio
  const handleImageLoad = (
    imagePath: string,
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = event.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setImageAspectRatios((prev) => ({
      ...prev,
      [imagePath]: aspectRatio,
    }));
  };

  return (
    <div className="space-y-8">
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-2"
        style={{
          gridAutoRows: "minmax(120px, auto)",
        }}
      >
        {placedItems.map(
          ({ item, colSpan, rowSpan, colStart, rowStart }, index) => {
            const naturalAspectRatio = imageAspectRatios[item.imagePath];

            // Get subcategory-specific styling
            const getSubcategoryStyles = () => {
              switch (item.subCategory) {
                case "thumbnail":
                  return {
                    className: "rounded-lg",
                    overlayGradient: "from-blue-500/20 to-purple-500/10",
                    borderColor: "hover:ring-blue-400",
                  };
                case "poster":
                  return {
                    className: "rounded-xl",
                    overlayGradient: "from-rose-500/20 to-pink-500/10",
                    borderColor: "hover:ring-rose-400",
                  };
                case "carousel":
                  return {
                    className: "rounded-2xl",
                    overlayGradient: "from-emerald-500/20 to-teal-500/10",
                    borderColor: "hover:ring-emerald-400",
                  };
                default:
                  return {
                    className: "rounded-lg",
                    overlayGradient: "from-gray-500/20 to-slate-500/10",
                    borderColor: "hover:ring-gray-400",
                  };
              }
            };

            const styles = getSubcategoryStyles();

            // Calculate dynamic height based on natural aspect ratio or fallback
            const getContainerStyle = () => {
              const baseStyle = {
                gridColumn: `span ${colSpan} / span ${colSpan}`,
                gridRow: `span ${rowSpan} / span ${rowSpan}`,
                gridColumnStart: colStart,
                gridRowStart: rowStart,
              };

              // If we have the natural aspect ratio, use it
              if (naturalAspectRatio) {
                return {
                  ...baseStyle,
                  aspectRatio: naturalAspectRatio.toString(),
                };
              }

              // Fallback: use grid spans to determine aspect ratio
              const fallbackAspectRatio = (colSpan * 1.5) / rowSpan; // Adjust multiplier as needed
              return {
                ...baseStyle,
                aspectRatio: fallbackAspectRatio.toString(),
              };
            };

            return (
              <div
                key={index}
                className={`
                  ${styles.className} overflow-hidden group ${styles.borderColor} hover:ring-2 cursor-pointer transition-all duration-300
                `}
                style={getContainerStyle()}
              >
                <div className="relative w-full h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${styles.overlayGradient} mix-blend-overlay z-10`}
                  />
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onLoad={(e) => handleImageLoad(item.imagePath, e)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end z-20">
                    <div className="p-3 md:p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full capitalize font-medium">
                          {item.subCategory}
                        </span>
                        {naturalAspectRatio && (
                          <span className="text-xs px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full">
                            {naturalAspectRatio.toFixed(2)}:1
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm md:text-base leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-200 mt-1 opacity-90">
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
