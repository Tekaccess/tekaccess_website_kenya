import { BadgeCheck, FileCheck2, MapPin, Microscope, Scale, ShieldCheck } from "lucide-react";
import { Section } from "@/components/atoms/layout";
import { Eyebrow, Heading } from "@/components/atoms/typography";
import { LinkButton } from "@/components/atoms/button";
import { Img } from "@/components/atoms/media";
import { NumberedRow } from "@/components/molecules/rows";
import { Page } from "@/components/templates/page";
import { ClosingCta, FiguresRow, PageHead } from "@/components/organisms/blocks";
import { FaqSection } from "@/components/organisms/sections";
import { pricing, process, services, whatsIncluded } from "@/content/services";
import { faqsFor } from "@/content/faqs";

const icons = { BadgeCheck, Microscope, Scale, ShieldCheck, MapPin, FileCheck2 };

export default function Services() {
  const groups = (["Supply", "Transport"] as const).map((g) => ({ g, items: services.filter((s) => s.group === g) }));

  return (
    <Page
      meta={{
        title: "Services",
        description: "Gypsum, coal and clinker supply, and truck, ship and rail delivery across East Africa, under one contract and one invoice.",
        path: "/services",
      }}
    >
      <PageHead
        label="Services"
        lead="Six things we do."
        quiet="Supply and transport, each priced in the open."
        aside={
          <>
            <p className="text-[1.0625rem] text-body">
              We source gypsum, coal and clinker from the region's leading miners and move them by road, lake and rail to your site.
            </p>
            <LinkButton to="/contact" variant="accent" className="mt-6">
              Request a quote
            </LinkButton>
          </>
        }
      />

      {/* Supply + Transport groups */}
      <Section tone="paper" aria-label="All services">
        <div className="space-y-20 tablet:space-y-28">
          {groups.map(({ g, items }) => (
            <div key={g} className="grid gap-8 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <h2 className="text-h3 font-medium">{g}</h2>
                <p className="mt-3 max-w-[26ch] text-small text-muted">
                  {g === "Supply" ? "Raw materials for cement and industry, bought from vetted miners." : "Our own fleet and partners on road, lake and rail."}
                </p>
              </div>
              <div className="lg:col-span-9" data-reveal="fade">
                {items.map((s) => (
                  <NumberedRow key={s.slug} to={`/services/${s.slug}`} no={s.no} title={s.title} summary={s.summary} photo={s.photos[0]} size="lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* What's included */}
      <Section tone="white" aria-labelledby="included-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Heading id="included-title" lead="One contract covers all of it." quiet="No hidden handovers." />
          </div>
          <ul className="grid gap-px overflow-hidden rounded-xs border border-line bg-line tablet:grid-cols-2 lg:col-span-8 lg:grid-cols-3" data-reveal="stagger">
            {whatsIncluded.map((it) => {
              const Icon = icons[it.icon];
              return (
                <li key={it.title} className="group/inc bg-white p-7 transition-colors duration-3 hover:bg-paper tablet:p-8">
                  <Icon aria-hidden strokeWidth={1.5} className="size-7 text-ink transition-transform duration-3 ease-out group-hover/inc:-translate-y-0.5" />
                  <h3 className="mt-8 text-h4 font-medium">{it.title}</h3>
                  <p className="mt-2 text-small text-body">{it.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* How we price */}
      <Section tone="paper" aria-labelledby="pricing-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Heading id="pricing-title" lead="What it costs." quiet="Three numbers, nothing else on the invoice." />
          </div>
          <div className="lg:col-span-8">
            <ul className="grid gap-x-8 gap-y-12 tablet:grid-cols-3" data-reveal="stagger">
              {pricing.map((p) => (
                <li key={p.value} className="border-t border-ink pt-5">
                  <p className="text-h1 font-medium text-ink">{p.value}</p>
                  <p className="mt-3 max-w-[24ch] text-small text-muted">{p.caption}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* From order to site — dark band */}
      <Section tone="night" aria-labelledby="process-title" className="overflow-hidden">
        <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-5 text-on-night/70">How it works</Eyebrow>
            <h2 id="process-title" data-reveal="lines" className="text-h1 font-medium">
              From order to site. <span className="text-signal">Four steps, one contact.</span>
            </h2>
            <Img photo="fleetYard" ratio="4/3" className="mt-10 hidden opacity-80 lg:block" sizes="30vw" />
          </div>
          <ol className="grid gap-px overflow-hidden rounded-xs bg-night-line tablet:grid-cols-2 lg:col-span-7 lg:col-start-6" data-reveal="stagger">
            {process.map((s) => (
              <li key={s.no} className="bg-night p-8 tablet:p-10">
                <span className="text-display font-medium leading-none text-white/90">{s.no}</span>
                <h3 className="mt-10 text-h3 font-medium">{s.title}</h3>
                <p className="mt-3 max-w-[30ch] text-[0.9375rem]">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <FaqSection items={faqsFor("services")} lead="Questions about services." defaultOpen={0} tone="white" />

      <Section tone="paper" space="sm" aria-label="Figures">
        <FiguresRow items={[{ value: "6", label: "Services under one contract" }, { value: "5", label: "Countries delivered to" }, { value: "3", label: "Transport modes" }, { value: "1", label: "Invoice per shipment" }]} />
      </Section>

      <ClosingCta />
    </Page>
  );
}
