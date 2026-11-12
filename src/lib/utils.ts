import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom font sizes must be registered, or twMerge treats `text-h1` and `text-ink`
// as the same group and silently drops one of them.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display-xl", "display", "h1", "h2", "h3", "h4", "lead", "stat", "body", "small", "label", "micro"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "Rogers PARIS LYIMO" becomes "rogers-paris-lyimo" */
export const slugify = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
export const formatDate = (ms: number) => dateFmt.format(new Date(ms));

export const formatNumber = (n: number) => new Intl.NumberFormat("en-US").format(n);
