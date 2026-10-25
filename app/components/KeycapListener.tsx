"use client";

import React, { useState, useEffect } from "react";

interface KeycapListenerProps {
  onTrigger: () => void;
}

export function KeycapListener({ onTrigger }: KeycapListenerProps) {
  const [altDown, setAltDown] = useState(false);
  const [spaceDown, setSpaceDown] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.key === "Alt") setAltDown(true);
      if (e.code === "Space") {
        setSpaceDown(true);
        if (e.altKey) {
          e.preventDefault();
          setTriggered(true);
          onTrigger();
          setTimeout(() => setTriggered(false), 1200);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.altKey && e.key === "Alt") setAltDown(false);
      if (e.code === "Space") setSpaceDown(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onTrigger]);

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2.5 p-2 rounded-2xl bg-[#e7e7e5]/90 backdrop-blur-xl border border-[#0a0a0a]/10 shadow-[0_12px_32px_rgba(10,10,10,0.08)] select-none transition-all">
      <span className="text-[10px] font-mono text-[#0a0a0a]/40 pl-2">PRESS</span>

      <div
        className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs font-semibold flex items-center gap-1 transition-all duration-100 ${
          altDown
            ? "bg-[#0a0a0a] text-[#e7e7e5] border-[#0a0a0a] translate-y-0.5 shadow-none"
            : "bg-[#f2f2f0] text-[#0a0a0a] border-[#0a0a0a]/15 shadow-[0_2px_0_rgba(10,10,10,0.15)]"
        }`}
      >
        <span>⌥</span>
        <span className="text-[10px]">option</span>
      </div>

      <span className="text-[#0a0a0a]/30 font-mono text-xs">+</span>

      <div
        className={`px-4 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all duration-100 ${
          spaceDown
            ? "bg-[#0a0a0a] text-[#e7e7e5] border-[#0a0a0a] translate-y-0.5 shadow-none"
            : "bg-[#f2f2f0] text-[#0a0a0a] border-[#0a0a0a]/15 shadow-[0_2px_0_rgba(10,10,10,0.15)]"
        }`}
      >
        <span>space</span>
      </div>

      <button
        onClick={onTrigger}
        data-cursor="hover"
        className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold transition-all cursor-none ${
          triggered
            ? "bg-emerald-600 text-white"
            : "bg-[#0a0a0a] text-[#e7e7e5] hover:bg-[#0a0a0a]/85"
        }`}
      >
        {triggered ? "SUMMONED!" : "TEST"}
      </button>
    </div>
  );
}
