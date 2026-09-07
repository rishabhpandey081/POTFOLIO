"use client";

import * as React from "react";
import { motion, useInView, animate } from "framer-motion";
import { profile } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";

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
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        index="01 — About"
        title="A developer who ships, not just prototypes."
        description="Turning curiosity into code, and code into products people actually use."
      />

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Avatar + card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border/60 bg-card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5" />
            <img
              src="/images/avatar.png"
              alt="Portrait of Rishabh Pandey"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                {profile.name}
              </div>
              <div className="text-xs text-muted-foreground">{profile.role}</div>
            </div>
          </div>
          {/* floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 top-8 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 backdrop-blur-md shadow-xl"
          >
            <div className="font-mono text-2xl font-bold text-primary">
              <Counter value={61} suffix="+" />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              LeetCode
            </div>
          </motion.div>
        </motion.div>

        {/* Bio + stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Stats grid */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {profile.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border/50 bg-card/50 p-4"
              >
                <div className="font-mono text-2xl font-bold text-foreground sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
