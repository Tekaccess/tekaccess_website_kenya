import { Briefcase, Bus, Clock3, Globe, GraduationCap, HeartPulse, Home, Phone, ShieldCheck, TrendingUp, Truck, Users, type LucideIcon } from "lucide-react";
import { siteCountry } from "@/content/country";

// Contract: tekaccess_backend/docs/CAREERS_WEBSITE_GUIDE.md. Everything here comes from the
// TekAccess system (jobs and the careers copy HR sets in HR ▸ Hiring); nothing is built in.

export type QuestionType =
  "text" | "long_text" | "number" | "date" | "yes_no" | "choice";
export type Question = {
  id: string;
  label: string;
  type: QuestionType | string;
  required: boolean;
  options: string[];
};
export type Tile = { icon: string; title: string; text: string };
export type JobSummary = {
  token: string;
  title: string;
  summary?: string;
  description: string;
  closesAt: string | null;
  department?: string;
  location?: string;
  employmentType?: string;
  postedAt?: string;
};
export type JobDetail = JobSummary & {
  accepting: boolean;
  questions: Question[];
  /** The job's own "What we offer"; empty = the careers settings' standard list. */
  benefits?: Tile[];
  closedAt?: string;
};

/** The careers copy HR writes once in HR ▸ Hiring ▸ Careers site (GET /careers/settings). */
export type CareersSettings = {
  hero: { title: string; accent: string; intro: string; countriesLine: string };
  why: Tile[];
  steps: { title: string; text: string }[];
  nextSteps: { title: string; text: string; timing: string }[];
  benefits: Tile[];
  faq: { q: string; a: string }[];
  notSelectedText: string;
  closing: { title: string; accent: string; text: string };
  contacts: { email: string; linkedin: string; perSite: { site: string; phone: string; whatsapp: string }[] };
  privacy: { retentionMonths: number; noticeUrl: string };
};
export type ApplyInput = {
  name: string;
  email: string;
  phone: string;
  cv: File;
  answers: Record<string, string>;
  website?: string;
};
export type ApplyResult =
  | { ok: true; reference?: string }
  | { ok: false; status: number; message: string };

// The public careers door of the TekAccess API. Not a secret: every visitor's browser sees it,
// and the API itself limits who may call it. VITE_CAREERS_API overrides it (e.g. a test backend).
const API = (
  (import.meta.env.VITE_CAREERS_API as string | undefined) ||
  "https://api.tekaccess.live/api/v1/careers"
).replace(/\/$/, "");

export const MAX_CV = 5 * 1024 * 1024;
export const MAX_ANSWER = 2000;

function param(name: string) {
  return typeof window === "undefined"
    ? null
    : new URLSearchParams(window.location.search).get(name);
}
function session(key: string, value?: string | null) {
  try {
    if (value != null) sessionStorage.setItem(key, value);
    return sessionStorage.getItem(key);
  } catch {
    return value ?? null;
  }
}

/** ?source= or ?utm_source= on the landing URL, remembered for the visit. */
export function captureSource() {
  const s = param("source") || param("utm_source");
  if (s) session("careers-source", s.slice(0, 60));
}
const source = () => session("careers-source") || "";

export const slug = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .slice(0, 80) || "role";

export const jobPath = (j: Pick<JobSummary, "token" | "title">) =>
  `/careers/${j.token}/${slug(j.title)}`;

async function getJson<T>(
  path: string,
): Promise<{ status: number; data: T | null }> {
  // Never send cookies to the API; give up after 15 s so the page can offer Try again.
  const res = await fetch(API + path, {
    headers: { Accept: "application/json" },
    credentials: "omit",
    mode: "cors",
    signal: AbortSignal.timeout(15000),
  });
  const json = (await res.json().catch(() => null)) as { data?: T } | null;
  return { status: res.status, data: json?.data ?? null };
}

export async function listJobs(): Promise<JobSummary[]> {
  const { status, data } = await getJson<{ jobs: JobSummary[] }>(
    `/jobs?site=${siteCountry()}`,
  );
  if (status !== 200 || !data) throw new Error(`careers list ${status}`);
  return data.jobs;
}

