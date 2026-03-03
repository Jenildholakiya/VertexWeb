"use client";

import { motion } from "framer-motion";
import { Button } from "@/ui/Button";
import { useClickSound } from "@/hooks/useClickSound";

/**
 * @component Hero
 * @description The flagship landing section for VertexWeb.
 * Removed the vertical scroll indicator that caused layout collisions.
 */
export const Hero = () => {
  const { playClick } = useClickSound();

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24 will-change-[contents]">
      {/* 🌌 Atmospheric Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(0,112,243,0.12),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="will-change-transform"
        >
          {/* Status Badge */}
          <div className="flex justify-center h-[30px] mb-6">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              <span className="mr-2 h-1 w-1 rounded-full bg-primary animate-pulse" />
              Engineering Digital Growth
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-[9rem] font-medium tracking-tight text-white leading-[0.9] md:leading-[0.85] antialiased">
            Engineering <br />
            <span className="text-zinc-500 italic">Digital</span> Growth.
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-8 md:mt-10 max-w-xl text-zinc-400 font-medium leading-relaxed text-base md:text-lg min-h-[3.5rem]">
            VertexWeb helps businesses build a strong online presence with professional,
            modern websites delivered in days, not months.
          </p>

          {/* Interactive CTA Group */}
          <div className="mt-10 md:mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row min-h-[60px]">
            <Button
              variant="primary"
              className="w-full sm:w-auto px-10 py-6 md:py-7 text-sm font-bold uppercase tracking-widest shadow-2xl shadow-primary/10"
              onClick={() => {
                playClick();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Your Project
            </Button>

            <button
              className="group flex items-center gap-2 text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:text-primary"
              onClick={() => {
                playClick();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore the Work
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                →
              </motion.div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Established Metadata Badge */}
      <div className="absolute bottom-8 left-8 hidden lg:flex flex-col gap-1 opacity-60">
        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Established</p>
        <p className="text-sm font-medium text-zinc-400">2026</p>
      </div>

      {/* ⚡ CTO NOTE: Removed the 'left-1/2' vertical divider block to fix the button leak error */}
    </section>
  );
};