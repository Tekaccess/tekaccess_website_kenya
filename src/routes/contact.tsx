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
  { icon: MessageCircle, title: "WhatsApp", text: "Fastest for a quick price.", label: `Message ${site.phone}`, href: site.whatsappHref, ext: true },
  { icon: Phone, title: "Call", text: "For urgent loads, any hour.", label: site.phone, href: site.phoneHref },
  { icon: Mail, title: "Email", text: "For tenders and documents.", label: site.email, href: site.emailHref },
];

export default function Contact() {
  const details = [
    { k: "Office", v: site.address },
    { k: "Phone and WhatsApp", v: <a href={site.phoneHref} className="tabular hover:text-accent">{site.phone}</a> },
    { k: "Available", v: "24/7 for urgent loads" },
    { k: "Email", v: <a href={site.emailHref} className="hover:text-accent">{site.email}</a> },
    { k: "Office hours", v: site.hours },
  ];

  return (
    <Page
      meta={{
        title: "Contact",
        description: "Request a quote for gypsum, coal or clinker supply, or truck, ship and rail transport. We reply within one working day.",
        path: "/contact",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          mainEntity: { "@type": "Organization", name: site.legalName, telephone: site.phone, email: site.email },
        },
      }}
    >
      <PageHead
        label="Contact"
        lead="Send us the load."
        quiet={site.replyPromise}
        aside={<p className="text-[1.0625rem] text-body">Tell us the material, the tonnage and the destination. We come back with a price, a lead time and the name of your contact.</p>}
      />

      <Section tone="paper" aria-label="Quote request">
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
      <Section tone="paper" space="none" className="pb-section-sm" aria-label="Map">
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

      {/* Other ways — dark band */}
      <Section tone="night" aria-labelledby="ways-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <h2 id="ways-title" data-reveal="lines" className="text-h1 font-medium lg:col-span-4">
            Other ways in. <span className="text-signal">Pick the one that suits the load.</span>
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-xs bg-night-line tablet:grid-cols-3 lg:col-span-8" data-reveal="stagger">
            {ways.map((w) => (
              <li key={w.title} className="bg-night">
                <a href={w.href} target={w.ext ? "_blank" : undefined} rel={w.ext ? "noreferrer" : undefined} className="group/way flex h-full flex-col p-8">
                  <w.icon aria-hidden className="size-7 text-signal" strokeWidth={1.5} />
                  <h3 className="mt-10 text-h3 font-medium">{w.title}</h3>
                  <p className="mt-2 text-[0.9375rem]">{w.text}</p>
                  <span className="mt-6 break-all text-[0.9375rem] font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors group-hover/way:decoration-white">
                    {w.label} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Quick answers */}
      <Section tone="paper" aria-labelledby="quick-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Heading id="quick-title" lead="Before you write." quiet="The three questions we hear most." className="lg:col-span-4" />
          <div className="lg:col-span-7 lg:col-start-6" data-reveal="fade">
            <Accordion items={faqsFor("contact")} defaultOpen={0} />
          </div>
        </div>
      </Section>
    </Page>
  );
}
