import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/atoms/layout";
import { Img } from "@/components/atoms/media";
import { Eyebrow } from "@/components/atoms/typography";
import { Page } from "@/components/templates/page";
import { ClosingCta, PageHead } from "@/components/organisms/blocks";
import { corridors, corridorName, type Corridor } from "@/content/corridors";
import { cn, formatNumber } from "@/lib/utils";

type Key = "name" | "mode" | "cargo" | "km";
const cols: { key: Key; label: string; className?: string }[] = [
  { key: "name", label: "Corridor" },
  { key: "mode", label: "Mode" },
  { key: "cargo", label: "Cargo", className: "hidden tablet:table-cell" },
  { key: "km", label: "Distance", className: "text-right" },
];
const val = (c: Corridor, k: Key) => (k === "name" ? corridorName(c) : k === "km" ? c.km : c[k]);

export default function Corridors() {
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({ key: "km", dir: -1 });
  const rows = useMemo(
    () => [...corridors].sort((a, b) => (val(a, sort.key) > val(b, sort.key) ? 1 : -1) * sort.dir),
    [sort],
  );
  const toggle = (key: Key) => setSort((s) => ({ key, dir: s.key === key ? (-s.dir as 1 | -1) : key === "km" ? -1 : 1 }));

  return (
    <Page
      meta={{
        title: "Corridors",
        description: "Six regular corridors across Rwanda, Tanzania, Kenya, DRC and Uganda: by road, across Lake Kivu and on Tanzania's central line.",
        path: "/corridors",
      }}
    >
      <PageHead
        label="Corridors"
        lead="Six corridors, five countries."
        quiet="All run from one office in Kigali."
        aside={<p className="text-[1.0625rem] text-body">Each corridor is listed with its mode, its cargo and its distance. Every one is run by the same team.</p>}
      />

      {/* Table */}
      <Section tone="white" space="none" aria-labelledby="table-title" className="border-line py-16 tablet:py-20 desktop:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Eyebrow id="table-title">All corridors</Eyebrow>
            <p className="mt-3 max-w-[24ch] text-small text-muted">Sort by any column. Distances are approximate.</p>
          </div>
          <div className="lg:col-span-9" data-reveal="fade">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">TekAccess corridors with mode, cargo and distance</caption>
              <thead>
                <tr className="border-b border-ink/80">
                  {cols.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      aria-sort={sort.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
                      className={cn("pb-4 text-label font-medium text-muted", c.className)}
                    >
                      <button onClick={() => toggle(c.key)} className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
                        {c.label}
                        {sort.key === c.key &&
                          (sort.dir === 1 ? <ArrowUp aria-hidden className="size-3.5" /> : <ArrowDown aria-hidden className="size-3.5" />)}
                      </button>
                    </th>
                  ))}
                  <th aria-hidden className="w-10 pb-3" />
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.slug} className="group/tr relative border-b border-line transition-colors duration-2 hover:bg-paper">
                    <th scope="row" className="py-6 pr-4 font-medium text-ink">
                      <Link to={`/corridors/${c.slug}`} className="text-[1.0625rem] after:absolute after:inset-0 group-hover/tr:text-accent tablet:text-[1.1875rem]">
                        {corridorName(c)}
                      </Link>
                      <span className="mt-0.5 block text-micro font-normal text-muted tablet:hidden">{c.cargo}</span>
                    </th>
                    <td className="py-6 pr-4 text-[0.9375rem] text-body">{c.mode}</td>
                    <td className="hidden py-6 pr-4 text-[0.9375rem] text-body tablet:table-cell">{c.cargo}</td>
                    <td className="py-6 text-right text-[0.9375rem] tabular text-ink">{formatNumber(c.km)} km</td>
                    <td className="relative py-6 pl-4 text-right">
                      <Img
                        photo={c.photo}
                        ratio="4/3"
                        sizes="320px"
                        className="pointer-events-none absolute right-12 top-1/2 z-10 hidden w-[204px] -translate-y-1/2 opacity-0 shadow-lg transition-[opacity,transform] duration-3 ease-out group-hover/tr:opacity-100 desktop:block desktop:translate-x-2 desktop:group-hover/tr:translate-x-0"
                      />
                      <ArrowUpRight aria-hidden strokeWidth={1.5} className="ml-auto size-5 text-ink transition-transform duration-2 group-hover/tr:-translate-y-0.5 group-hover/tr:translate-x-0.5 group-hover/tr:text-accent" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
      <ClosingCta />
    </Page>
  );
}
