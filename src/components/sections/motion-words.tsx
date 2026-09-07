"use client";

import * as React from "react";
import { motion } from "framer-motion";

const words = [
  "Problem Solving",
  "Disciplined",
  "Creative Thinking",
  "Analytical",
  "Adaptable",
  "Detail-Oriented",
  "Reliable",
  "Collaborative",
];

export function MotionWords() {
  return (
    <section
      aria-label="Attributes"
      className="relative flex select-none overflow-hidden py-10"
    >
      {/* soft separator lines that fade at edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

      {/* edge fades for the marquee text */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

      <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14">
        {[...words, ...words].map((w, i) => (
          <div key={i} className="flex items-center gap-14">
            <motion.span
              initial={{ opacity: 0.6 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-2xl font-medium tracking-tight text-foreground/70 sm:text-3xl"
            >
              {w}
            </motion.span>
            <span className="text-primary/40">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
