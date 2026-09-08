"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-border/50">
      {/* Big links block */}
      <div className="grid gap-10 py-16 md:grid-cols-[1fr_1fr] md:gap-16">
        {/* Colophon */}
        <div>
          <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Let&apos;s build
            <br />
            something{" "}
            <span className="text-primary">great</span>.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Always open to internships, freelance work, and ambitious
            collaborations.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block font-display text-xl font-medium tracking-tight link-underline"
          >
            {profile.email}
          </a>
        </div>

        {/* Links index */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "About", href: "#about" },
                { label: "Capabilities", href: "#skills" },
                { label: "Work", href: "#work" },
                { label: "Journey", href: "#journey" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
              Connect
            </p>
            <ul className="space-y-2.5">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                    <ArrowUp className="h-3 w-3 -rotate-45 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-border/40 py-6 sm:flex-row">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
          © {year} {profile.name} · Built in Delhi, India
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 transition-colors hover:text-foreground"
        >
          Back to top
          <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
