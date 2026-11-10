import { Container, Section } from "@/components/atoms/layout";
import { Eyebrow, Heading } from "@/components/atoms/typography";
import { LinkButton, TextLink } from "@/components/atoms/button";
import { Img } from "@/components/atoms/media";
import { NumberedRow } from "@/components/molecules/rows";
import { Page } from "@/components/templates/page";
import { Skyline } from "@/components/organisms/skyline";
import { ClosingCta, FiguresRow } from "@/components/organisms/blocks";
import { ModeSwitcher } from "@/components/organisms/mode-switcher";
import { CeoQuote, CorridorFocus, FaqSection, InsightsRow, InstitutionsList, JourneySteps } from "@/components/organisms/sections";
import { corridorsByDistance, featuredCorridor } from "@/content/corridors";
import { services } from "@/content/services";
import { figures } from "@/content/company";
import { faqsFor } from "@/content/faqs";
import { staticInsights } from "@/content/insights";
import { site } from "@/content/site";

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/images/brand/logo.png`,
  foundingDate: String(site.founded),
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
  areaServed: site.countries,
  sameAs: site.social.map((s) => s.href),
};

export default function Home() {
  return (
    <Page meta={{ title: "Gypsum, coal and clinker across East Africa", description: site.description, path: "/", jsonLd: orgLd }}>
      {/* 1 · Hero + corridor skyline */}
      <section aria-labelledby="hero-title" className="bg-paper pb-section-sm pt-[calc(var(--header-h)+3rem)] tablet:pt-[calc(var(--header-h)+4.5rem)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <Heading
              as="h1"
              id="hero-title"
              size="display-xl"
              lead="Gypsum, coal and clinker, moved across five countries."
              quiet="One office in Kigali answers for every load."
              reveal={false}
              className="animate-fade-in lg:col-span-8"
            />
            <div className="lg:col-span-4 lg:pb-3" data-reveal="fade" data-delay="0.35">
              <p className="max-w-sm text-[1.0625rem] text-body">
                TekAccess sources industrial raw materials and moves them by truck, ship and rail, from Kenya and Tanzania to sites in Rwanda, DRC and Uganda.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <LinkButton to="/contact" variant="accent" size="lg">
                  Request a quote
                </LinkButton>
                <TextLink to="/corridors">See our corridors</TextLink>
              </div>
            </div>
          </div>
          <Skyline items={corridorsByDistance} priority className="mt-16 tablet:mt-24" />
        </Container>
      </section>

      {/* 2 · Clients */}
      <InstitutionsList tone="white" />

      {/* 3 · Statement + figures */}
      <Section tone="paper" aria-labelledby="about-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Eyebrow className="lg:col-span-3">About TekAccess</Eyebrow>
          <div className="lg:col-span-9">
            <Heading id="about-title" size="h1" lead="We move the materials cement plants run on." quiet="One named contact, one invoice, one line to call." />
            <FiguresRow items={figures} className="mt-16 tablet:mt-20" />
          </div>
        </div>
      </Section>

      {/* 4 · Journey */}
      <JourneySteps />

      {/* 5 · Modes (pinned dark band) */}
      <ModeSwitcher />

      {/* 6 · Services */}
      <Section tone="paper" aria-labelledby="services-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Heading id="services-title" lead="One partner for supply and transport." quiet="Sourcing, moving and clearing, under one contract." />
            <div className="mt-8" data-reveal="fade">
              <LinkButton to="/services" variant="ink">
                See all services
              </LinkButton>
            </div>
            <Img photo="fleetQuay" ratio="4/3" reveal="image" sizes="(min-width:1024px) 38vw, 100vw" className="mt-12" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal="fade">
            {services.map((s) => (
              <NumberedRow key={s.slug} to={`/services/${s.slug}`} no={s.no} title={s.title} summary={s.summary} />
            ))}
          </div>
        </div>
      </Section>

      {/* 7 · Corridor in focus */}
      <CorridorFocus corridor={featuredCorridor} tone="white" />

      {/* 8 · CEO */}
      <CeoQuote />

      {/* 9 · FAQ */}
      <FaqSection items={faqsFor("general")} />

      {/* 10 · Insights */}
      <InsightsRow posts={staticInsights} />

      {/* 11 · Closing */}
      <ClosingCta />
    </Page>
  );
}
