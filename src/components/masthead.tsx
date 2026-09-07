"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, ArrowUp, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { profile, navLinks } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

function useActiveSection() {
  const [active, setActive] = React.useState<string>("");
  React.useEffect(() => {
    const ids = ["about", "skills", "work", "journey", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Masthead({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const active = useActiveSection();

  React.useEffect(() => setMounted(true), []);

  const go = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const SidebarContent = (
    <>
      {/* Identity */}
      <div className="mb-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group block text-left"
        >
          <h1 className="font-display text-2xl font-medium leading-tight tracking-tight">
            {profile.firstName}
            <br />
            <span className="text-primary">{profile.lastName}</span>
          </h1>
        </button>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {profile.role}
        </p>
      </div>

      {/* Availability */}
      <div className="mb-8 flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="text-xs text-muted-foreground">
          Available for internships
        </span>
      </div>

      {/* Nav */}
      <nav className="mb-10 flex-1">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          Index
        </p>
        <ul className="space-y-1">
          {navLinks.map((l, i) => {
            const id = l.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className={cn(
                    "group flex w-full items-center gap-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
                    0{i + 1}
                  </span>
                  <span className="relative">
                    {l.label}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Socials */}
      <div className="mb-8">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          Connect
        </p>
        <div className="flex flex-col gap-1.5">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center justify-between text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>{s.label}</span>
              <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-primary">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between border-t border-border/50 pt-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
          {profile.location}
        </span>
        <div className="flex items-center gap-1">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>
          )}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen">
      {/* Desktop fixed sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] flex-col border-r border-border/50 bg-sidebar/50 px-8 py-10 backdrop-blur-sm lg:flex">
        {SidebarContent}
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border/50 bg-background/80 px-5 py-3 backdrop-blur-xl lg:hidden">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-lg font-medium leading-none"
        >
          {profile.firstName}{" "}
          <span className="text-primary">{profile.lastName}</span>
        </button>
        <div className="flex items-center gap-1">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[57px] z-40 bg-background/95 p-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col">{SidebarContent}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — offset for sidebar on desktop */}
      <main className="lg:pl-[280px]">
        <div className="mx-auto max-w-4xl px-5 pt-20 sm:px-8 lg:px-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
