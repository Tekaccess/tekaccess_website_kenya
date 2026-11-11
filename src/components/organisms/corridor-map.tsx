import { useRef } from "react";
import { corridors, type Corridor } from "@/content/corridors";
import { cities, coast, countryLabels, lakes, project, scale, xy, type City } from "@/content/geo";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const dash: Record<Corridor["mode"], string | undefined> = { Truck: undefined, Rail: "6 5", Ship: "1.5 5" };

/**
 * Schematic East Africa map (dark band). Real city coordinates, simplified lakes and
 * coastline. Routes draw in on scroll (stroke-dashoffset). `focus` highlights one
 * corridor and dims the rest.
 */
export function CorridorMap({ focus, className }: { focus?: string; className?: string }) {
  const root = useRef<SVGSVGElement>(null);
  const list = focus ? [...corridors.filter((c) => c.slug !== focus), ...corridors.filter((c) => c.slug === focus)] : corridors;
  const used = new Set<City>(list.flatMap((c) => c.path));

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      const lines = root.current.querySelectorAll<SVGPathElement>("[data-route]");
      // Draw-on uses the path's real length so rail/lake dash patterns stay in user units.
      lines.forEach((l) => {
        const len = l.getTotalLength();
        gsap.set(l, { strokeDasharray: `${len} ${len}`, strokeDashoffset: len });
      });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
      tl.to(lines, { strokeDashoffset: 0, duration: 1.6, stagger: 0.15, ease: "power2.inOut" })
        .from(root.current.querySelectorAll("[data-city]"), { scale: 0, transformOrigin: "center", duration: 0.4, stagger: 0.03, ease: "back.out(2)" }, 0.4)
        // restore the dash pattern of rail/ship lines once drawn
        .add(() =>
          lines.forEach((l) => {
            l.style.strokeDasharray = l.dataset.dash ?? "none";
            l.style.strokeDashoffset = "0";
          }),
        );
    },
    { scope: root, dependencies: [focus] },
  );

  return (
    <svg ref={root} viewBox="0 0 600 560" role="img" aria-label="Map of TekAccess corridors across East Africa" className={cn("h-auto w-full", className)}>
      {/* coastline + ocean */}
      <path
        d={`M${coast.map((p) => project(p).join(",")).join(" L")} L600,560 L600,0 Z`}
        className="fill-white/[0.03] stroke-night-line"
        strokeWidth={1}
      />
      <text x={560} y={300} className="fill-on-night/30 text-[10px] tracking-[0.2em]" textAnchor="end" transform="rotate(90 560 300)">
        INDIAN OCEAN
      </text>
      {lakes.map((l) => {
        const [cx, cy] = project(l.c);
        const rx = l.rx * scale.x;
        const ry = l.ry * scale.y;
        return <ellipse key={l.name} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${l.rot} ${cx} ${cy})`} className="fill-signal/15 stroke-signal/30" strokeWidth={1} />;
      })}
      {countryLabels.map((c) => {
        const [x, y] = project(c.at);
        return (
          <text key={c.name} x={x} y={y} textAnchor="middle" className="fill-on-night/25 text-[16px] font-medium tracking-[0.24em] tablet:text-[13px] lg:text-[11px]">
            {c.name}
          </text>
        );
      })}

      {/* routes */}
      {list.map((c) => {
        const on = !focus || c.slug === focus;
        const d = "M" + c.path.map((p) => xy(p).join(",")).join(" L");
        return (
          <path
            key={c.slug}
            data-route
            data-dash={dash[c.mode]}
            d={d}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={dash[c.mode]}
            className={cn(on ? (c.mode === "Truck" ? "stroke-white" : "stroke-signal") : "stroke-white/15")}
            strokeWidth={on && focus ? 3 : 2}
          />
        );
      })}

      {/* cities */}
      {(Object.keys(cities) as City[])
        .filter((c) => used.has(c))
        .map((c) => {
          const [x, y] = xy(c);
          const kigali = c === "Kigali";
          // hand-placed label offsets where cities sit close together (Goma/Gisenyi/Katana)
          const off: Partial<Record<City, [number, number, "start" | "end"]>> = {
            Goma: [-8, -8, "end"],
            Gisenyi: [-9, 6, "end"],
            Katana: [-9, 14, "end"],
            Kigoma: [-9, 4, "end"],
            Rusumo: [9, 12, "start"],
            Malaba: [8, -8, "start"],
            Kampala: [-8, -8, "end"],
            Garissa: [8, -8, "start"],
          };
          const [dx, dy, anchor] = off[c] ?? [9, 4, "start"];
          return (
            <g key={c} data-city>
              <circle cx={x} cy={y} r={kigali ? 5.5 : 3.5} className={kigali ? "fill-accent" : "fill-white"} />
              {kigali && <circle cx={x} cy={y} r={11} className="fill-none stroke-accent/50" strokeWidth={1} />}
              <text
                x={x + dx}
                y={y + dy}
                textAnchor={anchor}
                className={cn("text-[18px] tablet:text-[14px] lg:text-[12px]", kigali ? "fill-white font-medium" : "fill-on-night")}
              >
                {c}
              </text>
            </g>
          );
        })}
    </svg>
  );
}

export function MapLegend() {
  const item = (label: string, cls: string, dasharray?: string) => (
    <li className="flex items-center gap-3 text-small">
      <svg width="32" height="8" aria-hidden>
        <line x1="0" y1="4" x2="32" y2="4" strokeWidth="2" strokeLinecap="round" strokeDasharray={dasharray} className={cls} />
      </svg>
      {label}
    </li>
  );
  return (
    <ul className="space-y-3">
      {item("Road", "stroke-white")}
      {item("Rail", "stroke-signal", "6 5")}
      {item("Lake", "stroke-signal", "1.5 5")}
      <li className="flex items-center gap-3 text-small">
        <span className="ml-3 mr-[11px] size-2.5 rounded-full bg-accent" aria-hidden /> Kigali office
      </li>
    </ul>
  );
}
