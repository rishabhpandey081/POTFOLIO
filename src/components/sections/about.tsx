"use client";

import * as React from "react";
import { motion, useInView, animate, useScroll, useTransform } from "framer-motion";
import { profile } from "@/lib/portfolio-data";
import { SectionLabel } from "@/components/section-label";
import { FloatingParticles } from "@/components/floating-particles";

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
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 sm:py-32">
      <FloatingParticles className="opacity-80" />
      <div className="relative z-10">
      <SectionLabel index="01" title="About" kicker="Profile" />

      {/* Opening statement — drop-cap editorial style */}
      <motion.div
        style={{ y: parallaxY }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16"
      >
        {/* Left rail — meta */}
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
              Based in
            </p>
            <p className="mt-1 font-display text-lg font-medium tracking-tight">
              {profile.location}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
              Status
            </p>
            <p className="mt-1 flex items-center gap-2 font-display text-lg font-medium tracking-tight">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to internships
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
              Focus
            </p>
            <p className="mt-1 font-display text-lg font-medium tracking-tight">
              Software / Cloud / Automation
            </p>
          </div>
        </div>

        {/* Right — statement + bio */}
        <div>
          <p className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            I build automation solutions, AI-integrated applications, and
            cloud-native systems that turn ambitious ideas into shipped,
            scalable products.
          </p>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats — editorial index strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/50 bg-border/50 sm:grid-cols-4"
      >
        {profile.stats.map((s) => (
          <div key={s.label} className="bg-background p-5">
            <div className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}
