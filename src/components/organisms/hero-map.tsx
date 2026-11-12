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
const ANCHOR = { x: "21vw", y: "calc(var(--header-h) + 9.5rem)" }; // inside the right-half frame

/** Area centroid of the largest ring: the visual middle of the country, where its name goes. */
function centroid(d: string) {
  let best = { a: 0, x: 0, y: 0 };
  for (const ring of d.split("M").filter(Boolean)) {
    const n = ring.match(/-?\d+(\.\d+)?/g)!.map(Number);
    let a = 0, x = 0, y = 0;
    for (let i = 0; i < n.length; i += 2) {
      const j = (i + 2) % n.length;
      const c = n[i] * n[j + 1] - n[j] * n[i + 1];
      a += c; x += (n[i] + n[j]) * c; y += (n[i + 1] + n[j + 1]) * c;
    }
    if (Math.abs(a) > Math.abs(best.a)) best = { a, x: x / (3 * a), y: y / (3 * a) };
  }
  return best;
}

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

  // Country name at the visual middle of its shape: bold capitals, near white (lighter than the fill), sized to fit.
  const name = site.name.toUpperCase();
  const mid = centroid(data.countries[site.iso]);
  const bw = b.x1 - b.x0, bh = b.y1 - b.y0;
  const fs = Math.min(bh * 0.2, (bw * 0.42) / (name.length * 0.68));

  return (
    // Frame: right half of the hero, top part only; nothing reaches the headline or the photos.
    <div aria-hidden className={cn("hero-map-frame pointer-events-none absolute right-0 top-0 h-[calc(var(--header-h)+30rem)] w-1/2 overflow-hidden", className)}>
    <div
      ref={root}
      className="hero-map-edge absolute"
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
        <text x={mid.x} y={mid.y} fontSize={fs} fontWeight={800} letterSpacing={fs * 0.04} textAnchor="middle" dominantBaseline="central" fill="#FFFFFF" fillOpacity={0.85}>
          {name}
        </text>
      </svg>
    </div>
    </div>
  );
}
