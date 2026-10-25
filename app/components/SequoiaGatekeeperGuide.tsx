"use client";

import React, { useState, useEffect, useRef } from "react";
import { Copy, Check, Download, Terminal, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  { n: "01", title: "Download", desc: "Grab the .dmg or run the curl one-liner." },
  { n: "02", title: "Install", desc: "Drag to /Applications. Strip quarantine if needed." },
  { n: "03", title: "Launch", desc: "Press ⌥Space. Start remembering." },
];

export function SequoiaGatekeeperGuide() {
  const [copied, setCopied] = useState(false);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const curlCmd = "curl -fsSL https://raw.githubusercontent.com/qtttyr/Recall/main/install.sh | bash";

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
          let i = 0;
          const tick = () => {
            if (i <= curlCmd.length) {
              setTyped(curlCmd.slice(0, i));
              i++;
              setTimeout(tick, 28);
            } else {
              setTimeout(() => setDone(true), 400);
            }
          };
          tick();
        },
      });
      gsap.to(".step-card", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(curlCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section ref={sectionRef} id="gatekeeper" className="relative w-full py-28 px-6 sm:px-12 bg-[#e7e7e5] border-b border-[#0a0a0a]/10 select-none overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#0a0a0a]/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-[#0a0a0a]/50" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#0a0a0a]/40 uppercase">
                Install · 02
              </span>
            </div>
            <h2 className="text-[clamp(36px,5vw,72px)] font-bold tracking-[-0.03em] text-[#0a0a0a] leading-[0.95]">
              One line. <span className="text-[#0a0a0a]/30">Zero friction.</span>
            </h2>
          </div>
          <p className="text-sm text-[#0a0a0a]/50 max-w-xs leading-relaxed font-mono">
            Unsigned & open source. The curl install bypasses Gatekeeper quarantine entirely.
          </p>
        </div>

        {/* Terminal window */}
        <div
          ref={termRef}
          className="rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(10,10,10,0.18)] border border-[#0a0a0a]/10 bg-[#0a0a0a] text-[#e7e7e5] mb-10"
        >
          <div className="px-5 py-3 border-b border-[#e7e7e5]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="text-xs font-mono text-[#e7e7e5]/50 pl-2">Terminal — zsh</span>
            </div>
            <Terminal className="w-4 h-4 text-[#e7e7e5]/30" />
          </div>
          <div className="p-6 font-mono text-sm min-h-[120px]">
            <div className="flex items-center gap-2 text-[#e7e7e5]/40 mb-2">
              <span className="text-emerald-400">➜</span>
              <span>~</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#e7e7e5]/60">$</span>
              <span className="text-[#e7e7e5]">{typed}</span>
              {!done && <span className="w-2 h-4 bg-[#e7e7e5] animate-pulse" />}
            </div>
            {done && (
              <div className="mt-4 flex items-center gap-2 text-emerald-400 animate-pulse">
                <Check className="w-4 h-4" />
                <span>Recall installed to /Applications · launching…</span>
              </div>
            )}
          </div>
          <div className="px-5 py-3 border-t border-[#e7e7e5]/10 flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#e7e7e5]/30">One command · No warnings · No Apple ID</span>
            <button
              onClick={copy}
              data-cursor="hover"
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#e7e7e5]/10 hover:bg-[#e7e7e5]/20 text-[11px] font-mono text-[#e7e7e5]/70 hover:text-[#e7e7e5] transition-all"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Step flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="step-card p-6 rounded-2xl bg-[#f2f2f0] border border-[#0a0a0a]/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              <div className="text-[11px] font-mono text-[#0a0a0a]/30 mb-2">{s.n}</div>
              <div className="text-lg font-bold text-[#0a0a0a] mb-1">{s.title}</div>
              <div className="text-xs text-[#0a0a0a]/50 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Alternative: DMG + xattr */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-dashed border-[#0a0a0a]/15">
          <div className="text-xs text-[#0a0a0a]/50 font-mono">
            Prefer DMG? Drag to /Applications, then run{" "}
            <code className="text-[#0a0a0a]/80 bg-[#0a0a0a]/[0.05] px-1.5 py-0.5 rounded">xattr -cr /Applications/Recall.app</code>
          </div>
          <a
            href="https://github.com/qtttyr/Recall/releases/latest"
            data-cursor="hover"
            className="btn-fill flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download .dmg</span>
          </a>
        </div>
      </div>
    </section>
  );
}
