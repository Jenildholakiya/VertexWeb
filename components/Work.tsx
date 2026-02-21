"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { SectionHeader } from "@/ui/SectionHeader";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/constants";
import { useClickSound } from "@/hooks/useClickSound";

export const Work = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { playClick } = useClickSound();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 30, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section data-color="#ffffff" id="work" className="py-32 container mx-auto px-6 relative">
      <SectionHeader subtitle="The Portfolio" title="Engineering growth for ambitious brands." align="left" />

      <div className="mt-20 border-t border-black/5">
        {PROJECTS.map((project, index) => (
          <Link
            key={index}
            href={project.href}
            target="_blank"
            onClick={playClick} // Tactile click sound
            onMouseEnter={() => {
              setHoveredIndex(index);
              document.body.classList.add("hide-custom-cursor"); // Hides blue dot
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              document.body.classList.remove("hide-custom-cursor");
            }}
            onMouseMove={handleMouseMove}
            className="group relative border-b border-black/5 py-16 cursor-pointer flex items-center justify-between transition-all duration-500 block"
          >
            {/* Title & Category Info */}
            <div className="flex flex-col gap-3 pointer-events-none">
              <div className="overflow-hidden h-5">
                <motion.span
                  initial={{ y: 20 }}
                  animate={{ y: hoveredIndex === index ? 0 : 20 }}
                  className="text-[10px] text-primary font-black uppercase tracking-[0.3em] block"
                >
                  Case Study 0{index + 1}
                </motion.span>
              </div>
              <h3 className="text-5xl md:text-8xl font-medium tracking-tighter text-zinc-400 transition-colors duration-500 group-hover:text-zinc-500">
                {project.title}
              </h3>
            </div>

            <div className="flex flex-col items-end gap-4 pointer-events-none">
              <p className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                {project.category}
              </p>
              <div className="h-12 w-12 rounded-full border border-zinc-200 flex items-center justify-center">
                <ArrowUpRight className="text-zinc-400 h-5 w-5" />
              </div>
            </div>

            {/* Floating Image Preview */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{ x, y, translateX: "-50%", translateY: "-50%" }}
                  className="pointer-events-none fixed top-0 left-0 z-[100] h-[280px] w-[420px] overflow-hidden rounded-2xl shadow-2xl bg-zinc-900 border border-white/10"
                >
                  {/* The Image only - No text overlays as requested */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="420px"
                  />
                  {/* Optional: Subtle vignette to make the image pop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </div>
    </section>
  );
};