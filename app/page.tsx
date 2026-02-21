"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/motion/Reveal";
import { useThemeTransition } from "@/hooks/useThemeTransition";

// Optimized dynamic imports for performance
const Services = dynamic(() => import("@/components/Services").then((mod) => mod.Services), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5 rounded-3xl" />,
});

const About = dynamic(() => import("@/components/About").then((mod) => mod.About));

const Work = dynamic(() => import("@/components/Work").then((mod) => mod.Work), {
  ssr: true,
});

const Process = dynamic(() => import("@/components/Process").then((mod) => mod.Process));
const Pricing = dynamic(() => import("@/components/Pricing").then((mod) => mod.Pricing));
const Contact = dynamic(() => import("@/components/Contact").then((mod) => mod.Contact));

// New Dynamic Import for the Masterpiece Footer
const Footer = dynamic(() => import("@/components/Footer").then((mod) => mod.Footer));

export default function Home() {
  // Activate GSAP Mood-Shift for premium Dark-to-Light transitions
  useThemeTransition();

  return (
    <div className="relative flex flex-col w-full transition-colors duration-700">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Hero: Focused on fast turnaround and digital authority */}
      <Hero />

      <div className="space-y-32 pb-32">
        {/* Services: Focused on modern solutions without technical hassle */}
        <section data-color="#050505" data-text="#ffffff">
          <Reveal>
            <Services />
          </Reveal>
        </section>

        {/* About: Bridging the gap between ambition and reality */}
        <section id="about" data-color="#050505" data-text="#ffffff">
          <Reveal>
            <About />
          </Reveal>
        </section>

        {/* Work: Showcasing professional, high-end digital masterpieces */}
        <section data-color="#ffffff" data-text="#050505" className="transition-colors duration-700">
          <Work />
        </section>

        {/* Process: Emphasizing a stress-free experience from idea to launch */}
        <section data-color="#050505" data-text="#ffffff">
          <Reveal>
            <Process />
          </Reveal>
        </section>

        {/* Pricing: Transparent plans for Websites and Landing Pages */}
        <section id="pricing">
          <Reveal>
            <Pricing />
          </Reveal>
        </section>

        {/* Contact: Quick inquiry for businesses ready to grow confidently */}
        <section id="contact">
          <Reveal>
            <Contact />
          </Reveal>
        </section>
      </div>

      {/* Masterpiece Footer: Kinetic Reveal & Magnetic Socials */}
      <Footer />
    </div>
  );
}