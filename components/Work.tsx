"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/ui/SectionHeader";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "@/constants";
import { useClickSound } from "@/hooks/useClickSound";

export const Work = () => {
  const { playClick } = useClickSound();

  return (
    <section id="work" className="py-32 container mx-auto px-6 relative">
      <SectionHeader subtitle="The Portfolio" title="Engineering growth for ambitious brands." align="left" />

      <div className="mt-20 border-t border-black/5">
        {PROJECTS.map((project, index) => (
          <Link
            key={index}
            href={project.href}
            target="_blank"
            onClick={playClick}
            // 🚀 THE PERMANENT FIX: Delegate all visual work to CustomCursor
            data-cursor="project"
            data-preview={project.image}
            className="group relative border-b border-black/5 py-16 cursor-none flex items-center justify-between transition-all duration-500"
          >
            <div className="flex flex-col gap-3 pointer-events-none">
              <h3 className="text-5xl md:text-8xl font-medium tracking-tighter text-zinc-400 transition-colors duration-500 group-hover:text-white">
                {project.title}
              </h3>
            </div>

            <div className="flex flex-col items-end gap-4 pointer-events-none">
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                {project.category}
              </p>
              <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                <ArrowUpRight className="text-white h-5 w-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};