"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingIntro() {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    // Shorter on mobile for faster access
    const isMobile = window.innerWidth < 768;
    const t = setTimeout(() => setDone(true), isMobile ? 1200 : 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          {/* ambient glow */}
          <div className="absolute h-[50vh] w-[50vh] rounded-full bg-primary/20 blur-[120px]" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="font-display text-5xl font-medium tracking-tight sm:text-7xl">
              <span className="text-muted-foreground/40">R</span>
              <motion.span
                className="text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                P
              </motion.span>
            </div>
          </motion.div>

          {/* progress bar */}
          <div className="absolute bottom-1/4 h-px w-48 overflow-hidden bg-border/40">
            <motion.div
              className="h-full bg-primary"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-[22%] font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            Loading experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
