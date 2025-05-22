import React from "react";
import { MediaItem } from "./sampleData";

interface GraphicDesignLayoutProps {
  items: MediaItem[];
}

const COLS = 4; // md:grid-cols-4

// Helper to get random span (1 or 2)
const getRandomSpan = () => (Math.random() > 0.7 ? 2 : 1);

interface PlacedItem {
  item: MediaItem;
  colSpan: number;
  rowSpan: number;
  colStart: number;
  rowStart: number;
}

function placeItems(items: MediaItem[]): PlacedItem[] {
  const grid: number[][] = []; // 2D array: [row][col] = 1 if filled
  const placed: PlacedItem[] = [];
  let maxRow = 0;

  for (let i = 0; i < items.length; i++) {
    let colSpan = i === 0 ? 2 : getRandomSpan();
    let rowSpan = i === 0 ? 2 : getRandomSpan();

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
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        style={{
          gridAutoRows: "minmax(120px, auto)",
        }}
      >
        {placedItems.map(
          ({ item, colSpan, rowSpan, colStart, rowStart }, index) => (
            <div
              key={index}
              className={`
              rounded-xl overflow-hidden group hover:ring-2 hover:ring-rose-500 cursor-pointer transition-all
              aspect-[16/9]
            `}
              style={{
                gridColumn: `span ${colSpan} / span ${colSpan}`,
                gridRow: `span ${rowSpan} / span ${rowSpan}`,
                gridColumnStart: colStart,
                gridRowStart: rowStart,
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-orange-500/10 mix-blend-overlay z-10" />
                <img
                  src={item.imagePath}
                  alt={item.title}
                  className="w-full h-full object-fit cover bg-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end z-20">
                  <div className="p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-xs text-gray-200 mt-1">{item.client}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GraphicDesignLayout;
