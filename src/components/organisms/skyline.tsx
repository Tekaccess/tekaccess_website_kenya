import { Link } from "react-router-dom";
import { Img } from "@/components/atoms/media";
import type { Project } from "@/content/projects";
import { projectName } from "@/content/projects";
import { cn, formatNumber } from "@/lib/utils";

const CAPTION_H = "4.25rem"; // fixed so the ground line sits exactly under every photo

/**
 * Project skyline: photo columns stand on one
 * continuous ink ground line, height proportional to route distance, sorted short to
 * tall. Columns wipe up from the ground (0.9s, 60ms stagger), km labels fade in 0.55s
 * later. Phones: horizontal snap-scroll with the same proportions and line.
 */
export function Skyline({
  items,
  height = "clamp(300px, 38vw, 540px)",
  compact,
  className,
  priority,
  fullBleed,
}: {
  items: Project[];
  height?: string;
  compact?: boolean;
  className?: string;
  priority?: boolean;
  /** Ground line runs edge to edge across the viewport; the section must clip overflow. */
  fullBleed?: boolean;
}) {
  const max = Math.max(...items.map((c) => c.km));
  const minShare = 0.34; // the shortest column still reads as a building, not a stub

  return (
    <div className={className}>
      <div className="no-scrollbar -mx-gutter snap-x snap-mandatory scroll-px-gutter overflow-x-auto px-gutter lg:mx-0 lg:overflow-visible lg:px-0">
        <div
          data-reveal="sky"
          className="relative flex w-max items-end gap-3 tablet:gap-4 lg:grid lg:w-full lg:gap-5"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          <span
            aria-hidden
            className={cn("absolute inset-x-0 h-px bg-line", fullBleed && "lg:left-1/2 lg:right-auto lg:w-[100vw] lg:-translate-x-1/2")}
            style={{ bottom: CAPTION_H }}
          />
          {items.map((c, i) => {
            const share = minShare + (1 - minShare) * (c.km / max);
            return (
              <Link
                key={c.slug}
                to={`/projects/${c.slug}`}
                className="group/col flex w-[46vw] shrink-0 snap-start flex-col sm:w-[30vw] tablet:w-[23vw] lg:w-auto"
              >
                <div className="flex flex-col justify-end" style={{ height }}>
                  <p data-sky-num className="mb-3 text-small font-medium tabular text-ink">
                    {formatNumber(c.km)} km
                  </p>
                  <div data-sky-photo className="overflow-hidden" style={{ height: `${share * 86}%` }}>
                    <Img
                      photo={c.photo}
                      alt={`${projectName(c)} by ${c.mode.toLowerCase()}`}
                      ratio="auto"
                      priority={priority && i >= items.length - 2}
                      sizes="(min-width:1024px) 16vw, 46vw"
                      className="size-full rounded-none"
                      imgClassName="transition-transform duration-5 ease-out group-hover/col:scale-[1.06]"
                    />
                  </div>
                </div>
                <div className="pt-3" style={{ height: CAPTION_H }}>
                  <p
                    className={cn(
                      "truncate font-medium text-ink transition-colors duration-2 group-hover/col:text-accent",
                      compact ? "text-small" : "text-[0.9375rem]",
                    )}
                  >
                    {projectName(c)}
                  </p>
                  <p className="mt-0.5 truncate text-micro text-muted">
                    {c.mode}, {c.countries}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <p className="mt-2 text-micro text-muted lg:hidden">Swipe to see every project</p>
    </div>
  );
}
