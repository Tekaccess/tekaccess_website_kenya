import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Section } from "@/components/atoms/layout";
import { Eyebrow } from "@/components/atoms/typography";
import { Button, LinkButton } from "@/components/atoms/button";
import { Img } from "@/components/atoms/media";
import { ArticleCard } from "@/components/molecules/cards";
import { Page } from "@/components/templates/page";
import { ClosingCta, PageHead } from "@/components/organisms/blocks";
import { useInsights } from "@/data/insights";
import { categories, type Category } from "@/content/insights";
import { cn, formatDate } from "@/lib/utils";

const PAGE = 6;

export default function Insights() {
  const { posts, pending } = useInsights();
  const [params, setParams] = useSearchParams();
  const cat = (categories as string[]).includes(params.get("c") ?? "") ? (params.get("c") as Category) : null;
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => (cat ? posts.filter((p) => p.category === cat) : posts), [posts, cat]);
  const [featured, ...rest] = filtered;
  const visible = rest.slice(0, shown);

  const pick = (c: Category | null) => {
    setShown(PAGE);
    setParams(c ? { c } : {}, { replace: true, preventScrollReset: true });
  };

  return (
    <Page
      motionKey={`${cat}-${pending}`}
      meta={{ title: "Insights", description: "Explore our successful logistics projects and milestones that demonstrate our commitment to operational excellence.", path: "/insights" }}
    >
      <PageHead
        label="Past Achievements"
        lead={<>Our Proven <span className="text-accent">Track Record.</span></>}
        aside={<p className="text-[1.0625rem] text-body">Explore our successful logistics projects and milestones that demonstrate our commitment to operational excellence.</p>}
      />

      {/* Filter */}
      <div className="on-night sticky top-0 z-10 bg-night/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-gutter">
          <div role="tablist" aria-label="Filter by category" className="no-scrollbar -mb-px flex gap-1 overflow-x-auto">
            {[null, ...categories].map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c ?? "all"}
                  role="tab"
                  aria-selected={active}
                  onClick={() => pick(c)}
                  className={cn(
                    "relative shrink-0 px-3 py-4 text-[0.9375rem] font-medium transition-colors first:pl-0",
                    "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-signal after:transition-transform first:after:left-0",
                    active ? "text-white after:scale-x-100" : "text-on-night/70 after:scale-x-0 hover:text-white",
                  )}
                >
                  {c ?? "All"}
                </button>
              );
            })}
          </div>
          <p className="hidden shrink-0 rounded-full bg-white/10 px-3 py-1 text-small tabular text-on-night tablet:block" aria-live="polite">
            {`${filtered.length} ${filtered.length === 1 ? "note" : "notes"}`}
          </p>
        </div>
      </div>

      <Section tone="paper" divider={false} aria-label="Notes">
        {!featured ? (
          <div className="mx-auto max-w-xl py-16 text-center">
            <p className="text-h3 font-medium text-ink">No blog posts found.</p>
            <p className="mt-3 text-body text-body">Explore our successful logistics projects and milestones in the meantime.</p>
            <Button variant="outline" className="mt-8" onClick={() => pick(null)}>
              Show all posts
            </Button>
          </div>
        ) : (
          <>
            {/* Featured */}
            <Link to={`/insights/${featured.slug}`} className="group/feat grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="overflow-hidden rounded-xs lg:col-span-7">
                <Img
                  photo={featured.cover}
                  src={featured.coverUrl}
                  alt={featured.title}
                  ratio="16/10"
                  priority
                  sizes="(min-width:1024px) 55vw, 100vw"
                  imgClassName="transition-transform duration-6 ease-out group-hover/feat:scale-[1.03]"
                />
              </div>
              <div className="lg:col-span-5 lg:pb-2" data-reveal="fade">
                <p className="text-micro font-medium uppercase tracking-[0.08em] text-muted">
                  {featured.category} · <time dateTime={new Date(featured.date).toISOString()}>{formatDate(featured.date)}</time>
                </p>
                <h2 className="mt-4 text-h1 font-medium transition-colors duration-2 group-hover/feat:text-accent">{featured.title}</h2>
                <p className="mt-5 text-body text-body">{featured.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 border-b border-ink pb-0.5 font-medium text-ink">Read More ↗</span>
              </div>
            </Link>

            {visible.length > 0 && (
              <>
                <Eyebrow className="mb-10 mt-8 tablet:mt-12">Recent</Eyebrow>
                <div className="grid gap-x-8 gap-y-7 tablet:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
                  {visible.map((p) => (
                    <ArticleCard key={p.slug} post={p} />
                  ))}
                </div>
              </>
            )}
            {rest.length > shown && (
              <div className="mt-8 flex justify-center border-t border-line pt-10">
                <Button variant="outline" onClick={() => setShown((n) => n + PAGE)}>
                  Show older posts
                </Button>
              </div>
            )}
          </>
        )}
      </Section>

      {/* Dark band */}
      <Section tone="paper" space="sm" divider={false} aria-labelledby="story-cta" className="bg-[#E3ECFD] [--line:191_208_243] [--muted:72_88_134] [--quiet:84_104_158] [--body:44_58_100]">
        <div className="flex flex-col gap-8 tablet:flex-row tablet:items-end tablet:justify-between">
          <div>
            <h2 id="story-cta" className="text-h2 font-medium text-ink">
              Partner with us. <span className="text-quiet">Your project could be our next milestone.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[0.9375rem] text-body">Ready to streamline your supply chain? Reach out for a customized logistics consultation.</p>
          </div>
          <LinkButton to="/contact" variant="ink" className="shrink-0">
            Get in Touch
          </LinkButton>
        </div>
      </Section>

      <ClosingCta />
    </Page>
  );
}
