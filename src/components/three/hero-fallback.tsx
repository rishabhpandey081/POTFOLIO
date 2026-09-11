"use client";

import * as React from "react";

/**
 * Lightweight CSS-only 3D-style hero background for mobile/low-power devices.
 * Mimics the emerald crystal aesthetic without WebGL overhead.
 */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* central animated orb */}
      <div
        className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[480px] max-w-[480px] -translate-x-1/2 -translate-y-1/2 animate-ambient"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.78 0.16 162 / 0.7), oklch(0.68 0.13 185 / 0.3) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(20px)",
        }}
      />
      {/* inner glow core */}
      <div
        className="absolute left-1/2 top-1/2 h-[30vw] w-[30vw] max-h-[240px] max-w-[240px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, oklch(0.9 0.12 150 / 0.9), oklch(0.78 0.16 162 / 0.4) 50%, transparent 80%)",
          borderRadius: "50%",
          filter: "blur(8px)",
          animation: "ambient 8s ease-in-out infinite",
        }}
      />
      {/* orbiting accent dots */}
      <div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ animation: "orbit1 6s linear infinite" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/60"
        style={{ animation: "orbit2 9s linear infinite" }}
      />
    </div>
  );
}
