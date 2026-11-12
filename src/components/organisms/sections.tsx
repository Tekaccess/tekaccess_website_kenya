import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Section } from "@/components/atoms/layout";
import { Eyebrow, Heading } from "@/components/atoms/typography";
import { LinkButton, TextAnchor, TextLink } from "@/components/atoms/button";
import { Img } from "@/components/atoms/media";
import { Accordion } from "@/components/molecules/misc";
import { ArticleCard } from "@/components/molecules/cards";
import { FactList } from "@/components/molecules/rows";
import { SectionHead } from "./blocks";
import { institutions } from "@/content/company";
import type { Post } from "@/content/posts";
import type { PhotoKey } from "@/content/images";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Clients on the navy band: real logos on white tiles, name + what we delivered,
 * Ink rule above each entry. Tiles rise in one after another on scroll.
 */
export function InstitutionsList() {
  return (
    <Section tone="paper" space="none" divider={false} aria-labelledby="institutions-title" className="overflow-hidden py-12 tablet:py-16">
      <div className="text-center">
        <h2 id="institutions-title" data-reveal="lines" className="text-h2 font-medium">
          <span className="mb-3 block text-label font-medium text-muted">Partners</span>
          Trusted by Leading <span className="text-accent">Institutions</span>
        </h2>
      </div>
      {/* Two centred rows, wide over narrow (a "V"): 5 logos then 3. */}
      <div className="mt-7 flex flex-col items-center gap-4 tablet:mt-9">
        {[institutions.slice(0, 5), institutions.slice(5)].map((row, r) => (
          <ul key={r} className="flex flex-wrap justify-center gap-4" data-reveal="stagger">
            {row.map((it) => (
              <li key={it.name} className="grid h-16 w-36 place-items-center rounded-xs bg-white px-4 tablet:h-20 tablet:w-48">
                <img src={it.logo} alt={`${it.name} logo`} loading="lazy" className="h-10 w-auto max-w-[85%] object-contain tablet:h-12" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </Section>
  );
}

/** Home teaser for /about: light-blue band, photo + facts + button. */
export function AboutTeaser() {
  return (
    <Section
      tone="paper"
      space="none"
      divider={false}
      aria-labelledby="about-teaser-title"
      className="bg-[#E3ECFD] py-10 tablet:py-12 desktop:py-14 [--line:191_208_243] [--muted:72_88_134] [--quiet:84_104_158] [--body:44_58_100]"
    >
      <SectionHead
        className="mb-6 tablet:mb-8"
        lead={<span id="about-teaser-title">Driving Logistics <span className="text-accent">Excellence</span></span>}
        quiet="Across Rwanda."
        action={
          <TextLink to="/about" arrow>
            About Us
          </TextLink>
        }
      />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Link to="/about" className="group/f lg:col-span-8" aria-label="About TekAccess">
          <Img
            photo="fleetRow"
            ratio="16/9"
            reveal="image"
            sizes="(min-width:1024px) 62vw, 100vw"
            imgClassName="transition-transform duration-6 ease-out group-hover/f:scale-[1.03]"
          />
        </Link>
        <div className="flex flex-col justify-end lg:col-span-4" data-reveal="fade">
          <Eyebrow>Since 2019</Eyebrow>
          <h3 className="mt-2 text-h2 font-medium">Our Story</h3>
          <p className="mt-3 text-[0.9375rem] text-body">
            From import to final delivery, we modernize logistics operations with reliable transport solutions that connect businesses across Rwanda and beyond.
          </p>
          <FactList
            className="mt-5"
            items={[
              { label: "Founded", value: String(site.founded) },
              { label: "Office", value: "Kigali, Rwanda" },
              { label: "Countries", value: String(site.countries.length) },
            ]}
          />
          <LinkButton to="/contact" variant="ink" className="mt-6 self-start">
            Partner with us
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}

/** FAQ: heading left, accordion right. */
export function FaqSection({
  items,
  lead = "Frequently Asked Questions.",
  quiet = "Clarity at every step.",
  tone = "paper",
  defaultOpen,
  divider,
}: {
  items: { q: string; a: string }[];
  lead?: string;
  quiet?: string;
  tone?: "paper" | "white";
  defaultOpen?: number;
  divider?: boolean;
}) {
  return (
    <Section tone={tone} space="none" divider={divider} aria-labelledby="faq-title" className="py-10 tablet:py-12 desktop:py-16">
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

/** Three latest blog posts. */
export function BlogRow({ posts, lead = "Our Proven Track Record.", quiet, label = "Past Achievements" }: { posts: Post[]; lead?: string; quiet?: string; label?: string }) {
  return (
    <Section tone="white" space="none" aria-labelledby="blog-row-title" className="border-line py-14 tablet:py-16 desktop:py-20">
      <SectionHead
        label={label}
        lead={<span id="blog-row-title">{lead}</span>}
        quiet={quiet}
        action={
          <TextLink to="/blog" arrow>
            All posts
          </TextLink>
        }
      />
      <div className="mt-4 grid gap-x-8 gap-y-12 tablet:grid-cols-2 lg:grid-cols-3 lg:gap-x-12" data-reveal="stagger">
        {posts.slice(0, 3).map((p) => (
          <ArticleCard key={p.slug} post={p} ratio="2/1" compact />
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
            <p data-sky-num className="border-t border-[#ECEEF2] pt-3 text-small text-muted">
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
  const line = dark ? "bg-white/30" : "bg-[#ECEEF2]";
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
