"use client";
import React, { useState } from "react";
import { X, Image, ChevronLeft, ChevronRight } from "lucide-react";
import { MediaItem } from "./sampleData";

interface UIUXLayoutProps {
  items: MediaItem[];
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  uxImages: string[];
  title: string;
}

const ImageModal = ({ isOpen, onClose, uxImages, title }: ImageModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % uxImages.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + uxImages.length) % uxImages.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Reset to first image when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen || !uxImages.length) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header with close button */}
      <div className="fixed right-0 justify-end p-4 z-10">
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <X size={40} />
        </button>
      </div>

      {/* Navigation arrows (only show if more than 1 image) */}
      {uxImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={goToNext}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Scrollable Image Container with hidden scrollbar */}
      <div
        className="flex-1 overflow-auto p-4 scrollbar-hide"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE/Edge */,
        }}
      >
        <div className="min-h-full rounded-2xl flex items-center justify-center">
          <img
            src={uxImages[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="max-w-full rounded-2xl object-contain"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* Pagination dots (only show if more than 1 image) */}
      {uxImages.length > 1 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            {uxImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <div className="text-center mt-2 text-white/80 text-sm">
            {currentImageIndex + 1} / {uxImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

const UIUXLayout: React.FC<UIUXLayoutProps> = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);

  const openImage = (item: MediaItem): void => {
    setSelectedImage(item);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        closeImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="space-y-8">
      {/* Featured Project */}
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-square md:aspect-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 mix-blend-overlay" />
              <div
                className="w-full h-full bg-cover bg-center cursor-pointer hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${items[0].imagePath})` }}
                onClick={() => openImage(items[0])}
              />
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{items[0].title}</h2>
                <p className="text-gray-400">{items[0].description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {items[0].tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 px-2 py-1 rounded-md text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => openImage(items[0])}
                  className="border border-blue-600 text-blue-600 hover:bg-blue-600/10 px-4 py-2 rounded-md text-sm"
                >
                  View Full Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.slice(1).map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl overflow-hidden group hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <div className="aspect-video relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 mix-blend-overlay" />
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                style={{ backgroundImage: `url(${item.imagePath})` }}
                onClick={() => openImage(item)}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {item.tags?.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-800 px-2 py-0.5 rounded-md text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {(item.tags?.length || 0) > 3 && (
                  <span className="bg-gray-800 px-2 py-0.5 rounded-md text-xs text-gray-300">
                    +{(item.tags?.length || 0) - 3} more
                  </span>
                )}
              </div>

              <div className="mt-3">
                <button
                  onClick={() => openImage(item)}
                  className="border border-blue-600 text-blue-600 hover:bg-blue-600/10 px-3 py-1 rounded-md text-xs"
                >
                  View Full Image
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal with Pagination */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeImage}
        uxImages={
          Array.isArray(selectedImage?.uxImage)
            ? selectedImage.uxImage
            : selectedImage?.uxImage
            ? [selectedImage.uxImage]
            : []
        }
        title={selectedImage?.title || ""}
      />
    </div>
  );
};

export default UIUXLayout;
