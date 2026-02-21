"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Instagram, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";

const socials = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  const { playClick } = useClickSound();

  useGSAP(() => {
    // 1. Magnetic Social Links Logic
    const socialItems = gsap.utils.toArray<HTMLElement>(".social-magnetic");

    socialItems.forEach((item) => {
      const xSet = gsap.quickSetter(item, "x", "px");
      const ySet = gsap.quickSetter(item, "y", "px");

      item.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * 0.5;
        const y = (e.clientY - (top + height / 2)) * 0.5;

        xSet(x);
        ySet(y);
        gsap.to(item, { scale: 1.2, duration: 0.3 });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      });
    });

    // 2. Reveal Animation on Scroll
    gsap.from(".footer-reveal", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 95%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "expo.out"
    });
  }, { scope: container });

  return (
    <footer ref={container} className="relative bg-[#050505] pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Text: Watermark Style */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <h2 className="text-[20vw] font-black text-white/[0.02] whitespace-nowrap leading-none tracking-tighter">
          VERTEXWEB
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-end border-b border-white/5 pb-20">

          {/* Left: Big Brand Callout */}
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
                className="text-2xl font-medium text-white hover:text-primary transition-colors flex items-center gap-2 group"
              >
                team.vertexweb@gmail.com
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Social & Location Hub */}
          <div className="footer-reveal flex flex-col items-start lg:items-end gap-12">
            <div className="flex gap-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  onClick={playClick}
                  data-cursor="hover"
                  className="social-magnetic h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-colors duration-500"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>

            <div className="text-left lg:text-right space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Strategic Hub</p>
              <p className="text-zinc-400 font-medium">Rajkot, Gujarat</p>
              <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest leading-relaxed">MMXXV</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-reveal mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600">
          <p className="text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} VertexWeb. Engineering Digital Growth.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};