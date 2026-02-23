"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";
import { useClickSound } from "@/hooks/useClickSound";

// 🚀 Precise Order: Services -> About -> Work -> Process -> Pricing
const navLinks = [
  { name: "Services", href: "services" },
  { name: "About", href: "about" },
  { name: "Work", href: "work" },
  { name: "Process", href: "process" },
  { name: "Pricing", href: "pricing" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const { playClick } = useClickSound();

  // Track if user clicked a link so we don't flicker state during smooth scrolls
  const isManualScrolling = useRef(false);

  useEffect(() => {
    // 1. Scroll Background Logic
    const handleScrollBase = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScrollBase, { passive: true });

    // 2. 🚀 PERMANENT FIX: Intersection Observer
    // This is much more reliable than window.scrollY math.
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Only triggers when element is in middle 20% of screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    navLinks.forEach((link) => {
      const section = document.getElementById(link.href);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScrollBase);
      observer.disconnect();
    };
  }, []);

  const handleScrollTo = (targetId: string) => {
    playClick();
    isManualScrolling.current = true;
    setActiveSection(targetId);

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }

    // Release the manual lock after smooth scroll finishes
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out",
        isScrolled ? "py-4" : "py-6 md:py-8"
      )}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className={cn(
            "flex items-center justify-between rounded-full px-4 md:px-6 py-3 transition-all duration-500",
            isScrolled ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl" : "bg-transparent border border-transparent"
          )}>
            <Link href="/" onClick={playClick} className="text-lg md:text-xl font-bold tracking-tighter text-white flex items-center gap-2 group">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-lg bg-primary flex items-center justify-center">
                <div className="h-1.5 w-1.5 md:h-2 md:w-2 bg-white rounded-full animate-pulse" />
              </div>
              <span className="group-hover:text-primary transition-colors duration-300">
                VERTEX<span className="text-primary group-hover:text-white transition-colors duration-300">WEB</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4 relative" onMouseLeave={() => setHoveredPath(null)}>
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.href)}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={cn(
                    "relative px-4 py-2 text-[11px] xl:text-sm font-bold uppercase tracking-widest transition-colors duration-300 z-10",
                    activeSection === link.href || hoveredPath === link.href ? "text-white" : "text-zinc-400"
                  )}
                >
                  {link.name}

                  {/* 🚀 Sliding Active Underline */}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-4"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* 🚀 Hover Pill Effect */}
                  {hoveredPath === link.href && (
                    <motion.div
                      layoutId="navHover"
                      className="absolute inset-0 bg-white/5 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}

              <div className="ml-4">
                <Button
                  variant="primary"
                  size="sm"
                  className="gap-2 px-5 py-2.5 text-[10px] font-black tracking-widest uppercase group overflow-hidden"
                  onClick={() => handleScrollTo('contact')}
                >
                  Start a Project
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <ArrowRight size={14} />
                  </motion.span>
                </Button>
              </div>
            </div>

            {/* Mobile Burger Menu */}
            <button
              className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="menu"
              onClick={() => { playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[90] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                onClick={() => handleScrollTo(link.href)}
                className={cn(
                  "text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-300",
                  activeSection === link.href ? "text-primary scale-110" : "text-white hover:text-primary"
                )}
              >
                {link.name}
              </motion.button>
            ))}
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
              <Button size="lg" className="mt-8 px-10 py-7 md:py-8 text-sm" onClick={() => handleScrollTo('contact')}>
                Start My Project
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};