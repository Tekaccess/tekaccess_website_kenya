import { useEffect, useState } from "react";
import { getDb } from "@/lib/firebase";
import { slugify } from "@/lib/utils";
import { staticInsights, type Category, type Insight } from "@/content/insights";

const KNOWN: Category[] = ["Community", "Deliveries", "Partnerships", "Operations"];

// Firestore docs come from the legacy admin panel: { title, content(html), imageUrl, date|createdAt (Timestamp) }.
const PROPER: [RegExp, string | ((m: string) => string)][] = [
  [/\btekaccess\b/g, "TekAccess"],
  [/\brwanda/g, "Rwanda"],
  [/\bkigali\b/g, "Kigali"],
  [/\bedcl\b/g, "EDCL"],
  [/\b(chuk|chub|rab|rema)\b/g, (m) => m.toUpperCase()],
  [/energy development corporation limited/g, "Energy Development Corporation Limited"],
  [/\bkwibuka\b/g, "Kwibuka"],
];

/** "EMPOWERING HOMES WITH … (EDCL)" → "Empowering homes with … (EDCL)". Leaves mixed-case titles alone. */
export function tidyTitle(t: string) {
  if (t !== t.toUpperCase()) return t;
  let s = t.toLowerCase();
  for (const [re, rep] of PROPER) s = typeof rep === "string" ? s.replace(re, rep) : s.replace(re, rep);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const toMs = (v: unknown): number | null => {
  if (typeof v === "number") return v;
  if (typeof v === "string") return Date.parse(v) || null;
  if (v && typeof (v as { toMillis?: () => number }).toMillis === "function") return (v as { toMillis: () => number }).toMillis();
  return null;
};

const guessCategory = (text: string): Category => {
  const t = text.toLowerCase();
  if (/kwibuka|community|school|nourish|feeding/.test(t)) return "Community";
  if (/partnership|edcl|rab\b|agreement/.test(t)) return "Partnerships";
  if (/deliver|supplies|supply/.test(t)) return "Deliveries";
  return "Operations";
};

function fromDoc(id: string, d: Record<string, unknown>): Insight | null {
  const raw = typeof d.title === "string" ? d.title.trim() : "";
  if (!raw) return null;
  const title = tidyTitle(raw);
  const html = typeof d.content === "string" ? d.content : "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const cat = KNOWN.find((c) => c.toLowerCase() === String(d.category ?? "").toLowerCase()) ?? guessCategory(`${raw} ${text}`);
  return {
    slug: `${slugify(title).slice(0, 60).replace(/-$/, "")}-${id.slice(0, 5).toLowerCase()}`,
    title,
    category: cat,
    date: toMs(d.date) ?? toMs(d.createdAt) ?? Date.now(),
    author: typeof d.author === "string" && d.author ? d.author : "TekAccess Team",
    excerpt: text.slice(0, 180) + (text.length > 180 ? "…" : ""),
    coverUrl: typeof d.imageUrl === "string" ? d.imageUrl : undefined,
    html: html.includes("<") ? html : `<p>${html}</p>`,
    readMinutes: Math.max(1, Math.round(text.split(" ").length / 220)),
  };
}

let cache: Promise<Insight[]> | null = null;

/** Static posts merged with Firestore posts (if configured), newest first. Never rejects. */
export function loadInsights(): Promise<Insight[]> {
  cache ??= (async () => {
    let remote: Insight[] = [];
    try {
      const db = await getDb();
      if (db) {
        const { collection, getDocs } = await import("firebase/firestore");
        const snaps = await Promise.race([
          Promise.all(["blogs", "blog"].map((c) => getDocs(collection(db, c)))),
          new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), 6000)),
        ]);
        remote = snaps.flatMap((s) => s.docs.map((doc) => fromDoc(doc.id, doc.data()))).filter((x): x is Insight => !!x);
      }
    } catch (e) {
      console.warn("Insights: Firestore unavailable, showing built-in posts.", e);
    }
    // Built-in copies of Firestore posts win (same words, stable URLs); new admin posts still appear.
    const known = staticInsights.flatMap((p) => p.supersededBy ?? []);
    const fresh = remote.filter((r) => !known.some((k) => r.title.toLowerCase().includes(k)));
    return [...fresh, ...staticInsights].sort((a, b) => b.date - a.date);
  })();
  return cache;
}

const builtIn = [...staticInsights].sort((a, b) => b.date - a.date);

/**
 * Built-in posts render immediately (no skeleton, fast LCP); Firestore posts are
 * merged in when they arrive. `pending` is true until that merge finishes, so a page
 * looking for a Firestore-only slug can wait instead of showing a 404.
 */
export function useInsights() {
  const [state, setState] = useState<{ posts: Insight[]; pending: boolean }>({ posts: builtIn, pending: true });
  useEffect(() => {
    let alive = true;
    loadInsights().then((posts) => alive && setState({ posts, pending: false }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

/** Strip anything executable from admin-authored HTML before rendering it. */
export function sanitizeHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script,style,iframe,object,embed,form,link,meta").forEach((n) => n.remove());
  doc.querySelectorAll("*").forEach((el) => {
    for (const { name, value } of Array.from(el.attributes)) {
      if (name.startsWith("on") || name === "style" || (/^(href|src)$/.test(name) && /^\s*javascript:/i.test(value))) {
        el.removeAttribute(name);
      }
    }
  });
  return doc.body.innerHTML;
}
