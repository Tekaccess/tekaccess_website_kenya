"""Build the hero map shapes from Natural Earth (public domain).

Run only when the framing changes, not on every build:
  python3 scripts/build-map.py <ne_10m_admin_0_countries.geojson> <ne_10m_lakes.geojson>
Writes src/content/map-shapes.json: one simplified SVG path per country, plus lakes.

Projection: equirectangular, x = (lon - LON0) * K, y = (LAT0 - lat) * K. Accurate enough for
this latitude band (20N to 30S); city positions in geo.ts use the same formula.
"""
import json, sys
import numpy as np

sys.setrecursionlimit(20000)

LON0, LON1, LAT0, LAT1, K = 0.0, 62.0, 20.0, -30.0, 10.0  # Africa east of 0E to Mauritius
TOL = 0.2  # simplification tolerance in map units (about 2 km): stays smooth when a small country is enlarged
MIN_AREA = 0.6  # drop specks smaller than this (map units squared)

countries_file, lakes_file = sys.argv[1], sys.argv[2]


def rdp(pts, eps):
    """Ramer-Douglas-Peucker line simplification."""
    if len(pts) < 3:
        return pts
    a, b = pts[0], pts[-1]
    ab = b - a
    n = np.hypot(*ab) or 1e-9
    v = pts - a
    d = np.abs(ab[0] * v[:, 1] - ab[1] * v[:, 0]) / n  # 2D cross product
    i = int(np.argmax(d))
    if d[i] > eps:
        return np.vstack([rdp(pts[: i + 1], eps)[:-1], rdp(pts[i:], eps)])
    return np.array([a, b])


def rdp_ring(pts, eps):
    """Closed ring: split at the point farthest from the start, simplify both halves."""
    pts = pts[:-1] if len(pts) > 1 and np.allclose(pts[0], pts[-1]) else pts
    if len(pts) < 4:
        return pts
    j = int(np.argmax(np.hypot(*(pts - pts[0]).T)))
    return np.vstack([rdp(pts[: j + 1], eps)[:-1], rdp(np.vstack([pts[j:], pts[:1]]), eps)[:-1]])


def rings(geom):
    parts = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
    for p in parts:
        for r in p:
            yield np.array(r)[:, :2]


def to_d(geom):
    out = []
    for r in rings(geom):
        lo, la = r[:, 0], r[:, 1]
        if lo.max() < LON0 - 2 or lo.min() > LON1 + 2 or la.max() < LAT1 - 2 or la.min() > LAT0 + 2:
            continue
        xy = np.c_[(lo - LON0) * K, (LAT0 - la) * K]
        s = rdp_ring(xy, TOL)
        area = abs(np.dot(s[:, 0], np.roll(s[:, 1], 1)) - np.dot(s[:, 1], np.roll(s[:, 0], 1))) / 2
        if len(s) < 3 or area < MIN_AREA:
            # keep small islands (Mauritius, Comoros, Zanzibar) as a minimal shape instead of dropping them
            if len(r) >= 4 and (xy.max(0) - xy.min(0)).max() > 0.4:
                s = rdp_ring(xy, TOL / 4)
            else:
                continue
        out.append("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in s) + "Z")
    return "".join(out)


def iso_of(props):
    for k in ("ADM0_A3", "ISO_A3", "SOV_A3"):
        v = props.get(k)
        if v and v != "-99":
            return v
    return "?"


shapes = {}
for f in json.load(open(countries_file))["features"]:
    d = to_d(f["geometry"])
    if d:
        shapes[iso_of(f["properties"])] = shapes.get(iso_of(f["properties"]), "") + d

lakes = "".join(to_d(f["geometry"]) for f in json.load(open(lakes_file))["features"] if (f["properties"].get("scalerank") or 0) <= 3)

out = {"box": {"lon0": LON0, "lat0": LAT0, "k": K, "w": (LON1 - LON0) * K, "h": (LAT0 - LAT1) * K}, "countries": shapes, "lakes": lakes}
json.dump(out, open("src/content/map-shapes.json", "w"), separators=(",", ":"))
for iso in ("RWA", "UGA", "KEN", "TZA", "COD", "MUS"):
    assert iso in shapes, f"{iso} missing"
print(len(shapes), "countries,", sum(len(v) for v in shapes.values()) // 1000, "k chars; lakes", len(lakes) // 1000, "k")
