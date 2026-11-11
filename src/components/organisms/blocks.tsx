import type { ReactNode } from "react";
import { Container, Hairline, Section } from "@/components/atoms/layout";
import { Eyebrow, Heading } from "@/components/atoms/typography";
import { LinkButton, TextAnchor } from "@/components/atoms/button";
import { Breadcrumb } from "@/components/molecules/misc";
import { Stat } from "@/components/molecules/rows";
import { closing, site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Page head: label or breadcrumb, giant two-tone title, side note, hairline below. */
export function PageHead({
  label,
  crumbs,
  lead,
  quiet,
  aside,
  size = "display",
  children,
}: {
  label?: string;
  crumbs?: { label: string; to?: string }[];
  lead: ReactNode;
  quiet?: ReactNode;
  aside?: ReactNode;
  size?: "display-xl" | "display" | "h1";
  children?: ReactNode;
}) {
  return (
    <header className="bg-[#F2F6FE] pb-[3.6rem] pt-[calc(var(--header-h)+3rem)] tablet:pb-[4.2rem] tablet:pt-[calc(var(--header-h)+3.6rem)] [--line:206_218_242] [--muted:84_98_138] [--quiet:96_112_160] [--body:48_60_98]">
      {/* One fixed height on desktop so every route's head matches (Insights is the reference). */}
      <div className="lg:flex lg:min-h-[13.5rem] lg:flex-col lg:justify-center">
      <Container>
        <div className="mb-8 tablet:mb-10" data-reveal="fade">
          {crumbs ? <Breadcrumb items={crumbs} /> : label && <Eyebrow>{label}</Eyebrow>}
        </div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <Heading as="h1" size={size} lead={lead} quiet={quiet} reveal={false} className="lg:col-span-8 animate-fade-in" />
          {aside && (
            <div data-reveal="fade" data-delay="0.3" className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
              {aside}
            </div>
          )}
        </div>
        {children}
      </Container>
      </div>
    </header>
  );
}

/** Closing call to action shared by every page. */
export function ClosingCta() {
  // Navy, continuous with the footer below (Storey's closing line + footer as one block).
  return (
    <Section tone="white" space="none" divider={false} aria-labelledby="closing-title" className="py-[3.6rem] tablet:py-[4.8rem]">
      <Heading
        id="closing-title"
        size="display"
        lead={closing.lead}
        quiet={closing.quiet}
        reveal={false}
        quietClassName="text-quiet"
        className="max-w-[18ch] desktop:max-w-[22ch]"
      />
      <Hairline reveal className="mt-[1.8rem]" />
      <div className="mt-6 flex flex-col gap-[1.8rem] tablet:flex-row tablet:items-center tablet:justify-between" data-reveal="fade">
        <p className="max-w-md text-[1.0625rem] leading-relaxed text-body">{closing.text}</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <TextAnchor href={site.phoneHref} className="tabular">
            Or call {site.phone}
          </TextAnchor>
          <LinkButton to="/contact" variant="accent">
            Request a quote
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}

/** Row of big figures that count up. */
export function FiguresRow({ items, dark, className }: { items: { value: string; label: string }[]; dark?: boolean; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4 lg:gap-x-8", items.length === 3 && "lg:grid-cols-3", className)} data-reveal="stagger">
      {items.map((f) => (
        <Stat key={f.label} value={f.value} label={f.label} dark={dark} />
      ))}
    </div>
  );
}

/** Section heading row: two-tone heading left, optional link right. */
export function SectionHead({
  lead,
  quiet,
  action,
  label,
  className,
}: {
  lead: ReactNode;
  quiet?: ReactNode;
  action?: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-col gap-4 tablet:mb-8 tablet:flex-row tablet:items-end tablet:justify-between", className)}>
      <div className="max-w-4xl">
        {label && <Eyebrow className="mb-5">{label}</Eyebrow>}
        <Heading lead={lead} quiet={quiet} />
      </div>
      {action && <div className="shrink-0" data-reveal="fade">{action}</div>}
    </div>
  );
}
