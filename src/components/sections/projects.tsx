"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { SectionLabel } from "@/components/section-label";
import { ButtonPrimary } from "@/components/editorial-buttons";

export function Projects() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <SectionLabel index="03" title="Selected Work" kicker="Projects" />

      <div className="flex flex-col">
        {projects.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative grid gap-8 border-t border-border/50 py-12 md:grid-cols-[0.45fr_0.55fr] md:gap-12"
          >
            {/* Left — image */}
            <div className="relative overflow-hidden rounded-sm border border-border/40">
              <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
              <img
                src={p.image}
                alt={p.title}
                className="relative aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/[0.04]" />
              {/* index marker */}
              <span className="absolute left-3 top-3 font-mono text-[10px] tabular-nums text-background/90 mix-blend-difference">
                0{i + 1} / 0{projects.length}
              </span>
            </div>

            {/* Right — content */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    {p.featured ? "Featured" : "Project"}
                  </span>
                  <span className="h-px flex-1 bg-border/50" />
                </div>
                <h3 className="font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.subtitle}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {p.highlights.slice(0, 3).map((h) => (
                    <li
                      key={h}
                      className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack + links */}
              <div className="mt-6">
                <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  {p.repo ? (
                    <ButtonPrimary href={p.repo}>
                      View repository
                    </ButtonPrimary>
                  ) : null}
                  <button
                    onClick={() =>
                      document
                        .querySelector("#contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Discuss
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
