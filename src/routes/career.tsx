import { useEffect, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  CircleHelp,
  Clock,
  Link2Off,
  Mail,
  MapPin,
} from "lucide-react";
import { Container, Section } from "@/components/atoms/layout";
import { Eyebrow, Heading } from "@/components/atoms/typography";
import { Badge } from "@/components/atoms/badge";
import {
  AnchorButton,
  LinkButton,
  TextAnchor,
} from "@/components/atoms/button";
import { Skeleton } from "@/components/molecules/misc";
import {
  IconGrid,
  InfoBox,
  JobRow,
  KeyFacts,
  MetaLine,
} from "@/components/molecules/jobs";
import { Page } from "@/components/templates/page";
import { ClosingCta } from "@/components/organisms/blocks";
import {
  ApplyAside,
  OtherRoles,
  ShareBox,
  ShareButton,
  StickyBar,
} from "@/components/organisms/careers";
import { useLoad } from "@/hooks/use-load";
import {
  getSettings,
  tiles,
  SCHEMA_TYPE,
  captureSource,
  closesLabel,
  fmtDate,
  getJob,
  jobPath,
  listJobs,
  slug,
  typeLabel,
  type JobDetail,
  type JobSummary,
  type Tile,
} from "@/lib/careers";
import { site } from "@/content/site";

/**
 * Plain text from HR → headings, bullet lists and paragraphs. Never injects HTML.
 * A short line with no full stop (or ending in ":") is a heading; "-", "•", "*" lines are bullets.
 */
function Description({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) blocks.push(<p key={blocks.length}>{para.join(" ")}</p>);
    if (list.length)
      blocks.push(
        <ul key={blocks.length} className="space-y-2">
          {list.map((l, i) => (
            <li
              key={i}
              className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:bg-accent"
            >
              {l}
            </li>
          ))}
        </ul>,
      );
    para = [];
    list = [];
  };
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const bullet = line.match(/^[-•*]\s+(.*)$/);
    if (bullet) {
      if (para.length) flush();
      list.push(bullet[1]);
    } else if (
      line.length <= 60 &&
      !/[.!?]$/.test(line) &&
      (line.endsWith(":") || /^[A-Z]/.test(line))
    ) {
      flush();
      blocks.push(
        <h2
          key={blocks.length}
          className="!mt-10 border-t border-line pt-6 text-h3 font-medium text-ink first:!mt-0 first:border-0 first:pt-0"
        >
          {line.replace(/:$/, "")}
        </h2>,
      );
    } else {
      if (list.length) flush();
      para.push(line);
    }
  }
  flush();
  return (
    <div className="max-w-[68ch] space-y-4 text-body text-body">{blocks}</div>
  );
}

/** First sentence, for the head band. */
const intro = (d: string) =>
  d
    .split(/\r?\n/)
    .find((l) => /[.!?]$/.test(l.trim()))
    ?.trim() ?? "";

export default function Career() {
  const { token = "", slug: urlSlug } = useParams();
  const navigate = useNavigate();
  const job = useLoad(() => getJob(token), [token]);
  const all = useLoad(listJobs, []);
  // HR's careers copy: contacts and the standard benefits. The job page still works without it.
  const settings = useLoad(getSettings, []).data;
  const email = settings?.contacts.email;
  const j = job.data;
  const others = (all.data ?? []).filter((o) => o.token !== token).slice(0, 3);

  useEffect(captureSource, []);
  useEffect(() => {
    if (j && urlSlug !== slug(j.title)) navigate(jobPath(j), { replace: true });
  }, [j, urlSlug, navigate]);

  if (job.loading) return <Loading />;
  if (job.error) return <Missing others={others} email={email} error />;
  if (!j) return <Missing others={others} email={email} />;
  const benefits = j.benefits?.length ? j.benefits : (settings?.benefits ?? []);
  return j.accepting ? (
    <Open job={j} others={others} email={email} benefits={benefits} />
  ) : (
    <Closed job={j} others={others} />
  );
}

function Loading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading role"
      className="bg-[#F2F6FE] pb-12 pt-[calc(var(--header-h)+3rem)]"
    >
      <Container className="space-y-5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-2/3 max-w-xl" />
        <Skeleton className="h-4 w-1/2 max-w-md" />
      </Container>
    </section>
  );
}

