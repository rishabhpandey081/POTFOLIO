"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { VoiceIntroPlayer } from "@/components/voice-player";

export function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const orbOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* CSS-only animated energy orb — no WebGL, never crashes */}
      <motion.div
        style={{ scale: orbScale, opacity: orbOpacity }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <CSSOrb />
      </motion.div>

      {/* gradient vignette for legibility */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/30 via-transparent to-background/70" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 flex justify-center"
        >
          <div className="flex items-center gap-2.5 rounded-full border border-border/40 bg-background/30 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs text-foreground/80">
              Available for SDE internships
            </span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-[clamp(3.5rem,12vw,9rem)] font-medium leading-[0.9] tracking-tight"
        >
          Rishabh
          <br />
          <span className="text-white">Pandey</span>
        </motion.h1>

        {/* Role */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-white/90 sm:text-sm"
        >
          <span>Software Developer</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span>Cloud Engineer</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span>Automation</span>
        </motion.div>

        {/* Voice intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-10 max-w-xl"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              ✦ Voice introduction
            </span>
          </div>
          <VoiceIntroPlayer src="/audio/intro.wav" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => go("#work")}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            View selected work
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </button>
          <button
            onClick={() => go("#contact")}
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/30 px-6 py-3 text-sm font-medium backdrop-blur-md transition-colors hover:bg-foreground/5"
          >
            Get in touch
          </button>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
        >
          <MapPin className="h-3 w-3" />
          {profile.location}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: textOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-primary/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * Pure CSS animated energy orb — emerald glow with wireframe feel.
 * No WebGL, no Three.js, never crashes the server.
 */
function CSSOrb() {
  return (
    <div className="relative h-[60vh] w-[60vh] max-h-[600px] max-w-[600px]">
      {/* outer glow */}
      <div
        className="absolute inset-0 rounded-full animate-ambient"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.78 0.16 162 / 0.6), oklch(0.5 0.13 162 / 0.2) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      {/* core orb */}
      <div
        className="absolute inset-[15%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, oklch(0.85 0.12 150 / 0.9), oklch(0.72 0.16 162 / 0.4) 50%, transparent 80%)",
          filter: "blur(10px)",
          animation: "ambient 8s ease-in-out infinite",
        }}
      />
      {/* wireframe ring */}
      <div
        className="absolute inset-[10%] rounded-full border border-primary/30"
        style={{ animation: "spin 20s linear infinite" }}
      />
      <div
        className="absolute inset-[20%] rounded-full border border-primary/20"
        style={{ animation: "spin 15s linear infinite reverse" }}
      />
      {/* orbiting dots */}
      <div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ animation: "orbit1 6s linear infinite" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/60"
        style={{ animation: "orbit2 9s linear infinite" }}
      />
    </div>
  );
}
