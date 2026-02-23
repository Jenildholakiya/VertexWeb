"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/constants";
import { SectionHeader } from "@/ui/SectionHeader";
import { Button } from "@/ui/Button";
import * as Icons from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";

export const Services = () => {
  const container = useRef<HTMLDivElement>(null);
  const { playClick } = useClickSound();
  const [activeSolution, setActiveSolution] = useState<typeof SERVICES[0] | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useGSAP(() => {
    if (isTouchDevice) return;

    const cards = gsap.utils.toArray(".service-card");
    cards.forEach((card: any) => {
      const glow = card.querySelector(".card-glow");

      card.addEventListener("mousemove", (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const rotateX = ((y / height) - 0.5) * 10;
        const rotateY = ((x / width) - 0.5) * -10;

        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(glow, {
          x: x - 150,
          y: y - 150,
          opacity: 1,
          duration: 0.4,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        });
        gsap.to(glow, { opacity: 0, duration: 0.6 });
      });
    });
  }, { scope: container, dependencies: [isTouchDevice] });

  return (
    <section id="services" ref={container} className="py-24 container mx-auto relative overflow-visible">
      <SectionHeader
        subtitle="Our Solutions"
        title="Professional digital presence, delivered fast."
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-6 mt-16">
        {SERVICES.map((service, i) => {
          const IconComponent = (Icons as any)[service.icon];
          return (
            <motion.div
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playClick();
                setActiveSolution(service);
              }}
              data-cursor="service"
              // 🚀 FIX: Changed 'cursor-none' to 'cursor-pointer' to show the hand pointer
              className="service-card group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-500 hover:border-primary/40 active:bg-zinc-900"
            >
              <div className="card-glow pointer-events-none absolute -inset-[150px] bg-primary/20 blur-[100px] rounded-full opacity-0 z-0" />

              <div className="relative z-10 pointer-events-none">
                <div className="service-icon mb-6 md:mb-8 inline-block">
                  <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                    <IconComponent className="text-zinc-400 group-hover:text-primary w-6 h-6 md:w-7 md:h-7 transition-colors" />
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-medium text-white mb-3 md:mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed font-medium text-xs md:text-sm">
                  {service.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-[2px] bg-primary/40 w-0 group-hover:w-full transition-all duration-700" />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeSolution && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSolution(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-[2rem] p-6 md:p-12 overflow-y-auto max-h-[90vh] shadow-2xl"
            >
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 md:mb-8">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    {(() => {
                      const Icon = (Icons as any)[activeSolution.icon];
                      return <Icon className="text-primary w-6 h-6" />;
                    })()}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{activeSolution.title}</h2>
                </div>

                <div className="space-y-4 text-zinc-400 leading-relaxed mb-8 md:mb-10">
                  <p className="text-base md:text-lg">
                    {activeSolution.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {["Next.js 16 Architecture", "Motion Intelligence", "SEO & Speed Mastery", "Conversion-Led Design"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs md:text-sm font-medium">
                        <Icons.CheckCircle2 className="text-primary w-4 h-4 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => setActiveSolution(null)}
                  variant="primary"
                  className="w-full py-5 md:py-6 text-base md:text-lg rounded-2xl"
                >
                  Return to Apex
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};