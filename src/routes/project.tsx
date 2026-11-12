import { useParams } from "react-router-dom";
import { Section } from "@/components/atoms/layout";
import { Eyebrow } from "@/components/atoms/typography";
import { LinkButton } from "@/components/atoms/button";
import { FactList, NextRow, NumberedRow } from "@/components/molecules/rows";
import { Page } from "@/components/templates/page";
import { ClosingCta, FiguresRow, PageHead } from "@/components/organisms/blocks";
import { Gallery } from "@/components/organisms/gallery";
import { PhotoStrip } from "@/components/organisms/sections";
import { projectBySlug, projectName, nextProject } from "@/content/projects";
import { serviceBySlug } from "@/content/services";
import { formatNumber } from "@/lib/utils";
import NotFound from "./not-found";

export default function ProjectPage() {
  const { slug = "" } = useParams();
  const c = projectBySlug(slug);
  if (!c) return <NotFound />;
  const name = projectName(c);
  const next = nextProject(c.slug);
  const svc = c.services.map(serviceBySlug).filter((s) => !!s);

  return (
    <Page
      motionKey={c.slug}
      meta={{ title: `${name} project`, description: c.summary, path: `/projects/${c.slug}` }}
    >
      <PageHead
        crumbs={[{ label: "Projects", to: "/projects" }, { label: c.mode }, { label: name }]}
        lead={name}
        size="display-xl"
        compact
        aside={<p className="text-[1.0625rem] text-body">{c.summary}</p>}
      />

      {/* Gallery + fact file */}
      <Section tone="paper" space="sm" divider={false} aria-label="Fact file">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Gallery key={c.slug} items={c.gallery} ratio="16/11" priority className="lg:col-span-8" />
          <div className="lg:col-span-4" data-reveal="fade">
            <FactList items={c.facts} />
            <LinkButton to="/contact" variant="accent" size="lg" className="mt-8 w-full sm:w-auto">
              Request a Consultation
            </LinkButton>
          </div>
        </div>
      </Section>

      {/* The file */}
      <Section tone="paper" className="pt-0" aria-labelledby="file-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Eyebrow id="file-title" className="lg:col-span-3">
            The file
          </Eyebrow>
          <div className="grid gap-12 tablet:grid-cols-2 tablet:gap-10 lg:col-span-8" data-reveal="stagger">
            {[c.started, c.today].map((b) => (
              <div key={b.title} className="border-t border-line pt-6">
                <h2 className="text-h3 font-medium">{b.title}</h2>
                <p className="mt-4 text-body text-body">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* Figures: the Home "About TekAccess" navy band, scaled down */}
      <Section tone="night" space="none" divider={false} aria-label="Figures" className="py-8 tablet:py-10 desktop:py-12">
        <FiguresRow dark
          items={[
            { value: `${formatNumber(c.km)} km`, label: "Route length (approx.)" },
            { value: String(c.countries.split(" to ").length), label: c.countries.includes(" to ") ? "Countries" : "Country" },
            { value: String(c.cargo.split(",").length), label: "Materials carried" },
            { value: "1", label: "Invoice per shipment" },
          ]}
        />
      </Section>

      <Section tone="white" divider={false} aria-label="On the ground">
        <PhotoStrip items={c.strip} />
      </Section>

      {/* Services on this project */}
      <Section tone="paper" divider={false} aria-labelledby="svc-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <Eyebrow id="svc-title" className="lg:col-span-3">
            Services on this project
          </Eyebrow>
          <div className="lg:col-span-9" data-reveal="fade">
            {svc.map((s) => (
              <NumberedRow key={s.slug} to={`/services/${s.slug}`} no={s.no} title={s.title} summary={s.summary} photo={s.photos[0]} />
            ))}
          </div>
        </div>
      </Section>

      {/* Next project */}
      <Section tone="paper" className="pt-0" aria-label="Next project">
        <NextRow label="Next project" to={`/projects/${next.slug}`} title={projectName(next)} meta={next.mode} />
      </Section>

      <ClosingCta />
    </Page>
  );
}
