"use client";
import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINK = 150;
    let w = 0, h = 0, raf = 0;
    const pts = Array.from({ length: innerWidth < 768 ? 35 : 70 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 2e-4, vy: (Math.random() - 0.5) * 2e-4,
    }));
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) { p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1; }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        ctx.fillStyle = "rgba(115,87,255,0.8)";
        ctx.fillRect(a.x * w - 1.5, a.y * h - 1.5, 3, 3);
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(115,87,255,${0.28 * (1 - d / LINK)})`;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      if (!still && !document.hidden) raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    const onVisibility = () => { if (!document.hidden && !still) { cancelAnimationFrame(raf); draw(); } };
    addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
