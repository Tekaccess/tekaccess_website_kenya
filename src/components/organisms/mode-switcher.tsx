import { useRef, useState } from "react";
import { Img } from "@/components/atoms/media";
import { Container } from "@/components/atoms/layout";
import { modes } from "@/content/company";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Dark band, Storey's pinned "year line" reimagined: on desktop the section pins while
 * scrolling and steps Truck → Ship → Train; photos and text cross-fade (0.45s, Storey's
 * yl-fade). Tabs are always clickable; on phones and under reduced motion they are
 * plain tabs with no pinning.
 */
export function ModeSwitcher() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const st = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        st.current = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.6}`,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => setActive(Math.min(modes.length - 1, Math.floor(self.progress * modes.length * 0.999))),
        });
        return () => {
          st.current = null;
        };
      });
    },
    { scope: root },
  );

  const choose = (i: number) => {
    const t = st.current;
    if (t) {
      // jump the pinned scroll to the middle of that tab's segment
      window.scrollTo({ top: t.start + ((i + 0.5) / modes.length) * (t.end - t.start), behavior: "smooth" });
    } else setActive(i);
  };

  const m = modes[active];

  return (
    <section
      ref={root}
      aria-labelledby="modes-title"
      className="on-night relative overflow-hidden bg-gradient-to-br from-night to-night-2 text-on-night lg:flex lg:h-screen lg:items-center"
    >
      <Container className="grid gap-10 py-section lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-0">
        <div className="lg:col-span-4">
          <h2 id="modes-title" className="text-h1 font-medium text-white" data-reveal="lines">
            Three ways in. <span className="text-signal">Road, lake and rail.</span>
          </h2>
          <div role="tablist" aria-label="Transport mode" className="mt-10 flex gap-1 border-b border-night-line">
            {modes.map((mo, i) => (
              <button
                key={mo.key}
                role="tab"
                id={`mode-tab-${i}`}
                aria-selected={i === active}
                aria-controls="mode-panel"
                onClick={() => choose(i)}
                className={cn(
                  "relative -mb-px px-4 py-3 text-[0.9375rem] font-medium transition-colors duration-2 first:pl-0",
                  "after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:bg-signal after:transition-transform after:duration-3 first:after:left-0",
                  i === active ? "text-white after:scale-x-100" : "text-on-night/60 after:scale-x-0 hover:text-white",
                )}
              >
                {mo.key}
              </button>
            ))}
          </div>
          <div id="mode-panel" role="tabpanel" aria-labelledby={`mode-tab-${active}`} key={m.key} className="mt-8 animate-fade-in">
            <p className="text-lead font-medium text-white">{m.route}</p>
            <p className="mt-3 max-w-sm text-[0.9375rem]">{m.text}</p>
          </div>
          {/* progress dots for the pinned scroll */}
          <div aria-hidden className="mt-10 hidden items-center gap-2 lg:flex">
            {modes.map((mo, i) => (
              <span key={mo.key} className={cn("h-0.5 rounded-full transition-all duration-3", i === active ? "w-10 bg-signal" : "w-4 bg-night-line")} />
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xs bg-night-2">
            {modes.map((mo, i) => (
              <div
                key={mo.key}
                aria-hidden={i !== active}
                className={cn(
                  "absolute inset-0 transition-[opacity,transform] duration-4 ease-out",
                  i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                )}
              >
                <Img photo={mo.photo} ratio="16/10" sizes="(min-width:1024px) 62vw, 100vw" className="size-full rounded-none" />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/70 to-transparent" />
            <p className="absolute bottom-5 left-5 text-small font-medium text-white tablet:bottom-6 tablet:left-6">
              {String(active + 1).padStart(2, "0")} / {String(modes.length).padStart(2, "0")} · {m.key}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
