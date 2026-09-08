"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { profile, navLinks } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

function useActiveSection() {
  const [active, setActive] = React.useState("");
  React.useEffect(() => {
    const ids = ["about", "skills", "work", "journey", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

export function FloatingNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const active = useActiveSection();
  const { scrollY } = useScroll();
  const lastY = React.useRef(0);

  React.useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
    if (v > lastY.current && v > 300) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastY.current = v;
  });

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop floating nav */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: hidden ? -100 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-2xl items-center justify-between gap-2 rounded-full border px-3 py-2 transition-all duration-500",
            scrolled
              ? "border-border/40 bg-background/60 shadow-2xl shadow-black/20 backdrop-blur-2xl"
              : "border-transparent bg-background/30 backdrop-blur-lg"
          )}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5 rounded-full pl-2"
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-primary/15 font-mono text-xs font-bold text-primary ring-1 ring-primary/30">
              {profile.initials}
              <span className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              {profile.firstName}
            </span>
          </button>

          {/* Center nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((l) => {
              const id = l.href.replace("#", "");
              const isActive = active === id;
              return (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-foreground/8"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground"
              >
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
            )}
            <button
              onClick={() => go("#contact")}
              className="hidden h-8 items-center rounded-full bg-foreground px-4 text-xs font-medium text-background transition-transform hover:scale-105 sm:flex"
            >
              Hire me
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-border/40 bg-background/90 p-3 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("#contact")}
              className="mt-1 block w-full rounded-2xl bg-foreground px-4 py-3 text-center text-sm font-medium text-background"
            >
              Hire me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
