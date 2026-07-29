"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

export function useServiceHover() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowRefs.current.forEach((row, index) => {
      if (!row) return;

      if (hoveredIndex === null) {
        gsap.to(row, {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (index === hoveredIndex) {
        gsap.to(row, {
          opacity: 1,
          x: 20,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(row, {
          opacity: 0.2,
          x: 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  }, [hoveredIndex]);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleRowClick = useCallback((index: number) => {
    setHoveredIndex((prev) => (prev === index ? null : index));
  }, []);

  const setRowRef = useCallback((el: HTMLDivElement | null, index: number) => {
    rowRefs.current[index] = el;
  }, []);

  return {
    hoveredIndex,
    setRowRef,
    handleMouseEnter,
    handleMouseLeave,
    handleRowClick,
  };
}
