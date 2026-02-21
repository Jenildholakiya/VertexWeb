"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { SectionHeader } from "@/ui/SectionHeader";
import { Mail, Send, Zap, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";
import { useTypewriterSound } from "@/hooks/useTypewriterSound";

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { playClick } = useClickSound();
  const { playType } = useTypewriterSound();
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    playClick();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbwtDc1vJp0ajfNV63vaeRg998o6-yiRRhDXA272unKhRRB2ExMOtBoIy6HHv6e1tOI/exec", {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      setStatus("success");
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("idle");
      alert("Submission failed. Please email team.vertexweb@gmail.com directly.");
    }
  };

  return (
    <section id="contact" className="container mx-auto px-6 py-24 relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
        <div className="space-y-8">
          <SectionHeader align="left" subtitle="Start the Journey" title="Launch your professional presence in days." />
          <p className="text-zinc-400 text-lg max-w-md leading-relaxed">Ready to grow confidently? We handle the technical hassle so you can focus on your business.</p>
          <div className="space-y-6">
            <a href="mailto:team.vertexweb@gmail.com" onClick={playClick} className="flex items-center gap-4 text-white group cursor-pointer">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20"><Mail className="text-primary" size={20} /></div>
              <div>
                <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Official Email</p>
                <p className="font-medium text-zinc-300">team.vertexweb@gmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-4 text-white group">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center transition-colors group-hover:bg-accent/20"><Zap className="text-accent" size={20} /></div>
              <div>
                <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Rapid Turnaround</p>
                <p className="font-medium text-zinc-300 font-medium leading-relaxed">Idea to Launch in 7-10 Days</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
          <Card className="p-8 bg-white/[0.02] backdrop-blur-md border-white/10 min-h-[500px] flex flex-col justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form key="contact-form" ref={formRef} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Name</label>
                      <input name="user_name" required type="text" placeholder="Hardik" onKeyDown={playType} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors cursor-text" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Email</label>
                      <input name="user_email" required type="email" placeholder="email@example.com" onKeyDown={playType} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors cursor-text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Phone Number</label>
                      <input name="user_phone" required type="tel" placeholder="+91 00000 00000" onKeyDown={playType} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors cursor-text" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Subject</label>
                    <input name="user_subject" required type="text" placeholder="Project Inquiry" onKeyDown={playType} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors cursor-text" />
                  </div>

                  <div className="space-y-2 relative">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Project Type</label>
                    <select name="project_type" onClick={playClick} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer">
                      <option>Website Development</option>
                      <option>Landing Page</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Message</label>
                    <textarea name="message" required rows={4} placeholder="Describe your goals..." onKeyDown={playType} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors resize-none cursor-text" />
                  </div>

                  <Button disabled={status === "sending"} variant="primary" className="w-full py-6 group text-sm font-bold uppercase tracking-widest">
                    {status === "sending" ? <Loader2 className="animate-spin mx-auto" /> : <>Start My Project <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} /></>}
                  </Button>
                </motion.form>
              ) : (
                <motion.div key="success-screen" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 relative">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}><CheckCircle2 size={48} className="text-primary" /></motion.div>
                      <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white tracking-tight">Inquiry Received!</h3>
                  <p className="text-zinc-400 max-w-[280px] mx-auto text-sm">Expect a response at team.vertexweb@gmail.com within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors mx-auto cursor-pointer"><ArrowLeft size={12} />Send another inquiry</button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};