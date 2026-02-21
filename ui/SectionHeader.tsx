"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  align?: "left" | "center";
}

export const SectionHeader = ({ title, subtitle, align = "center" }: SectionHeaderProps) => {
  return (
    <div className={`mb-12 space-y-4 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-xs font-bold uppercase tracking-[0.2em] text-primary"
      >
        {subtitle}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold tracking-tight text-white"
      >
        {title}
      </motion.h2>
    </div>
  );
};