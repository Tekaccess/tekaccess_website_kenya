import { useEffect, useMemo, useRef, useState } from "react";
import { cities } from "@/content/geo";
import { projects } from "@/content/projects";
import { cityCountries, countries, siteCountry } from "@/content/country";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Dots = {
  box: { lon0: number; lat0: number; k: number; w: number; h: number };
  r: number;
  coarse: Record<string, [number, number][]>;
  fine: Record<string, { r: number; dots: [number, number][] }>;
};

/** Many dots as one path: far cheaper to paint than thousands of <circle>s. */
const dotPath = (pts: [number, number][], r: number) =>
  pts.map(([x, y]) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`).join("");

/** Route through real stops; each leg bows upward a little so it reads as movement. */
function routePath(pts: [number, number][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const len = Math.hypot(x1 - x0, y1 - y0);
    const lift = Math.min(len * 0.22, 26);
    let nx = -(y1 - y0) / len, ny = (x1 - x0) / len; // normal pointing up, so every leg arcs the same way
    if (ny > 0) [nx, ny] = [-nx, -ny];
    d += ` Q${((x0 + x1) / 2 + nx * lift).toFixed(1)} ${((y0 + y1) / 2 + ny * lift).toFixed(1)} ${x1} ${y1}`;
  }
  return d;
}

/** Map width as a share of the viewport at zoom 1, and where the capital is pinned on screen. */
const BASE_VW = 66;
const ANCHOR = { x: "70vw", y: "calc(var(--header-h) + 8rem)" };

/**
 * Hero background: accurate dot map of Africa to Mauritius (Natural Earth), the five countries we
 * operate in a shade darker, this site's country in navy with its capital marked, and every real
 * project route as a dashed arc. Each site zooms the real map around its own capital (Rwanda most)
 * so its country reads clearly while every shape stays true. Decorative: the facts are in the skyline.
 */
export function HeroMap({ active, className }: { active?: string | null; className?: string }) {
  const [data, setData] = useState<Dots | null>(null);
  const root = useRef<SVGSVGElement>(null);
  const site = countries[useMemo(siteCountry, [])];
  const z = site.zoom;

  useEffect(() => {
    let alive = true;
    import("@/content/map-dots.json").then((m) => alive && setData(m.default as unknown as Dots));
    return () => {
      alive = false;
    };
  }, []);

  const view = useMemo(() => {
    if (!data) return null;
    const { lon0, lat0, k } = data.box;
    const p = ([lon, lat]: readonly [number, number]): [number, number] => [+((lon - lon0) * k).toFixed(1), +((lat0 - lat) * k).toFixed(1)];
    const region = Object.entries(data.coarse)
      .filter(([iso]) => iso !== "other" && iso !== site.iso)
      .flatMap(([, pts]) => pts);
    const routes = projects.map((c) => {
      const pts = c.path.map((city) => p(cities[city]));
      return { slug: c.slug, d: routePath(pts), stops: pts, home: c.path.some((city) => cityCountries[city].includes(site.iso)) };
    });
    const home = data.fine[site.iso];
    const r = data.r / Math.sqrt(z); // background dots stay fine when zoomed in
    return {
      other: dotPath(data.coarse.other, r),
      region: dotPath(region, r),
      home: dotPath(home.dots, home.r),
      routes,
      cap: p(cities[site.capital]),
      labelX: Math.max(...home.dots.map(([x]) => x)) + 6 / z, // just east of the country, never on it
      travel: routes.find((rt) => rt.home)?.d,
    };
  }, [data, site, z]);

  // Entrance: dots settle in, then routes draw one after another. Reduced motion: final frame.
  useEffect(() => {
    const svg = root.current;
    if (!svg || !view || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-map-layer]", { opacity: 0, duration: 1.2, stagger: 0.25, ease: "power2.out" });
      svg.querySelectorAll<SVGPathElement>("[data-map-draw]").forEach((el, i) => {
        const len = el.getTotalLength();
        gsap.fromTo(el, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, delay: 0.9 + i * 0.22, ease: "power2.inOut" });
      });
      gsap.from("[data-map-cap]", { opacity: 0, duration: 0.8, delay: 0.6 });
    }, svg);
    // Pause the looping pulse and the travelling dot while the hero is off screen.
    const io = new IntersectionObserver(([e]) => {
      svg.classList.toggle("map-paused", !e.isIntersecting);
      if (e.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    io.observe(svg);
    return () => {
      ctx.revert();
      io.disconnect();
    };
  }, [view]);

  if (!data || !view) return null;
  const { w, h } = data.box;
  const [cx, cy] = view.cap;
  const W = `${BASE_VW * z}vw`;
  const s = 1 / z; // keeps strokes, markers and the label the same size on screen at any zoom

  return (
    <div
      aria-hidden
      className={cn("hero-map-fade pointer-events-none absolute", className)}
      style={{
        width: W,
        left: `calc(${ANCHOR.x} - ${W} * ${cx / w})`,
        top: `calc(${ANCHOR.y} - ${W} * ${(cy / w).toFixed(4)})`,
        ["--map-cx" as string]: `${((cx / w) * 100).toFixed(1)}%`,
        ["--map-cy" as string]: `${((cy / h) * 100).toFixed(1)}%`,
        // fade radius shrinks with zoom so the visible patch stays the same size on screen
        ["--map-rx" as string]: `${(40 / z).toFixed(1)}%`,
        ["--map-ry" as string]: `${(42 / z).toFixed(1)}%`,
      }}
    >
      <svg ref={root} viewBox={`0 0 ${w} ${h}`} focusable="false" className="hero-map block h-auto w-full select-none">
        <defs>
          {view.routes.map((r) => (
            <mask key={r.slug} id={`map-m-${r.slug}`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
              <path data-map-draw d={r.d} fill="none" stroke="#fff" strokeWidth={4 * s} strokeLinecap="round" />
            </mask>
          ))}
        </defs>

        <path data-map-layer d={view.other} fill="#DDE2EA" />
        <path data-map-layer d={view.region} fill="#A9B5CC" />
        <path data-map-layer d={view.home} fill="#0A1437" />

        {view.routes.map((r) => {
          const on = active ? active === r.slug : r.home;
          return (
            <g
              key={r.slug}
              mask={`url(#map-m-${r.slug})`}
              className="transition-opacity duration-5"
              style={{ opacity: active ? (on ? 1 : 0.15) : on ? 0.9 : 0.32 }}
            >
              <path d={r.d} fill="none" stroke="#3E6FE0" strokeWidth={(on && active ? 1.6 : 1.15) * s} strokeDasharray={`${3 * s} ${3.2 * s}`} strokeLinecap="round" />
              {r.stops.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={(i === 0 || i === r.stops.length - 1 ? 1.9 : 1.3) * s} fill="#3E6FE0" />
              ))}
            </g>
          );
        })}

        {view.travel && (
          <circle r={2.2 * s} fill="#3E6FE0" className="map-travel">
            <animateMotion dur="7s" repeatCount="indefinite" path={view.travel} />
          </circle>
        )}

        {/* Capital: a small red dot with one faint ring, so the country stays readable underneath. */}
        <g data-map-cap>
          <circle cx={cx} cy={cy} r={2 * s} fill="none" stroke="#E5262C" strokeWidth={0.8 * s} className="map-pulse" />
          <circle cx={cx} cy={cy} r={2 * s} fill="#E5262C" stroke="#fff" strokeWidth={0.8 * s} />
          <text x={view.labelX} y={cy + 3 * s} fill="#0A1437" fontSize={8.5 * s} fontWeight="600" letterSpacing={1.6 * s}>
            {site.name.toUpperCase()}
          </text>
        </g>
      </svg>
    </div>
  );
}
