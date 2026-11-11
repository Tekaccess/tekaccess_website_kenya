import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Section } from "@/components/atoms/layout";
import { NextRow } from "@/components/molecules/rows";
import { Breadcrumb } from "@/components/molecules/misc";
import { Page } from "@/components/templates/page";
import { ClosingCta } from "@/components/organisms/blocks";
import { legal, legalBySlug } from "@/content/legal";
import { cn } from "@/lib/utils";
import NotFound from "./not-found";

/** Highlights the section currently in view (contents list). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export default function Legal() {
  const { slug = "" } = useParams();
  const doc = legalBySlug(slug);
  const ids = doc?.sections.map((s) => s.id) ?? [];
  const active = useActiveSection(ids);
  if (!doc) return <NotFound />;
  const other = legal.find((l) => l.slug !== doc.slug)!;

  return (
    <Page motionKey={doc.slug} meta={{ title: doc.title, description: doc.summary, path: `/legal/${doc.slug}` }}>
      <header className="bg-paper pb-12 pt-[calc(var(--header-h)+2.5rem)] tablet:pb-14 tablet:pt-[calc(var(--header-h)+3rem)]">
        <Container>
          <Breadcrumb items={[{ label: "Legal" }, { label: doc.title }]} />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 className="animate-fade-in text-display font-medium text-ink lg:col-span-8">
              {doc.title}
            </h1>
            <div className="text-small lg:col-span-4 lg:border-l lg:border-line lg:pl-8" data-reveal="fade">
              <p className="text-muted">Last updated</p>
              <p className="mt-1 font-medium text-ink">{doc.updated}</p>
              <p className="mt-4 text-body">{doc.summary}</p>
            </div>
          </div>
        </Container>
      </header>

      <Section tone="paper" aria-label={doc.title}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="mb-5 text-label font-medium text-muted">On this page</p>
              <ol className="space-y-1 border-l border-line">
                {doc.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={active === s.id ? "location" : undefined}
                      className={cn(
                        "-ml-px block border-l py-1.5 pl-4 text-small transition-colors duration-2",
                        active === s.id ? "border-ink font-medium text-ink" : "border-transparent text-muted hover:text-ink",
                      )}
                    >
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-6">
            <p className="mb-6 rounded-xs border border-line bg-white p-5 text-small text-body">
              This page is written in plain language. If anything is unclear, email{" "}
              <a href="mailto:info@tekaccess.rw" className="font-medium text-ink underline underline-offset-4">
                info@tekaccess.rw
              </a>
              .
            </p>
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-14 border-t border-line py-10 first:border-t-0 first:pt-0">
                <p className="text-small tabular text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-h3 font-medium">{s.title}</h2>
                <div className="mt-5 space-y-4">
                  {s.body.map((t) => (
                    <p key={t} className="text-body leading-[1.7] text-body">
                      {t}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper" space="sm" className="pt-0" aria-label="Also in legal">
        <NextRow label="Also in Legal" to={`/legal/${other.slug}`} title={other.title} />
      </Section>

      <ClosingCta />
    </Page>
  );
}