/** Light-blue head band, same colour, padding and divider as PageHead (which wraps its title in its own h1). */
function Band({ head, aside }: { head: ReactNode; aside: ReactNode }) {
  return (
    <header className="bg-[#F2F6FE] pb-8 pt-[calc(var(--header-h)+2rem)] [--line:206_218_242] [--muted:84_98_138] [--quiet:96_112_160] [--body:48_60_98] tablet:pb-10 tablet:pt-[calc(var(--header-h)+2.5rem)]">
      <Container className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-7">{head}</div>
        <div data-reveal="fade" className="lg:col-span-5 lg:border-l lg:border-line lg:pl-8">
          {aside}
        </div>
      </Container>
    </header>
  );
}

function Head({ job, closed }: { job: JobDetail; closed?: boolean }) {
  return (
    <>
      <Link
        to="/careers"
        className="mb-6 inline-flex items-center gap-2 text-small font-medium text-ink underline underline-offset-4 hover:text-accent"
      >
        <ArrowLeft aria-hidden className="size-4" /> All Open Roles
      </Link>
      <Eyebrow className="mb-4">
        Careers{job.department && ` / ${job.department}`}
      </Eyebrow>
      <h1 className="animate-fade-in text-display font-medium text-ink">
        {job.title}{" "}
        {job.employmentType && (
          <Badge
            tone={closed ? "closed" : "type"}
            className="relative -top-2 align-middle"
          >
            {closed ? "Closed" : typeLabel(job.employmentType)}
          </Badge>
        )}
        {job.location && (
          <span className={closed ? "block text-quiet" : "block text-accent"}>
            {job.location}.
          </span>
        )}
      </h1>
      <MetaLine
        className="mt-5"
        items={
          closed
            ? [
                { icon: Briefcase, text: typeLabel(job.employmentType) },
                {
                  icon: CalendarDays,
                  text: job.closesAt
                    ? `Closed on ${fmtDate(job.closesAt, true)}`
                    : "Closed",
                },
              ]
            : [
                { icon: MapPin, text: job.location },
                { icon: Briefcase, text: job.department },
                {
                  icon: CalendarDays,
                  text: job.closesAt
                    ? `Closes ${fmtDate(job.closesAt, true)}`
                    : "Open until filled",
                },
                {
                  icon: Clock,
                  text: job.postedAt && `Posted ${fmtDate(job.postedAt, true)}`,
                },
              ]
        }
      />
    </>
  );
}

const facts = (j: JobDetail, closed?: boolean) => [
  { label: "Employment type", value: typeLabel(j.employmentType) },
  { label: "Location", value: j.location },
  { label: "Department", value: j.department },
  {
    label: closed ? "Closed" : "Applications close",
    value: j.closesAt ? fmtDate(j.closesAt) : closed ? "" : "Open until filled",
  },
];

