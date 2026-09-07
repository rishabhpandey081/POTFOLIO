"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Editorial primary button ──
   A refined inline block with an animated arrow that travels
   on hover. Not a generic filled pill. */
type PrimaryProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  arrow?: boolean;
};

export function ButtonPrimary({
  children,
  onClick,
  href,
  className,
  arrow = true,
}: PrimaryProps) {
  const inner = (
    <span className="group relative inline-flex items-center gap-2.5">
      <span className="relative">
        <span className="relative z-10">{children}</span>
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
      </span>
      {arrow ? (
        <span className="relative grid h-4 w-4 place-items-center overflow-hidden">
          <ArrowUpRight className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:-translate-y-4" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      ) : null}
    </span>
  );

  const cls = cn(
    "inline-flex items-center text-sm font-medium tracking-tight text-foreground",
    className
  );

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

/* ── Solid accent button — used very sparingly ──
   A precise filled block with a corner accent and a subtle
   press depth. */
type SolidProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export function ButtonSolid({
  children,
  onClick,
  type = "button",
  disabled,
  className,
}: SolidProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md bg-foreground px-5 py-3 text-sm font-medium tracking-tight text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
    >
      {/* corner accent */}
      <span className="absolute right-0 top-0 h-2 w-2 bg-primary" />
      {children}
    </motion.button>
  );
}

/* ── Ghost / outlined button ──
   Thin border, restrained. Fills subtly on hover with a
   horizontal sweep. */
type GhostProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export function ButtonGhost({
  children,
  onClick,
  href,
  className,
}: GhostProps) {
  const cls = cn(
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-border/70 px-5 py-3 text-sm font-medium tracking-tight text-foreground transition-colors hover:border-foreground/40",
    className
  );
  const inner = (
    <>
      <span className="absolute inset-0 -z-0 translate-y-full bg-foreground/[0.04] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
      <span className="relative z-10">{children}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
