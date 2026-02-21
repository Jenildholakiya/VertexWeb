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

  const handleToggle = (type: "web" | "landing") => {
    if (view !== type) {
      playClick();
      setView(type);
    }
  };

  // --- Start Project Logic ---
  const handleStartProject = (planName: string, category: string) => {
    playClick(); // Auditory feedback

    // 1. Find the contact form's select element
    const projectSelect = document.querySelector('select') as HTMLSelectElement;

    if (projectSelect) {
      // 2. Map the plan name to the correct dropdown option
      // This assumes your dropdown options contain the plan names
      const optionToSelect = Array.from(projectSelect.options).find(opt =>
        opt.text.toLowerCase().includes(planName.toLowerCase()) &&
        opt.text.toLowerCase().includes(category.toLowerCase())
      );

      if (optionToSelect) {
        projectSelect.value = optionToSelect.value;
      }
    }

    // 3. Smooth scroll to the contact section
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="pricing" className="container mx-auto px-6 py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <SectionHeader
        subtitle="Investment"
        title="Simple, transparent pricing for every business."
      />

      {/* Premium Toggle Switch */}
      <div className="flex justify-center mt-12 mb-20">
        <div className="bg-white/5 border border-white/10 p-1 rounded-full flex items-center relative backdrop-blur-md">
          <motion.div
            className="absolute h-[calc(100%-8px)] bg-primary rounded-full z-0"
            animate={{
              x: view === "web" ? 4 : 142,
              width: view === "web" ? 130 : 160
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
          <button
            onClick={() => handleToggle("web")}
            className={`relative z-10 px-8 py-2.5 text-sm font-semibold transition-colors duration-300 cursor-pointer ${
              view === "web" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Websites
          </button>
          <button
            onClick={() => handleToggle("landing")}
            className={`relative z-10 px-8 py-2.5 text-sm font-semibold transition-colors duration-300 cursor-pointer ${
              view === "landing" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Landing Pages
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        <AnimatePresence mode="wait">
          {activePlans.map((plan, i) => (
            <motion.div
              key={`${view}-${plan.name}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="h-full"
            >
              <Card
                className={`relative h-full flex flex-col p-8 transition-all duration-500 border-white/10 ${
                  plan.popular
                    ? "border-primary/40 bg-white/[0.04] py-12 -translate-y-4 shadow-[0_20px_50px_rgba(0,112,243,0.1)]"
                    : "bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-6 py-1.5 rounded-full shadow-xl">
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                      Best Value
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-primary uppercase tracking-[0.25em]">
                      {plan.name}
                    </h3>
                    {plan.name.includes("Starter") || plan.name.includes("Basic") ? <Zap size={18} className="text-zinc-600" /> :
                     plan.name.includes("Growth") ? <Rocket size={18} className="text-primary" /> :
                     <ShieldCheck size={18} className="text-accent" />}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                      {plan.price}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10 mb-8" />

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 group">
                      <div className="mt-1 shrink-0 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check size={10} className="text-primary" strokeWidth={4} />
                      </div>
                      <span className="text-zinc-400 text-sm font-medium group-hover:text-zinc-200 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* --- Updated Button with Logic --- */}
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  onClick={() => handleStartProject(plan.name, view === "web" ? "Website" : "Landing Page")}
                  className="w-full py-7 text-sm font-bold uppercase tracking-widest shadow-2xl active:scale-95 transition-transform"
                >
                  Start {plan.name}
                </Button>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="text-center text-zinc-600 text-[10px] mt-16 font-mono uppercase tracking-[0.3em]">
        © {new Date().getFullYear()} VertexWeb. Built with precision.
      </p>
    </section>
  );
};