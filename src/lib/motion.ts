import type { RefObject } from "react";
import {
  gsap,
  ScrollTrigger,
  SplitText,
  useGSAP,
  prefersReducedMotion,
  EASE,
} from "./gsap";

/**
 * Declarative scroll motion. Mark elements, then call useReveal(scopeRef) once per page.
 *
 *   data-reveal="lines"     headline lines rise out of a mask (SplitText)
 *   data-reveal="fade"      fade + 24px rise
 *   data-reveal="stagger"   each direct child fades up in turn
 *   data-reveal="hairline"  1px rule draws left to right
 *   data-reveal="count"     number counts up (keeps prefix/suffix, e.g. "1,480 km", "500+")
 *   data-reveal="sky"       skyline: [data-sky-photo] wipe up from the ground line
 *                           (0.9s, 60ms stagger), [data-sky-num] fade in 0.55s later
 *   data-reveal="image"     image unmasks upward and settles from 1.08 scale
 *   data-reveal="parallax"  image drifts ±6% while scrolling (desktop only)
 *   data-delay="0.2"        optional extra delay in seconds
 *
 * Everything runs once, is cleaned up on unmount (useGSAP context), and is skipped
 * entirely under prefers-reduced-motion so content is simply shown.
 */
const START = "top 86%";

const delayOf = (el: Element) => Number((el as HTMLElement).dataset.delay ?? 0);

function countUp(el: HTMLElement) {
  const raw = el.dataset.countTo ?? el.textContent ?? "";
  const m = raw.match(/^(\D*)([\d,.]+)(.*)$/);
  if (!m) return;
  const [, prefix, num, suffix] = m;
  const target = Number(num.replace(/,/g, ""));
  const decimals = (num.split(".")[1] ?? "").length;
  const state = { v: 0 };
  const fmt = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  // Years like 2019 should not get a thousands comma or count from zero.
  const isYear = /^(19|20)\d\d$/.test(num);
  if (isYear) state.v = target - 12;
  el.textContent = `${prefix}${isYear ? state.v : fmt.format(0)}${suffix}`;
  gsap.to(state, {
    v: target,
    duration: 1.4,
    ease: EASE.soft,
    delay: delayOf(el),
    scrollTrigger: { trigger: el, start: START, once: true },
    onUpdate: () => {
      el.textContent = `${prefix}${isYear ? Math.round(state.v) : fmt.format(state.v)}${suffix}`;
    },
  });
}

export function useReveal(
  scope: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;
      const q = (sel: string) =>
        Array.from(root.querySelectorAll<HTMLElement>(sel));

      // Lines are split only when the heading reaches the viewport, so page load does
      // not pay for splitting every headline. `aria: "none"`: lines stay real text.
      q('[data-reveal="lines"]').forEach((el) => {
        gsap.set(el, { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: START,
          once: true,
          onEnter: () => {
            const split = SplitText.create(el, {
              type: "lines",
              mask: "lines",
              linesClass: "split-line",
              aria: "none",
            });
            gsap.set(el, { autoAlpha: 1 });
            gsap.from(split.lines, {
              yPercent: 105,
              duration: 1,
              stagger: 0.08,
              delay: delayOf(el),
              onComplete: () => split.revert(),
            });
          },
        });
      });

      q('[data-reveal="fade"]').forEach((el) =>
        gsap.from(el, {
          autoAlpha: 0,
          y: 24,
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: START, once: true },
        }),
      );

      q('[data-reveal="stagger"]').forEach((el) =>
        gsap.from(el.children, {
          autoAlpha: 0,
          y: 24,
          stagger: 0.08,
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: START, once: true },
        }),
      );

      q('[data-reveal="hairline"]').forEach((el) =>
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "0% 50%",
          duration: 1.1,
          ease: EASE.inOut,
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }),
      );

      q('[data-reveal="count"]').forEach(countUp);

      q('[data-reveal="sky"]').forEach((el) => {
        const tl = gsap.timeline({
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
        tl.from(el.querySelectorAll("[data-sky-photo]"), {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 0.9,
          stagger: 0.06,
          ease: EASE.out,
        }).from(
          el.querySelectorAll("[data-sky-num]"),
          {
            autoAlpha: 0,
            y: 8,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          },
          0.55,
        );
      });

      q('[data-reveal="image"]').forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: START, once: true },
        });
        tl.from(el, {
          clipPath: "inset(18% 0% 0% 0%)",
          duration: 1.2,
          ease: EASE.out,
        });
        if (img)
          tl.from(img, { scale: 1.08, duration: 1.6, ease: EASE.out }, 0);
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        q('[data-reveal="parallax"]').forEach((el) => {
          const img = el.querySelector("img") ?? el;
          gsap.fromTo(
            img,
            { yPercent: -6, scale: 1.12 },
            {
              yPercent: 6,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      });

      ScrollTrigger.refresh();
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  );
}
