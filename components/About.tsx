"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "@/ui/SectionHeader";
import { ShieldCheck, Zap, Cpu } from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { icon: Zap, title: "Velocity-First", desc: "We deploy professional digital presences in days, not months, without compromising quality." },
  { icon: ShieldCheck, title: "Zero-Hassle", desc: "We handle technical complexity so you can focus entirely on your business growth." },
  { icon: Cpu, title: "Modern Stack", desc: "Built with Next.js 15 and Motion Intelligence for high-speed, future-proof results." }
];

export const About = () => {
  const container = useRef<HTMLDivElement>(null);
  const { playClick } = useClickSound();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".about-text-content > *", {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power4.out",
    })
    .from(".pillar-card", {
      x: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.4)",
    }, "-=0.6");

    const stats = gsap.utils.toArray<HTMLElement>(".stat-item");
    stats.forEach((stat) => {
      const handleStatMove = (e: MouseEvent) => {
        const { left, top, width, height } = stat.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        gsap.to(stat, { x: x * 15, y: y * 10, scale: 1.05, duration: 0.4, ease: "power2.out" });
      };
      const handleStatLeave = () => {
        gsap.to(stat, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      };
      // Passive listener for performance
      stat.addEventListener("mousemove", handleStatMove, { passive: true });
      stat.addEventListener("mouseleave", handleStatLeave);
    });

    const cards = gsap.utils.toArray<HTMLElement>(".pillar-card");
    cards.forEach((card) => {
      const xSet = gsap.quickSetter(card, "rotateY", "deg");
      const ySet = gsap.quickSetter(card, "rotateX", "deg");

      const handleMove = (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        xSet(x * 12);
        ySet(y * -12);
        gsap.to(card, { scale: 1.03, duration: 0.4, overwrite: "auto" });
      };

      const handleLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
      };
      // Passive listener for performance
      card.addEventListener("mousemove", handleMove, { passive: true });
      card.addEventListener("mouseleave", handleLeave);
    });
  }, { scope: container });

  return (
    <section id="about" ref={container} className="py-32 relative overflow-hidden bg-[#050505] will-change-transform">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[140px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <div className="about-text-content space-y-10">
          <SectionHeader align="left" subtitle="The Vertex Story" title="Bridging the gap between ambition and digital reality." />
          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-medium">
            <p>Founded in 2025, VertexWeb provides professional, modern websites delivered with unprecedented speed.</p>
            <p>Based in Rajkot, we've engineered a stress-free experience for business owners, removing technical jargon.</p>
          </div>

          <div className="flex gap-12 pt-6">
            <div className="stat-item cursor-pointer group h-[80px]" data-cursor="service" onClick={playClick}>
              <p className="text-5xl font-bold text-white tracking-tighter transition-colors group-hover:text-primary leading-none">7-10</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-2">Day Launch</p>
            </div>
            <div className="w-px h-16 bg-white/10" />
            <div className="stat-item cursor-pointer group h-[80px]" data-cursor="service" onClick={playClick}>
              <p className="text-5xl font-bold text-white tracking-tighter transition-colors group-hover:text-primary leading-none">100%</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-2">Stress-Free</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              onClick={playClick}
              className="pillar-card group relative p-8 rounded-[2rem] bg-zinc-950/40 border border-white/5 backdrop-blur-sm cursor-pointer overflow-hidden transform-gpu"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <div className="relative z-10 flex gap-6 items-center pointer-events-none">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
                  <pillar.icon className="text-primary group-hover:text-white transition-colors" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{pillar.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px]">{pillar.desc}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};