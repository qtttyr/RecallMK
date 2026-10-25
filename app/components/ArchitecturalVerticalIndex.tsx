"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ArchitectureTab } from "./types";

const TABS: ArchitectureTab[] = [
  {
    id: "gemma",
    index: "01",
    title: "768-D Multilingual Space",
    subtitle: "EmbeddingGemma 2 Core ML",
    description:
      "Maps English, Russian, and programming syntax into one continuous spherical vector space. Sentences with zero shared words match naturally on the Apple Neural Engine in under 4ms.",
    metric: "768 Dimensions",
    metricLabel: "L2-normalized continuous spherical projection",
  },
  {
    id: "ocr",
    index: "02",
    title: "Local Vision OCR Pipeline",
    subtitle: "Apple Vision Framework",
    description:
      "Every screenshot and copied image is inspected on-device. VNRecognizeTextRequest extracts Russian and English text directly from pixels and indexes it into SQLite FTS5.",
    metric: "0 Bytes Egress",
    metricLabel: "OCR runs 100% on Apple Silicon hardware",
  },
  {
    id: "assistant",
    index: "03",
    title: "On-Device Query Assistant",
    subtitle: "Qwen 2.5 0.5B Core ML",
    description:
      "Lightweight local language model for vague or conversational memories. Extracts technical synonyms in 400ms without network calls. Zero battery consumption when idle.",
    metric: "< 400 MB RAM",
    metricLabel: "Ultra-lean memory footprint on 8 GB+ Macs",
  },
  {
    id: "storage",
    index: "04",
    title: "Sovereign Mac Storage",
    subtitle: "SQLite + Vector BLOB",
    description:
      "Concealed passwords, transient drags, and excluded applications are automatically ignored. Everything stays locked inside ~/Library/Application Support/Recall.",
    metric: "100% Private",
    metricLabel: "Local database with zero remote telemetry",
  },
  {
    id: "paste",
    index: "05",
    title: "Keyboard-First Velocity",
    subtitle: "AppKit + Accessibility",
    description:
      "Press ⌥Space from anywhere. Press ↵ to copy and close. Press ⌘↵ to automatically post ⌘V into the frontmost application. Zero mouse interaction required.",
    metric: "⌥Space // ⌘↵",
    metricLabel: "Instant keyboard summon and direct auto-paste",
  },
];

export function ArchitecturalVerticalIndex() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const active = TABS[activeTabIdx];

  return (
    <section className="relative w-full py-24 px-6 sm:px-12 bg-[#e7e7e5] border-b border-[#0a0a0a]/10 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#0a0a0a]/50 block mb-2">
              02 // SYSTEM CAPABILITIES
            </span>
            <h2 className="text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#0a0a0a]">
              Architectural Invariants.
            </h2>
          </div>
          <p className="text-xs font-mono text-[#0a0a0a]/40 text-right hidden md:block">
            SWISS PRECISION // APPLE SILICON NATIVE
          </p>
        </div>

        <div className="rounded-3xl border border-[#0a0a0a]/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-[#f2f2f0] shadow-[0_10px_40px_rgba(10,10,10,0.04)]">
          <div className="lg:col-span-8 p-8 sm:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#0a0a0a]/10 bg-[#e7e7e5]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0a0a0a] text-[#e7e7e5] font-semibold">
                  {active.index}
                </span>
                <span className="text-xs font-mono tracking-widest text-[#0a0a0a]/50 uppercase">
                  {active.subtitle}
                </span>
              </div>

              <h3 className="text-[clamp(28px,3vw,44px)] font-bold text-[#0a0a0a] mb-4 tracking-tight">
                {active.title}
              </h3>

              <p className="text-base sm:text-lg text-[#0a0a0a]/70 leading-relaxed font-normal max-w-xl">
                {active.description}
              </p>
            </div>

            <div className="pt-12 mt-12 border-t border-[#0a0a0a]/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <div className="text-[clamp(28px,3vw,44px)] font-bold font-mono text-[#0a0a0a]">
                  {active.metric}
                </div>
                <div className="text-xs font-mono text-[#0a0a0a]/50 uppercase tracking-wider mt-1">
                  {active.metricLabel}
                </div>
              </div>

              <div className="text-xs font-mono text-[#0a0a0a]/40">
                <span>RECALL.APP // NATIVE SWIFT 6</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col divide-y divide-[#0a0a0a]/[0.06] bg-[#f2f2f0]">
            {TABS.map((tab, idx) => {
              const isSelected = activeTabIdx === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabIdx(idx)}
                  data-cursor="hover"
                  className={`p-6 text-left transition-all flex items-center justify-between group cursor-none ${
                    isSelected
                      ? "bg-[#e7e7e5] text-[#0a0a0a] font-bold shadow-sm"
                      : "hover:bg-[#0a0a0a]/[0.02] text-[#0a0a0a]/60 hover:text-[#0a0a0a]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#0a0a0a]/40 group-hover:text-[#0a0a0a]">
                      {tab.index}
                    </span>
                    <div>
                      <div className="text-sm font-semibold tracking-tight">{tab.title}</div>
                      <div className="text-[11px] font-mono text-[#0a0a0a]/40">{tab.subtitle}</div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "text-[#0a0a0a] translate-x-1" : "text-[#0a0a0a]/20 group-hover:text-[#0a0a0a]/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
