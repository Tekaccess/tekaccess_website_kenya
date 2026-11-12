import { Container, Section } from "@/components/atoms/layout";
import { Heading } from "@/components/atoms/typography";
import { LinkButton, TextLink } from "@/components/atoms/button";
import { Img } from "@/components/atoms/media";
import { NumberedRow } from "@/components/molecules/rows";
import { Page } from "@/components/templates/page";
import { Skyline } from "@/components/organisms/skyline";
import { ClosingCta } from "@/components/organisms/blocks";
import { AboutTeaser, FaqSection, InsightsRow, InstitutionsList } from "@/components/organisms/sections";
import { JourneySteps } from "@/components/organisms/journey";
import { corridorsByDistance } from "@/content/corridors";
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
  logo: `${site.url}/images/brand/nuru-tekaccess-colour.svg`,
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
      <section aria-labelledby="hero-title" className="overflow-hidden bg-paper pb-12 pt-[calc(var(--header-h)+4rem)] tablet:pb-14 tablet:pt-[calc(var(--header-h)+5.5rem)]">
        <Container>
          <Heading
            as="h1"
            id="hero-title"
            size="display-xl"
            lead={<>End-to-End <span className="text-accent">Logistics</span></>}
            quiet="You Can Trust."
            quietClassName="block text-ink"
            reveal={false}
            className="animate-fade-in text-[clamp(1.875rem,3.9vw,3.8125rem)] leading-[1.06] [text-wrap:pretty] lg:max-w-[calc((100%-6.25rem)*5/6+5rem)]"
          />
          <div className="relative z-10 mt-6 tablet:mt-8 lg:max-w-[calc(50%-0.625rem)]" data-reveal="fade" data-delay="0.35">
            <p className="text-[1.0625rem] leading-relaxed text-body">
              On time, every time. Experience peak supply-chain efficiency with TekAccess: precision-led logistics that help your business move faster and further.
            </p>
            <div className="mt-6 flex flex-col items-start gap-5">
              <LinkButton to="/contact" variant="accent">
                Request a quote
              </LinkButton>
              <TextLink to="/corridors">See our corridors</TextLink>
            </div>
          </div>
          <Skyline items={corridorsByDistance} priority fullBleed height="clamp(240px, min(34vw, calc(100svh - 452px)), 520px)" className="mt-10 tablet:mt-12 lg:-mt-32" />
        </Container>
      </section>

      {/* 3 · Statement + figures — measured 1:1 from Storey's "About" block */}
      <Section
        tone="night"
        space="none"
        aria-labelledby="about-title"
        className="pb-[44px] pt-[44px] tablet:pb-[56px] tablet:pt-[56px] desktop:pb-[70px] desktop:pt-[70px]"
      >
        <div className="flex flex-col gap-6 desktop:grid desktop:grid-cols-4 desktop:gap-0">
          <p className="text-[15px] font-medium leading-[1.3] tracking-[-0.01em] text-on-night">About TekAccess</p>
          <Heading
            id="about-title"
            lead="We move the materials cement plants run on."
            quiet="One named contact, one invoice, one line to call."
            quietClassName="block text-signal"
            className="max-w-[920px] text-white text-[32px] leading-[1.05] tracking-[-0.04em] [text-wrap:pretty] tablet:text-[40px] desktop:col-span-3 desktop:text-[48px]"
          />
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-y-9 tablet:mt-8 tablet:grid-cols-4 tablet:gap-y-0 desktop:mt-[44px]" data-reveal="stagger">
          {figures.map((f) => (
            <li key={f.label} className="flex flex-col gap-[14px] tablet:gap-[18px]">
              <p
                data-reveal="count"
                className="text-[38px] font-medium leading-none tracking-[-0.045em] text-white tabular tablet:text-[46px] desktop:text-[56px]"
              >
                {f.value}
              </p>
              <p className="max-w-[220px] border-t border-white/25 pt-[14px] text-[16px] leading-[1.5] tracking-[-0.01em] text-on-night tablet:max-w-none tablet:pr-8 tablet:pt-[18px] tablet:text-[17px]">
                {f.label}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 2 · Clients */}
      <InstitutionsList />

      {/* 4 · Journey */}
      <JourneySteps />

      {/* 6 · Services */}
      <Section tone="paper" space="none" divider={false} aria-labelledby="services-title" className="py-12 tablet:py-16 desktop:py-[72px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Heading id="services-title" lead="One partner for supply and transport." quiet="Sourcing, moving and clearing, under one contract." />
            <div className="mt-6" data-reveal="fade">
              <LinkButton to="/services" variant="ink">
                See all services
              </LinkButton>
            </div>
            <Img photo="fleetQuay" ratio="16/9" reveal="image" sizes="(min-width:1024px) 38vw, 100vw" className="mt-8" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal="fade">
            {services.map((s) => (
              <NumberedRow key={s.slug} to={`/services/${s.slug}`} no={s.no} title={s.title} summary={s.summary} className="py-4 tablet:py-4" />
            ))}
          </div>
        </div>
      </Section>

      {/* 7 · Corridor in focus */}
      <AboutTeaser />

      {/* 9 · FAQ */}
      <FaqSection items={faqsFor("general")} divider={false} />

      {/* 10 · Insights */}
      <InsightsRow posts={staticInsights} />

      {/* 11 · Closing */}
      <ClosingCta />
    </Page>
  );
}
