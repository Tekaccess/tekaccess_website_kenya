import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Heading } from "@/components/atoms/typography";
import {
  closesLabel,
  jobPath,
  typeLabel,
  type JobSummary,
} from "@/lib/careers";
import { cn } from "@/lib/utils";

/** Icon + text items in one line (location · department · closing date). */
export function MetaLine({
  items,
  className,
}: {
  items: { icon: LucideIcon; text?: string }[];
  className?: string;
}) {
  const shown = items.filter((i) => i.text);
  return (
    <span
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-small text-muted",
        className,
      )}
    >
      {shown.map(({ icon: Icon, text }) => (
        <span key={text} className="inline-flex items-center gap-1.5">
          <Icon
            aria-hidden
            className="size-4 shrink-0 text-ink/70"
            strokeWidth={1.5}
          />
          {text}
        </span>
      ))}
    </span>
  );
}

/**
 * One open role as a hairline row; the whole row is the link.
 * Hover: soft blue wash, title turns accent, the button fills ink.
 */
export function JobRow({
  job,
  no,
  compact,
  className,
}: {
  job: JobSummary;
  no?: number;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      to={jobPath(job)}
      className={cn(
        "group/job grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 border-b border-line px-1 transition-colors duration-2 first:border-t hover:bg-[#F5F8FE] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink tablet:grid-cols-[3rem_1fr_auto] tablet:gap-x-4 tablet:px-3",
        compact ? "py-4" : "py-5 tablet:py-6",
        className,
      )}
    >
      <span className="self-start pt-1 text-small tabular text-muted">
        {no != null && String(no).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span
            className={cn(
              "font-medium text-ink transition-colors duration-2 group-hover/job:text-accent",
              compact ? "text-[1.0625rem]" : "text-h4 tablet:text-[1.375rem]",
            )}
          >
            {job.title}
          </span>
          {job.employmentType && <Badge>{typeLabel(job.employmentType)}</Badge>}
        </span>
        <MetaLine
          className="mt-2"
          items={
            compact
              ? [{ icon: MapPin, text: job.location }]
              : [
                  { icon: MapPin, text: job.location },
                  { icon: Briefcase, text: job.department },
                  { icon: CalendarDays, text: closesLabel(job.closesAt) },
                ]
          }
        />
      </span>
      {compact ? (
        <ArrowUpRight
          aria-hidden
          strokeWidth={1.5}
          className="size-5 text-ink transition-transform duration-2 group-hover/job:-translate-y-0.5 group-hover/job:translate-x-0.5"
        />
      ) : (
        <>
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.5}
            className="size-5 text-ink tablet:hidden"
          />
          <span className="hidden h-10 items-center gap-2 rounded border border-line-strong px-4 text-small font-medium text-ink transition-colors duration-2 group-hover/job:border-ink group-hover/job:bg-ink group-hover/job:text-white tablet:inline-flex">
            View Role{" "}
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
          </span>
        </>
      )}
    </Link>
  );
}

