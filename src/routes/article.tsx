import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link2, Linkedin } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Container, Section } from "@/components/atoms/layout";
import { Img } from "@/components/atoms/media";
import { ArticleCard } from "@/components/molecules/cards";
import { Breadcrumb, Skeleton } from "@/components/molecules/misc";
import { NextRow } from "@/components/molecules/rows";
import { Page } from "@/components/templates/page";
import { ClosingCta } from "@/components/organisms/blocks";
import { SectionHead } from "@/components/organisms/blocks";
import { TextLink } from "@/components/atoms/button";
import { sanitizeHtml, useInsights } from "@/data/insights";
import type { Block, Insight } from "@/content/insights";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";
import NotFound from "./not-found";

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i} className="whitespace-pre-line">{b.text}</p>;
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "quote":
            return (
              <blockquote key={i}>
                <p>{b.text}</p>
              </blockquote>
            );
          case "img":
            return (
              <figure key={i} className="not-prose my-12">
                <Img photo={b.photo} sizes="(min-width:1024px) 50vw, 100vw" />
                {b.caption && <figcaption className="mt-3 text-small text-muted">{b.caption}</figcaption>}
              </figure>
            );
          case "gallery":
            return (
              <div key={i} className="not-prose my-12 grid grid-cols-2 gap-2 tablet:gap-3">
                {b.photos.map((ph) => (
                  <Img key={ph} photo={ph} ratio="1/1" sizes="(min-width:1024px) 25vw, 50vw" />
                ))}
              </div>
            );
          case "tags":
            return (
              <p key={i} className="text-small font-medium text-muted">
                {b.text}
              </p>
            );
        }
      })}
    </>
  );
}

/** Thin bar under the header showing reading progress through the article body. */
function ReadingProgress({ target }: { target: React.RefObject<HTMLElement> }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = target.current;
      if (!el || !bar.current) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - r.top) / r.height));
      bar.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [target]);
  return <div ref={bar} aria-hidden className="fixed inset-x-0 top-0 z-[45] h-0.5 origin-left scale-x-0 bg-accent" />;
}

function Share({ post }: { post: Insight }) {
  const url = `${site.url}/insights/${post.slug}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy the link");
    }
  };
  const cls = "inline-flex items-center gap-2 text-small font-medium text-ink transition-colors hover:text-accent";
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      <a className={cls} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
        <Linkedin aria-hidden className="size-4" strokeWidth={1.75} /> LinkedIn
      </a>
      <a className={cls} href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer">
        X
      </a>
      <button className={cls} onClick={copy}>
        <Link2 aria-hidden className="size-4" strokeWidth={1.75} /> Copy link
      </button>
    </div>
  );
}

export default function Article() {
  const { slug = "" } = useParams();
  const { posts, pending } = useInsights();
  const body = useRef<HTMLElement>(null);
  const i = posts.findIndex((p) => p.slug === slug);
  const post = posts[i];
  const html = useMemo(() => (post?.html ? sanitizeHtml(post.html) : ""), [post]);

  if (!post && pending)
    return (
      <Container className="pt-[calc(var(--header-h)+5rem)] pb-section" role="status" aria-busy="true">
        <h1 className="sr-only">Loading the post…</h1>
        <Skeleton className="h-4 w-48" />
        <Skeleton className="mt-8 h-14 w-full max-w-3xl" />
        <Skeleton className="mt-4 h-14 w-2/3 max-w-2xl" />
        <Skeleton className="mt-7 aspect-[16/8] w-full" />
      </Container>
    );
  if (!post) return <NotFound />;

  const next = posts[(i + 1) % posts.length];
  const more = posts.filter((p) => p.slug !== post.slug && p.slug !== next.slug).slice(0, 3);
  const iso = new Date(post.date).toISOString();

  return (
    <Page
      motionKey={post.slug}
      meta={{
        title: post.title,
        description: post.excerpt,
        path: `/insights/${post.slug}`,
        type: "article",
        image: post.cover ? undefined : post.coverUrl,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: iso,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: site.legalName, logo: { "@type": "ImageObject", url: `${site.url}/images/brand/logo.png` } },
        },
      }}
    >
      <ReadingProgress target={body} />
      <Toaster position="bottom-center" toastOptions={{ className: "!rounded !font-sans !text-small" }} />

      <header className="bg-paper pt-[calc(var(--header-h)+3.5rem)] tablet:pt-[calc(var(--header-h)+5rem)]">
        <Container>
          <div data-reveal="fade">
            <Breadcrumb items={[{ label: "Insights", to: "/insights" }, { label: post.category, to: `/insights?c=${post.category}` }, { label: "Note" }]} />
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 className="animate-fade-in text-h1 font-medium text-ink tablet:text-display lg:col-span-8">
              {post.title}
            </h1>
            <p data-reveal="fade" className="text-[1.0625rem] text-body lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
              {post.excerpt}
            </p>
          </div>
          <figure className="mt-6 tablet:mt-8">
            <Img photo={post.cover} src={post.coverUrl} alt={post.title} ratio="16/8" priority reveal="image" sizes="(min-width:1440px) 1280px, 100vw" />
            {post.coverCaption && <figcaption className="mt-3 text-small text-muted">{post.coverCaption}</figcaption>}
          </figure>
        </Container>
      </header>

      <Section tone="paper" space="sm" aria-label="Article">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <div className="text-small lg:sticky lg:top-28">
            <dl className="border-t border-line">
              {[
                ["Written by", post.author],
                ["Published", <time key="t" dateTime={iso}>{formatDate(post.date)}</time>],
                ["Reading time", `${post.readMinutes} min`],
                ["Category", post.category],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between gap-4 border-b border-line py-3 lg:block">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium text-ink lg:mt-1">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="pt-5">
              <p className="mb-3 text-muted">Share</p>
              <Share post={post} />
            </div>
            </div>
          </div>

          <article
            ref={body}
            className="prose prose-lg max-w-none lg:col-span-6 prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink prose-h2:mt-7 prose-h2:text-h3 prose-p:text-body prose-p:leading-[1.7] prose-a:text-ink prose-blockquote:my-12 prose-blockquote:border-l-2 prose-blockquote:border-ink prose-blockquote:pl-6 prose-blockquote:text-h3 prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:text-ink prose-img:rounded-xs [&_blockquote_p:before]:content-none [&_blockquote_p:after]:content-none"
          >
            {post.blocks ? <Blocks blocks={post.blocks} /> : <div dangerouslySetInnerHTML={{ __html: html }} />}
          </article>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-small text-muted tablet:flex-row tablet:items-center tablet:justify-between lg:ml-[25%] lg:mr-[25%]">
          <p>
            Filed under <span className="font-medium text-ink">{post.category}</span>
          </p>
          <Share post={post} />
        </div>
      </Section>

      {next && next.slug !== post.slug && (
        <Section tone="paper" space="sm" className="pt-0" aria-label="Next post">
          <NextRow label="Next post" to={`/insights/${next.slug}`} title={next.title} />
        </Section>
      )}

      {more.length > 0 && (
        <Section tone="white" aria-labelledby="more-title">
          <SectionHead lead={<span id="more-title">More posts.</span>} action={<TextLink to="/insights" arrow>All posts</TextLink>} />
          <div className="grid gap-x-8 gap-y-7 tablet:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {more.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}

      <ClosingCta />
    </Page>
  );
}