function Open({
  job,
  others,
  email,
  benefits,
}: {
  job: JobDetail;
  others: JobSummary[];
  email?: string;
  benefits: Tile[];
}) {
  const lead = job.summary || intro(job.description);
  const apply = `${jobPath(job)}/apply`;
  const origin = window.location.origin;
  return (
    <Page
      motionKey={job.token}
      meta={{
        title: [job.title, job.location].filter(Boolean).join(", "),
        description:
          lead || `Apply for ${job.title} at TekAccess.`,
        path: jobPath(job),
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: job.description,
          datePosted: job.postedAt,
          validThrough: job.closesAt ?? undefined,
          employmentType: job.employmentType
            ? SCHEMA_TYPE[job.employmentType]
            : undefined,
          directApply: true,
          hiringOrganization: {
            "@type": "Organization",
            name: site.legalName,
            sameAs: origin,
            logo: `${origin}/icons/icon-512.png`,
          },
          jobLocation: job.location
            ? {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: job.location.split(",")[0].trim(),
                  addressCountry: job.location.split(",").pop()?.trim(),
                },
              }
            : undefined,
        },
      }}
    >
      <Band
        head={<Head job={job} />}
        aside={
          <>
            {lead && <p className="text-[1.0625rem] text-body">{lead}</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton to={apply} variant="accent">
                Apply for This Role
              </LinkButton>
              <ShareButton title={job.title} />
            </div>
          </>
        }
      />

      <Section
        tone="paper"
        space="none"
        divider={false}
        className="pb-section pt-6 tablet:pt-8"
      >
        <KeyFacts items={facts(job)} />
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <article className="lg:col-span-7">
            {/* With a summary from HR the description is shown whole; otherwise its first sentence is already the lead. */}
            <Description
              text={
                (job.summary ? "" : job.description.replace(lead, "").trim()) ||
                job.description
              }
            />

            {benefits.length > 0 && (
              <>
                <h2 className="mt-10 border-t border-line pt-6 text-h3 font-medium text-ink">
                  What We Offer
                </h2>
                <IconGrid items={tiles(benefits)} cols={2} className="mt-5" />
              </>
            )}

            <div id="how-to-apply" className="mt-10 border-t border-line pt-6">
              <h2 className="text-h3 font-medium text-ink">How to Apply</h2>
              <p className="mt-3 max-w-[68ch] text-body text-body">
                Click Apply, fill in your details, answer a few short questions
                and upload your CV as PDF or Word (max 5 MB). It takes about 5
                minutes.
              </p>
              <LinkButton
                to={apply}
                variant="accent"
                className="apply-cta mt-6"
              >
                Apply for This Role
              </LinkButton>
            </div>
          </article>

          <aside className="space-y-6 lg:col-span-4 lg:col-start-9 lg:self-start lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <div className="apply-cta">
              <ApplyAside job={job} to={apply} />
            </div>
            <ShareBox title={job.title} />
            <OtherRoles jobs={others} />
          </aside>
        </div>
      </Section>

      <ClosingCta
        lead="Ready to Join the Team?"
        quiet="Applications Take 5 Minutes."
        text="Questions about this role? We are happy to help."
        link={
          email ? (
            <TextAnchor href={`mailto:${email}`}>Email {email}</TextAnchor>
          ) : null
        }
        action={
          <LinkButton to={apply} variant="accent">
            Apply Now
          </LinkButton>
        }
      />

      <StickyBar hideWhen=".apply-cta">
        <span className="flex items-center gap-2 text-small text-muted">
          <CalendarDays aria-hidden className="size-4" strokeWidth={1.5} />
          {closesLabel(job.closesAt)}
        </span>
        <LinkButton to={apply} variant="accent" size="lg" className="ml-auto">
          Apply Now
        </LinkButton>
      </StickyBar>
    </Page>
  );
}

function Closed({
  job,
  others,
}: {
  job: JobDetail;
  others: JobSummary[];
}) {
  return (
    <Page
      motionKey={job.token}
      meta={{
        title: `${job.title} (closed)`,
        description: "This role is no longer accepting applications.",
        path: jobPath(job),
        noindex: true,
      }}
    >
      <Band
        head={<Head job={job} closed />}
        aside={
          <InfoBox>
            <div className="flex gap-4">
              <Clock
                aria-hidden
                className="mt-1 size-6 shrink-0 text-ink"
                strokeWidth={1.5}
              />
              <div>
                <p className="text-h4 font-medium text-ink">
                  This Role Is No Longer Accepting Applications.
                </p>
                <p className="mt-2 text-small text-body">
                  {job.closesAt
                    ? `Applications closed on ${fmtDate(job.closesAt, true)}. `
                    : ""}
                  Thank you for your interest.
                </p>
                <LinkButton
                  to="/careers"
                  variant="ink"
                  size="sm"
                  className="mt-5"
                >
                  See Open Roles
                </LinkButton>
              </div>
            </div>
          </InfoBox>
        }
      />
      <Section
        tone="paper"
        space="none"
        divider={false}
        className="pb-section pt-6 tablet:pt-8"
      >
        <KeyFacts items={facts(job, true)} muted />
        {job.description ? (
          <div className="mt-10 max-w-[68ch] text-body text-quiet">
            <h2 className="text-h3 font-medium text-ink">About the Role</h2>
            <p className="mt-3 line-clamp-3">{job.description}</p>
          </div>
        ) : null}
        <p className="mt-6 text-small text-muted">
          The full description is no longer shown.
        </p>
        <MoreRoles
          others={others}
          lead="Still Looking?"
          quiet="These Are Open."
        />
      </Section>
    </Page>
  );
}

