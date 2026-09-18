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
  if (isDesktop) return <DesktopShowcase />;
  return <MobileShowcase />;
}

function DesktopShowcase() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const pinRef = React.useRef<HTMLDivElement>(null);
  const rotationRef = React.useRef(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [hintVisible, setHintVisible] = React.useState(true);
  const imgRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  function transformForLocal(local: number) {
    if (local < 0) return { scale: 0.3, x: -220, opacity: 0 };
    if (local > 1) return { scale: 0.3, x: -220, opacity: 0 };
    const cl = Math.max(0, Math.min(1, local));
    const tri = cl <= 0.5 ? cl * 2 : (1 - cl) * 2;
    const scale = 0.3 + tri * 0.7;
    const x = (1 - tri) * -220;
    let opacity: number;
    if (cl < 0.08) opacity = Math.max(0.4, cl / 0.08);
    else if (cl > 0.92) opacity = Math.max(0.4, (1 - cl) / 0.08);
    else opacity = 1;
    return { scale, x, opacity };
  }

  React.useEffect(() => {
    let cleanup = () => {};
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: pin,
          scrub: true,
          onUpdate: (self: { progress: number }) => {
            const p = self.progress;
            rotationRef.current = p;
            if (p > 0.02) setHintVisible(false);
            else setHintVisible(true);
            const count = projects.length;
            const seg = 1 / count;
            const activeIdx = Math.min(count - 1, Math.max(0, Math.floor(p / seg)));
            setActiveIndex((prev) => (prev !== activeIdx ? activeIdx : prev));
            for (let i = 0; i < count; i++) {
              const segStart = i * seg;
              const local = (p - segStart) / seg;
              const t = transformForLocal(local);
              const el = imgRefs.current[i];
              if (el) {
                el.style.transform = `translateX(${t.x}px) scale(${t.scale})`;
                el.style.opacity = `${t.opacity}`;
              }
            }
          },
          onLeaveBack: () => {
            rotationRef.current = 0;
            setActiveIndex(0);
            setHintVisible(true);
            for (let i = 0; i < projects.length; i++) {
              const el = imgRefs.current[i];
              if (el) {
                const t = transformForLocal(i === 0 ? 0 : -1);
                el.style.transform = `translateX(${t.x}px) scale(${t.scale})`;
                el.style.opacity = `${t.opacity}`;
              }
            }
          },
        });
      }, section);
      cleanup = () => { if (ctx) ctx.revert(); };
    })();
    return () => cleanup();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-32">
        <SectionLabel index="03" title="Selected Work" />
      </div>
      <div ref={pinRef} className="relative flex h-screen w-full items-center justify-center">
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-2 items-center gap-8 px-6">
          {/* LEFT — DNA Helix canvas (centered) */}
          <div className="relative flex h-[70vh] items-center justify-center">
            <DNAHelix rotationRef={rotationRef} />
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
          {/* RIGHT — image + text panel */}
          <div className="relative h-[70vh]">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs tabular-nums text-primary">
                0{activeIndex + 1} / 0{projects.length}
              </span>
              <span className="h-px flex-1 bg-border/50" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {projects[activeIndex].featured ? "Featured" : "Project"}
              </span>
            </div>
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-border/40">
              {projects.map((p, i) => {
                const init = transformForLocal(i === 0 ? 0 : -1);
                return (
                  <div
                    key={p.slug}
                    ref={(el) => { imgRefs.current[i] = el; }}
                    className="absolute inset-0 will-change-transform"
                    style={{
                      transform: `translateX(${init.x}px) scale(${init.scale})`,
                      opacity: init.opacity,
                      transition: "none",
                      transformOrigin: "center center",
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
                    <img src={p.image} alt={p.title} className="relative h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                );
              })}
            </div>
            <div className="relative">
              {projects.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={false}
                  animate={{ opacity: i === activeIndex ? 1 : 0, y: i === activeIndex ? 0 : 8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={i === activeIndex ? "" : "pointer-events-none absolute inset-0"}
                >
                  <ProjectText p={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[200vh]" aria-hidden />
    </section>
  );
}

function ProjectText({ p }: { p: (typeof projects)[number] }) {
  return (
    <>
      <h3 className="font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">{p.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{p.subtitle}</p>
      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{p.description}</p>
      <ul className="mt-4 space-y-2">
        {p.highlights.slice(0, 2).map((h) => (
          <li key={h} className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        {p.stack.map((s) => (
          <span key={s} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">{s}</span>
        ))}
      </div>
      <div className="mt-4">
        {p.repo ? (
          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105">
            View repository
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        ) : null}
      </div>
    </>
  );
}

function MobileShowcase() {
  const rotationRef = React.useRef(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    let angle = 0;
    const tick = () => {
      angle += 0.004;
      rotationRef.current = angle / (Math.PI * 2);
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
        <div className="relative mb-6 flex h-[55vh] items-center justify-center">
          <DNAHelix rotationRef={rotationRef} />
        </div>
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums text-primary">0{activeIndex + 1} / 0{projects.length}</span>
          <span className="h-px flex-1 bg-border/50" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{active.featured ? "Featured" : "Project"}</span>
        </div>
        <motion.div
          key={`m-img-${active.slug}`}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-border/40"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${active.accent}`} />
          <img src={active.image} alt={active.title} className="relative h-full w-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div key={`m-txt-${active.slug}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <ProjectText p={active} />
        </motion.div>
      </div>
    </section>
  );
}
