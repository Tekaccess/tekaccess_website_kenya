import { Clock, Mail, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import { Section } from "@/components/atoms/layout";
import { Heading } from "@/components/atoms/typography";
import { Page } from "@/components/templates/page";
import { PageHead } from "@/components/organisms/blocks";
import { QuoteForm } from "@/components/organisms/quote-form";
import { Accordion } from "@/components/molecules/misc";
import { faqsFor } from "@/content/faqs";
import { site } from "@/content/site";

// Every contact detail as one card; the link (if any) covers the whole card.
const ways = [
  { icon: MapPin, title: "Global HQ", text: "Visit our modern logistics facility.", label: site.address },
  { icon: MessageCircle, title: "WhatsApp & Call", text: "Available 24/7 for urgent inquiries.", label: site.phone, href: site.whatsappHref, ext: true },
  { icon: Phone, title: "Call", text: "Available 24/7 for urgent inquiries.", label: site.phone, href: site.phoneHref },
  { icon: Mail, title: "Email Support", text: "Reliable communication for your business.", label: site.email, href: site.emailHref },
  { icon: Clock, title: "Office hours", text: site.hours, label: "Kigali time" },
];

export default function Contact() {
  return (
    <Page
      meta={{
        title: "Contact",
        description: "Ready to streamline your supply chain? Reach out for a customized logistics consultation.",
        path: "/contact",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          mainEntity: { "@type": "Organization", name: site.legalName, telephone: site.phone, email: site.email },
        },
      }}
    >
      <PageHead
        label="Get in Touch"
        compact
        size="display-xl"
        lead={<>Connect with Our <span className="text-accent">Global</span> Team.</>}
        aside={<p className="text-[1.0625rem] text-body">Ready to streamline your supply chain? Reach out for a customized logistics consultation.</p>}
      />

      <Section tone="paper" divider={false} aria-label="Quote request">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="relative h-[320px] overflow-hidden rounded-[10px] ring-1 ring-inset ring-line bg-mist lg:sticky lg:top-28 lg:h-[560px]">
              <iframe
                title="TekAccess office location in Kigali"
                src={site.mapEmbed}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 block h-full w-full border-0 grayscale-[0.9] contrast-[1.05]"
              />
            </div>
          </div>
        </div>
        <div className="mb-16 mt-28 tablet:mb-24 tablet:mt-32 desktop:mb-32">
              <ul className="grid gap-3 tablet:grid-cols-3 lg:grid-cols-6" data-reveal="stagger">
                {ways.map((w) => {
                  const body = (
                    <>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#E3ECFD] text-ink transition-colors duration-3 group-hover/way:bg-ink group-hover/way:text-white">
                        <w.icon aria-hidden className="size-[18px]" strokeWidth={1.75} />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="block text-[1.0625rem] font-medium leading-snug text-ink">{w.title}</span>
                        <span className="mt-1 block text-[0.875rem] leading-relaxed text-body">{w.text}</span>
                        <span className={"mt-auto inline-block self-start whitespace-nowrap pt-3 text-[0.8125rem] font-medium text-ink" + (w.href ? " underline decoration-ink/25 underline-offset-4 transition-colors group-hover/way:decoration-ink" : "")}>
                          {w.label}
                          {w.href && "\u00a0↗"}
                        </span>
                      </span>
                    </>
                  );
                  const card = "group/way flex h-full flex-col gap-4 rounded-[10px] bg-white p-4 ring-1 ring-inset ring-line transition-[transform,background-color,box-shadow] duration-3 ease-out hover:-translate-y-0.5 hover:bg-[#F5F8FE] hover:shadow-[0_12px_32px_-16px_rgb(10_20_55/0.25)] tablet:p-5";
                  return (
                    <li key={w.title} className="h-full">
                      {w.href ? (
                        <a href={w.href} target={w.ext ? "_blank" : undefined} rel={w.ext ? "noreferrer" : undefined} className={card}>
                          {body}
                        </a>
                      ) : (
                        <div className={card}>{body}</div>
                      )}
                    </li>
                  );
                })}
                <li className="h-full">
                  <div className="group/way flex h-full flex-col gap-4 rounded-[10px] bg-white p-4 ring-1 ring-inset ring-line transition-[transform,background-color,box-shadow] duration-3 ease-out hover:-translate-y-0.5 hover:bg-[#F5F8FE] hover:shadow-[0_12px_32px_-16px_rgb(10_20_55/0.25)] tablet:p-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#E3ECFD] text-ink transition-colors duration-3 group-hover/way:bg-ink group-hover/way:text-white">
                      <Share2 aria-hidden className="size-[18px]" strokeWidth={1.75} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="block text-[1.0625rem] font-medium leading-snug text-ink">Connect with Us</span>
                      <span className="mt-1 block text-[0.875rem] leading-relaxed text-body">Follow our journey.</span>
                      <span className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-3">
                        {site.social.map((s) => (
                          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-[0.8125rem] font-medium text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink">
                            {s.label}
                          </a>
                        ))}
                      </span>
                    </span>
                  </div>
                </li>
              </ul>
        </div>
      </Section>


      {/* Quick answers */}
      <Section tone="paper" divider={false} aria-labelledby="quick-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Heading id="quick-title" lead="Frequently Asked Questions." quiet="Clarity before you reach out." className="lg:col-span-4" />
          <div className="lg:col-span-7 lg:col-start-6" data-reveal="fade">
            <Accordion items={faqsFor("contact")} defaultOpen={0} />
          </div>
        </div>
      </Section>

    </Page>
  );
}
