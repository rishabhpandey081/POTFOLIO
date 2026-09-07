"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  const year = new Date().getFullYear();
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-auto border-t border-border/40 bg-background/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 font-mono text-sm font-bold text-primary ring-1 ring-primary/30">
              {profile.initials}
            </span>
            <div>
              <div className="text-sm font-semibold">{profile.name}</div>
              <div className="text-xs text-muted-foreground">
                © {year} · Built with care
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="rounded-full border border-border/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* To top */}
          <motion.button
            whileHover={{ y: -2 }}
            onClick={toTop}
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-4 py-2 text-xs font-medium transition-colors hover:bg-accent"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <span>Designed & engineered by {profile.firstName}</span>
          <Heart className="h-3 w-3 fill-primary text-primary" />
          <span>· React Three Fiber · Next.js</span>
        </div>
      </div>
    </footer>
  );
}