function MoreRoles({
  others,
  lead,
  quiet,
  label = "Open Roles",
}: {
  others: JobSummary[];
  lead: string;
  quiet: string;
  label?: string;
}) {
  if (!others.length) return null;
  return (
    <div className="mt-12 grid gap-8 border-t border-line pt-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Eyebrow className="mb-3">{label}</Eyebrow>
        <Heading
          lead={lead}
          quiet={quiet}
          quietClassName="text-accent"
          reveal={false}
        />
      </div>
      <div className="lg:col-span-8">
        {others.map((o, i) => (
          <JobRow key={o.token} job={o} no={i + 1} />
        ))}
      </div>
    </div>
  );
}

function Missing({
  others,
  error,
  email,
}: {
  others: JobSummary[];
  error?: boolean;
  email?: string;
}) {
  const links = [
    { icon: Briefcase, label: "All open roles", to: "/careers" },
    { icon: CircleHelp, label: "How hiring works", to: "/careers#how" },
    { icon: BookOpen, label: "Frequently asked questions", to: "/careers#faq" },
  ];
  return (
    <Page
      meta={{
        title: error ? "Role unavailable" : "Role not found",
        description: "This role can't be found.",
        path: window.location.pathname,
        noindex: true,
      }}
    >
      <section className="bg-paper pb-section-sm pt-[calc(var(--header-h)+3rem)] tablet:pt-[calc(var(--header-h)+4.5rem)]">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-5">
              <span className="grid size-16 place-items-center rounded bg-[#E3ECFD] text-ink">
                <Link2Off aria-hidden className="size-7" strokeWidth={1.5} />
              </span>
              <Eyebrow>{error ? "Connection problem" : "Error 404"}</Eyebrow>
            </div>
            <Heading
              as="h1"
              size="display-xl"
              className="mt-8 animate-fade-in"
              reveal={false}
              lead={
                error
                  ? "This Role Could Not Load."
                  : "This Role Can't Be Found."
              }
              quiet={error ? "Please Try Again." : "The Link May Be Old."}
            />
            <p className="mt-5 max-w-[52ch] text-[1.0625rem] text-body">
              {error
                ? "Check your connection and reload the page."
                : "The role may have been removed, or the link was copied incompletely. All current roles are listed on our Careers page."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/careers" variant="accent">
                See Open Roles
              </LinkButton>
              <LinkButton to="/contact" variant="outline" arrow={false}>
                Contact Us
              </LinkButton>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:border-l lg:border-line lg:pl-8">
            <InfoBox
              title="Quick links"
              className="px-0 py-0 tablet:px-0 tablet:py-0"
            >
              <ul className="border-t border-line">
                {links.map(({ icon: Icon, label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="group/q flex items-center gap-3 border-b border-line px-5 py-3.5 text-[0.9375rem] text-ink hover:bg-[#F5F8FE]"
                    >
                      <Icon aria-hidden className="size-4" strokeWidth={1.5} />{" "}
                      <span className="flex-1">{label}</span>
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform group-hover/q:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
                {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="group/q flex items-center gap-3 px-5 py-3.5 text-[0.9375rem] text-ink hover:bg-[#F5F8FE]"
                  >
                    <Mail aria-hidden className="size-4" strokeWidth={1.5} />{" "}
                    <span className="flex-1">Email {email}</span>
                    <ArrowRight aria-hidden className="size-4" />
                  </a>
                </li>
                )}
              </ul>
            </InfoBox>
          </div>
        </Container>
      </section>
      {others.length > 0 && (
        <Section tone="white" space="none" className="py-10 tablet:py-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <h2 className="text-h3 font-medium text-ink lg:col-span-4">
              Open roles right now
            </h2>
            <div className="lg:col-span-8">
              {others.map((o, i) => (
                <JobRow key={o.token} job={o} no={i + 1} />
              ))}
            </div>
          </div>
        </Section>
      )}
    </Page>
  );
}

