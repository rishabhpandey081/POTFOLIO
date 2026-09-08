"use client";

import * as React from "react";

/**
 * Detects whether the current device should run the heavy 3D scene.
 * Conservative: only disables on small screens or explicit user preferences.
 */
export function useDeviceCapability() {
  const [capable, setCapable] = React.useState(true);

  React.useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Save data preference
      const conn = navigator as unknown as { connection?: { saveData?: boolean } };
      const saveData = conn.connection?.saveData ?? false;

      setCapable(!isMobile && !prefersReduced && !saveData);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return capable;
}

/** Returns true only on screens >= the given breakpoint (md = 768) */
export function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isDesktop;
}
