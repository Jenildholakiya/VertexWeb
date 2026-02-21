"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.75,
        ease: [0.19, 1.0, 0.22, 1.0] // Premium "Expo Out" easing
      }}
    >
      {children}
    </motion.div>
  );
}