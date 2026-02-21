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
  { name: "About", href: "about" }, // New About Link
  { name: "Process", href: "process" },
  { name: "Pricing", href: "pricing" },
  { name: "Work", href: "work" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playClick } = useClickSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out",
          isScrolled ? "py-4" : "py-8"
        )}
      >
        <div className="container mx-auto px-6">
          <div className={cn(
            "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500",
            isScrolled
              ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]"
              : "bg-transparent border border-transparent"
          )}>
            <Link
              href="/"
              onClick={playClick}
              className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 cursor-pointer"
            >
              <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
              </div>
              VERTEX<span className="text-primary">WEB</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.href)}
                  className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}

              <Button
                variant="primary"
                size="sm"
                className="gap-2 px-6 py-2.5 text-[10px] font-black tracking-widest uppercase"
                onClick={() => handleScrollTo('contact')}
              >
                Start a Project <ArrowRight size={14} />
              </Button>
            </div>

            <button
              className="md:hidden text-white p-2 cursor-pointer"
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[90] bg-black/98 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScrollTo(link.href)}
                className="text-4xl font-black text-white hover:text-primary transition-colors uppercase tracking-tighter cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <Button
              size="lg"
              className="mt-4 px-12 py-8 text-sm"
              onClick={() => handleScrollTo('contact')}
            >
              Start My Project
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};