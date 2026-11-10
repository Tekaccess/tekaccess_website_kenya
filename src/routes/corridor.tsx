import { useParams } from "react-router-dom";
import { Section } from "@/components/atoms/layout";
import { Eyebrow } from "@/components/atoms/typography";
import { LinkButton } from "@/components/atoms/button";
import { FactList, NextRow, NumberedRow } from "@/components/molecules/rows";
import { Page } from "@/components/templates/page";
import { ClosingCta, FiguresRow, PageHead } from "@/components/organisms/blocks";
import { Gallery } from "@/components/organisms/gallery";
import { PhotoStrip, RouteLine } from "@/components/organisms/sections";
import { CorridorMap } from "@/components/organisms/corridor-map";
import { Skyline } from "@/components/organisms/skyline";
import { corridorBySlug, corridorName, corridorsByDistance, nextCorridor } from "@/content/corridors";
import { serviceBySlug } from "@/content/services";
import { formatNumber } from "@/lib/utils";
import NotFound from "./not-found";

export default function CorridorPage() {
  const { slug = "" } = useParams();
  const c = corridorBySlug(slug);
  if (!c) return <NotFound />;
  const name = corridorName(c);
  const next = nextCorridor(c.slug);
  const svc = c.services.map(serviceBySlug).filter((s) => !!s);
  const nearby = corridorsByDistance.filter((x) => x.slug !== c.slug).slice(-3);

  return (
    <Page
      motionKey={c.slug}
      meta={{ title: `${name} corridor`, description: c.summary, path: `/corridors/${c.slug}` }}
    >
      <PageHead
        crumbs={[{ label: "Corridors", to: "/corridors" }, { label: c.mode }, { label: name }]}
        lead={name}
        size="display-xl"
        aside={<p className="text-[1.0625rem] text-body">{c.summary}</p>}
      />

      {/* Gallery + fact file */}
      <Section tone="paper" space="sm" aria-label="Fact file">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Gallery key={c.slug} items={c.gallery} ratio="16/11" priority className="lg:col-span-8" />
          <div className="lg:col-span-4" data-reveal="fade">
            <FactList items={c.facts} />
            <LinkButton to="/contact" variant="accent" size="lg" className="mt-8 w-full sm:w-auto">
              Request a quote
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

      {/* Crossing — dark band with map */}
      <Section tone="night" aria-labelledby="crossing-title" className="overflow-hidden">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="crossing-title" data-reveal="lines" className="text-h1 font-medium">
              {c.mode === "Ship" ? "The crossing." : "The run."}{" "}
              <span className="text-signal">{c.stops.length} handovers, one company.</span>
            </h2>
            <div className="mt-14">
              <RouteLine stops={c.stops} dark />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <CorridorMap focus={c.slug} />
          </div>
        </div>
      </Section>

      <Section tone="paper" space="sm" aria-label="Figures">
        <FiguresRow
          items={[
            { value: `${formatNumber(c.km)} km`, label: "Route length (approx.)" },
            { value: String(c.countries.split("→").length), label: c.countries.includes("→") ? "Countries" : "Country" },
            { value: String(c.cargo.split(",").length), label: "Materials carried" },
            { value: "1", label: "Invoice per shipment" },
          ]}
        />
      </Section>

      <Section tone="white" aria-label="On the ground">
        <PhotoStrip items={c.strip} />
      </Section>

      {/* Services on this lane */}
      <Section tone="paper" aria-labelledby="svc-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <Eyebrow id="svc-title" className="lg:col-span-3">
            Services on this corridor
          </Eyebrow>
          <div className="lg:col-span-9" data-reveal="fade">
            {svc.map((s) => (
              <NumberedRow key={s.slug} to={`/services/${s.slug}`} no={s.no} title={s.title} summary={s.summary} photo={s.photos[0]} />
            ))}
          </div>
        </div>
      </Section>

      {/* Next corridor + mini skyline */}
      <Section tone="paper" className="pt-0" aria-label="Next corridor">
        <NextRow label="Next corridor" to={`/corridors/${next.slug}`} title={corridorName(next)} meta={next.mode} />
        <Skyline items={nearby} height="clamp(220px, 22vw, 320px)" compact className="mt-14 lg:max-w-3xl" />
      </Section>

      <ClosingCta />
    </Page>
  );
}
