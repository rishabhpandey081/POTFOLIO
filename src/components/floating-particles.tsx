"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// Lightweight floating particle field using CSS 3D — no WebGL overhead
// Adds spatial depth to section backgrounds
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: (i * 53) % 100,
  top: (i * 37) % 100,
  size: 3 + (i % 4) * 2,
  delay: (i * 0.7) % 6,
  duration: 12 + (i % 5) * 3,
}));

export function FloatingParticles({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden
    >
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-primary/30 blur-[1px]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `ambient ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
