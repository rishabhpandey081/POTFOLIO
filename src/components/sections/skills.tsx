"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { skillGroups, coreStrengths } from "@/lib/portfolio-data";
import { FloatingParticles } from "@/components/floating-particles";

const marqueeItems = [
  "React.js",
  "Node.js",
  "Java",
  "Python",
  "OpenCV",
  "Gemini API",
  "AWS",
  "Docker",
  "TypeScript",
  "MySQL",
  "Tailwind CSS",
  "REST APIs",
];

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-5 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
      >
        <span className="text-primary">{index}</span>
        <span className="h-px flex-1 bg-border/60" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-32">
      <FloatingParticles className="opacity-40" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionLabel index="02" title="Capabilities" />

        {/* marquee */}
        <div className="relative mb-16 flex select-none overflow-hidden border-y border-border/30 py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="font-display text-xl font-medium tracking-tight text-foreground/60">
                  {item}
                </span>
                <span className="text-primary/30">/</span>
              </div>
            ))}
          </div>
        </div>

        {/* skill groups — glass cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-card/50"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative mb-4 flex items-baseline gap-2">
                <span className="font-mono text-[10px] text-primary">0{gi + 1}</span>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  {group.category}
                </h3>
              </div>
              <div className="relative flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border/40 bg-background/30 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur-md sm:p-8"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="text-primary">★</span>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Core strengths
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {coreStrengths.map((s) => (
              <span
                key={s}
                className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium"
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
