import { useEffect } from "react";
import { MapPin } from "lucide-react";
import { Section } from "@/components/atoms/layout";
import { Heading } from "@/components/atoms/typography";
import { AnchorButton, TextAnchor } from "@/components/atoms/button";
import { IconGrid, StepsGrid } from "@/components/molecules/jobs";
import { Page } from "@/components/templates/page";
import { ClosingCta, PageHead } from "@/components/organisms/blocks";
import { FaqSection } from "@/components/organisms/sections";
import { JobBoard, WithSettings } from "@/components/organisms/careers";
import { useLoad } from "@/hooks/use-load";
import {
  captureSource,
  jobPath,
  listJobs,
  tiles,
  type CareersSettings,
} from "@/lib/careers";

/** /careers: every word comes from HR ▸ Hiring ▸ Careers site, every job from Recruitment. */
export default function Careers() {
  useEffect(captureSource, []);
  return <WithSettings>{(s) => <CareersPage s={s} />}</WithSettings>;
}

function CareersPage({ s }: { s: CareersSettings }) {
  const load = useLoad(listJobs, []);
  const n = load.data?.length;
  const origin = window.location.origin;
  const { email, linkedin } = s.contacts;

  return (
    <Page
      meta={{
        title: "Careers",
        description:
          s.hero.intro || `Open roles at TekAccess. ${s.hero.countriesLine}`,
        path: "/careers",
        jsonLd: load.data?.length
          ? {
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: load.data.map((j, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: origin + jobPath(j),
                name: j.title,
              })),
            }
          : undefined,
      }}
    >
      <PageHead
        label="Careers"
        lead={s.hero.title}
        quiet={
          s.hero.accent ? (
            <span className="text-accent">{s.hero.accent}</span>
          ) : undefined
        }
        aside={
          <>
            {s.hero.intro && (
              <p className="text-[1.0625rem] text-body">{s.hero.intro}</p>
            )}
            <p className="mt-3 flex items-center gap-2 text-small text-muted">
              <MapPin
                aria-hidden
                className="size-4 text-ink"
                strokeWidth={1.5}
              />
              {load.loading
                ? "Loading open roles…"
                : n
                  ? [
                      `${n} open ${n === 1 ? "role" : "roles"}`,
                      s.hero.countriesLine,
                    ]
                      .filter(Boolean)
                      .join(" · ")
                  : "No open roles right now"}
            </p>
            {!!n && (
              <AnchorButton href="#roles" variant="accent" className="mt-6">
                View Open Roles
              </AnchorButton>
            )}
          </>
        }
      />

      <JobBoard load={load} settings={s} />

      {s.why.length > 0 && (
        <Section
          tone="paper"
          space="none"
          divider={false}
          aria-labelledby="why-title"
          className="bg-[#E3ECFD] py-10 tablet:py-12 [--line:191_208_243] [--muted:72_88_134] [--quiet:84_104_158] [--body:44_58_100]"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-4">
              <Heading
                id="why-title"
                lead="Work That Moves"
                quiet="the Region."
              />
            </div>
            <IconGrid items={tiles(s.why)} className="lg:col-span-8" />
          </div>
        </Section>
      )}

      {s.steps.length > 0 && (
        <Section
          id="how"
          tone="white"
          space="none"
          aria-labelledby="how-title"
          className="scroll-mt-[var(--header-h)] border-line py-10 tablet:py-12"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-4">
              <p className="mb-3 text-eyebrow font-medium text-muted">
                How it works
              </p>
              <Heading
                id="how-title"
                lead="From Application to"
                quiet="Offer."
              />
            </div>
            <StepsGrid
              items={s.steps.map((x, i) => ({ no: String(i + 1), ...x }))}
              className="lg:col-span-8"
            />
          </div>
        </Section>
      )}

      {s.faq.length > 0 && (
        <FaqSection
          id="faq"
          items={s.faq}
          lead="Frequently Asked"
          quiet="Questions."
          defaultOpen={0}
          help={
            <>
              Still unsure?{" "}
              <TextAnchor href={`mailto:${email}`}>Email {email}</TextAnchor>
            </>
          }
        />
      )}

      <ClosingCta
        lead={s.closing.title}
        quiet={s.closing.accent}
        text={s.closing.text}
        link={
          <TextAnchor href={`mailto:${email}`}>Or email {email}</TextAnchor>
        }
        action={
          linkedin ? (
            <AnchorButton
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              variant="accent"
            >
              Follow on LinkedIn
            </AnchorButton>
          ) : null
        }
      />
    </Page>
  );
}
