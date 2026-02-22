"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { SectionHeader } from "@/ui/SectionHeader";
import { Check, Zap, Rocket, ShieldCheck } from "lucide-react";
import { WEB_PLANS, LANDING_PLANS } from "@/constants";
import { useClickSound } from "@/hooks/useClickSound";

export const Pricing = () => {
  const [view, setView] = useState<"web" | "landing">("web");
  const { playClick } = useClickSound();
  const activePlans = view === "web" ? WEB_PLANS : LANDING_PLANS;

  const handleStartProject = (planName: string, category: string) => {
    playClick();
    const projectSelect = document.getElementById('project_type_select') as HTMLSelectElement;
    if (projectSelect) {
      const option = Array.from(projectSelect.options).find(opt =>
        opt.text.toLowerCase().includes(planName.toLowerCase())
      );
      if (option) projectSelect.value = option.value;
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="pricing" className="container mx-auto px-6 py-24 relative overflow-hidden">
      <SectionHeader subtitle="Investment" title="Simple, transparent pricing." />

      {/* Optimized Toggle Switch: Uses flex-basis for perfect alignment */}
      <div className="flex justify-center mt-12 mb-20">
        <div className="relative flex w-full max-w-[320px] bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
          <motion.div
            className="absolute top-1 bottom-1 left-1 bg-primary rounded-full z-0"
            initial={false}
            animate={{
              // Logic: x moves by 100% of its own width
              x: view === "web" ? "0%" : "100%",
              // Logic: width is exactly 50% minus the 4px padding
              width: "calc(50% - 4px)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          <button
            onClick={() => { playClick(); setView("web"); }}
            className={`relative z-10 flex-1 px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${view === "web" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Websites
          </button>
          <button
            onClick={() => { playClick(); setView("landing"); }}
            className={`relative z-10 flex-1 px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${view === "landing" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Landing Pages
          </button>
        </div>
      </div>

      {/* Grid container with tablet optimizations */}
      <div className="grid grid-cols-1 md:max-w-2xl lg:max-w-none mx-auto lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {activePlans.map((plan, i) => (
            <motion.div
              key={`${view}-${plan.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: i * 0.1 }}
              className="h-full"
            >
              <Card className={`relative h-full flex flex-col p-8 bg-white/[0.02] border-white/10 ${plan.popular ? "border-primary/40 bg-white/[0.04] lg:-translate-y-4 shadow-[0_20px_50px_rgba(0,112,243,0.1)]" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                    Best Value
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white">{plan.price}</div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check size={14} className="text-primary mt-1 shrink-0" />
                      <span className="text-zinc-400 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  onClick={() => handleStartProject(plan.name, view)}
                  className="w-full py-6 text-xs font-bold uppercase tracking-widest"
                >
                  Start {plan.name}
                </Button>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};