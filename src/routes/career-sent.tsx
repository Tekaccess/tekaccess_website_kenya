import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CalendarDays, Check, Copy, MapPin } from "lucide-react";
import { Container, Section } from "@/components/atoms/layout";
import { Eyebrow, Heading } from "@/components/atoms/typography";
import { Badge } from "@/components/atoms/badge";
import { LinkButton } from "@/components/atoms/button";
import {
  InfoBox,
  JobRow,
  MetaLine,
  StepsGrid,
} from "@/components/molecules/jobs";
import { Page } from "@/components/templates/page";
import { DemoBar } from "@/components/organisms/careers";
import { useLoad } from "@/hooks/use-load";
import { getSettings, listJobs, maskEmail, typeLabel } from "@/lib/careers";

type Sent = {
  name?: string;
  email?: string;
  title?: string;
  location?: string;
  type?: string;
  token?: string;
  reference?: string;
  sentAt?: string;
};
const when = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/** After a successful application. Works without navigation state too (reload, direct visit). */
export default function CareerSent() {
  const s = (useLocation().state ?? {}) as Sent;
  const jobs = useLoad(listJobs, []);
  // HR's "after applying" steps; the confirmation itself never waits for them.
  const settings = useLoad(getSettings, []).data;
  const others = (jobs.data ?? [])
    .filter((j) => j.token !== s.token)
    .slice(0, 3);
  const h1 = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => h1.current?.focus(), []);

  return (
    <Page
      meta={{
        title: "Application sent",
        description: "Your application has been sent to TekAccess.",
        path: "/careers/sent",
        noindex: true,
      }}
    >
      <DemoBar />
      <header className="bg-[#F2F6FE] pb-12 pt-[calc(var(--header-h)+3rem)] [--line:206_218_242] [--muted:84_98_138] [--body:48_60_98] tablet:pb-16 tablet:pt-[calc(var(--header-h)+4rem)]">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-6 tablet:flex-row tablet:items-start">
              <span
                className="grid size-16 shrink-0 place-items-center rounded bg-ink text-white"
                data-reveal="fade"
              >
                <Check aria-hidden className="size-8" strokeWidth={2} />
              </span>
              <div>
                <Eyebrow className="mb-3">Application sent</Eyebrow>
                <h1
                  ref={h1}
                  tabIndex={-1}
                  className="animate-fade-in text-display font-medium text-ink outline-none"
                >
                  {s.name ? `Thank You, ${s.name}.` : "Thank You."}{" "}
                  <span className="block text-accent">
                    Your Application Is In.
                  </span>
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-[52ch] text-[1.0625rem] text-body">
              {s.title
                ? `We have received your application for ${s.title}${s.location ? ` in ${s.location.split(",")[0]}` : ""}.`
                : "We have received your application."}{" "}
              {s.email
                ? `A confirmation is on its way to ${maskEmail(s.email)}.`
                : "A confirmation is on its way to your email."}
            </p>
            {s.reference && (
              <div className="mt-6 inline-flex items-center gap-6 rounded border border-line bg-white px-5 py-3">
                <span className="text-small text-muted">Your reference</span>
                <span className="font-medium tabular text-ink">
                  {s.reference}
                </span>
                <button
                  type="button"
                  aria-label="Copy reference"
                  onClick={() =>
                    navigator.clipboard?.writeText(s.reference!).then(
                      () => (
                        setCopied(true),
                        setTimeout(() => setCopied(false), 2000)
                      ),
                      () => undefined,
                    )
                  }
                  className="grid size-8 place-items-center rounded text-ink hover:bg-paper"
                >
                  {copied ? (
                    <Check className="size-4 text-success" />
                  ) : (
                    <Copy className="size-4" strokeWidth={1.75} />
                  )}
                </button>
              </div>
            )}
          </div>
          {s.title && (
            <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-8">
              <InfoBox>
                <p className="text-small text-muted">You applied for</p>
                <p className="mt-1 flex flex-wrap items-center gap-3 text-h4 font-medium text-ink">
                  {s.title} {s.type && <Badge>{typeLabel(s.type)}</Badge>}
                </p>
                <div className="my-5 h-px bg-line" />
                <MetaLine
                  className="flex-col !items-start gap-y-2.5 text-[0.9375rem] text-body"
                  items={[
                    { icon: MapPin, text: s.location },
                    {
                      icon: CalendarDays,
                      text:
                        s.sentAt && `Sent ${when.format(new Date(s.sentAt))}`,
                    },
                  ]}
                />
                <div className="my-5 h-px bg-line" />
                <p className="text-small text-muted">
                  Keep your reference if you contact us.
                </p>
              </InfoBox>
            </div>
          )}
        </Container>
      </header>

      <Section
        tone="white"
        space="none"
        className="py-10 tablet:py-14"
        aria-labelledby="next-title"
      >
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-3">What happens next</Eyebrow>
            <Heading
              id="next-title"
              lead="From Application to"
              quiet="Offer."
            />
          </div>
          <div className="lg:col-span-8">
            {settings ? (
              <>
                <StepsGrid items={settings.nextSteps.map((x, i) => ({ no: String(i + 1), title: x.title, text: x.text, aside: x.timing }))} cols={1} />
                {settings.notSelectedText && <p className="mt-5 text-small text-body">{settings.notSelectedText}</p>}
              </>
            ) : (
              <p className="text-small text-body">We review every application and contact shortlisted candidates by phone or email.</p>
            )}
          </div>
        </div>
      </Section>

      <Section
        tone="paper"
        space="none"
        className="py-10 tablet:py-14"
        aria-labelledby="more-title"
      >
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-3">Other open roles</Eyebrow>
            <Heading
              id="more-title"
              lead="You Might Also"
              quiet="Like."
              quietClassName="text-accent"
            />
          </div>
          <div className="lg:col-span-8">
            {others.map((j, i) => (
              <JobRow key={j.token} job={j} no={i + 1} />
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/careers" variant="ink">
                See All Roles
              </LinkButton>
              <LinkButton to="/" variant="outline" arrow={false}>
                Back to Home
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
