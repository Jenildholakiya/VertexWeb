"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const internalState = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    hoverType: "default"
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!isMounted || !cursorRef.current) return;

    // ⚡ Performance Optimized Setters
    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

    // 🚀 INITIAL STATE: Force circle and visibility immediately
    gsap.set(cursorRef.current, {
      width: 16,
      height: 16,
      borderRadius: "100%",
      opacity: 1
    });

    const tick = () => {
      if (!cursorRef.current) return;

      const type = internalState.current.hoverType;
      // Get current dimensions from the GSAP-managed element to ensure perfect centering
      const width = gsap.getProperty(cursorRef.current, "width") as number;
      const height = gsap.getProperty(cursorRef.current, "height") as number;

      // 🎯 THE FIX: Single math calculation for perfect 1:1 center alignment
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

      if (newType === "project" && projectCard) {
        const newImg = projectCard.getAttribute("data-preview");
        if (newImg !== activeImage) setActiveImage(newImg);
      }

      if (newType !== internalState.current.hoverType) {
        internalState.current.hoverType = newType;
        if (newType !== "project") setActiveImage(null);

        // 🚀 Smooth morphing between states
        gsap.to(cursorRef.current, {
          width: newType === "project" ? 420 : (newType === "service" ? 100 : (newType === "hover" ? 60 : 16)),
          height: newType === "project" ? 280 : (newType === "service" ? 100 : (newType === "hover" ? 60 : 16)),
          borderRadius: newType === "project" ? "24px" : "100%",
          duration: 0.3,
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
  }, [isMounted, activeImage]);

  if (!isMounted) return null;

  return (
    <div
      ref={cursorRef}
      // 🚀 REMOVED: translate(-50%, -50%) from style to fix the double-offset bug
      className="pointer-events-none fixed left-0 top-0 z-[99999] flex items-center justify-center overflow-hidden will-change-transform bg-primary rounded-full shadow-2xl"
      style={{
        width: "16px",
        height: "16px",
        opacity: 0 // Starts hidden until GSAP kicks in on mount
      }}
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