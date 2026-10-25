"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, FileCode, FileText, Link2, ImageIcon, Check } from "lucide-react";
import { MemoryItem } from "./types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const SIMULATED_ITEMS: MemoryItem[] = [
  { id: "1", kind: "code", title: "def create_access_token(data, expires_delta)", body: "jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)", app: "Cursor", time: "18m", score: 0.94 },
  { id: "2", kind: "text", title: "Памятка: Bearer-токен и HS256", body: "В middleware проверять Authorization: Bearer <token>", app: "Notes", time: "42m", score: 0.89 },
  { id: "3", kind: "code", title: "docker run pgvector/pgvector:pg16", body: "HNSW indexing, cosine <=> , Core ML pipelines", app: "Terminal", time: "2h", score: 0.82 },
  { id: "4", kind: "link", title: "huggingface.co/…/embeddinggemma-2-coreml", body: "768-dim multilingual, Apple Neural Engine, fp16", app: "Safari", time: "1d", score: 0.78 },
  { id: "5", kind: "image", title: "Screenshot · IBAN receipt", body: "Vision OCR: KZ49601… · KZT 42,500", app: "CleanShot", time: "1d", score: 0.74 },
];

export function InteractiveSpotlightSimulator() {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = SIMULATED_ITEMS.filter((item) => {
    if (!query.trim()) return true;
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return tokens.some((t) =>
      item.title.toLowerCase().includes(t) ||
      item.body.toLowerCase().includes(t) ||
      item.app.toLowerCase().includes(t)
    );
  });

  const handleCopy = (item: MemoryItem) => {
    navigator.clipboard.writeText(item.body);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Typing animation on scroll into view
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const target = "sql token auth";
          let i = 0;
          const tick = () => {
            if (i <= target.length) {
              setQuery(target.slice(0, i));
              i++;
              setTimeout(tick, 55);
            }
          };
          tick();
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // 3D tilt
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1400px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    };
    const onLeave = () => { card.style.transform = "perspective(1400px) rotateY(0) rotateX(0)"; };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
  }, []);

  // Animate rows
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rows = document.querySelectorAll(".demo-row");
    gsap.fromTo(rows, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out", clearProps: "transform" });
    const bars = document.querySelectorAll(".demo-bar");
    bars.forEach((bar) => {
      const score = bar.getAttribute("data-score") || "0";
      gsap.to(bar, { width: score + "%", duration: 0.7, ease: "power2.out", delay: 0.1 });
    });
  }, [query]);

  const kindIcon = (k: MemoryItem["kind"]) => {
    if (k === "code") return <FileCode className="w-3.5 h-3.5" />;
    if (k === "text") return <FileText className="w-3.5 h-3.5" />;
    if (k === "link") return <Link2 className="w-3.5 h-3.5" />;
    return <ImageIcon className="w-3.5 h-3.5" />;
  };

  return (
    <section ref={sectionRef} id="simulator" className="relative w-full py-24 px-6 sm:px-12 bg-[#e7e7e5] border-b border-[#0a0a0a]/10 select-none overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Minimal header */}
        <div className="flex items-center gap-3 mb-8">
          <Image src="/images/neural-core.svg" alt="" width={28} height={28} className="opacity-60" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#0a0a0a]/40 uppercase">Live · 01</span>
          <span className="h-px flex-1 bg-[#0a0a0a]/10" />
        </div>

        {/* 3D card — skeletal */}
        <div ref={cardRef} className="transition-transform duration-200 ease-out will-change-transform" style={{ transformStyle: "preserve-3d" }}>
          <div className="rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(10,10,10,0.15)] border border-[#0a0a0a]/10 bg-[#fafafa]">
            {/* Search */}
            <div className="p-5 border-b border-[#0a0a0a]/[0.06] bg-white flex items-center gap-3">
              <Search className="w-4 h-4 text-[#0a0a0a]/40 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by meaning..."
                className="w-full bg-transparent text-[#0a0a0a] text-sm outline-none placeholder:text-[#0a0a0a]/30 font-sans font-medium"
              />
              {query && (
                <button onClick={() => setQuery("")} data-cursor="hover" className="text-[10px] font-mono text-[#0a0a0a]/40 hover:text-[#0a0a0a]">
                  clear
                </button>
              )}
            </div>

            {/* Results — skeletal */}
            <div className="divide-y divide-[#0a0a0a]/[0.04] max-h-[300px] overflow-y-auto bg-white/70">
              {filtered.length === 0 ? (
                <div className="py-10 text-center text-xs text-[#0a0a0a]/30 font-mono">no memories</div>
              ) : (
                filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleCopy(item)}
                    data-cursor="hover"
                    className="demo-row p-3.5 flex items-center gap-3 cursor-none hover:bg-[#0a0a0a]/[0.02] transition-colors"
                    style={{ opacity: 0, transform: "translateY(12px)" }}
                  >
                    <div className="w-7 h-7 rounded-md bg-[#0a0a0a]/[0.05] flex items-center justify-center flex-shrink-0 text-[#0a0a0a]/60">
                      {kindIcon(item.kind)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-[#0a0a0a] truncate">{item.title}</div>
                      <div className="text-[10px] font-mono text-[#0a0a0a]/40 truncate">{item.app} · {item.time}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-10 h-1 rounded-full bg-[#0a0a0a]/10 overflow-hidden hidden sm:block">
                        <div className="demo-bar h-full bg-[#0a0a0a] rounded-full" style={{ width: "0%" }} data-score={Math.round(item.score * 100)} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#0a0a0a]/60 w-8 text-right">
                        {copiedId === item.id ? <Check className="w-3 h-3 inline text-emerald-600" /> : `${Math.round(item.score * 100)}%`}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-[10px] font-mono text-[#0a0a0a]/30 tracking-wide">
          ↵ copy · ⌘↵ paste · esc close
        </p>
      </div>
    </section>
  );
}
