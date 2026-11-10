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
    <header className="border-b border-line bg-paper pb-14 pt-[calc(var(--header-h)+3.5rem)] tablet:pb-20 tablet:pt-[calc(var(--header-h)+5rem)]">
      <Container>
        <div className="mb-8 tablet:mb-10" data-reveal="fade">
          {crumbs ? <Breadcrumb items={crumbs} /> : label && <Eyebrow>{label}</Eyebrow>}
        </div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Heading as="h1" size={size} lead={lead} quiet={quiet} reveal={false} className="lg:col-span-8 animate-fade-in" />
          {aside && (
            <div data-reveal="fade" data-delay="0.3" className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
              {aside}
            </div>
          )}
        </div>
        {children}
      </Container>
    </header>
  );
}

/** Closing call to action shared by every page. */
export function ClosingCta() {
  return (
    <Section tone="paper" aria-labelledby="closing-title">
      <Heading id="closing-title" size="display" lead={closing.lead} quiet={closing.quiet} className="max-w-[18ch] desktop:max-w-none" />
      <Hairline strong reveal className="mt-10 tablet:mt-14" />
      <div className="mt-8 flex flex-col gap-8 tablet:flex-row tablet:items-center tablet:justify-between" data-reveal="fade">
        <p className="max-w-md text-[0.9375rem] text-body">{closing.text}</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <TextAnchor href={site.phoneHref} className="tabular">
            Or call {site.phone}
          </TextAnchor>
          <LinkButton to="/contact" variant="accent" size="lg">
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
    <div className={cn("grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8", items.length === 3 && "lg:grid-cols-3", className)} data-reveal="stagger">
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
    <div className={cn("mb-12 flex flex-col gap-6 tablet:mb-16 tablet:flex-row tablet:items-end tablet:justify-between", className)}>
      <div className="max-w-3xl">
        {label && <Eyebrow className="mb-5">{label}</Eyebrow>}
        <Heading lead={lead} quiet={quiet} />
      </div>
      {action && <div className="shrink-0" data-reveal="fade">{action}</div>}
    </div>
  );
}
