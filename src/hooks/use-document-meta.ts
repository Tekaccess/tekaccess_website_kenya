import { useEffect } from "react";
import { site } from "@/content/site";

type Meta = {
  title: string; // page title without the brand suffix
  description: string;
  path: string; // canonical path, e.g. "/services/gypsum-supply"
  image?: string; // absolute or root-relative OG image
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: "name" | "property", k: string, v: string) =>
  setTag(
    `meta[${key}="${k}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute(key, k);
      return m;
    },
    "content",
    v,
  );

/** Per-route title, description, canonical, Open Graph, Twitter and JSON-LD. */
export function useDocumentMeta({ title, description, path, image, type = "website", jsonLd, noindex }: Meta) {
  useEffect(() => {
    const full = path === "/" ? `${site.name} — ${title}` : `${title} — ${site.name}`;
    const url = site.url + path;
    const img = (image ?? site.ogImage).startsWith("http") ? (image ?? site.ogImage) : site.url + (image ?? site.ogImage);
    document.title = full;
    meta("name", "description", description);
    meta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    meta("property", "og:title", full);
    meta("property", "og:description", description);
    meta("property", "og:url", url);
    meta("property", "og:type", type);
    meta("property", "og:image", img);
    meta("property", "og:site_name", site.name);
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", full);
    meta("name", "twitter:description", description);
    meta("name", "twitter:image", img);
    setTag(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement("link");
        l.rel = "canonical";
        return l;
      },
      "href",
      url,
    );

    const id = "route-jsonld";
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = id;
      s.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(s);
    }
  }, [title, description, path, image, type, jsonLd, noindex]);
}
