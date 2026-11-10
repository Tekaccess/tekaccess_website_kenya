import { useEffect, useState, useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** "up" | "down" scroll direction plus whether we are past a threshold (for the sticky header). */
export function useScrollState(threshold = 24) {
  const [state, setState] = useState({ scrolled: false, hidden: false });
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > last + 4;
        const goingUp = y < last - 4;
        setState((s) => {
          const scrolled = y > threshold;
          // Hide only once well past the fold, show immediately on any upward scroll.
          const hidden = goingDown && y > 480 ? true : goingUp || y < 480 ? false : s.hidden;
          return s.scrolled === scrolled && s.hidden === hidden ? s : { scrolled, hidden };
        });
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return state;
}
