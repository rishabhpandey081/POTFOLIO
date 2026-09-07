"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, CheckCircle2, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { SectionLabel } from "@/components/section-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSolid } from "@/components/editorial-buttons";
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
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to send message");
      }
      setStatus("success");
      toast({
        title: "Message sent",
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
    <section id="contact" className="relative py-24 sm:py-32">
      <SectionLabel index="05" title="Contact" kicker="Get in touch" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
          Have a role, a project, or an idea worth chasing? Let&apos;s talk.
        </p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Open to SDE Intern roles, collaborations, and interesting problems. I
          read every message and reply within a day or two.
        </p>
      </motion.div>

      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
        {/* Left — direct contact + socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8"
        >
          <div className="space-y-4">
            {contactItems.map((c) => {
              const Inner = (
                <div className="group flex items-center gap-4 border-b border-border/40 pb-4">
                  <div className="grid h-10 w-10 place-items-center rounded-sm border border-border/50 text-primary">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
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
          </div>

          {/* Socials */}
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
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
                  <span className="link-underline">{s.label}</span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/60 group-hover:text-primary">
                    {s.handle}
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
                  className="h-11 rounded-sm border-border/50 bg-transparent"
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
                  className="h-11 rounded-sm border-border/50 bg-transparent"
                />
              </Field>
            </div>
            <Field label="Subject" htmlFor="subject">
              <Input
                id="subject"
                name="subject"
                placeholder="What's this about?"
                disabled={status === "loading"}
                className="h-11 rounded-sm border-border/50 bg-transparent"
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
                className="rounded-sm border-border/50 bg-transparent"
              />
            </Field>
            <ButtonSolid
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Message sent
                </>
              ) : (
                "Send message"
              )}
            </ButtonSolid>
          </form>
        </motion.div>
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
