import { Section } from "@/components/atoms/layout";
import { Eyebrow, Heading, Lead } from "@/components/atoms/typography";
import { Img } from "@/components/atoms/media";
import { Page } from "@/components/templates/page";
import { ClosingCta, FiguresRow, PageHead } from "@/components/organisms/blocks";
import { InstitutionsList } from "@/components/organisms/sections";
import { TeamGrid } from "@/components/organisms/team";
import { figures, rules, story } from "@/content/company";
import { ceo, ceoMessage, team } from "@/content/people";

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
      <Section tone="paper" aria-labelledby="story-title">
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

      {/* Vision + mission */}
      <Section tone="white" space="sm" aria-label="Vision and mission">
        <div className="grid gap-px overflow-hidden rounded-xs bg-line tablet:grid-cols-2" data-reveal="stagger">
          {[
            { k: "Vision", v: story.vision },
            { k: "Mission", v: story.mission },
          ].map(({ k, v }) => (
            <div key={k} className="bg-white p-8 tablet:p-12">
              <Eyebrow>{k}</Eyebrow>
              <p className="mt-6 text-h3 font-medium text-ink">{v}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="paper" space="sm" aria-label="Figures">
        <FiguresRow items={[...figures.slice(0, 3), { value: String(team.length), label: "People you can name" }]} />
      </Section>

      {/* CEO */}
      <Section tone="white" aria-labelledby="ceo-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-xs bg-mist" data-reveal="image" style={{ aspectRatio: "4/5" }}>
              <img
                src={`${ceo.photo}-800.webp`}
                srcSet={`${ceo.photo}-480.webp 480w, ${ceo.photo}-800.webp 800w`}
                sizes="(min-width:1024px) 38vw, 100vw"
                alt={`${ceo.name}, ${ceo.role}`}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow id="ceo-title">From the CEO</Eyebrow>
            <blockquote className="mt-8">
              <p data-reveal="lines" className="text-h1 font-medium text-ink">
                {ceoMessage.quote}
              </p>
            </blockquote>
            <div className="mt-8 space-y-4" data-reveal="stagger">
              {ceoMessage.body.map((t) => (
                <p key={t} className="text-body text-body">
                  {t}
                </p>
              ))}
            </div>
            <div className="mt-10 border-t border-line pt-6" data-reveal="fade">
              <p className="text-[1.0625rem] font-medium text-ink">{ceo.name}</p>
              <p className="text-small text-muted">{ceo.role}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section tone="paper" aria-labelledby="team-title">
        <div className="mb-14 tablet:mb-20">
          <Heading id="team-title" lead="Eleven people you can name." quiet="Each client has one of them as their contact." className="max-w-4xl" />
        </div>
        <TeamGrid />
      </Section>

      {/* Rules — dark band */}
      <Section tone="night" aria-labelledby="rules-title">
        <h2 id="rules-title" data-reveal="lines" className="max-w-3xl text-h1 font-medium">
          Three rules we do not bend. <span className="text-signal">They are the reason clients stay.</span>
        </h2>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-xs bg-night-line tablet:mt-20 lg:grid-cols-3" data-reveal="stagger">
          {rules.map((r, i) => (
            <li key={r.title} className="bg-night p-8 tablet:p-10">
              <span className="text-small tabular text-signal">0{i + 1}</span>
              <h3 className="mt-8 text-h3 font-medium">{r.title}</h3>
              <p className="mt-4 text-[0.9375rem]">{r.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <InstitutionsList tone="white" />
      <ClosingCta />
    </Page>
  );
}
