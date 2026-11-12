"""Build the hero dot map from Natural Earth (public domain).

Run when the framing or countries change, not on every build:
  python3 scripts/build-map.py <ne_10m_admin_0_countries.geojson> <ne_50m_lakes.geojson>
Writes src/content/map-dots.json. Needs numpy and matplotlib.

Projection: equirectangular, x = (lon - LON0) * K, y = (LAT0 - lat) * K. At this latitude band
(20N to 30S) the distortion is small and every city in geo.ts lands where an atlas puts it.
"""
import json, math, sys
import numpy as np
from matplotlib.path import Path

LON0, LON1, LAT0, LAT1, K = 0.0, 62.0, 20.0, -30.0, 10.0  # Africa east of 0E to Mauritius, 20N to 30S
COARSE = 0.6  # degrees between background dots
REGION = ["RWA", "UGA", "KEN", "TZA", "COD"]  # countries we operate in
SITES = ["RWA", "UGA", "KEN", "TZA"]  # countries with their own site: drawn again in a finer grid

countries_file, lakes_file = sys.argv[1], sys.argv[2]


def polys(geom):
    """Yield (outer ring, holes) for a Polygon or MultiPolygon."""
    parts = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
    for p in parts:
        yield np.array(p[0]), [np.array(h) for h in p[1:]]


def iso_of(props):
    for k in ("ADM0_A3", "ISO_A3", "SOV_A3"):
        v = props.get(k)
        if v and v != "-99":
            return v
    return "?"


feats = []
for f in json.load(open(countries_file))["features"]:
    for outer, holes in polys(f["geometry"]):
        lo, la = outer[:, 0], outer[:, 1]
        if lo.max() < LON0 - 1 or lo.min() > LON1 + 1 or la.max() < LAT1 - 1 or la.min() > LAT0 + 1:
            continue
        feats.append((iso_of(f["properties"]), Path(outer), [Path(h) for h in holes], outer))

lakes = []
for f in json.load(open(lakes_file))["features"]:
    for outer, _ in polys(f["geometry"]):
        lo, la = outer[:, 0], outer[:, 1]
        if lo.max() < LON0 or lo.min() > LON1 or la.max() < LAT1 or la.min() > LAT0:
            continue
        lakes.append(Path(outer))


def classify(lon, lat):
    """Country ISO for each point ('' for sea or lake)."""
    pts = np.c_[lon, lat]
    out = np.full(len(pts), "", dtype=object)
    for iso, path, holes, _ in feats:
        hit = path.contains_points(pts)
        for h in holes:
            hit &= ~h.contains_points(pts)
        out[hit & (out == "")] = iso
    wet = np.zeros(len(pts), bool)
    for lk in lakes:
        wet |= lk.contains_points(pts)
    out[wet] = ""
    return out


xy = lambda lon, lat: [round((lon - LON0) * K, 1), round((LAT0 - lat) * K, 1)]

# Background grid, offset by half a step so dots sit inside cells, not on the edges.
lons = np.arange(LON0 + COARSE / 2, LON1, COARSE)
lats = np.arange(LAT0 - COARSE / 2, LAT1, -COARSE)
G = np.array([(a, b) for b in lats for a in lons])
iso = classify(G[:, 0], G[:, 1])
coarse = {"other": []}
for (lo, la), c in zip(G, iso):
    if not c:
        continue
    coarse.setdefault(c if c in REGION else "other", []).append(xy(lo, la))

# Islands too small for the grid (Mauritius, Comoros, Zanzibar, Pemba...) still get one dot each.
forced = 0
for c, path, _, outer in feats:
    cx, cy = outer[:, 0].mean(), outer[:, 1].mean()
    if not (LON0 < cx < LON1 and LAT1 < cy < LAT0):
        continue
    near = np.abs(G[:, 0] - cx).__le__(COARSE / 2) & np.abs(G[:, 1] - cy).__le__(COARSE / 2)
    if (iso[near] != "").any():
        continue
    spans = outer.max(0) - outer.min(0)
    if spans.max() > 3 * COARSE:  # a big feature that just missed: the grid already covers it
        continue
    coarse.setdefault(c if c in REGION else "other", []).append(xy(cx, cy))
    forced += 1

# Site countries in a finer grid so even Rwanda reads as its true shape (~150 to 400 dots each).
fine = {}
for c in SITES:
    rings = [o for i, _, _, o in feats if i == c]
    allp = np.vstack(rings)
    (x0, y0), (x1, y1) = allp.min(0), allp.max(0)
    area = sum(abs(np.dot(r[:, 0], np.roll(r[:, 1], 1)) - np.dot(r[:, 1], np.roll(r[:, 0], 1))) / 2 for r in rings)
    pitch = min(COARSE, max(0.12, math.sqrt(area / 320)))
    gx = np.arange(x0 + pitch / 2, x1, pitch)
    gy = np.arange(y1 - pitch / 2, y0, -pitch)
    P = np.array([(a, b) for b in gy for a in gx])
    hit = classify(P[:, 0], P[:, 1]) == c
    fine[c] = {"r": round(pitch * K * 0.36, 2), "dots": [xy(a, b) for a, b in P[hit]]}

out = {
    "box": {"lon0": LON0, "lat0": LAT0, "k": K, "w": (LON1 - LON0) * K, "h": (LAT0 - LAT1) * K},
    "r": round(COARSE * K * 0.22, 2),
    "coarse": coarse,
    "fine": fine,
}
json.dump(out, open("src/content/map-dots.json", "w"), separators=(",", ":"))
assert len(coarse["RWA"]) >= 1 and len(fine["RWA"]["dots"]) > 60, "Rwanda must be visible"
print("coarse", {k: len(v) for k, v in coarse.items()}, "forced islands", forced)
print("fine", {k: (len(v["dots"]), v["r"]) for k, v in fine.items()})
