import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Img } from "@/components/atoms/media";
import type { PhotoKey } from "@/content/images";
import { cn } from "@/lib/utils";

/**
 * Hairline row: number · title · summary · ↗. Whole row is the link.
 * Hover: title turns accent, arrow lifts, optional thumbnail slides in (desktop).
 */
export function NumberedRow({
  to,
  no,
  title,
  summary,
  photo,
  size = "md",
  className,
}: {
  to: string;
  no?: string;
  title: string;
  summary?: string;
  photo?: PhotoKey;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group/row relative grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 border-b border-line py-6 transition-colors duration-2 first:border-t tablet:grid-cols-[3.5rem_1fr_1.2fr_auto] tablet:items-center tablet:gap-x-6 tablet:py-7",
        className,
      )}
    >
      <span className="pt-1 text-small tabular text-muted tablet:pt-0">{no}</span>
      <span
        className={cn(
          "font-medium text-ink transition-colors duration-2 group-hover/row:text-accent",
          size === "lg" ? "text-h3" : "text-h4 tablet:text-[1.375rem]",
        )}
      >
        {title}
      </span>
      {summary && (
        <span className="col-start-2 row-start-2 mt-2 text-small text-body tablet:col-start-3 tablet:row-start-1 tablet:mt-0 tablet:text-[0.9375rem]">
          {summary}
        </span>
      )}
      <span className="relative col-start-3 row-start-1 flex items-center gap-4 tablet:col-start-4">
        {photo && (
          // Floats over the row (absolute) so the larger preview never changes row height.
          <Img
            photo={photo}
            ratio="4/3"
            sizes="320px"
            className="pointer-events-none absolute right-10 top-1/2 z-10 hidden w-[204px] -translate-y-1/2 opacity-0 shadow-lg transition-[opacity,transform] duration-3 ease-out group-hover/row:opacity-100 desktop:block desktop:translate-x-2 desktop:group-hover/row:translate-x-0"
          />
        )}
        <ArrowUpRight
          aria-hidden
          strokeWidth={1.5}
          className="size-5 text-ink transition-[transform,color] duration-2 ease-out group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-accent"
        />
      </span>
    </Link>
  );
}

/** Label / value list with hairlines, used for building-style fact files. */
export function FactList({ items, className, dark }: { items: { label: string; value: ReactNode }[]; className?: string; dark?: boolean }) {
  return (
    <dl className={cn("border-t", dark ? "border-night-line" : "border-line", className)}>
      {items.map((f) => (
        <div
          key={f.label}
          className={cn("flex items-baseline justify-between gap-6 border-b py-3.5", dark ? "border-night-line" : "border-line")}
        >
          <dt className={cn("text-small", dark ? "text-on-night/70" : "text-muted")}>{f.label}</dt>
          <dd className={cn("text-right text-[0.9375rem] font-medium", dark ? "text-white" : "text-ink")}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Big number on a hairline with a short caption; counts up on scroll. */
export function Stat({ value, label, dark, className }: { value: string; label: string; dark?: boolean; className?: string }) {
  const countable = /\d/.test(value);
  return (
    <div className={cn("border-t pt-5", dark ? "border-night-line" : "border-ink", className)}>
      <p
        data-reveal={countable ? "count" : undefined}
        className={cn("text-stat font-medium tabular", dark ? "text-white" : "text-ink")}
      >
        {value}
      </p>
      <p className={cn("mt-3 max-w-[22ch] text-small", dark ? "text-on-night" : "text-muted")}>{label}</p>
    </div>
  );
}

/** Large "Next service / Next project" row. */
export function NextRow({ label, to, title, meta }: { label: string; to: string; title: string; meta?: string }) {
  return (
    <div>
      <p className="mb-4 text-label font-medium text-muted">{label}</p>
      <Link
        to={to}
        className="group/next flex items-center justify-between gap-6 border-y border-line py-7 tablet:py-9"
      >
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-h1 font-medium text-ink transition-colors duration-2 group-hover/next:text-accent">{title}</span>
          {meta && <span className="text-small text-muted">{meta}</span>}
        </span>
        <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong transition-[background-color,border-color,color] duration-2 group-hover/next:border-accent group-hover/next:bg-accent group-hover/next:text-white tablet:size-14">
          <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-5 transition-transform duration-3 ease-out group-hover/next:rotate-45" />
        </span>
      </Link>
    </div>
  );
}
