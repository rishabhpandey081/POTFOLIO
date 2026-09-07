"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { skillGroups, coreStrengths } from "@/lib/portfolio-data";
import { SectionLabel } from "@/components/section-label";

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
    <section id="skills" className="relative py-24 sm:py-32">
      <SectionLabel index="02" title="Capabilities" kicker="Toolkit" />

      {/* marquee */}
      <div className="relative mb-16 flex select-none overflow-hidden border-y border-border/40 py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="font-display text-xl font-medium tracking-tight text-foreground/70">
                {item}
              </span>
              <span className="text-primary/40">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* skill groups — editorial index list */}
      <div className="divide-y divide-border/40 border-y border-border/40">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.04 }}
            className="group grid gap-4 py-6 transition-colors hover:bg-foreground/[0.02] md:grid-cols-[0.35fr_0.65fr] md:gap-8"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground/50">
                0{gi + 1}
              </span>
              <h3 className="font-display text-lg font-medium tracking-tight">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* core strengths */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-12 flex flex-col gap-4 rounded-sm border border-border/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="flex items-baseline gap-3">
          <span className="text-primary">★</span>
          <h3 className="font-display text-lg font-medium tracking-tight">
            Core strengths
          </h3>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {coreStrengths.map((s) => (
            <span key={s} className="text-sm text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
