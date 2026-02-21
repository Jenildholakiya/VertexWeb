"use client";

import { motion } from "framer-motion";
import { Button } from "@/ui/Button";
import { useClickSound } from "@/hooks/useClickSound";

export const Hero = () => {
  const { playClick } = useClickSound();

  return (
    <section
      data-color="#050505"
      // Added h-screen fallback and content-visibility for rendering priority
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20 will-change-[contents]"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(0,112,243,0.12),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="will-change-transform" // Directs motion to GPU
        >
          {/* Badge: Height locked to prevent CLS */}
          <div className="flex justify-center h-[30px] overflow-hidden">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              <span className="mr-2 h-1 w-1 rounded-full bg-primary animate-pulse" />
              Engineering Digital Growth
            </span>
          </div>

          <h1 className="mt-10 text-6xl font-medium tracking-tight text-white md:text-[9rem] leading-[0.85] antialiased">
            Engineering <br />
            <span className="text-zinc-500 italic">Digital</span> Growth.
          </h1>

          <p className="mx-auto mt-10 max-w-xl text-zinc-400 font-medium leading-relaxed md:text-lg min-h-[3.5rem]">
            VertexWeb helps businesses build a strong online presence with professional,
            modern websites delivered in days, not months. No technical hassle.
            Just clear results.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row min-h-[60px]">
            <Button
              variant="primary"
              className="px-10 py-7 text-sm font-bold uppercase tracking-widest shadow-2xl shadow-primary/10"
              onClick={() => {
                playClick();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Your Project
            </Button>

            <button
              className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:text-primary cursor-pointer"
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

      {/* Floating Meta-Info */}
      <div className="absolute bottom-12 left-12 hidden flex-col gap-1 text-left md:flex opacity-60">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Established</p>
        <p className="text-sm font-medium text-zinc-400">2026</p>
      </div>

      <div className="absolute bottom-12 right-12 hidden flex-col gap-1 text-right md:flex opacity-60">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Process</p>
        <p className="text-sm font-medium text-zinc-400">Rapid Deployment Engine</p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden h-12 w-px bg-white/10">
        <motion.div
          animate={{ y: [-48, 48] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="h-12 w-full bg-primary will-change-transform"
        />
      </div>
    </section>
  );
};