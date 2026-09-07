"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, BookOpen } from "lucide-react";
import { timeline, certifications, languages } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";

const iconMap = {
  education: GraduationCap,
  achievement: Trophy,
  coursework: BookOpen,
};

function LanguageBars({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            "h-1.5 w-4 rounded-full " +
            (i < level ? "bg-primary" : "bg-border")
          }
        />
      ))}
    </div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        index="04 — Journey"
        title="Education, milestones & what I'm learning."
        description="The path so far — and the direction I'm heading."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Timeline */}
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const Icon = iconMap[item.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative flex gap-5"
                >
                  <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border/60 bg-background ring-4 ring-background">
                    <div className="grid h-full w-full place-items-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl border border-border/50 bg-card/40 p-5">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <span className="font-mono text-[11px] text-muted-foreground">
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
              );
            })}
          </div>
        </div>

        {/* Certifications + languages */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
              <Trophy className="h-4 w-4 text-primary" />
              Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((c) => (
                <div
                  key={c.title}
                  className="group rounded-2xl border border-border/50 bg-card/40 p-4 transition-colors hover:border-primary/40"
                >
                  <div className="font-medium">{c.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {c.issuer} · {c.category}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
              <BookOpen className="h-4 w-4 text-primary" />
              Languages
            </h3>
            <div className="space-y-3 rounded-2xl border border-border/50 bg-card/40 p-5">
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
