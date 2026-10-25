"use client";

import React, { useEffect, useRef, useState } from "react";
import { Download, ArrowDown } from "lucide-react";
import { GridWarp } from "./GridWarp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroEditorialProps {
  onOpenSimulator: () => void;
  onOpenGatekeeper: () => void;
}

export function HeroEditorial({ onOpenSimulator }: HeroEditorialProps) {
  const wordRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Staggered letter reveal on mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Scroll-driven cinematic exit
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const section = wordRef.current?.closest("section");
    if (!section || !wordRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(wordRef.current, {
        scale: 0.85,
        opacity: 0.15,
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const letters = "RECALL".split("");

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] bg-[#e7e7e5] select-none overflow-hidden flex flex-col">
      <GridWarp />

      {/* Top eyebrow */}
      <div className="relative z-10 px-6 sm:px-12 pt-6 sm:pt-8 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#0a0a0a]/40 uppercase">
          v0.1.0 · macOS 15+
        </span>
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#0a0a0a]/40 uppercase hidden sm:block">
          Apple Silicon · 100% offline
        </span>
      </div>

      {/* Center giant wordmark */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <h1
          ref={wordRef}
          className="font-bold tracking-[-0.06em] text-[#0a0a0a] leading-none transition-transform duration-700 ease-out"
          style={{ fontSize: "clamp(96px, 22vw, 320px)" }}
          aria-label="RECALL"
        >
          {letters.map((ch, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${i * 70}ms`,
              }}
            >
              {ch}
            </span>
          ))}
        </h1>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 px-6 sm:px-12 pb-8 sm:pb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-md">
            <p className="text-[clamp(15px,1.4vw,20px)] text-[#0a0a0a]/70 leading-snug font-normal">
              A quieter clipboard. A memory you can ask for.
            </p>
            <p className="text-[12px] font-mono text-[#0a0a0a]/40 mt-2 tracking-wide">
              Press ⌥Space anywhere. Finds it by meaning — even across languages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/qtttyr/Recall/releases/latest"
              data-cursor="hover"
              className="btn-fill"
            >
              <Download className="w-4 h-4" />
              <span>Download .dmg</span>
            </a>
            <button
              onClick={onOpenSimulator}
              data-cursor="hover"
              className="mag-btn"
            >
              <span>Summon ⌥Space</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-[#0a0a0a]/40 uppercase">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
