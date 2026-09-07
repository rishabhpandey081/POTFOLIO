"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { VoiceIntroPlayer } from "@/components/voice-player";
import { ButtonPrimary } from "@/components/editorial-buttons";

export function Hero() {
  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden py-20">
      {/* subtle ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[60vh] w-[60vh] rounded-full bg-primary/[0.07] blur-[140px] animate-ambient"
      />

      {/* section index */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
      >
        <span>00 — Introduction</span>
        <span className="h-px flex-1 bg-border/60" />
        <span className="hidden sm:inline">{profile.location}</span>
      </motion.div>

      {/* Display name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display text-[clamp(3rem,11vw,8.5rem)] font-medium leading-[0.92] tracking-tight"
      >
        Rishabh
        <br />
        <span className="text-primary">Pandey</span>
        <span className="text-primary">.</span>
      </motion.h1>

      {/* Role + descriptor row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="mt-8 grid gap-8 border-t border-border/50 pt-8 md:grid-cols-[1.4fr_1fr]"
      >
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A full-stack developer & AI engineer crafting{" "}
          <span className="text-foreground">AI-integrated web applications</span>{" "}
          and real-time computer vision systems. Currently studying B.Tech IT in
          Delhi, and shipping products that work — not just prototypes.
        </p>
        <div className="flex flex-col gap-3 md:items-end md:text-right">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
            Focus
          </span>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {["Full-Stack", "Applied AI", "Computer Vision"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/60 px-3 py-1 text-xs text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Voice intro + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              ✦ Voice introduction
            </span>
            <span className="h-px flex-1 bg-border/40" />
          </div>
          <div className="max-w-xl">
            <VoiceIntroPlayer src="/audio/intro.wav" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <ButtonPrimary onClick={() => go("#work")}>View selected work</ButtonPrimary>
          <ButtonPrimary onClick={() => go("#contact")} arrow={false}>
            Get in touch
          </ButtonPrimary>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => go("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-0 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70 transition-colors hover:text-foreground md:flex"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
        Scroll to read
      </motion.button>
    </section>
  );
}
