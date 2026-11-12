import { useRef, useState } from "react";
import { Container } from "@/components/atoms/layout";
import { Img } from "@/components/atoms/media";
import { journey } from "@/content/company";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Year-line layout for the five handovers. The section is tall and its
 * panel sticks under the header; scroll progress picks the active step. The active
 * photo grows wide and tall, the rest shrink to faded thumbnails on one ground line,
 * and the caption (top right) cross-fades. Steps are also buttons, so click and
 * keyboard work; on phones / reduced motion it is a plain clickable strip.
 */
export function JourneySteps() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const st = useRef<ScrollTrigger | null>(null);
  const n = journey.length;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        st.current = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) =>
            setActive(Math.min(n - 1, Math.floor(self.progress * n))),
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
    if (t)
      window.scrollTo({
        top: t.start + ((i + 0.5) / n) * (t.end - t.start),
        behavior: "smooth",
      });
    else setActive(i);
  };

  const s = journey[active];

  return (
    <section
      ref={root}
      aria-labelledby="journey-title"
      className="relative border-t border-line bg-white lg:h-[200vh] lg:py-16"
    >
      <div className="lg:sticky lg:top-[calc(var(--header-h)+(100vh-var(--header-h))*0.06)] lg:flex lg:flex-col">
        <Container className="flex flex-1 flex-col py-section-sm lg:py-10">
          {/* Title left, live caption right */}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <p className="mb-4 text-label font-medium text-ink">
                The journey
              </p>
              <h2 id="journey-title" className="text-h1 font-medium text-ink">
                End to End Logistics,{" "}
                <span className="block text-quiet">
                  From Source to Final Delivery.
                </span>
              </h2>
            </div>
            <div
              key={active}
              aria-live="polite"
              className="animate-fade-in lg:col-span-4 lg:col-start-9"
            >
              <p className="text-small tabular text-muted">
                Step {String(active + 1).padStart(2, "0")} of{" "}
                {String(n).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-h3 font-medium text-ink">{s.title}</h3>
              <p className="mt-2 text-body text-body">{s.text}</p>
            </div>
          </div>

          {/* Strip: photos stand on one ground line, labels below */}
          <div className="mt-10 flex flex-col lg:mt-[4.5rem]">
            <div className="flex h-[220px] items-end gap-2 tablet:h-[300px] lg:h-[calc((100vh-var(--header-h))*0.442)] lg:gap-3">
              {journey.map((j, i) => {
                const on = i === active;
                return (
                  <button
                    key={j.title}
                    type="button"
                    onClick={() => choose(i)}
                    aria-label={`${j.title}: ${j.text}`}
                    aria-pressed={on}
                    className={cn(
                      "relative overflow-hidden transition-[flex-grow,height,opacity] duration-700 ease-out-expo",
                      on
                        ? "h-full flex-[4] opacity-100"
                        : "h-[38%] flex-1 opacity-50 hover:opacity-80",
                    )}
                  >
                    <Img
                      photo={j.photo}
                      ratio="auto"
                      sizes="(min-width:1024px) 40vw, 60vw"
                      className="size-full rounded-none"
                    />
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 border-t border-[#ECEEF2] pt-3 lg:gap-3">
              {journey.map((j, i) => (
                <button
                  key={j.title}
                  type="button"
                  onClick={() => choose(i)}
                  tabIndex={-1}
                  className={cn(
                    "truncate text-left text-small transition-[flex-grow,color] duration-700 ease-out-expo",
                    i === active
                      ? "flex-[4] font-medium text-ink"
                      : "flex-1 text-muted hover:text-ink",
                  )}
                >
                  {j.title}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
