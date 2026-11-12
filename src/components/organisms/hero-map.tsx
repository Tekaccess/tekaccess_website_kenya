import { useEffect, useMemo, useRef, useState } from "react";
import { countries, siteCountry } from "@/content/country";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Shapes = {
  box: { lon0: number; lat0: number; k: number; w: number; h: number };
  countries: Record<string, string>;
  lakes: string;
};

/**
 * Every site's country is scaled to fit the same frame (FIT_W x FIT_H, in vw) and centred at ANCHOR,
 * so Rwanda is enlarged, Tanzania reduced, and all read at one size; neighbours keep true proportion.
 */
const FIT_W = 17;
const FIT_H = 15;
const ANCHOR = { x: "71vw", y: "calc(var(--header-h) + 9.5rem)" };

/** Bounding box of an SVG path made of absolute M/L commands. */
function bbox(d: string) {
  const n = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i < n.length; i += 2) {
    x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i]);
    y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1]);
  }
  return { x0, y0, x1, y1 };
}

/**
 * Hero background: a plain, accurate outline map of Africa to Mauritius (Natural Earth): light grey
 * borders and lakes, only the site's own country filled in light blue. Same look on every site;
 * each site centres on its own country. Decorative only.
 */
export function HeroMap({ className }: { className?: string }) {
  const [data, setData] = useState<Shapes | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const site = countries[useMemo(siteCountry, [])];

  useEffect(() => {
    let alive = true;
    import("@/content/map-shapes.json").then((m) => alive && setData(m.default as unknown as Shapes));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!data || !root.current || prefersReducedMotion()) return;
    const t = gsap.from(root.current, { opacity: 0, scale: 1.03, duration: 1.6, ease: "power2.out", transformOrigin: "50% 45%" });
    return () => void t.revert();
  }, [data]);

  if (!data) return null;
  const { w, h } = data.box;
  const b = bbox(data.countries[site.iso]);
  const cx = (b.x0 + b.x1) / 2;
  const cy = (b.y0 + b.y1) / 2;
  const mapVw = Math.min((FIT_W * w) / (b.x1 - b.x0), (FIT_H * w) / (b.y1 - b.y0)); // whole map width in vw
  const z = mapVw / 66; // relative to the old default width, for hairlines and the fade
  const W = `${mapVw.toFixed(1)}vw`;
  const stroke = 0.7 / z; // borders stay hairline on screen at any scale

  const fill = (iso: string) => (iso === site.iso ? "#C9D5EE" : "none");

  return (
    <div
      ref={root}
      aria-hidden
      className={cn("hero-map-edge pointer-events-none absolute", className)}
      style={{
        width: W,
        left: `calc(${ANCHOR.x} - ${W} * ${(cx / w).toFixed(4)})`,
        top: `calc(${ANCHOR.y} - ${W} * ${(cy / w).toFixed(4)})`,
      }}
    >
      <svg viewBox={`0 0 ${w} ${h}`} focusable="false" className="block h-auto w-full">
        {Object.entries(data.countries).sort(([a]) => (a === site.iso ? 1 : -1)).map(([iso, d]) => (
          <path key={iso} d={d} fill={fill(iso)} fillOpacity={0.3} stroke={iso === site.iso ? "#ABB5CA" : "#DCE0E7"} strokeWidth={iso === site.iso ? stroke * 1.4 : stroke} strokeLinejoin="round" />
        ))}
        <path d={data.lakes} fill="#F9F9F7" stroke="#DCE0E7" strokeWidth={stroke} />
      </svg>
    </div>
  );
}
