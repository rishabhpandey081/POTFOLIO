"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { skillGroups, coreStrengths } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";

const marqueeItems = [
  "React.js",
  "Node.js",
  "Express.js",
  "Java",
  "Python",
  "OpenCV",
  "Gemini API",
  "Tailwind CSS",
  "MySQL",
  "AWS",
  "Docker",
  "TypeScript",
  "JavaScript",
  "REST APIs",
  "Web Speech API",
  "Haar Cascades",
];

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      {/* marquee strip */}
      <div className="relative mb-20 flex select-none overflow-hidden border-y border-border/40 py-5">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-2xl font-semibold tracking-tight text-foreground/80 sm:text-3xl">
                {item}
              </span>
              <span className="text-primary/50">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02 — Skills"
          title="A toolkit built for shipping AI products."
          description="From low-level algorithms in Java to high-level AI orchestration — here's what I work with day to day."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 transition-colors hover:border-primary/40"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-4 flex items-center gap-2">
                <span className="font-mono text-xs text-primary">
                  0{gi + 1}
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border/50 bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core strengths */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8"
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="font-mono text-xs text-primary">★</span>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Core Strengths
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {coreStrengths.map((s) => (
              <span
                key={s}
                className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
