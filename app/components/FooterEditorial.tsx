"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function FooterEditorial() {
  return (
    <footer className="relative w-full bg-[#e7e7e5] py-20 px-6 sm:px-12 border-t border-[#0a0a0a]/10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#0a0a0a]/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#0a0a0a]/10">
              <Image src="/icon.png" alt="Recall" width={32} height={32} />
            </div>
            <div>
              <span className="font-bold text-[#0a0a0a] tracking-tight text-base block">RECALL</span>
              <span className="text-[11px] font-mono text-[#0a0a0a]/40">Local-first neural clipboard for macOS</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-mono text-[#0a0a0a]/60">
            <a href="https://github.com/qtttyr/Recall" target="_blank" rel="noopener noreferrer" data-cursor="hover" className="hover:text-[#0a0a0a] transition-colors flex items-center gap-1">
              <span>GitHub Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
            </a>
            <a href="https://github.com/qtttyr/Recall/releases" target="_blank" rel="noopener noreferrer" data-cursor="hover" className="hover:text-[#0a0a0a] transition-colors flex items-center gap-1">
              <span>Releases (.dmg)</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
            </a>
            <a href="https://github.com/qtttyr/Recall/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" data-cursor="hover" className="hover:text-[#0a0a0a] transition-colors">
              MIT License
            </a>
          </div>
        </div>

        <div className="overflow-x-auto py-4 select-all opacity-85">
          <pre className="text-[9px] sm:text-[11px] font-mono leading-tight text-[#0a0a0a]/70">
{`
██████╗ ███████╗ ██████╗ █████╗ ██╗     ██╗     
██╔══██╗██╔════╝██╔════╝██╔══██╗██║     ██║     
██████╔╝█████╗  ██║     ███████║██║     ██║     
██╔══██╗██╔══╝  ██║     ██╔══██║██║     ██║     
██║  ██║███████╗╚██████╗██║  ██║███████╗███████╗
╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝
`}
          </pre>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#0a0a0a]/40">
          <div>
            <span>© 2026 Recall · Independent Open Source software</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Core ML · EmbeddingGemma 2 · Vision OCR · Swift 6</span>
            <span>·</span>
            <span>Made for Apple Silicon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