// One request per visit: every careers page reads the same copy.
let settingsOnce: Promise<CareersSettings> | null = null;
export function getSettings(): Promise<CareersSettings> {
  settingsOnce ??= getJson<{ settings: CareersSettings }>("/settings").then(({ status, data }) => {
    if (status !== 200 || !data) throw new Error(`careers settings ${status}`);
    return data.settings;
  });
  settingsOnce.catch(() => (settingsOnce = null)); // let a retry ask again
  return settingsOnce;
}

/** Help phone and WhatsApp for this country's site, falling back to the site's own number. */
export function contactFor(s: CareersSettings, fallback: string) {
  const c = s.contacts.perSite.find((x) => x.site === siteCountry());
  return { phone: c?.phone || fallback, whatsapp: c?.whatsapp || c?.phone || fallback };
}

/** null = no such job (404). */
export async function getJob(token: string): Promise<JobDetail | null> {
  const { status, data } = await getJson<Omit<JobDetail, "token">>(
    `/jobs/${encodeURIComponent(token)}`,
  );
  if (status === 404) return null;
  if (status !== 200 || !data) throw new Error(`careers job ${status}`);
  return { ...data, token, closesAt: data.closesAt ?? null };
}

export async function apply(
  token: string,
  v: ApplyInput,
): Promise<ApplyResult> {
  const body = new FormData();
  body.set("name", v.name);
  body.set("email", v.email);
  body.set("phone", v.phone);
  body.set("cv", v.cv);
  body.set("answers", JSON.stringify(v.answers));
  body.set("site", siteCountry());
  body.set("source", source());
  body.set("website", v.website ?? "");
  body.set("consent", "true"); // the form blocks sending until the consent box is ticked
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 60000);
  try {
    const res = await fetch(`${API}/jobs/${encodeURIComponent(token)}/apply`, {
      method: "POST",
      body,
      credentials: "omit",
      mode: "cors",
      signal: ctrl.signal,
    });
    const json = (await res.json().catch(() => ({}))) as {
      data?: { applicationId?: string; reference?: string };
      message?: string;
    };
    if (res.status === 201 || res.ok)
      return { ok: true, reference: json.data?.reference };
    return { ok: false, status: res.status, message: json.message || "" };
  } catch {
    return { ok: false, status: 0, message: "" };
  } finally {
    clearTimeout(timer);
  }
}

// ── Formatting ───────────────────────────────────────────────────────────────
const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const dateLong = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
export const fmtDate = (iso?: string | null, long?: boolean) =>
  iso ? (long ? dateLong : dateFmt).format(new Date(iso)) : "";
export const closesLabel = (iso: string | null) =>
  iso ? `Closes ${fmtDate(iso)}` : "Open until filled";

const TYPES: Record<string, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
  temporary: "Temporary",
};
export const typeLabel = (t?: string) => (t ? (TYPES[t] ?? t) : "");
export const SCHEMA_TYPE: Record<string, string> = {
  full_time: "FULL_TIME",
  part_time: "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
  temporary: "TEMPORARY",
};

/** j••••••@gmail.com */
export const maskEmail = (e = "") =>
  e.replace(
    /^(.)(.*)(@.*)$/,
    (_m, a: string, b: string, c: string) =>
      a + "•".repeat(Math.min(Math.max(b.length, 3), 6)) + c,
  );

// Icon names HR picks in Careers site (backend config/careerSites CAREER_ICONS).
const ICONS: Record<string, LucideIcon> = {
  truck: Truck, users: Users, graduation: GraduationCap, shield: ShieldCheck, trending: TrendingUp, globe: Globe,
  heart: HeartPulse, bus: Bus, clock: Clock3, home: Home, phone: Phone, briefcase: Briefcase,
};
/** HR's {icon name, title, text} tiles as IconGrid items. */
export const tiles = (list: { icon: string; title: string; text: string }[]) => list.map((t) => ({ ...t, icon: ICONS[t.icon] ?? Briefcase }));
