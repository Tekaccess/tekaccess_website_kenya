import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Section } from "@/components/atoms/layout";
import { Eyebrow, Heading } from "@/components/atoms/typography";
import { TextAnchor, TextLink } from "@/components/atoms/button";
import { Img } from "@/components/atoms/media";
import { Accordion } from "@/components/molecules/misc";
import { ArticleCard } from "@/components/molecules/cards";
import { FactList } from "@/components/molecules/rows";
import { SectionHead } from "./blocks";
import { institutions, journey } from "@/content/company";
import { ceo, ceoMessage } from "@/content/people";
import type { Corridor } from "@/content/corridors";
import { corridorName } from "@/content/corridors";
import type { Insight } from "@/content/insights";
import type { PhotoKey } from "@/content/images";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Text-only client list (Storey's "owners we report to"). */
export function InstitutionsList({ tone = "paper" }: { tone?: "paper" | "white" }) {
  return (
    <Section tone={tone} space="sm" aria-labelledby="institutions-title">
      <Eyebrow id="institutions-title" className="mb-8">
        Institutions we deliver for
      </Eyebrow>
      <ul className="grid border-t border-line tablet:grid-cols-2 lg:grid-cols-3 lg:gap-x-8" data-reveal="stagger">
        {institutions.map((it) => (
          <li key={it.name} className="flex flex-col gap-1 border-b border-line py-5">
            <span className="text-h4 font-medium text-ink">{it.name}</span>
            <span className="text-small text-muted">{it.note}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Five rising photo steps on a ground line: mine → silo. */
export function JourneySteps() {
  return (
    <Section tone="white" aria-labelledby="journey-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Heading id="journey-title" lead="From the mine to your silo." quiet="Five handovers, one company." />
          <p className="mt-6 max-w-sm text-[0.9375rem] text-body" data-reveal="fade">
            Every load passes through the same five hands. All of them are ours, so nothing falls between two companies.
          </p>
        </div>
        <ol data-reveal="sky" className="relative grid grid-cols-2 items-end gap-x-4 gap-y-10 tablet:grid-cols-5 lg:col-span-8 lg:gap-x-5">
          {journey.map((s, i) => (
            <li key={s.title} className="flex flex-col">
              <div className="flex flex-col justify-end" style={{ height: "clamp(180px, 22vw, 320px)" }}>
                <span data-sky-num className="mb-3 text-micro font-medium tabular text-muted">
                  0{i + 1}
                </span>
                <div data-sky-photo className="overflow-hidden" style={{ height: `${44 + i * 14}%` }}>
                  <Img photo={s.photo} ratio="auto" sizes="(min-width:810px) 14vw, 45vw" className="size-full rounded-none" />
                </div>
              </div>
              <div className="border-t border-ink pt-3">
                <p className="text-[0.9375rem] font-medium text-ink">{s.title}</p>
                <p className="mt-1 text-micro text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/** Large photo + fact file for one corridor. */
export function CorridorFocus({ corridor, tone = "paper" }: { corridor: Corridor; tone?: "paper" | "white" }) {
  return (
    <Section tone={tone} aria-labelledby="focus-title">
      <SectionHead
        lead="One corridor, up close."
        quiet="Every other lane runs the same way."
        action={
          <TextLink to={`/corridors/${corridor.slug}`} arrow>
            Open the corridor
          </TextLink>
        }
      />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Link to={`/corridors/${corridor.slug}`} className="group/f lg:col-span-8" aria-label={`Open ${corridorName(corridor)}`}>
          <Img
            photo={corridor.photo}
            ratio="16/10"
            reveal="image"
            sizes="(min-width:1024px) 62vw, 100vw"
            imgClassName="transition-transform duration-6 ease-out group-hover/f:scale-[1.03]"
          />
        </Link>
        <div className="flex flex-col justify-end lg:col-span-4" data-reveal="fade">
          <Eyebrow>{corridor.mode} corridor</Eyebrow>
          <h3 className="mt-3 text-h2 font-medium">{corridorName(corridor)}</h3>
          <p className="mt-4 text-[0.9375rem] text-body">{corridor.summary}</p>
          <FactList className="mt-8" items={corridor.facts.slice(0, 5)} />
        </div>
      </div>
    </Section>
  );
}

/** Big pull quote from the CEO, no box. */
export function CeoQuote() {
  return (
    <Section tone="white" aria-label="A word from our CEO">
      <figure className="mx-auto max-w-5xl">
        <blockquote>
          <p data-reveal="lines" className="text-h1 font-medium text-ink tablet:text-display">
            <span aria-hidden className="text-accent">“</span>
            {ceoMessage.quote}
            <span aria-hidden className="text-accent">”</span>
          </p>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-4" data-reveal="fade">
          <img
            src={`${ceo.photo}-480.webp`}
            alt=""
            width={56}
            height={70}
            loading="lazy"
            className="h-16 w-14 rounded-xs object-cover"
          />
          <span>
            <span className="block text-[1.0625rem] font-medium text-ink">{ceo.name}</span>
            <span className="block text-small text-muted">{ceo.role}</span>
          </span>
        </figcaption>
      </figure>
    </Section>
  );
}

/** FAQ: heading left, accordion right. */
export function FaqSection({
  items,
  lead = "What clients ask first.",
  quiet = "Lead times are question one.",
  tone = "paper",
  defaultOpen,
}: {
  items: { q: string; a: string }[];
  lead?: string;
  quiet?: string;
  tone?: "paper" | "white";
  defaultOpen?: number;
}) {
  return (
    <Section tone={tone} aria-labelledby="faq-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Heading id="faq-title" lead={lead} quiet={quiet} />
          <p className="mt-6 text-[0.9375rem] text-body" data-reveal="fade">
            Not here?{" "}
            <TextAnchor href={site.phoneHref} className="tabular">
              Call {site.phone}
            </TextAnchor>
          </p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6" data-reveal="fade">
          <Accordion items={items} defaultOpen={defaultOpen} />
        </div>
      </div>
    </Section>
  );
}

/** Three latest insights. */
export function InsightsRow({ posts, lead = "Notes from the field.", quiet = "Written by the people who move the loads.", label }: { posts: Insight[]; lead?: string; quiet?: string; label?: string }) {
  return (
    <Section tone="white" aria-labelledby="insights-row-title">
      <SectionHead
        label={label}
        lead={<span id="insights-row-title">{lead}</span>}
        quiet={quiet}
        action={
          <TextLink to="/insights" arrow>
            All insights
          </TextLink>
        }
      />
      <div className="grid gap-x-8 gap-y-14 tablet:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
        {posts.slice(0, 3).map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>
    </Section>
  );
}

/** Four portrait photos on a ground line with captions. */
export function PhotoStrip({ items, className }: { items: { photo: PhotoKey; caption: string }[]; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <ul data-reveal="sky" className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
        {items.map((s) => (
          <li key={s.caption}>
            <div data-sky-photo className="overflow-hidden">
              <Img photo={s.photo} ratio="4/5" sizes="(min-width:1024px) 23vw, 46vw" className="rounded-none" />
            </div>
            <p data-sky-num className="border-t border-ink pt-3 text-small text-muted">
              {s.caption}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Shipment-tracking style route: stops on a line, last stop highlighted.
 * Horizontal from tablet up, vertical on phones. Line draws in on scroll.
 */
export function RouteLine({ stops, dark, endAccent }: { stops: { stop: string; note: string }[]; dark?: boolean; endAccent?: boolean }) {
  const line = dark ? "bg-white/30" : "bg-ink";
  return (
    <ol className="relative grid gap-8 tablet:flex tablet:justify-between tablet:gap-4">
      <span aria-hidden data-reveal="hairline" className={cn("absolute hidden h-px tablet:left-1.5 tablet:right-1.5 tablet:top-[5px] tablet:block", line)} />
      <span aria-hidden className={cn("absolute bottom-2 left-[5px] top-2 w-px tablet:hidden", line)} />
      {stops.map((s, i) => {
        const last = i === stops.length - 1;
        return (
          <Fragment key={s.stop}>
            <li className="relative flex gap-5 tablet:flex-1 tablet:flex-col tablet:gap-4 tablet:last:items-end tablet:last:text-right">
              <span
                aria-hidden
                className={cn(
                  "relative z-[1] mt-1 size-[11px] shrink-0 rounded-full border-2 tablet:mt-0",
                  last && endAccent
                    ? "border-accent bg-accent"
                    : dark
                      ? "border-signal bg-night"
                      : "border-ink bg-paper",
                )}
              />
              <span>
                <span className={cn("block text-[0.9375rem] font-medium", dark ? "text-white" : "text-ink")}>{s.stop}</span>
                <span className={cn("mt-1 block text-small", dark ? "text-on-night/80" : "text-muted")}>{s.note}</span>
              </span>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
