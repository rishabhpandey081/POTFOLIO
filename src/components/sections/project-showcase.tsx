"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { useIsDesktop } from "@/hooks/use-device-capability";

const DNAHelix = dynamic(
  () => import("@/components/three/dna-helix").then((m) => m.DNAHelix),
  { ssr: false, loading: () => null }
);

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

export function ProjectShowcase() {
  const isDesktop = useIsDesktop();
  // Mobile uses auto-rotate, desktop uses scroll-driven rotation
  if (isDesktop) return <DesktopShowcase />;
  return <MobileShowcase />;
}

/* ───────────────────── DESKTOP: pinned scroll-driven ───────────────────── */

function DesktopShowcase() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const pinRef = React.useRef<HTMLDivElement>(null);
  const rotationRef = React.useRef(0);
  // activeIndex tracks which project is currently revealed (0..projects.length-1)
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [scrollStarted, setScrollStarted] = React.useState(false);
  const [hintVisible, setHintVisible] = React.useState(true);
  const gsapRef = React.useRef<typeof import("gsap") | null>(null);

  React.useEffect(() => {
    let st: unknown;
    let cleanup = () => {};
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsapRef.current = gsap;

      ctx = gsap.context(() => {
        // Pin the panel and drive rotation 0→1 over the scroll
        st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: pin,
          scrub: true,
          onUpdate: (self: { progress: number }) => {
            const p = self.progress;
            rotationRef.current = p; // 0→1 maps to full 360° in the canvas
            if (p > 0.02) {
              setScrollStarted(true);
              setHintVisible(false);
            } else {
              setHintVisible(true);
            }
            // Determine active project based on progress splits
            const count = projects.length;
            // give each project an equal slice, with a small overlap at edges
            const idx = Math.min(count - 1, Math.floor(p * count * 0.999));
            setActiveIndex(idx);
          },
          onLeaveBack: () => {
            rotationRef.current = 0;
            setActiveIndex(0);
            setHintVisible(true);
          },
        });
      }, section);

      cleanup = () => {
        if (ctx) ctx.revert();
      };
    })();

    return () => cleanup();
  }, []);

  const active = projects[activeIndex];

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-32">
        <SectionLabel index="03" title="Selected Work" />
      </div>

      {/* Pinned panel — stays fixed while scrolling through 300% height */}
      <div ref={pinRef} className="relative h-screen w-full">
        <div className="mx-auto grid h-full max-w-6xl grid-cols-2 items-center gap-8 px-6">
          {/* LEFT — DNA Helix canvas */}
          <div className="relative h-[70vh]">
            <DNAHelix rotationRef={rotationRef} />
            {/* "Scroll to rotate" hint — fades out on scroll */}
            <motion.div
              animate={{ opacity: hintVisible ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                ✦ Scroll to rotate
              </p>
            </motion.div>
          </div>

          {/* RIGHT — image + text panel that crossfades per project */}
          <div className="relative h-[70vh]">
            <ProjectPanel project={active} index={activeIndex} total={projects.length} />
          </div>
        </div>
      </div>

      {/* spacer so the page can scroll through the pinned section */}
      <div className="h-[200vh]" aria-hidden />
    </section>
  );
}

/* ─── RIGHT panel: counter + image + title/description/bullets ─── */
function ProjectPanel({
  project: p,
  index: i,
  total,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Counter */}
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-xs tabular-nums text-primary">
          0{i + 1} / 0{total}
        </span>
        <span className="h-px flex-1 bg-border/50" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {p.featured ? "Featured" : "Project"}
        </span>
      </div>

      {/* Image — crossfades/slides on project change */}
      <motion.div
        key={`img-${p.slug}`}
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -60, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-border/40"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
        <img
          src={p.image}
          alt={p.title}
          className="relative h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </motion.div>

      {/* Title / subtitle / description */}
      <motion.div
        key={`txt-${p.slug}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <h3 className="font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
          {p.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{p.subtitle}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
          {p.description}
        </p>

        {/* highlights */}
        <ul className="mt-4 space-y-2">
          {p.highlights.slice(0, 2).map((h) => (
            <li
              key={h}
              className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {h}
            </li>
          ))}
        </ul>

        {/* stack + repo */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4">
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
        </div>
      </motion.div>
    </div>
  );
}

/* ───────────────────── MOBILE: auto-rotate, stacked ───────────────────── */

function MobileShowcase() {
  const rotationRef = React.useRef(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    let angle = 0;
    const tick = () => {
      angle += 0.004; // gentle auto-rotate
      rotationRef.current = angle / (Math.PI * 2); // normalize to 0..1+ cycles
      // cycle the active project every ~5s
      const cycle = (angle / (Math.PI * 2)) % projects.length;
      const idx = Math.floor(cycle) % projects.length;
      setActiveIndex(idx);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const active = projects[activeIndex];

  return (
    <section id="work" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="03" title="Selected Work" />

        {/* DNA canvas on top */}
        <div className="relative mb-6 h-[55vh]">
          <DNAHelix rotationRef={rotationRef} />
        </div>

        {/* Counter */}
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums text-primary">
            0{activeIndex + 1} / 0{projects.length}
          </span>
          <span className="h-px flex-1 bg-border/50" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {active.featured ? "Featured" : "Project"}
          </span>
        </div>

        {/* Image */}
        <motion.div
          key={`m-img-${active.slug}`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-border/40"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${active.accent}`} />
          <img
            src={active.image}
            alt={active.title}
            className="relative h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          key={`m-txt-${active.slug}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-display text-2xl font-medium leading-tight tracking-tight">
            {active.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{active.subtitle}</p>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            {active.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {active.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70"
              >
                {s}
              </span>
            ))}
          </div>
          {active.repo ? (
            <a
              href={active.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
            >
              View repository
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
