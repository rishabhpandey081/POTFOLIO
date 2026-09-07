"use client";

import * as React from "react";
import { motion } from "framer-motion";

type Props = {
  index: string;
  title: string;
  kicker?: string;
};

export function SectionLabel({ index, title, kicker }: Props) {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-5 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
      >
        <span className="text-primary">{index}</span>
        <span className="h-px flex-1 bg-border/60" />
        {kicker ? <span className="hidden sm:inline">{kicker}</span> : null}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