/** Key facts in one hairline box: 4 across on desktop, 2×2 below. */
export function KeyFacts({
  items,
  muted,
  className,
}: {
  items: { label: string; value?: string }[];
  muted?: boolean;
  className?: string;
}) {
  const shown = items.filter((i) => i.value);
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line",
        shown.length > 2 && "lg:grid-cols-4",
        className,
      )}
    >
      {shown.map((f) => (
        <div
          key={f.label}
          className="bg-white px-4 py-4 tablet:px-6 tablet:py-5"
        >
          <dt className="text-small text-muted">{f.label}</dt>
          <dd
            className={cn(
              "mt-1 text-h4 font-medium",
              muted ? "text-muted" : "text-ink",
            )}
          >
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** White hairline box (side columns); `blue` for reassurance notes. */
export function InfoBox({
  title,
  tone = "white",
  children,
  className,
}: {
  title?: ReactNode;
  tone?: "white" | "blue";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded p-6 tablet:p-7",
        tone === "blue" ? "bg-[#E3ECFD]" : "border border-line bg-white",
        className,
      )}
    >
      {title && <h2 className="mb-4 text-h4 font-medium text-ink">{title}</h2>}
      {children}
    </div>
  );
}

/** Left-aligned empty state: icon square, two-tone heading, text, actions. */
export function EmptyState({
  icon: Icon,
  lead,
  quiet,
  text,
  actions,
  className,
}: {
  icon: LucideIcon;
  lead: ReactNode;
  quiet?: ReactNode;
  text?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 border-t border-line pt-8 tablet:flex-row tablet:gap-8",
        className,
      )}
    >
      <span className="grid size-14 shrink-0 place-items-center rounded bg-[#E3ECFD] text-ink">
        <Icon aria-hidden className="size-6" strokeWidth={1.5} />
      </span>
      <div>
        <Heading as="h2" size="h3" lead={lead} quiet={quiet} reveal={false} />
        {text && (
          <p className="mt-3 max-w-[52ch] text-[1.0625rem] text-body">{text}</p>
        )}
        {actions && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

/** Red-tinted alert box. `items` link to fields (focus moves there); `children` for server messages. */
export function ErrorSummary({
  title,
  items,
  onPick,
  children,
  focusRef,
}: {
  title: string;
  items?: { id: string; label: string }[];
  onPick?: (id: string) => void;
  children?: ReactNode;
  focusRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={focusRef}
      role="alert"
      tabIndex={-1}
      className="flex gap-4 rounded border border-danger/30 bg-danger/[0.04] p-5 outline-none"
    >
      <AlertCircle
        aria-hidden
        className="mt-0.5 size-5 shrink-0 text-danger"
        strokeWidth={1.75}
      />
      <div className="text-small">
        <p className="font-medium text-ink">{title}</p>
        {items && items.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
            {items.map((i) => (
              <li key={i.id}>
                <button
                  type="button"
                  onClick={() => onPick?.(i.id)}
                  className="font-medium text-ink underline underline-offset-4 hover:text-accent"
                >
                  {i.label}
                </button>
              </li>
            ))}
          </ul>
        )}
        {children && <div className="mt-1.5 text-body">{children}</div>}
      </div>
    </div>
  );
}

/** Big accent numbers in a hairline box (Services "How it works"). `cols={1}` for a list with a note on the right. */
export function StepsGrid({
  items,
  cols = 2,
  className,
}: {
  items: { no: string; title: string; text: string; aside?: string }[];
  cols?: 1 | 2;
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "grid gap-px overflow-hidden rounded border border-line bg-line",
        cols === 2 && "tablet:grid-cols-2",
        className,
      )}
      data-reveal="stagger"
    >
      {items.map((s) => (
        <li
          key={s.no}
          className={cn(
            "group/step bg-paper px-5 py-4 transition-colors duration-3 hover:bg-white tablet:px-6 tablet:py-5",
            cols === 1 &&
              "grid grid-cols-[2.5rem_1fr] gap-x-4 tablet:grid-cols-[3rem_1fr_auto] tablet:items-start",
          )}
        >
          <span className="text-h2 font-medium leading-none text-accent tabular">
            {s.no}
          </span>
          <div>
            <h3
              className={cn(
                "text-h4 font-medium text-ink",
                cols === 2 && "mt-3",
              )}
            >
              {s.title}
            </h3>
            <p className="mt-1 max-w-[40ch] text-small text-body">{s.text}</p>
          </div>
          {s.aside && (
            <p className="col-start-2 mt-2 text-small text-muted tablet:col-start-3 tablet:mt-0.5">
              {s.aside}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Icon tiles in a hairline box (Services "What's included", Careers "Why TekAccess"). */
export function IconGrid({
  items,
  cols = 3,
  className,
}: {
  items: { icon: LucideIcon; title: string; text: string }[];
  cols?: 2 | 3;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-px overflow-hidden rounded border border-line bg-line tablet:grid-cols-2",
        cols === 3 && "lg:grid-cols-3",
        className,
      )}
      data-reveal="stagger"
    >
      {items.map(({ icon: Icon, title, text }) => (
        <li
          key={title}
          className="group/inc bg-white px-5 py-4 transition-colors duration-3 hover:bg-[#F5F8FE] tablet:px-6 tablet:py-5"
        >
          <Icon
            aria-hidden
            strokeWidth={1.5}
            className="size-6 text-ink transition-transform duration-3 ease-out group-hover/inc:-translate-y-0.5"
          />
          <h3 className="mt-3 text-h4 font-medium">{title}</h3>
          <p className="mt-1 text-small text-body">{text}</p>
        </li>
      ))}
    </ul>
  );
}
