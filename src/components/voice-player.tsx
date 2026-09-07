"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const BAR_COUNT = 28;

export function VoiceIntroPlayer({ src }: { src: string }) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0); // 0..1
  const [duration, setDuration] = React.useState(0);
  const [current, setCurrent] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onMeta = () => {
      setDuration(a.duration || 0);
      setReady(true);
    };
    const onTime = () => {
      setCurrent(a.currentTime);
      setProgress(a.duration ? a.currentTime / a.duration : 0);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
      setCurrent(0);
    };
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
    }
  };

  const fmt = (s: number) => {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="group relative flex items-center gap-4 rounded-xl border border-border/60 bg-card/40 p-3 pr-5 backdrop-blur-sm transition-colors hover:border-foreground/30">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Play / pause */}
      <button
        onClick={toggle}
        aria-label={playing ? "Pause introduction" : "Play introduction"}
        className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? (
          <Pause className="h-4 w-4" fill="currentColor" />
        ) : (
          <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
        )}
        {playing ? (
          <span className="absolute inset-0 -z-0 animate-ping rounded-full bg-foreground/30" />
        ) : null}
      </button>

      {/* Waveform */}
      <div className="flex h-8 flex-1 items-center gap-[3px]">
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const active = i / BAR_COUNT <= progress;
          const base = 0.2 + Math.abs(Math.sin(i * 1.3)) * 0.8;
          return (
            <span
              key={i}
              className={cn(
                "flex-1 rounded-full transition-colors duration-200",
                active ? "bg-primary" : "bg-foreground/20"
              )}
              style={{
                height: `${base * 100}%`,
                animation: playing
                  ? `wave ${0.8 + (i % 5) * 0.12}s ease-in-out ${i * 0.04}s infinite`
                  : undefined,
                transformOrigin: "center",
              }}
            />
          );
        })}
      </div>

      {/* Time */}
      <div className="hidden items-center gap-1.5 font-mono text-[11px] tabular-nums text-muted-foreground sm:flex">
        <Volume2 className="h-3 w-3" />
        <AnimatePresence mode="wait">
          <motion.span
            key={playing ? "cur" : "dur"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {playing ? `${fmt(current)} / ${fmt(duration)}` : ready ? fmt(duration) : "--:--"}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
