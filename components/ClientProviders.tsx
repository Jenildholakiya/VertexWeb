"use client";

import dynamic from "next/dynamic";

// 🚀 Performance Fix: Defer heavy UI to reduce Total Blocking Time
const CustomCursor = dynamic(() => import("@/ui/CustomCursor").then(mod => mod.CustomCursor), {
  ssr: false
});
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll").then(mod => mod.SmoothScroll), {
  ssr: false
});

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}