"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: profile.location, href: null },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      {/* glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -z-10 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
      />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05 — Contact"
          title="Let's build something."
          description="Open to SDE Intern roles, collaborations, and interesting problems. Drop a message — I read every one."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between gap-8 rounded-3xl border border-border/50 bg-card/40 p-7"
          >
            <div>
              <h3 className="text-lg font-semibold">Get in touch</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer email or a quick call? Reach me directly through any of
                these channels.
              </p>
            </div>
            <div className="space-y-3">
              {contactItems.map((c) => {
                const Inner = (
                  <div className="flex items-center gap-4 rounded-2xl border border-border/50 bg-background/40 p-4 transition-colors hover:border-primary/40">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
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

            <div className="flex flex-wrap gap-2">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="rounded-full border border-border/50 bg-background/40 px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-border/50 bg-card/40 p-7"
          >
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your name" required disabled={status === "loading"} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required disabled={status === "loading"} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Subject
                </label>
                <Input id="subject" name="subject" placeholder="What's this about?" disabled={status === "loading"} />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, role, or idea..."
                  required
                  rows={5}
                  disabled={status === "loading"}
                />
              </div>
              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full rounded-xl"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
