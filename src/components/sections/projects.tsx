"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { FloatingParticles } from "@/components/floating-particles";

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

export function Projects() {
  return (
    <section id="work" className="relative overflow-hidden py-32">
      <FloatingParticles className="opacity-40" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionLabel index="03" title="Selected Work" />

        <div className="flex flex-col gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  index: i,
  total,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  const handleMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      ry: (px - 0.5) * 10,
      rx: -(py - 0.5) * 10,
      mx: px * 100,
      my: py * 100,
    });
  };

  const reset = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });

  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.08 }}
      className="group relative"
      style={{ perspective: 1200 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="relative grid overflow-hidden rounded-3xl border border-border/40 bg-card/30 backdrop-blur-md transition-all duration-300 hover:border-primary/40 md:grid-cols-2"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out",
        }}
      >
        {/* cursor glow */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(500px circle at ${tilt.mx}% ${tilt.my}%, oklch(0.72 0.15 162 / 0.15), transparent 60%)`,
          }}
        />

        {/* Image */}
        <div
          className="relative aspect-[16/10] overflow-hidden md:aspect-auto"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
          <img
            src={p.image}
            alt={p.title}
            className="relative h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-background/50 px-2.5 py-1 font-mono text-[10px] tabular-nums text-foreground/80 backdrop-blur-sm">
            0{i + 1} / 0{total}
          </span>
        </div>

        {/* Content */}
        <div
          className="flex flex-col justify-between gap-6 p-6 sm:p-8"
          style={{ transform: "translateZ(50px)" }}
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
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

          <div className="mt-4">
            <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6">
              {p.repo ? (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105"
                >
                  View repository
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              ) : null}
              <button
                onClick={() => go("#contact")}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Discuss
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
