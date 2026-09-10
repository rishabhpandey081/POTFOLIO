"use client";

import * as React from "react";
import { motion } from "framer-motion";

const words = [
  "Problem Solving",
  "Disciplined",
  "Creative Thinking",
  "Adaptable",
  "Reliable",
  "Collaborative",
  "Analytical",
  "Detail-Oriented",
];

export function MotionWords() {
  return (
    <section
      aria-label="Attributes"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* separator lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[35%] h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]"
      />

      {/* Center stage — rotating hero word */}
      <div className="relative mx-auto mb-16 max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="text-primary">✦</span> What drives me
        </motion.p>

        <RotatingWord words={words} />
      </div>

      {/* Marquee strip */}
      <div className="relative flex select-none overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...words, ...words].map((w, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="font-display text-2xl font-medium tracking-tight text-foreground/60 sm:text-3xl">
                {w}
              </span>
              <span className="text-primary/40">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2800);
    return () => clearInterval(id);
  }, [words.length]);

  const word = words[index];

  return (
    <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
      <span className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-none tracking-tight text-muted-foreground/50">
        I am
      </span>
      {/* Keyed motion — animates fresh on each word change, always visible */}
      <motion.span
        key={word}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block whitespace-nowrap font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-none tracking-tight text-primary"
        style={{
          textShadow: "0 0 50px oklch(0.72 0.2 300 / 0.5)",
        }}
      >
        {word}
      </motion.span>
    </div>
  );
}
