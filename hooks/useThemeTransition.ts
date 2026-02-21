"use client";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useThemeTransition = () => {
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-color]");

    sections.forEach((section) => {
      // Use the null-coalescing operator (??) to provide a fallback
      const bgColor = section.getAttribute("data-color") ?? "#050505";
      const textColor = section.getAttribute("data-text") ?? "#ffffff";

      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          gsap.to("body", {
            backgroundColor: bgColor, // Now guaranteed to be a string
            color: textColor,
            duration: 0.8,
            ease: "power2.inOut",
          });
        },
        onEnterBack: () => {
          gsap.to("body", {
            backgroundColor: bgColor,
            color: textColor,
            duration: 0.8,
            ease: "power2.inOut",
          });
        },
      });
    });
  }, []);
};