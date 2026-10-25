"use client";

import React, { useEffect, useRef } from "react";

// A minimal, unusual hero backdrop: a fine grid of thin lines that gently
// warps toward the cursor. No words, no particles — just a quiet field.
export function GridWarp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const mouse = { x: -1000, y: -1000, active: false };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect ? rect.width : window.innerWidth;
      h = rect ? rect.height : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const gap = 48;
    const cols = Math.ceil(w / gap) + 1;
    const rows = Math.ceil(h / gap) + 1;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(10, 10, 10, 0.07)";
      ctx.lineWidth = 0.6;

      // Vertical lines, warped by cursor
      for (let c = 0; c <= cols; c++) {
        const baseX = c * gap;
        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const baseY = r * gap;
          let x = baseX;
          let y = baseY;
          if (mouse.active) {
            const dx = mouse.x - baseX;
            const dy = mouse.y - baseY;
            const dist = Math.hypot(dx, dy);
            const radius = 180;
            if (dist < radius && dist > 0.1) {
              const force = (1 - dist / radius) * 14;
              x += (dx / dist) * force * 0.35; // subtle horizontal push
              y += (dy / dist) * force * 0.15;
            }
          }
          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Horizontal lines
      for (let r = 0; r <= rows; r++) {
        const baseY = r * gap;
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const baseX = c * gap;
          let x = baseX;
          let y = baseY;
          if (mouse.active) {
            const dx = mouse.x - baseX;
            const dy = mouse.y - baseY;
            const dist = Math.hypot(dx, dy);
            const radius = 180;
            if (dist < radius && dist > 0.1) {
              const force = (1 - dist / radius) * 14;
              x += (dx / dist) * force * 0.15;
              y += (dy / dist) * force * 0.35;
            }
          }
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // A soft spotlight dot at cursor
      if (mouse.active) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        grad.addColorStop(0, "rgba(10, 10, 10, 0.06)");
        grad.addColorStop(1, "rgba(10, 10, 10, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden
    />
  );
}
