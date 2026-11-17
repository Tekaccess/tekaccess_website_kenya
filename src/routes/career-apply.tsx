import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Briefcase, CalendarDays, Lock, MapPin } from "lucide-react";
import { Container, Section } from "@/components/atoms/layout";
import { Eyebrow } from "@/components/atoms/typography";
import { Badge } from "@/components/atoms/badge";
import { TextAnchor, TextLink } from "@/components/atoms/button";
import { Skeleton } from "@/components/molecules/misc";
import { InfoBox, MetaLine } from "@/components/molecules/jobs";
import { Page } from "@/components/templates/page";
import { WithSettings } from "@/components/organisms/careers";
import { CareerForm } from "@/components/organisms/career-form";
import { useLoad } from "@/hooks/use-load";
import {
  captureSource,
  contactFor,
  closesLabel,
  getJob,
  jobPath,
  typeLabel,
} from "@/lib/careers";
import { site } from "@/content/site";

export default function CareerApply() {
  const { token = "" } = useParams();
  const job = useLoad(() => getJob(token), [token]);
  useEffect(captureSource, []);

  if (job.loading)
    return (
      <section
        aria-busy="true"
        aria-label="Loading application"
        className="bg-[#F2F6FE] pb-12 pt-[calc(var(--header-h)+3rem)]"
      >
        <Container className="space-y-5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-2/3 max-w-xl" />
        </Container>
      </section>
    );
  // Missing or closed: the job page shows the right state.
  if (job.error || !job.data || !job.data.accepting)
    return (
      <Navigate
        to={job.data ? jobPath(job.data) : `/careers/${token}`}
        replace
      />
    );

  const j = job.data;
  return (
    <WithSettings>
      {(st) => {
        const { phone, whatsapp } = contactFor(st, site.phone);
        const email = st.contacts.email;
        return (
    <Page
      meta={{
        title: `Apply: ${j.title}`,
        description: `Application for ${j.title} at TekAccess.`,
        path: `${jobPath(j)}/apply`,
        noindex: true,
      }}
    >
      <header className="bg-[#F2F6FE] pb-8 pt-[calc(var(--header-h)+2rem)] [--line:206_218_242] [--muted:84_98_138] [--body:48_60_98] tablet:pb-10 tablet:pt-[calc(var(--header-h)+2.5rem)]">
        <Container className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <Link
              to={jobPath(j)}
              className="mb-5 inline-flex items-center gap-2 text-small font-medium text-ink underline underline-offset-4 hover:text-accent"
            >
              <ArrowLeft aria-hidden className="size-4" /> Back to Role
            </Link>
            <Eyebrow className="mb-3">Application</Eyebrow>
            <h1 className="animate-fade-in text-h1 font-medium text-ink">
              Applying for <span className="text-accent">{j.title}.</span>
            </h1>
            <MetaLine
              className="mt-4"
              items={[
                { icon: MapPin, text: j.location },
                { icon: Briefcase, text: typeLabel(j.employmentType) },
                { icon: CalendarDays, text: closesLabel(j.closesAt) },
              ]}
            />
          </div>
          <p className="text-[1.0625rem] text-body lg:col-span-5 lg:border-l lg:border-line lg:pl-8">
            It takes about 5 minutes. Fields marked * are required.
          </p>
        </Container>
      </header>

      <Section
        tone="paper"
        space="none"
        divider={false}
        className="pb-section pt-0"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <CareerForm job={j} contacts={{ email, phone, whatsapp, privacyUrl: st.privacy.noticeUrl || "/legal/privacy" }} />
          </div>
          <aside className="space-y-6 lg:col-span-4 lg:self-start lg:sticky lg:top-[calc(var(--header-h)+5rem)] lg:mt-[4.5rem]">
            <InfoBox>
              <p className="text-small text-muted">You are applying for</p>
              <p className="mt-1 flex flex-wrap items-center gap-3 text-h4 font-medium text-ink">
                {j.title}{" "}
                {j.employmentType && (
                  <Badge>{typeLabel(j.employmentType)}</Badge>
                )}
              </p>
              <div className="my-5 h-px bg-line" />
              <MetaLine
                className="flex-col !items-start gap-y-2.5 text-[0.9375rem] text-body"
                items={[
                  { icon: MapPin, text: j.location },
                  { icon: Briefcase, text: j.department },
                  { icon: CalendarDays, text: closesLabel(j.closesAt) },
                ]}
              />
              <div className="my-5 h-px bg-line" />
              <TextLink to={jobPath(j)} arrow>
                View role details
              </TextLink>
            </InfoBox>
            <InfoBox tone="blue">
              <div className="flex gap-4">
                <Lock
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 text-ink"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="font-medium text-ink">Your Data Is Safe</p>
                  <p className="mt-1 text-small text-body">
                    We use your details only for hiring and delete them after{" "}
                    {st.privacy.retentionMonths} months.
                  </p>
                </div>
              </div>
            </InfoBox>
            <div className="px-1 text-small text-body">
              <p className="font-medium text-ink">Need help?</p>
              <p className="mt-1">
                <TextAnchor href={`mailto:${email}`}>{email}</TextAnchor>
              </p>
              <p className="mt-1">
                WhatsApp{" "}
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="tabular text-ink underline underline-offset-4"
                >
                  {whatsapp}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </Page>
        );
      }}
    </WithSettings>
  );
}
