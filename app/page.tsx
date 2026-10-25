"use client";

import React, { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HeroEditorial } from "./components/HeroEditorial";
import { KineticTicker } from "./components/KineticTicker";
import { InteractiveSpotlightSimulator } from "./components/InteractiveSpotlightSimulator";
import { SequoiaGatekeeperGuide } from "./components/SequoiaGatekeeperGuide";
import HalftoneFooter from "./components/HalftoneFooter";
import { KeycapListener } from "./components/KeycapListener";
import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";

export default function Home() {
  const scrollToGatekeeper = () => {
    const el = document.getElementById("gatekeeper");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSimulator = () => {
    const el = document.getElementById("simulator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-slow").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="relative min-h-screen bg-[#e7e7e5] text-[#0a0a0a] selection:bg-[#0a0a0a] selection:text-[#e7e7e5] flex flex-col overflow-x-hidden">
        <Navigation onOpenGatekeeper={scrollToGatekeeper} onOpenSimulator={scrollToSimulator} />
        <HeroEditorial onOpenSimulator={scrollToSimulator} onOpenGatekeeper={scrollToGatekeeper} />
        <KineticTicker />
        <InteractiveSpotlightSimulator />
        <SequoiaGatekeeperGuide />
        <HalftoneFooter />
        <KeycapListener onTrigger={scrollToSimulator} />
      </main>
    </SmoothScroll>
  );
}
