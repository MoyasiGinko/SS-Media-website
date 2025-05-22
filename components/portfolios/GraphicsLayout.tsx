import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MediaItem } from "./sampleData";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  items: MediaItem[];
}

const COLS = 4;

interface PlacedItem {
  item: MediaItem;
  colSpan: number;
  rowSpan: number;
  colStart: number;
  rowStart: number;
}

// Fixed layout patterns - preventing random generation
const THUMBNAIL_PATTERNS = [
  // Pattern 1: All 1x1 uniform grid
  {
    name: "uniform-grid",
    items: [
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
    ],
  },
];

const POSTER_PATTERNS = [
  // Pattern 1: Big left (2x2) + 4 small right (1x1 each)
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
  // Pattern 2: 4 small left (1x1 each) + Big right (2x2)
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

const CAROUSEL_PATTERNS = [
  // Pattern 1: Full width + 2 half width
  {
    name: "full-then-halves",
    items: [
      { colSpan: 4, rowSpan: 1 }, // Full width
      { colSpan: 2, rowSpan: 1 }, // Half width
      { colSpan: 2, rowSpan: 1 }, // Half width
    ],
  },
  // Pattern 2: 2 half width + full width
  {
    name: "halves-then-full",
    items: [
      { colSpan: 2, rowSpan: 1 }, // Half width
      { colSpan: 2, rowSpan: 1 }, // Half width
      { colSpan: 4, rowSpan: 1 }, // Full width
    ],
  },
];

// Optimized image loading hook with better batching and caching
const useImageLoading = (items: MediaItem[]) => {
  const [imageAspectRatios, setImageAspectRatios] = useState<
    Record<string, number>
  >({});
  const [imageLoadingStates, setImageLoadingStates] = useState<
    Record<string, boolean>
  >({});
  const [imageLoadProgress, setImageLoadProgress] = useState<
    Record<string, number>
  >({});

  // Use refs to track intervals to prevent memory leaks
  const progressIntervalsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Memoize initial states to prevent unnecessary re-renders
  const initialStates = useMemo(() => {
    const loadingStates: Record<string, boolean> = {};
    const progress: Record<string, number> = {};

    items.forEach((item) => {
      loadingStates[item.imagePath] = true;
      progress[item.imagePath] = 0;
    });

    return { loadingStates, progress };
  }, [items]);

  useEffect(() => {
    setImageLoadingStates(initialStates.loadingStates);
    setImageLoadProgress(initialStates.progress);

    // Cleanup intervals on unmount
    return () => {
      progressIntervalsRef.current.forEach((interval) => {
        clearInterval(interval);
      });
      progressIntervalsRef.current.clear();
    };
  }, [initialStates]);

  const handleImageLoadStart = useCallback((imagePath: string) => {
    // Clear existing interval if any
    const existingInterval = progressIntervalsRef.current.get(imagePath);
    if (existingInterval) {
      clearInterval(existingInterval);
    }

    setImageLoadingStates((prev) => ({ ...prev, [imagePath]: true }));
    setImageLoadProgress((prev) => ({ ...prev, [imagePath]: 0 }));

    // Optimized progress simulation with better performance
    const progressInterval = setInterval(() => {
      setImageLoadProgress((prev) => {
        const currentProgress = prev[imagePath] || 0;
        if (currentProgress >= 90) {
          clearInterval(progressInterval);
          progressIntervalsRef.current.delete(imagePath);
          return prev;
        }
        return {
          ...prev,
          [imagePath]: Math.min(currentProgress + Math.random() * 20, 90),
        };
      });
    }, 150); // Reduced frequency for better performance

    progressIntervalsRef.current.set(imagePath, progressInterval);
  }, []);

  const handleImageLoad = useCallback(
    (imagePath: string, event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      // Clear interval immediately
      const interval = progressIntervalsRef.current.get(imagePath);
      if (interval) {
        clearInterval(interval);
        progressIntervalsRef.current.delete(imagePath);
      }

      // Batch state updates for better performance
      setImageLoadProgress((prev) => ({ ...prev, [imagePath]: 100 }));

      // Use requestAnimationFrame for smoother transitions
      requestAnimationFrame(() => {
        setTimeout(() => {
          setImageLoadingStates((prev) => ({ ...prev, [imagePath]: false }));
          setImageAspectRatios((prev) => ({
            ...prev,
            [imagePath]: aspectRatio,
          }));
        }, 100); // Reduced delay
      });
    },
    []
  );

  const handleImageError = useCallback((imagePath: string) => {
    const interval = progressIntervalsRef.current.get(imagePath);
    if (interval) {
      clearInterval(interval);
      progressIntervalsRef.current.delete(imagePath);
    }

    setImageLoadingStates((prev) => ({ ...prev, [imagePath]: false }));
    setImageLoadProgress((prev) => ({ ...prev, [imagePath]: 0 }));
  }, []);

  return {
    imageAspectRatios,
    imageLoadingStates,
    imageLoadProgress,
    handleImageLoadStart,
    handleImageLoad,
    handleImageError,
  };
};

// Optimized GSAP animation hook with better performance
const useGSAPAnimation = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  itemRefs:
    | React.RefObject<(HTMLDivElement | null)[]>
    | { current: (HTMLDivElement | null)[] },
  placedItems: PlacedItem[]
) => {
  const animationSetupRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || animationSetupRef.current) return;

    const ctx = gsap.context(() => {
      // Batch DOM operations
      const validItems = itemRefs.current.filter(Boolean);

      if (validItems.length === 0) return;

      // Set initial states in batch
      gsap.set(validItems, {
        opacity: 0,
        y: 30, // Reduced for smoother animation
        scale: 0.95, // Less dramatic scale for better performance
      });

      // Create timeline for better performance
      validItems.forEach((item, index) => {
        if (!item) return;

        gsap.to(item, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6, // Slightly faster
          ease: "power2.out",
          delay: index * 0.05, // Staggered animation
          scrollTrigger: {
            trigger: item,
            start: "top 90%", // Start earlier for smoother experience
            end: "bottom 10%",
            toggleActions: "play none none reverse",
            once: false, // Allow re-triggering for better UX
          },
        });
      });

      animationSetupRef.current = true;
    }, containerRef);

    return () => {
      ctx.revert();
      animationSetupRef.current = false;
    };
  }, [placedItems.length]); // Only depend on length to avoid unnecessary re-runs
};

