import type { City } from "./geo";

export type CountryCode = "rw" | "ug" | "ke" | "tz";

/**
 * One entry per country site. `iso` matches the map data, `capital` is the marked city and `zoom`
 * enlarges the real map around it so small countries read clearly (shapes stay true).
 */
export const countries: Record<CountryCode, { iso: string; name: string; capital: City; zoom: number }> = {
  rw: { iso: "RWA", name: "Rwanda", capital: "Kigali", zoom: 2 },
  ug: { iso: "UGA", name: "Uganda", capital: "Kampala", zoom: 1.5 },
  ke: { iso: "KEN", name: "Kenya", capital: "Nairobi", zoom: 1.15 },
  tz: { iso: "TZA", name: "Tanzania", capital: "Dodoma", zoom: 1 },
};

/** Which country each route city is in (border towns count for both sides). */
export const cityCountries: Record<City, string[]> = {
  Kigali: ["RWA"],
  Gisenyi: ["RWA"],
  Rusumo: ["RWA", "TZA"],
  Goma: ["COD"],
  Katana: ["COD"],
  Kampala: ["UGA"],
  Malaba: ["UGA", "KEN"],
  Nairobi: ["KEN"],
  Garissa: ["KEN"],
  Mombasa: ["KEN"],
  Dodoma: ["TZA"],
  Tabora: ["TZA"],
  Kigoma: ["TZA"],
  Songea: ["TZA"],
};

const isCode = (v: unknown): v is CountryCode => typeof v === "string" && v in countries;

/**
 * The site's country. Order: ?country=ug (preview), VITE_COUNTRY (set per Vercel project),
 * the domain (.ug/.ke/.tz or the country name in it), then Rwanda.
 */
export function siteCountry(): CountryCode {
  if (typeof window !== "undefined") {
    const q = new URLSearchParams(window.location.search).get("country");
    if (isCode(q)) return q;
  }
  const env = import.meta.env.VITE_COUNTRY;
  if (isCode(env)) return env;
  if (typeof window !== "undefined") {
    const h = window.location.hostname.toLowerCase();
    if (h.endsWith(".ug") || h.includes("uganda")) return "ug";
    if (h.endsWith(".ke") || h.includes("kenya")) return "ke";
    if (h.endsWith(".tz") || h.includes("tanzania")) return "tz";
  }
  return "rw";
}
