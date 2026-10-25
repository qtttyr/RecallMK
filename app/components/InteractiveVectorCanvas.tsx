"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  kind: "code" | "text" | "link" | "image";
}

const LABELS = [
  { label: "def auth()", kind: "code" },
  { label: "0.94 cosine", kind: "text" },
  { label: "jwt.encode()", kind: "code" },
  { label: "Bearer token", kind: "text" },
  { label: "pgvector:16", kind: "code" },
  { label: "Vision OCR", kind: "image" },
  { label: "IBAN receipt", kind: "image" },
  { label: "huggingface.co", kind: "link" },
  { label: "NPU fp16", kind: "code" },
  { label: "768-D Gemma", kind: "text" },
  { label: "SQLite FTS5", kind: "code" },
  { label: "⌥Space", kind: "text" },
  { label: "CleanShot X", kind: "image" },
  { label: "< 3.8ms", kind: "text" },
  { label: "0 Egress", kind: "text" },
];

export function InteractiveVectorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Click pulse shockwave
    let shockwave: { x: number; y: number; r: number; alpha: number } | null = null;
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      shockwave = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 10,
        alpha: 0.6,
      };
    };
    window.addEventListener("click", handleClick);

    // Initialize nodes
    const nodes: Node[] = LABELS.map((item) => ({
      x: Math.random() * (width - 100) + 50,
      y: Math.random() * (height - 100) + 50,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: item.kind === "code" ? 3 : 2.5,
      label: item.label,
      kind: item.kind as "code" | "text" | "link" | "image",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Expand shockwave
      if (shockwave) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(shockwave.x, shockwave.y, shockwave.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${shockwave.alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();

        shockwave.r += 6;
        shockwave.alpha *= 0.94;
        if (shockwave.alpha < 0.02) shockwave = null;
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Magnetic attraction to cursor
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 1) {
            const force = (180 - dist) / 180;
            n.vx += (dx / dist) * force * 0.08;
            n.vy += (dy / dist) * force * 0.08;
          }
        }

        // Apply friction
        n.vx *= 0.985;
        n.vy *= 0.985;

        // Base drift
        n.x += n.vx;
        n.y += n.vy;

        // Bounce on boundaries
        if (n.x < 30) { n.x = 30; n.vx *= -1; }
        if (n.x > width - 30) { n.x = width - 30; n.vx *= -1; }
        if (n.y < 30) { n.y = 30; n.vy *= -1; }
        if (n.y > height - 30) { n.y = height - 30; n.vy *= -1; }

        // Connect nearby nodes with hairline vectors
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.18;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();

            // Tiny vector metric midpoint for close pairs
            if (dist < 90 && i % 4 === 0) {
              const mx = (n.x + n2.x) / 2;
              const my = (n.y + n2.y) / 2;
              ctx.font = "8px 'SF Mono', monospace";
              ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 2})`;
              ctx.fillText(`${(1 - dist / 140).toFixed(2)}`, mx, my - 3);
            }
          }
        }

        // Draw Node Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0a0a0a";
        ctx.fill();

        // Node Label
        ctx.font = "9px 'SF Mono', Menlo, monospace";
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.fillText(n.label, n.x + 8, n.y + 3);
      }

      // Cursor radar crosshair
      if (mouse.active) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.12)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([2, 2]);
        ctx.stroke();

        ctx.font = "8px 'SF Mono', monospace";
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        ctx.fillText(`NPU RADAR`, mouse.x + 22, mouse.y - 4);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
