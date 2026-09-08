"use client";

import * as React from "react";
import { useIsDesktop } from "@/hooks/use-device-capability";

// Floating particle field using CSS — adds spatial depth.
// Count and opacity adapt to device capability for performance.
const ALL_PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: (i * 53) % 100,
  top: (i * 37) % 100,
  size: 3 + (i % 4) * 2,
  delay: (i * 0.7) % 6,
  duration: 12 + (i % 5) * 3,
}));

export function FloatingParticles({ className }: { className?: string }) {
  const isDesktop = useIsDesktop();
  // Reduce particle count on mobile for performance
  const particles = isDesktop ? ALL_PARTICLES : ALL_PARTICLES.slice(0, 10);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden
    >
      {particles.map((p) => (
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
