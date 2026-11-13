import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { Section } from "@/components/atoms/layout";
import { Eyebrow, Heading, Lead } from "@/components/atoms/typography";
import { LinkButton } from "@/components/atoms/button";
import { Img } from "@/components/atoms/media";
import { FactList, NextRow, NumberedRow } from "@/components/molecules/rows";
import { Page } from "@/components/templates/page";
import { ClosingCta, FiguresRow, PageHead } from "@/components/organisms/blocks";
import { Gallery } from "@/components/organisms/gallery";
import { PhotoStrip, RouteLine } from "@/components/organisms/sections";
import { nextService, serviceBySlug, services } from "@/content/services";
import { projectBySlug, projectName } from "@/content/projects";
import { site } from "@/content/site";
import NotFound from "./not-found";

export default function ServicePage() {
  const { slug = "" } = useParams();
  const s = serviceBySlug(slug);
  if (!s) return <NotFound />;
  const next = nextService(s.slug);
  const projects = s.projects.map(projectBySlug).filter((c) => !!c);
  const related = services.filter((x) => x.slug !== s.slug && x.slug !== next.slug).slice(0, 2);

  return (
    <Page
      motionKey={s.slug}
      meta={{
        title: s.title,
        description: s.lead,
        path: `/services/${s.slug}`,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.lead,
          provider: { "@type": "Organization", name: site.legalName, url: site.url },
          areaServed: site.countries,
        },
      }}
    >
      <PageHead
        crumbs={[{ label: "Services", to: "/services" }, { label: s.group }, { label: s.title }]}
        lead={s.title}
        size="display-xl"
        compact
        aside={<p className="text-[1.0625rem] text-body">{s.lead}</p>}
      />

      {/* Gallery + key facts */}
      <Section tone="paper" space="sm" divider={false} aria-label="Key facts">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Gallery key={s.slug} items={s.photos} ratio="16/11" priority className="lg:col-span-8" />
          <div className="flex flex-col lg:col-span-4" data-reveal="fade">
            <FactList items={s.facts} />
            <LinkButton to="/contact" variant="accent" size="lg" className="mt-8 w-full sm:w-auto">
              Request a Consultation
            </LinkButton>
          </div>
        </div>
      </Section>

      {/* Overview */}
      <Section tone="paper" className="pt-0" aria-labelledby="overview-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 id="overview-title" className="text-eyebrow font-medium text-muted lg:col-span-3">
            How it works
          </h2>
          <div className="lg:col-span-7">
            <Lead data-reveal="lines" className="text-h3 font-medium">
              {s.intro}
            </Lead>
            <div className="mt-7 grid gap-12 tablet:grid-cols-2 tablet:gap-10" data-reveal="stagger">
              {[s.howSource, s.howReach].map((b) => (
                <div key={b.title} className="border-t border-line pt-6">
                  <h3 className="text-h4 font-medium">{b.title}</h3>
                  <p className="mt-3 text-[0.9375rem] text-body">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Included */}
      <Section tone="white" aria-labelledby="included-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Heading id="included-title" size="h3" lead="Included." quiet="Seamless from source to site." />
          </div>
          <ul className="grid border-t border-line tablet:grid-cols-2 tablet:gap-x-10 lg:col-span-9" data-reveal="stagger">
            {s.included.map((it) => (
              <li key={it} className="flex items-center gap-4 border-b border-line py-[1.125rem]">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <Check aria-hidden className="size-3.5" strokeWidth={2.25} />
                </span>
                <span className="text-[0.9375rem] font-medium text-ink">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Figures */}
      <Section tone="paper" space="sm" divider={false} aria-label="Figures">
        <FiguresRow
          items={[
            { value: `${site.founded}`, label: "Supplying the region since" },
            { value: "5", label: "Countries delivered to" },
            { value: "1", label: "Invoice per shipment" },
          ]}
        />
      </Section>

      {/* Route, dark band */}
      <Section tone="night" space="none" aria-labelledby="route-title" className="overflow-hidden py-12 tablet:py-14">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <h2 id="route-title" data-reveal="lines" className="text-h1 font-medium">
              The route. <span className="text-signal">From source to silo.</span>
            </h2>
            <div className="mt-7">
              <RouteLine stops={s.route} dark />
            </div>
            {projects.length > 0 && (
              <p className="mt-6 text-small text-on-night/80">
                Runs on:{" "}
                {projects.map((c, n) => (
                  <span key={c.slug}>
                    <Link to={`/projects/${c.slug}`} className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                      {projectName(c)}
                    </Link>
                    {n < projects.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
          </div>
          <Img photo={s.photos[1] ?? s.photos[0]} ratio="3/2" reveal="image" sizes="(min-width:1024px) 30vw, 100vw" className="lg:col-span-4 lg:col-start-9" />
        </div>
      </Section>

      {/* Photo strip */}
      <Section tone="paper" aria-label="On the ground">
        <PhotoStrip items={s.strip} />
      </Section>

      {/* Next + related */}
      <Section tone="paper" className="pt-0" aria-label="More services">
        <NextRow label="Next service" to={`/services/${next.slug}`} title={next.title} meta={next.group} />
        <div className="mt-2">
          {related.map((r) => (
            <NumberedRow key={r.slug} to={`/services/${r.slug}`} no={r.no} title={r.title} summary={r.summary} className="first:border-t-0" />
          ))}
        </div>
      </Section>

      <ClosingCta />
    </Page>
  );
}
