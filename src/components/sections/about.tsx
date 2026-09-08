"use client";

import * as React from "react";
import { motion, useInView, animate, useScroll, useTransform } from "framer-motion";
import { profile } from "@/lib/portfolio-data";
import { FloatingParticles } from "@/components/floating-particles";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-32">
      <FloatingParticles className="opacity-60" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section label */}
        <motion.div
          style={{ y: y2 }}
          className="mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="text-primary">01</span>
          <span className="h-px flex-1 bg-border/60" />
          <span>Profile</span>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16">
          {/* Left — glass stat cards */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {profile.stats.map((s, i) => (
                <div
                  key={s.label}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-md transition-colors hover:border-primary/40"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative font-display text-3xl font-medium tracking-tight sm:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="relative mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* meta card */}
            <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-md">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Location
                  </span>
                  <span className="font-medium">{profile.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Status
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Open to work
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Focus
                  </span>
                  <span className="font-medium">Cloud · Automation</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — statement + bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="font-display text-balance text-3xl font-medium leading-snug tracking-tight sm:text-4xl md:text-5xl">
              I build{" "}
              <span className="text-primary">automation solutions</span> and
              AI-integrated systems that scale.
            </h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              {profile.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
