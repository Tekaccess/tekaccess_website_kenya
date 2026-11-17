import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Clock,
  FileText,
  Link2,
  Linkedin,
  MessageCircle,
  Search,
  SearchX,
  X,
} from "lucide-react";
import { Container, Section, Split } from "@/components/atoms/layout";
import { Eyebrow, Heading } from "@/components/atoms/typography";
import {
  AnchorButton,
  Button,
  LinkButton,
  TextAnchor,
  TextLink,
} from "@/components/atoms/button";
import { ChipGroup } from "@/components/atoms/form";
import { Skeleton } from "@/components/molecules/misc";
import { EmptyState, InfoBox, JobRow } from "@/components/molecules/jobs";
import {
  closesLabel,
  getSettings,
  typeLabel,
  type CareersSettings,
  type JobSummary,
} from "@/lib/careers";
import { cn } from "@/lib/utils";
import { useLoad } from "@/hooks/use-load";

const ALL = "All";

type Load = {
  data?: JobSummary[];
  loading: boolean;
  error?: unknown;
  retry: () => void;
};

/** Search + department/type chips + the job list, with loading, empty, no-match and error states. Filters live in the URL. */
export function JobBoard({ load, settings }: { load: Load; settings: CareersSettings }) {
  const { email, linkedin } = settings.contacts;
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const dept = params.get("dept") ?? ALL;
  const type = params.get("type") ?? ALL;
  const jobs = useMemo(() => load.data ?? [], [load.data]);

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === ALL) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const clear = () =>
    setParams(new URLSearchParams(), {
      replace: true,
      preventScrollReset: true,
    });

  const depts = useMemo(
    () => [
      ALL,
      ...new Set(jobs.map((j) => j.department).filter(Boolean) as string[]),
    ],
    [jobs],
  );
  const types = useMemo(
    () => [
      ALL,
      ...new Set(jobs.map((j) => typeLabel(j.employmentType)).filter(Boolean)),
    ],
    [jobs],
  );

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (dept === ALL || j.department === dept) &&
        (type === ALL || typeLabel(j.employmentType) === type) &&
        (!needle ||
          [j.title, j.department, j.location].some((v) =>
            v?.toLowerCase().includes(needle),
          )),
    );
  }, [jobs, q, dept, type]);

  const none = !load.loading && !load.error && jobs.length === 0;
  const chipRow =
    "[&>div]:flex-nowrap [&>div]:overflow-x-auto [&>div]:pb-1 tablet:[&>div]:flex-wrap tablet:[&>div]:overflow-visible";

  return (
    <div id="roles" className="scroll-mt-[calc(var(--header-h)+1rem)]">
      {!none && (
        <Section
          tone="white"
          space="none"
          className="border-b border-line py-6 tablet:py-7"
          aria-label="Search and filter roles"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-3">
              <label htmlFor="role-search" className="sr-only">
                Search roles
              </label>
              <div className="relative">
                <Search
                  aria-hidden
                  className="absolute left-0 top-3 size-5 text-ink"
                  strokeWidth={1.5}
                />
                <input
                  id="role-search"
                  type="search"
                  value={q}
                  onChange={(e) => set("q", e.target.value)}
                  placeholder="Search roles, e.g. Dispatcher"
                  autoComplete="off"
                  className="h-11 w-full appearance-none border-0 border-b border-ink bg-transparent pl-8 pr-8 text-base text-ink placeholder:text-quiet/70 focus:border-b-2 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                {q && (
                  <button
                    type="button"
                    onClick={() => set("q", "")}
                    aria-label="Clear search"
                    className="absolute right-0 top-2 grid size-7 place-items-center rounded text-muted hover:text-ink"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="grid gap-4 lg:col-span-7">
              {load.loading ? (
                <>
                  <Skeleton className="h-[4.5rem]" />
                  <Skeleton className="h-[4.5rem]" />
                </>
              ) : (
                <>
                  {depts.length > 2 && (
                    <ChipGroup
                      label="Department"
                      name="dept"
                      options={depts}
                      value={dept}
                      onChange={(v) => set("dept", v)}
                      className={chipRow}
                      labelClassName="mb-2"
                    />
                  )}
                  {types.length > 2 && (
                    <ChipGroup
                      label="Type"
                      name="type"
                      options={types}
                      value={type}
                      onChange={(v) => set("type", v)}
                      className={chipRow}
                      labelClassName="mb-2"
                    />
                  )}
                </>
              )}
            </div>
            <div
              aria-live="polite"
              className="text-small text-muted lg:col-span-2 lg:border-l lg:border-line lg:pb-3 lg:pl-6 lg:text-right"
            >
              {load.loading ? (
                <Skeleton className="ml-auto h-4 w-24" />
              ) : (
                `Showing ${shown.length} ${shown.length === 1 ? "role" : "roles"}`
              )}
            </div>
          </div>
        </Section>
      )}

      <Section tone="paper" divider={false} aria-labelledby="roles-title">
        <Split
          label={
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <Eyebrow className="mb-4">Open Roles</Eyebrow>
              <Heading
                id="roles-title"
                lead="Find Your"
                quiet={<span className="text-accent">Place.</span>}
                quietClassName="text-accent"
              />
              <p className="mt-4 max-w-[30ch] text-[1.0625rem] text-body">
                Every role is posted here first. Applications take about 5
                minutes.
              </p>
            </div>
          }
        >
          {load.loading ? (
            <div aria-busy="true" aria-label="Loading roles">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 border-b border-line py-6 first:border-t tablet:grid-cols-[3rem_1fr_auto] tablet:gap-x-4 tablet:px-3"
                >
                  <Skeleton className="h-4 w-6" />
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-3/5" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <Skeleton className="h-10 w-10 tablet:w-32" />
                </div>
              ))}
            </div>
          ) : load.error ? (
            <EmptyState
              icon={AlertCircle}
              lead="Careers Is Temporarily Unavailable."
              quiet="Please try again."
              text={
                <>
                  We could not load the open roles. You can also email{" "}
                  <TextAnchor href={`mailto:${email}`}>
                    {email}
                  </TextAnchor>
                  .
                </>
              }
              actions={
                <Button variant="ink" onClick={load.retry}>
                  Try Again
                </Button>
              }
            />
          ) : none ? (
            <EmptyState
              icon={Briefcase}
              lead="No Open Roles Right Now."
              quiet="New Roles Are Posted Here First."
              text="We hire across Rwanda, Uganda, Kenya and Tanzania throughout the year. Follow us to hear when a role opens."
              actions={
                <>
                  {linkedin && (
                    <AnchorButton href={linkedin} target="_blank" rel="noreferrer" variant="accent">
                      Follow on LinkedIn
                    </AnchorButton>
                  )}
                  <LinkButton to="/" variant="outline" arrow={false}>
                    Back to Home
                  </LinkButton>
                </>
              }
            />
          ) : shown.length === 0 ? (
            <>
              <EmptyState
                icon={SearchX}
                lead={
                  q ? `No Roles Match “${q}”` : "No Roles Match These Filters"
                }
                text={`Try another word, or clear the filters to see all ${jobs.length} open ${jobs.length === 1 ? "role" : "roles"}.`}
                actions={
                  <>
                    <Button variant="outline" onClick={clear}>
                      Clear Filters
                    </Button>
                    <TextLink to="/careers" arrow onClick={clear}>
                      See all roles
                    </TextLink>
                  </>
                }
              />
              <p className="mb-3 mt-10 text-eyebrow font-medium text-muted">
                Popular right now
              </p>
              {jobs.slice(0, 2).map((j, i) => (
                <JobRow key={j.token} job={j} no={i + 1} />
              ))}
            </>
          ) : (
            <div data-reveal="stagger">
              {shown.map((j, i) => (
                <JobRow key={j.token} job={j} no={i + 1} />
              ))}
            </div>
          )}
        </Split>
      </Section>
    </div>
  );
}

