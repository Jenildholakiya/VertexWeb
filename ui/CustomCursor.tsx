"use client";



import { useEffect, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";

import gsap from "gsap";

import { useGSAP } from "@gsap/react";



export const CustomCursor = () => {

  const cursorRef = useRef<HTMLDivElement>(null);



  // Ref-based state to keep the main thread 100% free

  const internalState = useRef({

    x: 0,

    y: 0,

    hoverType: "default"

  });



  useGSAP(() => {

    if (!cursorRef.current) return;



    // 1. Precise Setters: We force the "center" alignment here

    // This replaces the need for translate(-50%, -50%) in CSS

    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");

    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");



    const tick = () => {

      // Logic: Subtract half the width/height to center it perfectly

      const bounds = cursorRef.current?.getBoundingClientRect();

      const offset = bounds ? bounds.width / 2 : 8;



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

          width: newType === "service" ? 100 : newType === "hover" ? 60 : 16,

          height: newType === "service" ? 100 : newType === "hover" ? 60 : 16,

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

      className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full flex items-center justify-center overflow-hidden will-change-transform bg-primary"

      style={{

        // Logic: Remove manual translate here; GSAP handles it now for precision

        mixBlendMode: "difference",

      }}

    >

      <AnimatePresence>

        {internalState.current.hoverType === "service" && (

          <motion.span

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className="text-white text-[10px] font-black uppercase tracking-[0.2em] text-center"

          >

            View

          </motion.span>

        )}

      </AnimatePresence>

    </div>

  );

};