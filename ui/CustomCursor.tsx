"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const internalState = useRef({
    x: 0,
    y: 0,
    hoverType: "default"
  });

  useGSAP(() => {
    if (!cursorRef.current) return;

    // 🚀 STEP 1: Using quickSetters for X and Y
    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

    const tick = () => {
      if (!cursorRef.current) return;

      const type = internalState.current.hoverType;
      // 🚀 STEP 2: Use fixed size variables to avoid 'getBoundingClientRect'
      const width = type === "project" ? 420 : (type === "service" ? 100 : (type === "hover" ? 60 : 16));
      const height = type === "project" ? 280 : width;

      // 🚀 STEP 3: Instant 1:1 Positioning
      xSet(internalState.current.x - width / 2);
      ySet(internalState.current.y - height / 2);
    };

    gsap.ticker.add(tick);

    const handleMouseMove = (e: MouseEvent) => {
      internalState.current.x = e.clientX;
      internalState.current.y = e.clientY;

      const target = e.target as HTMLElement;
      const projectCard = target.closest('[data-cursor="project"]');
      const isService = !!target.closest('[data-cursor="service"]');
      const isHover = !!target.closest("button, a, .group, [role='button']");

      let newType = "default";
      if (projectCard) newType = "project";
      else if (isService) newType = "service";
      else if (isHover) newType = "hover";

      // Update image URL for projects
      if (newType === "project" && projectCard) {
        const newImg = projectCard.getAttribute("data-preview");
        if (newImg !== activeImage) setActiveImage(newImg);
      }

      if (newType !== internalState.current.hoverType) {
        internalState.current.hoverType = newType;
        if (newType !== "project") setActiveImage(null);

        // 🚀 STEP 4: Tighten animation duration for better sync feeling
        gsap.to(cursorRef.current, {
          width: newType === "project" ? 420 : (newType === "service" ? 100 : (newType === "hover" ? 60 : 16)),
          height: newType === "project" ? 280 : (newType === "service" ? 100 : (newType === "hover" ? 60 : 16)),
          borderRadius: newType === "project" ? "24px" : "100%",
          duration: 0.2, // Faster duration feels more "synced"
          ease: "expo.out",
          overwrite: "auto",
          mixBlendMode: newType === "project" ? "normal" : "difference",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(tick);
    };
  }, [activeImage]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[99999] flex items-center justify-center overflow-hidden will-change-transform bg-primary shadow-2xl"
      style={{ transform: "translate(-50%, -50%)" }} // 🚀 Let CSS handle initial centering
    >
      <AnimatePresence mode="wait">
        {activeImage ? (
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full relative"
          >
            <img src={activeImage} alt="Preview" className="w-full h-full object-cover" />
          </motion.div>
        ) : internalState.current.hoverType === "service" && (
          <motion.span
            key="view-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-[10px] font-black uppercase tracking-[0.2em]"
          >
            View
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};