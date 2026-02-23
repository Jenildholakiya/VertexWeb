"use client";

import { ReactNode } from "react";
import { SectionHeader } from "@/ui/SectionHeader";

export const LegalLayout = ({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) => (
  <section className="py-24 container mx-auto px-6 max-w-4xl">
    <SectionHeader title={title} subtitle={subtitle} align="left" />
    <div className="mt-16 prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed">
      {children}
    </div>
  </section>
);