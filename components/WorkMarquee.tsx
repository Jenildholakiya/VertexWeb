"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const PROJECTS = [
  { id: 1, title: "MediGo", img: "/work/medigo.png" },
  { id: 2, title: "Dominare", img: "/work/medigo.png" },
  { id: 3, title: "Vertex", img: "/work/medigo.png" },
  { id: 4, title: "Apex", img: "/work/medigo.png" },
  { id: 5, title: "Nexus", img: "/work/medigo.png" },
  { id: 6, title: "Titan", img: "/work/medigo.png" },
];

gsap.registerPlugin(ScrollTrigger);

export const WorkMarquee = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray<HTMLElement>(".marquee-row");

    rows.forEach((row, i) => {
      const direction = i % 2 === 0 ? -1 : 1;
      const [xStart, xEnd] = direction === -1 ? ["0%", "-30%"] : ["-30%", "0%"];

      gsap.fromTo(row,
        { x: xStart },
        {
          x: xEnd,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            // 🚀 Logic: Start only when the top of the section hits 80% of the viewport
            start: "top 80%",
            // 🚀 Logic: End when the bottom of the section leaves the top of the viewport
            end: "bottom top",
            // 🚀 Logic: Higher scrub value (4) makes the movement much slower and "heavier"
            scrub: 4,
            invalidateOnRefresh: true,
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section id="work" ref={container} className="py-32 overflow-hidden bg-[#050505]">
      <div className="space-y-8 md:space-y-12">
        {/* Row 1: Moves Left */}
        <div className="marquee-row flex whitespace-nowrap gap-6 md:gap-8 w-fit">
          {[...PROJECTS, ...PROJECTS].map((project, idx) => (
            <ProjectCard key={`r1-${idx}`} project={project} />
          ))}
        </div>

        {/* Row 2: Moves Right */}
        <div className="marquee-row flex whitespace-nowrap gap-6 md:gap-8 w-fit">
          {[...PROJECTS, ...PROJECTS].map((project, idx) => (
            <ProjectCard key={`r2-${idx}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => (
  <div className="relative w-[280px] md:w-[450px] aspect-video rounded-3xl overflow-hidden border border-white/10 group cursor-pointer bg-zinc-900">
    <Image
      src={project.img}
      alt={project.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      sizes="(max-width: 768px) 280px, 450px"
      loading="lazy" // 🚀 Performance: Only load when scrolling near
    />
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
      <p className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em]">{project.title}</p>
    </div>
  </div>
);