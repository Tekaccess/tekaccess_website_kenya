import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

gsap.defaults({ ease: "expo.out", duration: 0.9 });
ScrollTrigger.config({ ignoreMobileResize: true });

// Sky-rise curve: cubic-bezier(0.2, 0.7, 0.1, 1). GSAP has no bezier ease
// without CustomEase, and expo.out is visually indistinguishable at 0.9s.
export const EASE = { out: "expo.out", inOut: "power3.inOut", soft: "power2.out" } as const;

// Fonts and late images change layout height; re-measure scroll triggers once they settle.
if (typeof window !== "undefined") {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
