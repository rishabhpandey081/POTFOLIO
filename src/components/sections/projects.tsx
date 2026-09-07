"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        index="03 — Work"
        title="Selected projects, built end to end."
        description="A mix of AI-integrated web platforms and real-time computer vision systems — each shipped, not just prototyped."
      />

      <div className="mt-14 flex flex-col gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <TiltCard
              max={6}
              className="group relative grid gap-0 overflow-hidden rounded-3xl border border-border/50 bg-card/40 transition-colors hover:border-primary/40 md:grid-cols-2"
            >
              {/* Image */}
              <div
                className="relative aspect-[16/10] overflow-hidden md:aspect-auto"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.accent}`}
                />
                <img
                  src={p.image}
                  alt={p.title}
                  className="relative h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div
                className="flex flex-col justify-between gap-6 p-6 sm:p-8"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
              >
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="font-mono text-xs text-primary">
                      0{i + 1}
                    </span>
                    {p.featured ? (
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-primary/10 text-primary"
                      >
                        Featured
                      </Badge>
                    ) : null}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {p.highlights.slice(0, 3).map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-border/50 bg-background/40 px-2 py-1 text-[10px] font-medium text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://github.com/rishabh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-2 text-xs font-medium transition-colors hover:bg-accent"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Source
                    </a>
                    <button
                      onClick={() =>
                        document
                          .querySelector("#contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                    >
                      Case study
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
