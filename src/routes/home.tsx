import { Container, Section } from "@/components/atoms/layout";
import { Heading } from "@/components/atoms/typography";
import { LinkButton, TextLink } from "@/components/atoms/button";
import { Img } from "@/components/atoms/media";
import { NumberedRow } from "@/components/molecules/rows";
import { Page } from "@/components/templates/page";
import { Skyline } from "@/components/organisms/skyline";
import { HeroMap } from "@/components/organisms/hero-map";
import { ClosingCta, FiguresRow } from "@/components/organisms/blocks";
import { AboutTeaser, FaqSection, BlogRow, InstitutionsList } from "@/components/organisms/sections";
import { JourneySteps } from "@/components/organisms/journey";
import { projectsByDistance } from "@/content/projects";
import { services } from "@/content/services";
import { figures } from "@/content/company";
import { faqsFor } from "@/content/faqs";
import { staticPosts } from "@/content/posts";
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
    <Page meta={{ title: "Premium Logistics Solutions", description: site.description, path: "/", jsonLd: orgLd }}>
      {/* Hero + project skyline */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden bg-paper pb-12 pt-[calc(var(--header-h)+4rem)] tablet:pb-14 tablet:pt-[calc(var(--header-h)+5.5rem)]">
        {/* Dot map behind the right of the hero; desktop only, the skyline stays in front. */}
        <HeroMap className="hidden lg:block" />
        <Container className="relative">
          <Heading
            as="h1"
            id="hero-title"
            size="display-xl"
            lead={<>End to End <span className="text-accent">Logistics</span></>}
            quiet="You Can Trust."
            quietClassName="block text-ink"
            reveal={false}
            className="animate-fade-in text-[clamp(1.875rem,3.9vw,3.8125rem)] leading-[1.06] [text-wrap:pretty] lg:max-w-[calc((100%-6.25rem)*5/6+5rem)]"
          />
          <div className="relative z-10 mt-6 tablet:mt-8 lg:max-w-[calc(50%-0.625rem)]" data-reveal="fade" data-delay="0.35">
            <p className="text-[1.0625rem] leading-relaxed text-body">
              On Time, Every Time. Experience peak supply chain efficiency with TekAccess. Our precision led logistics solutions empower your business to move faster and further.
            </p>
            <div className="mt-6 flex flex-col items-start gap-5">
              <LinkButton to="/services" variant="accent">
                Our Services
              </LinkButton>
              <TextLink to="/contact">Get in Touch</TextLink>
            </div>
          </div>
          <Skyline items={projectsByDistance} priority fullBleed height="clamp(240px, min(34vw, calc(100svh - 452px)), 520px)" className="mt-10 tablet:mt-12 lg:-mt-32" />
        </Container>
      </section>

      {/* Statement + figures */}
      <Section
        tone="night"
        space="none"
        aria-labelledby="about-title"
        className="pb-[44px] pt-[44px] tablet:pb-[56px] tablet:pt-[56px] desktop:pb-[70px] desktop:pt-[70px]"
      >
        <div className="flex flex-col gap-6 desktop:grid desktop:grid-cols-4 desktop:gap-0">
          <p className="text-[15px] font-medium leading-[1.3] tracking-[-0.01em] text-on-night">Since 2019</p>
          <Heading
            id="about-title"
            lead="Founded on integrity and excellence, TekAccess is a trusted logistics and transport solutions provider specializing in high performance supply chain operations."
            quiet="Efficient. Reliable. Scalable."
            quietClassName="block text-signal"
            className="max-w-[920px] text-white text-[32px] leading-[1.05] tracking-[-0.04em] [text-wrap:pretty] tablet:text-[40px] desktop:col-span-3 desktop:text-[48px]"
          />
        </div>
        <FiguresRow dark items={figures} className="mt-6 tablet:mt-8 desktop:mt-[44px]" />
      </Section>

      {/* Clients */}
      <InstitutionsList />

      {/* Journey */}
      <JourneySteps />

      {/* Services */}
      <Section tone="paper" space="none" divider={false} aria-labelledby="services-title" className="py-12 tablet:py-16 desktop:py-[72px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="mb-4 text-label font-medium text-muted">Our Services</p>
            <Heading id="services-title" lead={<>Comprehensive <span className="text-accent">Logistics Solutions.</span></>} />
            <div className="mt-6" data-reveal="fade">
              <LinkButton to="/services" variant="ink">
                Explore Details
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

      {/* Project in focus */}
      <AboutTeaser />

      {/* FAQ */}
      <FaqSection items={faqsFor("general")} divider={false} />

      {/* Blog */}
      <BlogRow posts={[...staticPosts].sort((a, b) => b.date - a.date)} />

      {/* Closing */}
      <ClosingCta />
    </Page>
  );
}
