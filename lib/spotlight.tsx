// lib/spotlight.js
"use client";
import React, { useRef, useState, useEffect } from "react";

// Custom hook for mouse position with performance optimization
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // Debounce function to limit updates
  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>): void => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };

  useEffect(() => {
    // Use requestAnimationFrame for smoother updates
    let frame: number;

    const handleMouseMove = (event: MouseEvent): void => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      });
    };

    // Check if we're on a touch device
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Only add event listener if not a touch device
    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return mousePosition;
}

import { ReactNode } from "react";

export default function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePosition = useMousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const containerSize = useRef({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState<HTMLElement[]>([]);

  // Only enable spotlight on non-touch devices
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    // Skip collecting elements if on touch device
    if (isTouchDevice) return;

    if (containerRef.current) {
      // Get direct children that will receive the spotlight effect
      setBoxes(
        Array.from(containerRef.current.children).map((el) => {
          const element = el as HTMLElement;
          const cardElement = element.querySelector(".group\\/card") || element;
          return cardElement;
        }) as HTMLElement[]
      );
    }
  }, [isTouchDevice]);

  useEffect(() => {
    // Skip if on touch device
    if (isTouchDevice) return;

    initContainer();

    const handleResize = debounce(() => {
      initContainer();
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [boxes, isTouchDevice]);

  useEffect(() => {
    // Skip if on touch device
    if (isTouchDevice) return;

    onMouseMove();
  }, [mousePosition, isTouchDevice]);

  // Debounce function
  function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>): void {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  const onMouseMove = () => {
    if (!containerRef.current || boxes.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const { w, h } = containerSize.current;
    const x = mousePosition.x - rect.left;
    const y = mousePosition.y - rect.top;
    const inside = x < w && x > 0 && y < h && y > 0;

    if (inside) {
      mouse.current.x = x;
      mouse.current.y = y;

      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        boxes.forEach((box) => {
          if (!box) return;

          const boxRect = box.getBoundingClientRect();
          const boxX = -(boxRect.left - rect.left) + mouse.current.x;
          const boxY = -(boxRect.top - rect.top) + mouse.current.y;

          box.style.setProperty("--mouse-x", `${boxX}px`);
          box.style.setProperty("--mouse-y", `${boxY}px`);
        });
      });
    }
  };

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
}
