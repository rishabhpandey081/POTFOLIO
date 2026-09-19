"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, CheckCircle2, ArrowUpRight, Download, FileText } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FloatingParticles } from "@/components/floating-particles";
import { useToast } from "@/hooks/use-toast";

type Status = "idle" | "loading" | "success";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim() || "Portfolio inquiry";
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("idle");
      toast({ title: "Missing fields", description: "Name, email, and message are required.", variant: "destructive" });
      return;
    }

    try {
      // Call Web3Forms directly from the browser (free plan requires client-side)
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "ec68bf75-a400-4b6a-a13e-edd92411f6a2",
          name,
          email,
          subject: `[Portfolio] ${subject}`,
          message,
          from_name: "Rishabh Pandey Portfolio",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to send message");
      }
      setStatus("success");
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out — I'll reply soon.",
      });
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("idle");
      toast({
        title: "Couldn't send message",
        description:
          err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    { icon: MapPin, label: "Location", value: profile.location, href: null },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <FloatingParticles className="opacity-50" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section label */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="text-primary">05</span>
            <span className="h-px flex-1 bg-border/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl"
          >
            Let&apos;s build
            <br />
            something <span className="text-primary">great</span>.
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {contactItems.map((c) => {
              const Inner = (
                <div className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-card/30 p-4 backdrop-blur-md transition-colors hover:border-primary/40">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="truncate text-sm font-medium">{c.value}</div>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} className="block">
                  {Inner}
                </a>
              ) : (
                <div key={c.label}>{Inner}</div>
              );
            })}

            {/* Socials */}
            <div className="rounded-2xl border border-border/40 bg-card/30 p-5 backdrop-blur-md">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Elsewhere
              </p>
              <div className="flex flex-col gap-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-sm transition-colors hover:text-foreground"
                  >
                    <span>{s.label}</span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/60 group-hover:text-primary">
                      {s.handle}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Download Resume / CV */}
            <div className="rounded-2xl border border-border/40 bg-card/30 p-5 backdrop-blur-md">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Download
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  href="/files/Rishabh_Pandey_Resume.pdf"
                  download
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                >
                  <FileText className="h-4 w-4" />
                  Resume
                  <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a
                  href="/files/Rishabh_Pandey_CV.pdf"
                  download
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <FileText className="h-4 w-4" />
                  CV
                  <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur-md sm:p-8"
          >
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    disabled={status === "loading"}
                    className="h-11 rounded-lg border-border/40 bg-background/30"
                  />
                </Field>
                <Field label="Email" htmlFor="email">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    disabled={status === "loading"}
                    className="h-11 rounded-lg border-border/40 bg-background/30"
                  />
                </Field>
              </div>
              <Field label="Subject" htmlFor="subject">
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  disabled={status === "loading"}
                  className="h-11 rounded-lg border-border/40 bg-background/30"
                />
              </Field>
              <Field label="Message" htmlFor="message">
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, role, or idea..."
                  required
                  rows={6}
                  disabled={status === "loading"}
                  className="rounded-lg border-border/40 bg-background/30"
                />
              </Field>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <span className="absolute right-0 top-0 h-2 w-2 bg-primary" />
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Message sent
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
