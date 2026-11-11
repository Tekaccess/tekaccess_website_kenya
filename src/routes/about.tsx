import { Section } from "@/components/atoms/layout";
import { Eyebrow, Heading, Lead } from "@/components/atoms/typography";
import { Img } from "@/components/atoms/media";
import { Page } from "@/components/templates/page";
import { ClosingCta, PageHead } from "@/components/organisms/blocks";
import { TeamGrid } from "@/components/organisms/team";
import { rules, story } from "@/content/company";
import { ceo, ceoMessage } from "@/content/people";

export default function About() {
  return (
    <Page
      meta={{
        title: "About",
        description: "TekAccess has run logistics and raw-materials supply from one office in Kigali since 2019. Meet the CEO and the eleven people you can call.",
        path: "/about",
      }}
    >
      <PageHead
        label="About"
        lead="A partner that answers the phone."
        quiet="From one office in Kigali since 2019."
        aside={<p className="text-[1.0625rem] text-body">TekAccess supplies and moves the raw materials East Africa's cement plants run on.</p>}
      />

      {/* Story */}
      <Section tone="paper" space="none" aria-labelledby="story-title" className="border-line py-20 tablet:py-24 desktop:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <Img photo="fleetRow" ratio="4/3" reveal="parallax" priority sizes="(min-width:1024px) 55vw, 100vw" className="lg:col-span-7" />
          <div className="lg:col-span-5 lg:pl-6">
            <Eyebrow id="story-title" className="mb-6">
              Our story
            </Eyebrow>
            <Lead data-reveal="lines" className="text-h3 font-medium">
              {story.lead}
            </Lead>
            <div className="mt-8 space-y-4" data-reveal="stagger">
              {story.body.map((t) => (
                <p key={t} className="text-[0.9375rem] text-body">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Vision + mission — navy band */}
      <Section tone="night" space="none" divider={false} aria-label="Vision and mission" className="py-16 tablet:py-20 desktop:py-[88px]">
        <div className="grid gap-8 tablet:grid-cols-2 tablet:gap-0" data-reveal="stagger">
          {[
            { k: "Vision", v: story.vision },
            { k: "Mission", v: story.mission },
          ].map(({ k, v }, i) => (
            <div key={k} className={i === 1 ? "border-t border-white/15 pt-8 tablet:border-l tablet:border-t-0 tablet:py-12 tablet:pl-12" : "tablet:py-12 tablet:pr-12"}>
              <p className="text-[1.125rem] font-medium text-signal">{k}</p>
              <p className="mt-4 text-h2 font-medium leading-[1.15] text-white">{v}</p>
            </div>
          ))}
        </div>
      </Section>


      {/* CEO */}
      <Section tone="white" divider={false} aria-labelledby="ceo-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-xs bg-mist" data-reveal="image" style={{ aspectRatio: "8/7" }}>
              <img
                src={`${ceo.photo}-800.webp`}
                srcSet={`${ceo.photo}-480.webp 480w, ${ceo.photo}-800.webp 800w`}
                sizes="(min-width:1024px) 38vw, 100vw"
                alt={`${ceo.name}, ${ceo.role}`}
                loading="lazy"
                className="absolute inset-0 size-full object-cover object-[center_12%]"
              />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow id="ceo-title">From the CEO</Eyebrow>
            <blockquote className="mt-4">
              <p data-reveal="lines" className="text-h1 font-medium text-ink">
                {ceoMessage.quote}
              </p>
            </blockquote>
            <div className="mt-5 space-y-3" data-reveal="stagger">
              {ceoMessage.body.map((t) => (
                <p key={t} className="text-body text-body">
                  {t}
                </p>
              ))}
            </div>
            <div className="mt-6 border-t border-line pt-4" data-reveal="fade">
              <p className="text-[1.0625rem] font-medium text-ink">{ceo.name}</p>
              <p className="text-small text-muted">{ceo.role}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section tone="paper" aria-labelledby="team-title" className="border-line">
        <div className="mb-10 tablet:mb-7">
          <Heading id="team-title" lead="Eleven people you can name." quiet="Each client has one of them as their contact." className="max-w-4xl" />
        </div>
        <TeamGrid />
      </Section>

      {/* Rules — dark band */}
      <Section tone="white" space="none" aria-labelledby="rules-title" className="border-line py-12 tablet:py-14">
        <h2 id="rules-title" data-reveal="lines" className="max-w-3xl text-h1 font-medium text-ink">
          Three rules we do not bend. <span className="text-quiet">They are the reason clients stay.</span>
        </h2>
        <ol className="mt-7 grid gap-px overflow-hidden rounded-xs border border-line bg-line lg:grid-cols-3" data-reveal="stagger">
          {rules.map((r, i) => (
            <li key={r.title} className="group/rule bg-paper p-7 transition-colors duration-3 hover:bg-white tablet:p-8">
              <span className="text-small font-medium tabular text-accent">0{i + 1}</span>
              <h3 className="mt-6 text-h3 font-medium text-ink">{r.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-body">{r.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ClosingCta />
    </Page>
  );
}
