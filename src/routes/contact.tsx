import { Mail, MessageCircle, Phone } from "lucide-react";
import { Section } from "@/components/atoms/layout";
import { Heading } from "@/components/atoms/typography";
import { Page } from "@/components/templates/page";
import { PageHead } from "@/components/organisms/blocks";
import { QuoteForm } from "@/components/organisms/quote-form";
import { Accordion } from "@/components/molecules/misc";
import { faqsFor } from "@/content/faqs";
import { site } from "@/content/site";

const ways = [
  { icon: MessageCircle, title: "WhatsApp & Call", text: "Available 24/7 for urgent inquiries.", label: `Message ${site.phone}`, href: site.whatsappHref, ext: true },
  { icon: Phone, title: "Call", text: "Available 24/7 for urgent inquiries.", label: site.phone, href: site.phoneHref },
  { icon: Mail, title: "Email Support", text: "Reliable communication for your business.", label: site.email, href: site.emailHref },
];

export default function Contact() {
  const details = [
    { k: "Global HQ", v: <>{site.address}<span className="mt-1 block text-small font-normal text-muted">Visit our modern logistics facility</span></> },
    { k: "WhatsApp & Call", v: <a href={site.phoneHref} className="tabular hover:text-accent">{site.phone}</a> },
    { k: "Available", v: "Available 24/7 for urgent inquiries" },
    { k: "Email Support", v: <a href={site.emailHref} className="hover:text-accent">{site.email}</a> },
    { k: "Office hours", v: site.hours },
  ];

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
        lead={<>Connect with Our <span className="text-accent">Global</span> Team.</>}
        aside={<p className="text-[1.0625rem] text-body">Ready to streamline your supply chain? Reach out for a customized logistics consultation.</p>}
      />

      <Section tone="paper" aria-label="Quote request" className="border-line">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
            <dl className="border-t border-line">
              {details.map((d) => (
                <div key={d.k} className="border-b border-line py-5">
                  <dt className="text-label text-muted">{d.k}</dt>
                  <dd className="mt-1.5 text-h4 font-medium text-ink">{d.v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-6">
                {site.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-small font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                    {s.label}
                  </a>
                ))}
            </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section tone="paper" space="none" divider={false} className="pb-section-sm" aria-label="Map">
        <div className="relative h-[300px] w-full overflow-hidden rounded-xs border border-line bg-mist tablet:aspect-[16/6] tablet:h-auto">
          <iframe
            title="TekAccess office location in Kigali"
            src={site.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full grayscale-[0.9] contrast-[1.05]"
          />
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

      {/* Other ways — dark band */}
      <Section
        tone="paper"
        space="none"
        divider={false}
        aria-labelledby="ways-title"
        className="bg-[#E3ECFD] py-12 tablet:py-14 [--line:191_208_243] [--muted:72_88_134] [--quiet:84_104_158] [--body:44_58_100]"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
          <h2 id="ways-title" data-reveal="lines" className="text-h1 font-medium text-ink lg:col-span-4">
            Connect with Us. <span className="text-quiet">Efficient. Reliable. Scalable.</span>
          </h2>
          <ul className="grid gap-px overflow-hidden rounded border border-line bg-line tablet:grid-cols-3 lg:col-span-8" data-reveal="stagger">
            {ways.map((w) => (
              <li key={w.title} className="bg-white transition-colors duration-3 hover:bg-[#F5F8FE]">
                <a href={w.href} target={w.ext ? "_blank" : undefined} rel={w.ext ? "noreferrer" : undefined} className="group/way flex h-full flex-col p-6 tablet:p-7">
                  <span className="grid size-11 place-items-center rounded-full bg-[#E3ECFD] text-ink transition-colors duration-3 group-hover/way:bg-ink group-hover/way:text-white">
                    <w.icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-h3 font-medium text-ink">{w.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] text-body">{w.text}</p>
                  <span className="mt-5 break-all text-[0.9375rem] font-medium text-ink underline decoration-ink/25 underline-offset-4 transition-colors group-hover/way:decoration-ink">
                    {w.label} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </Page>
  );
}
