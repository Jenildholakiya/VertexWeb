"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card = ({
  children,
  className,
  animate = true
}: CardProps) => {
  return (
    <motion.div
      // Use undefined instead of false to satisfy Framer Motion's types
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-secondary/50 p-6 backdrop-blur-sm",
        "hover:border-primary/50 transition-colors duration-500",
        className
      )}
    >
      {/* Subtle Inner Glow for Premium Depth */}
      <div className="absolute -inset-px bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};