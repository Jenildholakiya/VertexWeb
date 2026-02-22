"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";
import { useClickSound } from "@/hooks/useClickSound";

const navLinks = [
  { name: "Services", href: "services" },
  { name: "About", href: "about" },
  { name: "Process", href: "process" },
  { name: "Pricing", href: "pricing" },
  { name: "Work", href: "work" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playClick } = useClickSound();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (targetId: string) => {
    playClick();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
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
            <Link href="/" onClick={playClick} className="text-lg md:text-xl font-bold tracking-tighter text-white flex items-center gap-2">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-lg bg-primary flex items-center justify-center">
                <div className="h-1.5 w-1.5 md:h-2 md:w-2 bg-white rounded-full animate-pulse" />
              </div>
              VERTEX<span className="text-primary">WEB</span>
            </Link>

            {/* Desktop & Tablet Navigation: Balanced spacing for iPad size */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.href)}
                  className="text-[11px] xl:text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <Button
                variant="primary"
                size="sm"
                className="gap-2 px-5 py-2.5 text-[10px] font-black tracking-widest uppercase"
                onClick={() => handleScrollTo('contact')}
              >
                Start a Project <ArrowRight size={14} />
              </Button>
            </div>

            {/* Mobile/Tablet Burger Menu (shown below 1024px) */}
            <button
              className="lg:hidden text-white p-2"
              aria-label="menu"
              onClick={() => { playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScrollTo(link.href)}
                className="text-3xl md:text-5xl font-black text-white hover:text-primary transition-colors uppercase tracking-tighter"
              >
                {link.name}
              </button>
            ))}
            <Button size="lg" className="mt-4 px-10 py-7 md:py-8 text-sm" onClick={() => handleScrollTo('contact')}>
              Start My Project
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};