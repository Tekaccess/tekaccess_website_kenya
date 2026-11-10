import { useLocation } from "react-router-dom";
import { Container, Section } from "@/components/atoms/layout";
import { Eyebrow, Heading } from "@/components/atoms/typography";
import { LinkButton, TextLink } from "@/components/atoms/button";
import { Img } from "@/components/atoms/media";
import { NumberedRow } from "@/components/molecules/rows";
import { Page } from "@/components/templates/page";
import { RouteLine } from "@/components/organisms/sections";

const helpful = [
  { no: "01", title: "Services", summary: "Supply and transport, six ways.", to: "/services" },
  { no: "02", title: "Corridors", summary: "Where our loads move.", to: "/corridors" },
  { no: "03", title: "About", summary: "The team you can call.", to: "/about" },
  { no: "04", title: "Contact", summary: "Request a quote.", to: "/contact" },
];

/** 404: also rendered by detail routes when a slug doesn't exist. */
export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <Page meta={{ title: "Page not found", description: "This page has moved, or the link was wrong.", path: pathname, noindex: true }}>
      <section className="bg-paper pb-section-sm pt-[calc(var(--header-h)+3.5rem)] tablet:pt-[calc(var(--header-h)+5rem)]">
        <Container>
          <Eyebrow data-reveal="fade">Page not found · Error 404</Eyebrow>
          <Heading as="h1" size="display-xl" lead="This load took a wrong turn." quiet="The page has moved, or the link was wrong." reveal={false} className="mt-8 max-w-5xl animate-fade-in" />
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" data-reveal="fade">
            <LinkButton to="/" variant="ink" size="lg">
              Back to the home page
            </LinkButton>
            <TextLink to="/services">See our services</TextLink>
          </div>
          <div className="mt-20 max-w-4xl">
            <RouteLine
              endAccent
              stops={[
                { stop: "Origin", note: "Loaded" },
                { stop: "Border", note: "Cleared" },
                { stop: "Kigali", note: "Arrived" },
                { stop: "You are here", note: "404" },
              ]}
            />
          </div>
        </Container>
      </section>

      <Section tone="paper" space="none" className="pb-section-sm" aria-hidden>
        <Img photo="roadJunction" ratio="16/6" reveal="image" sizes="(min-width:1440px) 1280px, 100vw" />
        <p className="mt-3 text-small text-muted">Not every road leads somewhere. These do:</p>
      </Section>

      <Section tone="paper" className="pt-0" aria-label="Helpful links">
        <div className="grid gap-x-10 tablet:grid-cols-2">
          {helpful.map((h) => (
            <NumberedRow key={h.to} to={h.to} no={h.no} title={h.title} summary={h.summary} className="tablet:[&:nth-child(2)]:border-t" />
          ))}
        </div>
      </Section>
    </Page>
  );
}
