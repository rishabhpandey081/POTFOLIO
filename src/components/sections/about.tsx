"use client";

import * as React from "react";
import { motion, useInView, animate } from "framer-motion";
import { profile } from "@/lib/portfolio-data";
import { SectionLabel } from "@/components/section-label";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
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
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <SectionLabel index="01" title="About" kicker="Profile" />

      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border/50">
            <img
              src="/images/avatar.png"
              alt="Portrait of Rishabh Pandey"
              className="h-full w-full object-cover grayscale-[0.15] transition-all duration-700 hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
          {/* caption strip */}
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
            <span>Fig. 01 — Portrait</span>
            <span>2025</span>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* opening statement with drop-cap feel */}
          <p className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            I build AI-integrated web applications and real-time computer vision
            systems that turn ambitious ideas into shipped products.
          </p>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {profile.bio.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* stats — editorial index style */}
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/50 bg-border/50 sm:grid-cols-4">
            {profile.stats.map((s) => (
              <div key={s.label} className="bg-background p-4">
                <div className="font-display text-3xl font-medium tracking-tight">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
