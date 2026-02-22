"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Use a fixed size constant to avoid calling getBoundingClientRect()
  const CURSOR_SIZE = 16;

  useGSAP(() => {
    if (!cursorRef.current) return;

    // 🚀 Speed Fix: Use x/y and scale instead of width/height to stay on GPU
    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");
    const scaleSet = gsap.quickSetter(cursorRef.current, "scale");

    const handleMouseMove = (e: MouseEvent) => {
      // 🚀 Performance Fix: Batch updates to the next animation frame
      requestAnimationFrame(() => {
        xSet(e.clientX - CURSOR_SIZE / 2);
        ySet(e.clientY - CURSOR_SIZE / 2);

        const target = e.target as HTMLElement;
        const isHover = !!target.closest("button, a, .group");

        // 🚀 Speed Fix: Scaling is GPU-accelerated; changing width/height is NOT
        scaleSet(isHover ? 4 : 1);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full bg-white will-change-transform"
      style={{
        width: `${CURSOR_SIZE}px`,
        height: `${CURSOR_SIZE}px`,
        mixBlendMode: "difference",
      }}
    />
  );
};