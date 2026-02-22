"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const CURSOR_SIZE = 16;

  useGSAP(() => {
    if (!cursorRef.current || !textRef.current) return;

    // GPU-accelerated setters for zero-reflow movement
    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        xSet(e.clientX - CURSOR_SIZE / 2);
        ySet(e.clientY - CURSOR_SIZE / 2);

        const target = e.target as HTMLElement;
        const isService = !!target.closest('[data-cursor="service"]');
        const isHover = !!target.closest("button, a, .group");

        // 🎨 Restore Animations: Scale and Opacity handled by GSAP
        // Using 'scale' and 'opacity' keeps us off the Main Thread
        if (isService) {
          gsap.to(cursorRef.current, { scale: 6, backgroundColor: "#FF0000", duration: 0.3 }); // Restore Brand Red
          gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
        } else if (isHover) {
          gsap.to(cursorRef.current, { scale: 4, backgroundColor: "#FFFFFF", duration: 0.3 });
          gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
        } else {
          gsap.to(cursorRef.current, { scale: 1, backgroundColor: "#FFFFFF", duration: 0.3 });
          gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full flex items-center justify-center will-change-transform"
      style={{
        width: `${CURSOR_SIZE}px`,
        height: `${CURSOR_SIZE}px`,
        mixBlendMode: "difference",
        backgroundColor: "white", // Default
      }}
    >
      <span
        ref={textRef}
        className="opacity-0 text-[2px] font-black uppercase tracking-widest text-white"
        style={{ fontSize: '2px' }} // Scale will make this visible
      >
        View
      </span>
    </div>
  );
};