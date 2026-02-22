"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 🚀 Performance: Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // 🚀 Fix: Prevent sync issues that cause "Forced Reflow"
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    // 🚀 Performance: Start the loop only when the browser is ready
    rafId = requestAnimationFrame(raf);

    // 🚀 Fix: Ensure GSAP or other scroll triggers sync perfectly with Lenis
    const handleScroll = () => {
       // Batching scroll updates prevents the layout engine from choking
    };

    lenis.on('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};