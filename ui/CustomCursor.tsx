"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const internalState = useRef({ x: 0, y: 0, hoverType: "default" });

  // 🚀 Performance Fix: Use a constant instead of getBoundingClientRect()
  // to eliminate "Forced Reflow" during the Speed Index audit.
  const CURSOR_SIZE = 16;

  useGSAP(() => {
    if (!cursorRef.current) return;

    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

    const tick = () => {
      // 🚀 Brutal Truth: Removing getBoundingClientRect() here
      // is what saves your Speed Index.
      const offset = CURSOR_SIZE / 2;
      xSet(internalState.current.x - offset);
      ySet(internalState.current.y - offset);
    };

    gsap.ticker.add(tick);

    const handleMouseMove = (e: MouseEvent) => {
      internalState.current.x = e.clientX;
      internalState.current.y = e.clientY;

      const target = e.target as HTMLElement;
      const isService = !!target.closest('[data-cursor="service"]');
      const isHover = !!target.closest("button, a, .group, [role='button']");
      const isHidden = document.body.classList.contains("hide-custom-cursor");

      let newType = "default";
      if (isHidden) newType = "hidden";
      else if (isService) newType = "service";
      else if (isHover) newType = "hover";

      if (newType !== internalState.current.hoverType) {
        internalState.current.hoverType = newType;

        gsap.to(cursorRef.current, {
          width: newType === "service" ? 100 : newType === "hover" ? 60 : CURSOR_SIZE,
          height: newType === "service" ? 100 : newType === "hover" ? 60 : CURSOR_SIZE,
          opacity: newType === "hidden" ? 0 : 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full flex items-center justify-center overflow-hidden will-change-transform bg-white"
      style={{
        width: `${CURSOR_SIZE}px`,
        height: `${CURSOR_SIZE}px`,
        mixBlendMode: "difference",
      }}
    >
      <AnimatePresence>
        {internalState.current.hoverType === "service" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-black text-[10px] font-black uppercase tracking-[0.2em] text-center"
          >
            View
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};