/** Side box on the job page: what applying takes, and the button. */
export function ApplyAside({ job, to }: { job: JobSummary; to: string }) {
  return (
    <InfoBox title="Apply for This Role">
      <ul className="space-y-2.5 text-[0.9375rem] text-body">
        <li className="flex items-center gap-3">
          <Clock aria-hidden className="size-4 text-ink" strokeWidth={1.5} />{" "}
          Takes about 5 minutes
        </li>
        <li className="flex items-center gap-3">
          <FileText aria-hidden className="size-4 text-ink" strokeWidth={1.5} />{" "}
          PDF or Word CV, max 5 MB
        </li>
        <li className="flex items-center gap-3">
          <CalendarDays
            aria-hidden
            className="size-4 text-ink"
            strokeWidth={1.5}
          />{" "}
          {closesLabel(job.closesAt)}
        </li>
      </ul>
      <LinkButton to={to} variant="accent" className="mt-6 w-full">
        Apply Now
      </LinkButton>
      <p className="mt-3 text-center text-micro text-muted">
        Your data is used only for hiring.
      </p>
    </InfoBox>
  );
}

/** Share box: copy link, WhatsApp, LinkedIn. Uses the native share sheet when there is one. */
export function ShareBox({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined" ? window.location.href.split("?")[0] : "";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the link is still in the address bar */
    }
  };
  const square =
    "grid size-10 place-items-center rounded border border-line-strong text-ink transition-colors duration-2 hover:border-ink hover:bg-ink hover:text-white";
  return (
    <InfoBox title="Share This Role">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link"
          className={square}
        >
          <Link2 className="size-4" strokeWidth={1.75} />
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title}: ${url}`)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Share on WhatsApp"
          className={square}
        >
          <MessageCircle className="size-4" strokeWidth={1.75} />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Share on LinkedIn"
          className={square}
        >
          <Linkedin className="size-4" strokeWidth={1.75} />
        </a>
        <button
          type="button"
          onClick={copy}
          className="ml-1 text-small font-medium text-ink underline underline-offset-4"
          aria-live="polite"
        >
          {copied ? "Link copied" : "Copy link"}
        </button>
      </div>
    </InfoBox>
  );
}

/** Share: native sheet on phones, copy elsewhere. */
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href.split("?")[0];
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(url).catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="outline" onClick={share} aria-live="polite">
      {copied ? "Link Copied" : "Share Role"}
    </Button>
  );
}

/** Compact list of other roles for side columns. */
export function OtherRoles({ jobs }: { jobs: JobSummary[] }) {
  if (!jobs.length) return null;
  return (
    <InfoBox title="Other Open Roles" className="pb-4 tablet:pb-5">
      <div className="-mx-1 tablet:-mx-3">
        {jobs.map((j) => (
          <JobRow
            key={j.token}
            job={{
              ...j,
              location: [j.location, typeLabel(j.employmentType)]
                .filter(Boolean)
                .join(" · "),
              employmentType: undefined,
            }}
            compact
            className="first:border-t-0 last:border-b-0"
          />
        ))}
      </div>
      <TextLink to="/careers" arrow className="mt-4">
        See All Roles
      </TextLink>
    </InfoBox>
  );
}

/**
 * Phone-only bar fixed to the bottom. Hidden while any element matching `hideWhen` is on screen,
 * so it never doubles the button already in view.
 */
export function StickyBar({
  children,
  hideWhen,
}: {
  children: ReactNode;
  hideWhen?: string;
}) {
  const [hidden, setHidden] = useState(false);
  const seen = useRef(new Set<Element>());
  useEffect(() => {
    if (!hideWhen) return;
    const els = document.querySelectorAll(hideWhen);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) =>
        e.isIntersecting
          ? seen.current.add(e.target)
          : seen.current.delete(e.target),
      );
      setHidden(seen.current.size > 0);
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [hideWhen]);
  return (
    <>
      <div aria-hidden className="h-24 lg:hidden" />
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-header border-t border-line bg-white/95 backdrop-blur safe-bottom transition-transform duration-3 ease-out lg:hidden",
          hidden && "translate-y-full",
        )}
      >
        <Container className="flex items-center gap-4 py-3">
          {children}
        </Container>
      </div>
    </>
  );
}

/**
 * Careers pages render once HR's careers copy has loaded; otherwise a loading band, or an
 * error with Try again (the system is the only source, nothing is built in).
 */
export function WithSettings({ children }: { children: (s: CareersSettings) => ReactNode }) {
  const load = useLoad(getSettings, []);
  if (load.data) return <>{children(load.data)}</>;
  return (
    <section aria-busy={load.loading || undefined} className="bg-[#F2F6FE] pb-section pt-[calc(var(--header-h)+3rem)]">
      <Container>
        {load.loading ? (
          <div className="space-y-5" aria-label="Loading careers">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-2/3 max-w-xl" />
            <Skeleton className="h-4 w-1/2 max-w-md" />
          </div>
        ) : (
          <EmptyState
            icon={AlertCircle}
            lead="Careers Is Temporarily Unavailable."
            quiet="Please try again."
            text="We could not load our careers pages. Check your connection, or contact us."
            actions={
              <>
                <Button variant="ink" onClick={load.retry}>
                  Try Again
                </Button>
                <LinkButton to="/contact" variant="outline" arrow={false}>
                  Contact Us
                </LinkButton>
              </>
            }
          />
        )}
      </Container>
    </section>
  );
}
