// One import function per page. The router lazy-loads with these, and nav links call
// preloadRoute on hover/focus so the chunk is usually ready before the click.
export const pages = {
  home: () => import("./home"),
  services: () => import("./services"),
  service: () => import("./service"),
  projects: () => import("./projects"),
  project: () => import("./project"),
  about: () => import("./about"),
  blog: () => import("./blog"),
  article: () => import("./article"),
  contact: () => import("./contact"),
  quoteSent: () => import("./quote-sent"),
  legal: () => import("./legal"),
  notFound: () => import("./not-found"),
} as const;

const byPath: [RegExp, keyof typeof pages][] = [
  [/^\/$/, "home"],
  [/^\/services\/?$/, "services"],
  [/^\/services\/.+/, "service"],
  [/^\/projects\/?$/, "projects"],
  [/^\/projects\/.+/, "project"],
  [/^\/about/, "about"],
  [/^\/blog\/?$/, "blog"],
  [/^\/blog\/.+/, "article"],
  [/^\/contact/, "contact"],
  [/^\/legal/, "legal"],
];

const done = new Set<string>();
export function preloadRoute(path: string) {
  const hit = byPath.find(([re]) => re.test(path));
  if (!hit || done.has(hit[1])) return;
  done.add(hit[1]);
  pages[hit[1]]().catch(() => done.delete(hit[1]));
}
