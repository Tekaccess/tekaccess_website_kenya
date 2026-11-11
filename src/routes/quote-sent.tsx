import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { Container } from "@/components/atoms/layout";
import { LinkButton, TextLink } from "@/components/atoms/button";
import { Page } from "@/components/templates/page";
import { RouteLine } from "@/components/organisms/sections";
import { site } from "@/content/site";

/** Confirmation after the quote form. Reference comes from navigation state. */
export default function QuoteSent() {
  const state = useLocation().state as { reference?: string; name?: string } | null;

  return (
    <Page meta={{ title: "Request sent", description: "Your quote request has been sent to TekAccess.", path: "/contact/sent", noindex: true }}>
      <section className="bg-paper pb-section pt-[calc(var(--header-h)+4rem)] tablet:pt-[calc(var(--header-h)+6rem)]">
        <Container>
          <span className="grid size-14 place-items-center rounded-full bg-ink text-white" data-reveal="fade">
            <Check aria-hidden className="size-7" strokeWidth={2} />
          </span>
          <h1 className="animate-fade-in mt-10 max-w-4xl text-display font-medium text-ink">
            {state?.name ? `Thank you, ${state.name}.` : "Request sent."} <span className="text-quiet">{site.replyPromise}</span>
          </h1>
          {state?.reference && (
            <p className="mt-8 text-[1.0625rem] text-body" data-reveal="fade">
              Your reference is <span className="font-medium tabular text-ink">{state.reference}</span>. Quote it if you call us.
            </p>
          )}

          <div className="mt-7 max-w-4xl border-t border-line pt-10 tablet:mt-8">
            <p className="mb-8 text-label font-medium text-muted">What happens next</p>
            <RouteLine
              endAccent
              stops={[
                { stop: "Received", note: "Your request is in our inbox" },
                { stop: "Contact assigned", note: "One named person" },
                { stop: "Quote", note: "Price and lead time" },
                { stop: "You decide", note: "No obligation" },
              ]}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5" data-reveal="fade">
            <LinkButton to="/" variant="ink">
              Back to the home page
            </LinkButton>
            <TextLink to="/corridors">See our corridors</TextLink>
          </div>
          <p className="mt-6 text-small text-muted">
            Urgent? Call or WhatsApp{" "}
            <a href={site.phoneHref} className="font-medium text-ink">
              {site.phone}
            </a>
            .
          </p>
        </Container>
      </section>
    </Page>
  );
}
