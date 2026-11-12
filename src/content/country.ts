import type { City } from "./geo";

export type CountryCode = "rw" | "ug" | "ke" | "tz";

/**
 * One entry per country site. `iso` matches the map data and `capital` is the main city.
 * The hero map scales each country to the same on-screen size automatically.
 */
export const countries: Record<CountryCode, { iso: string; name: string; capital: City }> = {
  rw: { iso: "RWA", name: "Rwanda", capital: "Kigali" },
  ug: { iso: "UGA", name: "Uganda", capital: "Kampala" },
  ke: { iso: "KEN", name: "Kenya", capital: "Nairobi" },
  tz: { iso: "TZA", name: "Tanzania", capital: "Dodoma" },
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
