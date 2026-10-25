"use client";

import React from "react";

const TICKER_ITEMS = [
  "⌥SPACE TO SUMMON",
  "768-D EMBEDDING GEMMA",
  "LOCAL VISION OCR PIPELINE",
  "ZERO TELEMETRY EGRESS",
  "APPLE NEURAL ENGINE",
  "SWIFT 6 NATIVE",
  "100% PRIVATE & OFFLINE",
  "QWEN 2.5 0.5B CORE ML",
  "ACCELERATE BLAS MATRIX",
  "MIT LICENSED",
];

export function KineticTicker() {
  return (
    <div className="relative w-full py-3 bg-[#0a0a0a] text-[#e7e7e5] overflow-hidden select-none border-y border-[#0a0a0a]">
      <div className="flex w-max animate-ticker">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 px-6">
            <span className="text-[11px] font-mono tracking-[0.3em] font-semibold whitespace-nowrap">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#e7e7e5]/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
