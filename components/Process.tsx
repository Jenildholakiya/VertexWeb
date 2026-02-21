"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/ui/SectionHeader";
import { PROCESS_STEPS } from "@/constants";

export const Process = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={containerRef} className="container mx-auto px-6 py-24 relative">
      <SectionHeader
        subtitle="The Experience"
        title="From idea to launch in days, not months."
      />

      <div className="relative mt-20 max-w-5xl mx-auto">
        {/* The Animated Line: Represents the fast, direct path to launch */}
        <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/10 hidden md:block">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-primary origin-top"
            style={{ scaleY, height: "100%" }}
          />
        </div>

        <div className="space-y-20">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-12 md:pl-20"
            >
              {/* Step Circle Indicator */}
              <div className="absolute left-0 top-1 h-10 w-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                <span className="text-xs font-bold text-white">{step.num}</span>
              </div>

              <div className="group">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="mt-2 text-zinc-400 max-w-md leading-relaxed font-medium text-sm">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};