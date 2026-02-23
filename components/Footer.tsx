"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Instagram, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";
import Link from "next/link";

const socials = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/vertexweb" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/vertexweb" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/vertexweb-agency" },
];

export const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  const { playClick } = useClickSound();

  useGSAP(() => {
    const initializeAnimations = () => {
      // 🚀 Performance: Use quickSetter to avoid Layout Thrashing
      const socialItems = gsap.utils.toArray<HTMLElement>(".social-magnetic");

      socialItems.forEach((item) => {
        const xSet = gsap.quickSetter(item, "x", "px");
        const ySet = gsap.quickSetter(item, "y", "px");

        item.addEventListener("mousemove", (e) => {
          // Optimization: Cache dimensions once or use simple math to stay off the GPU
          const { left, top, width, height } = item.getBoundingClientRect();
          const x = (e.clientX - (left + width / 2)) * 0.4;
          const y = (e.clientY - (top + height / 2)) * 0.4;

          xSet(x);
          ySet(y);
          gsap.to(item, { scale: 1.15, duration: 0.3, overwrite: "auto" });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        });
      });

      // 🚀 Optimized Scroll Reveal
      gsap.from(".footer-reveal", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out"
      });
    };

    const idleId = window.requestIdleCallback ? window.requestIdleCallback(initializeAnimations) : setTimeout(initializeAnimations, 100);
    return () => {
      if (window.cancelIdleCallback && typeof idleId === 'number') window.cancelIdleCallback(idleId);
    };
  }, { scope: container });

  return (
    <footer ref={container} className="relative bg-[#050505] pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* 🚀 CSS-Based Watermark: Faster than SVG for Speed Index */}
      <div
        aria-hidden="true"
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] text-[15vw] font-black tracking-tighter text-white whitespace-nowrap leading-none"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
      >
        VERTEXWEB
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-end border-b border-white/5 pb-20">
          <div className="footer-reveal space-y-8">
            <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
              Let's build your <br />
              <span className="text-primary italic">next masterpiece.</span>
            </h3>
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Official Communication</p>
              <a
                href="mailto:team.vertexweb@gmail.com"
                onClick={playClick}
                className="text-2xl font-medium text-white hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer w-fit"
              >
                team.vertexweb@gmail.com
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="footer-reveal flex flex-col items-start lg:items-end gap-12">
            <div className="flex gap-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  onClick={playClick}
                  className="social-magnetic h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>

            <div className="text-left lg:text-right space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Strategic Hub</p>
              <p className="text-zinc-400 font-medium">Rajkot, Gujarat</p>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed">Est. 2026</p>
            </div>
          </div>
        </div>

        <div className="footer-reveal mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500">
          <p className="text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} VertexWeb. Engineering Digital Growth.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors cursor-pointer"
              data-cursor="hover"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors cursor-pointer"
              data-cursor="hover"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};