// Optimized subcategory styles with Map for better performance
const SUBCATEGORY_STYLES_MAP = new Map([
  ["thumbnail", { className: "rounded-lg lg:rounded-xl" }],
  ["poster", { className: "rounded-xl lg:rounded-2xl" }],
  ["carousel", { className: "rounded-2xl lg:rounded-3xl" }],
  ["default", { className: "rounded-lg lg:rounded-xl" }],
]);

const getSubcategoryStyles = (subCategory: string) => {
  const normalizedSubCategory = subCategory.toLowerCase();
  return (
    SUBCATEGORY_STYLES_MAP.get(normalizedSubCategory) ||
    SUBCATEGORY_STYLES_MAP.get("default")!
  );
};

// Memoized ItemRenderer component for better performance
const ItemRenderer: React.FC<{
  placedItem: PlacedItem;
  index: number;
  itemRef: (el: HTMLDivElement | null) => void;
  imageStates: ReturnType<typeof useImageLoading>;
  getContainerStyle: (item: PlacedItem) => React.CSSProperties;
}> = React.memo(
  ({ placedItem, index, itemRef, imageStates, getContainerStyle }) => {
    const { item, colSpan, rowSpan } = placedItem;
    const {
      imageAspectRatios,
      imageLoadingStates,
      imageLoadProgress,
      handleImageLoadStart,
      handleImageLoad,
      handleImageError,
    } = imageStates;

    const naturalAspectRatio = imageAspectRatios[item.imagePath];
    const styles = getSubcategoryStyles(item.subCategory || "default");
    const isLoading = imageLoadingStates[item.imagePath];
    const loadProgress = imageLoadProgress[item.imagePath] || 0;

    // Memoize container style
    const containerStyle = useMemo(
      () => getContainerStyle(placedItem),
      [placedItem, getContainerStyle]
    );

    // Memoize image handlers to prevent unnecessary re-renders
    const onLoadStart = useCallback(() => {
      handleImageLoadStart(item.imagePath);
    }, [handleImageLoadStart, item.imagePath]);

    const onLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        handleImageLoad(item.imagePath, e);
      },
      [handleImageLoad, item.imagePath]
    );

    const onError = useCallback(() => {
      handleImageError(item.imagePath);
    }, [handleImageError, item.imagePath]);

    return (
      <div
        key={`${item.imagePath}-${index}`}
        ref={itemRef}
        className={`
        ${styles.className}
        overflow-hidden
        cursor-pointer
        shadow-lg
        will-change-transform
      `}
        style={containerStyle}
      >
        <div className="relative w-full h-full">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
              <div className="relative mb-4">
                <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
                <div
                  className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "0.8s",
                  }}
                />
              </div>

              <div className="w-3/4 max-w-32 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${loadProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </div>
              </div>

              <div className="text-xs text-gray-400 mt-2 font-medium">
                {Math.round(loadProgress)}%
              </div>

              <div className="absolute top-4 left-4">
                <span className="text-xs px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full capitalize font-medium text-white/70 border border-white/20">
                  {item.subCategory}
                </span>
              </div>
            </div>
          )}

          {/* Image with optimized loading */}
          <img
            src={item.imagePath}
            alt={item.title}
            className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isLoading ? "opacity-0" : "opacity-100"}
          `}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
            onError={onError}
            loading="lazy"
            decoding="async"
            fetchPriority={index < 4 ? "high" : "auto"} // Prioritize first 4 images
          />

          {/* Content overlay - from original design */}
          {!isLoading && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-3 md:p-4 lg:p-6 text-white">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs px-3 py-1 bg-white/20 backdrop-blur-md rounded-full capitalize font-medium border border-white/30">
                    {item.subCategory}
                  </span>
                  {naturalAspectRatio && (
                    <span className="text-xs px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                      {naturalAspectRatio.toFixed(2)}:1
                    </span>
                  )}
                  <span className="text-xs px-3 py-1 bg-purple-500/30 backdrop-blur-md rounded-full border border-purple-400/30">
                    {colSpan}×{rowSpan}
                  </span>
                </div>

                <h3 className="font-bold text-sm md:text-base lg:text-lg leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-200 opacity-90">
                  {item.client}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ItemRenderer.displayName = "ItemRenderer";

// Optimized layout calculation function
const calculatePosterLayout = (items: MediaItem[]): PlacedItem[] => {
  const placedItems: PlacedItem[] = [];
  let currentRow = 0;
  let itemIndex = 0;
  let patternIndex = 0;

  while (itemIndex < items.length) {
    const pattern = POSTER_PATTERNS[patternIndex % POSTER_PATTERNS.length];
    const patternItems = items.slice(
      itemIndex,
      Math.min(itemIndex + pattern.items.length, items.length)
    );

    if (patternItems.length === 0) break;

    const maxRowSpan = Math.max(...pattern.items.map((item) => item.rowSpan));

    let leftCol = 0;
    let rightCol = 2;
    let leftRowOffset = 0;
    let rightRowOffset = 0;

    pattern.items.forEach((patternItem, patternItemIndex) => {
      if (patternItemIndex >= patternItems.length) return;

      const item = patternItems[patternItemIndex];
      const { colSpan, rowSpan } = patternItem;
      let colStart: number;
      let rowStart: number;

      if (patternItem.position === "left") {
        colStart = leftCol;
        rowStart = currentRow + leftRowOffset;

        if (colSpan === 1) {
          leftCol = leftCol === 0 ? 1 : 0;
          if (leftCol === 0) leftRowOffset += rowSpan;
        } else {
          leftRowOffset += rowSpan;
        }
      } else {
        colStart = rightCol;
        rowStart = currentRow + rightRowOffset;

        if (colSpan === 1) {
          rightCol = rightCol === 2 ? 3 : 2;
          if (rightCol === 2) rightRowOffset += rowSpan;
        } else {
          rightRowOffset += rowSpan;
        }
      }

      colStart = Math.max(0, Math.min(colStart, COLS - colSpan));

      placedItems.push({
        item,
        colSpan,
        rowSpan,
        colStart: colStart + 1,
        rowStart: rowStart + 1,
      });
    });

    currentRow += maxRowSpan;
    itemIndex += patternItems.length;
    patternIndex++;
  }

  return placedItems;
};

// 1. THUMBNAIL LAYOUT COMPONENT - Optimized with memoization
const ThumbnailLayoutComponent: React.FC<LayoutProps> = React.memo(
  ({ items }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageStates = useImageLoading(items);

    // Memoize layout calculation
    const placedItems = useMemo(() => calculatePosterLayout(items), [items]);

    useGSAPAnimation(containerRef, itemRefs, placedItems);

    const getContainerStyle = useCallback((placedItem: PlacedItem) => {
      const { colSpan, rowSpan, colStart, rowStart } = placedItem;

      return {
        gridColumn: `span ${colSpan} / span ${colSpan}`,
        gridRow: `span ${rowSpan} / span ${rowSpan}`,
        gridColumnStart: colStart,
        gridRowStart: rowStart,
        aspectRatio: "16/9", // Fixed 16:9 aspect ratio
      };
    }, []);

    return (
      <div className="space-y-8 px-4 lg:px-8" ref={containerRef}>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2"
          style={{
            gridAutoRows: "minmax(120px, auto)",
          }}
        >
          {placedItems.map((placedItem, index) => (
            <ItemRenderer
              key={`thumb-${placedItem.item.imagePath}-${index}`}
              placedItem={placedItem}
              index={index}
              itemRef={(el) => (itemRefs.current[index] = el)}
              imageStates={imageStates}
              getContainerStyle={getContainerStyle}
            />
          ))}
        </div>

        {/* Loading indicator */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <div className="flex items-center justify-center gap-4">
            {Object.values(imageStates.imageLoadingStates).some(
              (loading) => loading
            ) && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-purple-500 rounded-full animate-spin" />
                <span className="text-purple-400">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ThumbnailLayoutComponent.displayName = "ThumbnailLayoutComponent";

// 2. POSTER LAYOUT COMPONENT - Optimized with memoization
const PosterLayoutComponent: React.FC<LayoutProps> = React.memo(({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageStates = useImageLoading(items);

  // Memoize layout calculation
  const placedItems = useMemo(() => calculatePosterLayout(items), [items]);

  useGSAPAnimation(containerRef, itemRefs, placedItems);

  const getContainerStyle = useCallback(
    (placedItem: PlacedItem) => {
      const { colSpan, rowSpan, colStart, rowStart } = placedItem;
      const naturalAspectRatio =
        imageStates.imageAspectRatios[placedItem.item.imagePath];

      const baseStyle = {
        gridColumn: `span ${colSpan} / span ${colSpan}`,
        gridRow: `span ${rowSpan} / span ${rowSpan}`,
        gridColumnStart: colStart,
        gridRowStart: rowStart,
      };

      if (naturalAspectRatio) {
        return {
          ...baseStyle,
          aspectRatio: naturalAspectRatio.toString(),
        };
      }

      // Fixed fallback - same as original
      const fallbackAspectRatio = (colSpan * 1.5) / rowSpan;
      return {
        ...baseStyle,
        aspectRatio: fallbackAspectRatio.toString(),
      };
    },
    [imageStates.imageAspectRatios]
  );

  return (
    <div className="space-y-8 px-4 lg:px-8" ref={containerRef}>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-2"
        style={{
          gridAutoRows: "minmax(120px, auto)",
        }}
      >
        {placedItems.map((placedItem, index) => (
          <ItemRenderer
            key={`poster-${placedItem.item.imagePath}-${index}`}
            placedItem={placedItem}
            index={index}
            itemRef={(el) => (itemRefs.current[index] = el)}
            imageStates={imageStates}
            getContainerStyle={getContainerStyle}
          />
        ))}
      </div>

      {/* Loading indicator */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <div className="flex items-center justify-center gap-4">
          {Object.values(imageStates.imageLoadingStates).some(
            (loading) => loading
          ) && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-400 border-t-purple-500 rounded-full animate-spin" />
              <span className="text-purple-400">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

PosterLayoutComponent.displayName = "PosterLayoutComponent";

// 3. CAROUSEL LAYOUT COMPONENT - Optimized with memoization
const CarouselLayoutComponent: React.FC<LayoutProps> = React.memo(
  ({ items }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageStates = useImageLoading(items);

    // Memoize layout calculation
    const placedItems = useMemo(() => calculatePosterLayout(items), [items]);

    useGSAPAnimation(containerRef, itemRefs, placedItems);

    const getContainerStyle = useCallback(
      (placedItem: PlacedItem) => {
        const { colSpan, rowSpan, colStart, rowStart } = placedItem;
        const naturalAspectRatio =
          imageStates.imageAspectRatios[placedItem.item.imagePath];

        const baseStyle = {
          gridColumn: `span ${colSpan} / span ${colSpan}`,
          gridRow: `span ${rowSpan} / span ${rowSpan}`,
          gridColumnStart: colStart,
          gridRowStart: rowStart,
        };

        if (naturalAspectRatio) {
          return {
            ...baseStyle,
            aspectRatio: naturalAspectRatio.toString(),
          };
        }

        // Using same aspect ratio logic as posters
        const fallbackAspectRatio = (colSpan * 1.5) / rowSpan;
        return {
          ...baseStyle,
          aspectRatio: fallbackAspectRatio.toString(),
        };
      },
      [imageStates.imageAspectRatios]
    );

    return (
      <div className="space-y-8 px-4 lg:px-8" ref={containerRef}>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2"
          style={{
            gridAutoRows: "minmax(120px, auto)",
          }}
        >
          {placedItems.map((placedItem, index) => (
            <ItemRenderer
              key={`carousel-${placedItem.item.imagePath}-${index}`}
              placedItem={placedItem}
              index={index}
              itemRef={(el) => (itemRefs.current[index] = el)}
              imageStates={imageStates}
              getContainerStyle={getContainerStyle}
            />
          ))}
        </div>

        {/* Loading indicator */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <div className="flex items-center justify-center gap-4">
            {Object.values(imageStates.imageLoadingStates).some(
              (loading) => loading
            ) && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-purple-500 rounded-full animate-spin" />
                <span className="text-purple-400">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CarouselLayoutComponent.displayName = "CarouselLayoutComponent";

// MAIN COMPONENT - Optimized with memoization
const GraphicDesignLayout: React.FC<{ items: MediaItem[] }> = React.memo(
  ({ items }) => {
    // Memoize grouped items to prevent recalculation
    const groupedItems = useMemo(() => {
      return items.reduce((acc, item) => {
        const normalizedSubCategory = (
          item.subCategory ?? "unknown"
        ).toLowerCase();
        if (!acc[normalizedSubCategory]) {
          acc[normalizedSubCategory] = [];
        }
        acc[normalizedSubCategory].push(item);
        return acc;
      }, {} as Record<string, MediaItem[]>);
    }, [items]);

    return (
      <div className="space-y-12">
        {/* Render Thumbnails */}
        {groupedItems.thumbnail && groupedItems.thumbnail.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 px-4 lg:px-8">Thumbnails</h2>
            <ThumbnailLayoutComponent items={groupedItems.thumbnail} />
          </div>
        )}

        {/* Render Posters */}
        {groupedItems.poster && groupedItems.poster.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 px-4 lg:px-8">Posters</h2>
            <PosterLayoutComponent items={groupedItems.poster} />
          </div>
        )}

        {/* Render Carousel */}
        {groupedItems.carousel && groupedItems.carousel.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 px-4 lg:px-8">Carousel</h2>
            <CarouselLayoutComponent items={groupedItems.carousel} />
          </div>
        )}

        {/* Overall loading indicator */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <div className="flex items-center justify-center gap-4">
            <span>{items.length} total items loaded</span>
          </div>
        </div>
      </div>
    );
  }
);

GraphicDesignLayout.displayName = "GraphicDesignLayout";

export default GraphicDesignLayout;
