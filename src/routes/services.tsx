import { BadgeCheck, FileCheck2, MapPin, Microscope, Scale, ShieldCheck } from "lucide-react";
import { Section } from "@/components/atoms/layout";
import { Eyebrow, Heading } from "@/components/atoms/typography";
import { LinkButton } from "@/components/atoms/button";
import { NumberedRow } from "@/components/molecules/rows";
import { Page } from "@/components/templates/page";
import { ClosingCta, PageHead } from "@/components/organisms/blocks";
import { FaqSection } from "@/components/organisms/sections";
import { process, services, whatsIncluded } from "@/content/services";
import { faqsFor } from "@/content/faqs";

const icons = { BadgeCheck, Microscope, Scale, ShieldCheck, MapPin, FileCheck2 };

export default function Services() {
  const groups = (["Supply", "Logistics"] as const).map((g) => ({ g, items: services.filter((s) => s.group === g) }));

  return (
    <Page
      meta={{
        title: "Services",
        description: "Comprehensive logistics solutions: gypsum, coal and clinker supply, and trucks, ship and train delivery across Tanzania, Rwanda, Kenya, DRC and Uganda.",
        path: "/services",
      }}
    >
      <PageHead
        label="Our Services"
        lead={<>Comprehensive <span className="text-accent">Logistics Solutions.</span></>}
        aside={
          <>
            <p className="text-[1.0625rem] text-body">
              We provide tailored operational strategies designed to handle your most complex supply chain challenges.
            </p>
            <LinkButton to="/contact" variant="accent" className="mt-6">
              Request a Consultation
            </LinkButton>
          </>
        }
      />

      {/* From order to site — dark band */}
      <Section tone="white" space="none" aria-labelledby="process-title" className="border-line py-10 tablet:py-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-3">How it works</Eyebrow>
            <h2 id="process-title" data-reveal="lines" className="text-h1 font-medium text-ink">
              From Request to Delivery. <span className="text-quiet">Precision at Every Step.</span>
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded border border-line bg-line tablet:grid-cols-2 lg:col-span-8" data-reveal="stagger">
            {process.map((s) => (
              <li key={s.no} className="group/step bg-paper px-5 py-4 transition-colors duration-3 hover:bg-white tablet:px-6 tablet:py-5">
                <span className="text-h2 font-medium leading-none text-accent tabular">{s.no}</span>
                <h3 className="mt-3 text-h4 font-medium text-ink">{s.title}</h3>
                <p className="mt-1 max-w-[34ch] text-small text-body">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Supply + Logistics groups */}
      <Section tone="night" space="none" divider={false} aria-label="All services" className="bg-none bg-night py-12 tablet:py-14 [--ink:255_255_255] [--body:196_204_224] [--muted:160_170_204] [--line:44_58_110] [--accent:122_165_245]">
        <div className="space-y-8 tablet:space-y-10">
          {groups.map(({ g, items }) => (
            <div key={g} className="grid gap-4 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3 lg:pt-3">
                <h2 className="text-h3 font-medium">{g}</h2>
                <p className="mt-2 max-w-[26ch] text-small text-muted">
                  {g === "Supply" ? "Our extensive network with the region’s leading miners ensures a consistent and high-quality supply for industrial needs." : "Timely, secure, cost-effective and on-time deliveries by truck, ship and train."}
                </p>
              </div>
              <div className="lg:col-span-9" data-reveal="fade">
                {items.map((s) => (
                  <NumberedRow key={s.slug} to={`/services/${s.slug}`} no={s.no} title={s.title} summary={s.summary} photo={s.photos[0]} size="lg" className="py-3 first:border-t-0 tablet:py-3.5" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* What's included */}
      <Section
        tone="paper"
        space="none"
        divider={false}
        aria-labelledby="included-title"
        className="bg-[#E3ECFD] py-10 tablet:py-12 [--line:191_208_243] [--muted:72_88_134] [--quiet:84_104_158] [--body:44_58_100]"
      >
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-4">
            <Heading id="included-title" lead="End-to-End Logistics." quiet="One Trusted Partner." />
          </div>
          <ul className="grid gap-px overflow-hidden rounded border border-line bg-line tablet:grid-cols-2 lg:col-span-8 lg:grid-cols-3" data-reveal="stagger">
            {whatsIncluded.map((it) => {
              const Icon = icons[it.icon];
              return (
                <li key={it.title} className="group/inc bg-white px-5 py-4 transition-colors duration-3 hover:bg-[#F5F8FE] tablet:px-6 tablet:py-5">
                  <Icon aria-hidden strokeWidth={1.5} className="size-6 text-ink transition-transform duration-3 ease-out group-hover/inc:-translate-y-0.5" />
                  <h3 className="mt-3 text-h4 font-medium">{it.title}</h3>
                  <p className="mt-1 text-small text-body">{it.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <FaqSection items={faqsFor("services")} lead="Frequently Asked Questions." defaultOpen={0} tone="white" divider={false} />

      <ClosingCta />
    </Page>
  );
}
