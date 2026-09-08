"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { timeline, certifications, languages } from "@/lib/portfolio-data";
import { SectionLabel } from "@/components/section-label";
import { FloatingParticles } from "@/components/floating-particles";

function LanguageBars({ level }: { level: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            "h-2 w-2 rounded-full " +
            (i < level ? "bg-primary" : "bg-border")
          }
        />
      ))}
    </div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden py-24 sm:py-32">
      <FloatingParticles className="opacity-30" />
      <SectionLabel index="04" title="Journey" kicker="Education & more" />

      <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative flex gap-6"
              >
                <div className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary bg-background" />
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-medium tracking-tight">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
                      {item.period}
                    </span>
                  </div>
                  <div className="mb-2 text-sm text-primary">{item.org}</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  {item.details ? (
                    <ul className="mt-3 space-y-1.5">
                      {item.details.map((d) => (
                        <li
                          key={d}
                          className="flex gap-2 text-xs text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications + languages */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="text-primary">◆</span>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Certifications
              </h3>
              <span className="h-px flex-1 bg-border/50" />
            </div>
            <div className="divide-y divide-border/40 border-y border-border/40">
              {certifications.map((c) => (
                <div
                  key={c.title}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-foreground/[0.02]"
                >
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {c.issuer}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    {c.category}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="text-primary">◆</span>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Languages
              </h3>
              <span className="h-px flex-1 bg-border/50" />
            </div>
            <div className="space-y-4">
              {languages.map((l) => (
                <div
                  key={l.name}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-medium">{l.name}</span>
                  <LanguageBars level={l.level} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
