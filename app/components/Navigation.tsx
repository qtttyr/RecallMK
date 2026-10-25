"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface NavigationProps {
  onOpenGatekeeper: () => void;
  onOpenSimulator: () => void;
}

export function Navigation({ onOpenGatekeeper, onOpenSimulator }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full px-6 sm:px-12 py-5 flex items-center justify-between select-none transition-all duration-500 ${
        scrolled
          ? "bg-[#e7e7e5]/80 backdrop-blur-xl border-b border-[#0a0a0a]/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <a href="#" className="flex items-center gap-2.5 group" data-cursor="hover">
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-[#0a0a0a]/15 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-4deg]">
            <Image src="/icon.png" alt="Recall icon" width={28} height={28} priority />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-[#0a0a0a]">RECALL</span>
        </a>
        <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-[#0a0a0a]/[0.05] text-[#0a0a0a]/60 border border-[#0a0a0a]/[0.08]">
          macOS 15+
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-6 text-[10px] font-mono tracking-[0.18em] text-[#0a0a0a]/40">
        <span>768-D EMBEDDINGS</span>
        <span className="text-[#0a0a0a]/15">/</span>
        <span>APPLE NEURAL ENGINE</span>
        <span className="text-[#0a0a0a]/15">/</span>
        <span>ZERO CLOUD EGRESS</span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
        <button
          onClick={onOpenSimulator}
          data-cursor="hover"
          className="hidden sm:inline-block text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors cursor-none"
        >
          [ SUMMON ⌥SPACE ]
        </button>

        <button
          onClick={onOpenGatekeeper}
          data-cursor="hover"
          className="text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors cursor-none"
        >
          [ GATEKEEPER ]
        </button>

        <a
          href="https://github.com/qtttyr/Recall"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors hidden md:flex items-center gap-1"
        >
          <span>GITHUB</span>
          <ArrowUpRight className="w-3 h-3 opacity-50" />
        </a>

        <a
          href="https://github.com/qtttyr/Recall/releases/latest"
          data-cursor="hover"
          className="btn-fill"
        >
          <span>Download .dmg</span>
          <span className="text-[10px] font-mono opacity-40 pl-1 border-l border-current/20">M1–M4</span>
        </a>
      </div>
    </header>
  );
}
