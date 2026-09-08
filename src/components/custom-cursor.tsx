"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  React.useEffect(() => {
    // Only enable on fine pointers (desktop)
    if (window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
      document.documentElement.classList.add("custom-cursor-active");
    } else {
      return;
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor='hover'], input, textarea, select, [role='button']"
      );
      setHovering(Boolean(interactive));
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
    >
      {/* outer ring */}
      <motion.div
        className="absolute rounded-full border border-primary/60"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: hidden ? 0 : 1,
          backgroundColor: hovering
            ? "oklch(0.78 0.16 162 / 12%)"
            : "oklch(0.78 0.16 162 / 0%)",
          borderColor: hovering
            ? "oklch(0.78 0.16 162 / 90%)"
            : "oklch(0.78 0.16 162 / 50%)",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 350 }}
      />
      {/* inner dot */}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-primary"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 0 : 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 600 }}
      />
    </div>
  );
}
