import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Section } from "@/components/atoms/layout";
import { Eyebrow } from "@/components/atoms/typography";
import { Button } from "@/components/atoms/button";
import { Img } from "@/components/atoms/media";
import { ArticleCard } from "@/components/molecules/cards";
import { Page } from "@/components/templates/page";
import { ClosingCta, PageHead } from "@/components/organisms/blocks";
import { usePosts } from "@/data/posts";
import { categories, type Category } from "@/content/posts";
import { cn, formatDate } from "@/lib/utils";

const PAGE = 6;

export default function Blog() {
  const { posts, pending } = usePosts();
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
      meta={{ title: "Blog", description: "Explore our successful logistics projects and milestones that demonstrate our commitment to operational excellence.", path: "/blog" }}
    >
      <PageHead
        label="Past Achievements"
        compact
        size="display-xl"
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
                    active ? "text-signal after:scale-x-100" : "text-white after:scale-x-0 hover:text-signal",
                  )}
                >
                  {c ?? "All"}
                </button>
              );
            })}
          </div>
          <p className="hidden shrink-0 rounded-full bg-white/10 px-3 py-1 text-small tabular text-on-night tablet:block" aria-live="polite">
            {`${filtered.length} ${filtered.length === 1 ? "post" : "posts"}`}
          </p>
        </div>
      </div>

      <Section tone="paper" space="none" divider={false} aria-label="Posts" className="py-14 tablet:py-20 desktop:py-24">
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
            <Link to={`/blog/${featured.slug}`} className="group/feat grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
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
                  {featured.category}, <time dateTime={new Date(featured.date).toISOString()}>{formatDate(featured.date)}</time>
                </p>
                <h2 className="mt-4 text-h1 font-medium transition-colors duration-2 group-hover/feat:text-accent">{featured.title}</h2>
                <p className="mt-5 text-body text-body">{featured.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 border-b border-[#ECEEF2] pb-0.5 font-medium text-ink">Read More ↗</span>
              </div>
            </Link>

            {visible.length > 0 && (
              <>
                <Eyebrow className="mb-8 mt-16 tablet:mb-10 tablet:mt-24">Recent</Eyebrow>
                <div className="grid gap-x-8 gap-y-14 tablet:grid-cols-2 tablet:gap-y-16 lg:grid-cols-3 lg:gap-x-12" data-reveal="stagger">
                  {visible.map((p) => (
                    <ArticleCard key={p.slug} post={p} />
                  ))}
                </div>
              </>
            )}
            {rest.length > shown && (
              <div className="mt-16 flex justify-center border-t border-line pt-10">
                <Button variant="outline" onClick={() => setShown((n) => n + PAGE)}>
                  Show older posts
                </Button>
              </div>
            )}
          </>
        )}
      </Section>

      <ClosingCta />
    </Page>
  );
}
