"use client";

import * as React from "react";
import { motion } from "framer-motion";

type Props = {
  index: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ index, title, description, align = "left" }: Props) {
  return (
    <div
      className={
        align === "center"
          ? "flex flex-col items-center text-center"
          : "flex flex-col items-start"
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-primary"
      >
        <span className="h-px w-8 bg-primary/50" />
        {index}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={
            "mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg" +
            (align === "center" ? " mx-auto" : "")
          }
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
