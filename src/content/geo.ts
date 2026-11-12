// Real coordinates (lon, lat) projected into the ProjectMap viewBox (600 × 560).
// Extent: lon 27°E to 42°E, lat 2°N to 12°S (west margin leaves room for Katana's label). Equirectangular is fine at this scale.
const LON0 = 27, LON1 = 42, LAT0 = 2, LAT1 = -12, W = 600, H = 560;
/** viewBox units per degree, used to size lakes. */
export const scale = { x: W / (LON1 - LON0), y: H / (LAT0 - LAT1) };

export const project = ([lon, lat]: readonly [number, number]): [number, number] => [
  ((lon - LON0) / (LON1 - LON0)) * W,
  ((LAT0 - lat) / (LAT0 - LAT1)) * H,
];

export const cities = {
  Kigali: [30.06, -1.95],
  Gisenyi: [29.26, -1.7],
  Goma: [29.22, -1.66],
  Katana: [28.83, -2.22],
  Rusumo: [30.78, -2.38],
  Kampala: [32.58, 0.35],
  Malaba: [34.27, 0.64],
  Nairobi: [36.82, -1.29],
  Garissa: [39.65, -0.45],
  Mombasa: [39.67, -4.04],
  Dodoma: [35.74, -6.17],
  Tabora: [32.8, -5.02],
  Kigoma: [29.63, -4.88],
  Songea: [35.65, -10.68],
} as const satisfies Record<string, [number, number]>;

export type City = keyof typeof cities;
export const xy = (c: City) => project(cities[c]);

// Simplified water bodies (centre lon/lat, radii in degrees, rotation) and coastline.
export const lakes = [
  { name: "Lake Victoria", c: [33, -1.1], rx: 1.55, ry: 1.35, rot: 0 },
  { name: "Lake Tanganyika", c: [30.1, -6.1], rx: 0.32, ry: 3.0, rot: -16 },
  { name: "Lake Kivu", c: [29.15, -2.05], rx: 0.18, ry: 0.42, rot: 8 },
  { name: "Lake Malawi", c: [34.6, -11.2], rx: 0.3, ry: 1.6, rot: 12 },
] as const;

export const coast: [number, number][] = [
  [41.6, 2],
  [41.3, -1.6],
  [40.2, -2.7],
  [39.4, -4.6],
  [38.8, -6.4],
  [39.4, -8.0],
  [39.7, -10.0],
  [40.4, -12],
];

export const countryLabels = [
  { name: "UGANDA", at: [32.3, 1.4] },
  { name: "KENYA", at: [37.6, 0.6] },
  { name: "RWANDA", at: [30.1, -1.25] },
  { name: "DRC", at: [28.6, -4.4] },
  { name: "TANZANIA", at: [34.8, -7.6] },
] as const;
