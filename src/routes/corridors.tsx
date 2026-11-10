import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/atoms/layout";
import { Eyebrow } from "@/components/atoms/typography";
import { Page } from "@/components/templates/page";
import { Skyline } from "@/components/organisms/skyline";
import { ClosingCta, FiguresRow, PageHead } from "@/components/organisms/blocks";
import { CorridorFocus } from "@/components/organisms/sections";
import { CorridorMap, MapLegend } from "@/components/organisms/corridor-map";
import { corridors, corridorsByDistance, corridorName, featuredCorridor, type Corridor } from "@/content/corridors";
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

      <Section tone="paper" aria-label="Corridor skyline">
        <Skyline items={corridorsByDistance} height="clamp(320px, 44vw, 620px)" priority />
      </Section>

      {/* Table */}
      <Section tone="white" aria-labelledby="table-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Eyebrow id="table-title">All corridors</Eyebrow>
            <p className="mt-3 max-w-[24ch] text-small text-muted">Sort by any column. Distances are approximate.</p>
          </div>
          <div className="lg:col-span-9" data-reveal="fade">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">TekAccess corridors with mode, cargo and distance</caption>
              <thead>
                <tr className="border-b border-ink">
                  {cols.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      aria-sort={sort.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
                      className={cn("pb-3 text-label font-medium text-muted", c.className)}
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
                    <th scope="row" className="py-5 pr-4 font-medium text-ink">
                      <Link to={`/corridors/${c.slug}`} className="text-[1.0625rem] after:absolute after:inset-0 group-hover/tr:text-accent tablet:text-[1.1875rem]">
                        {corridorName(c)}
                      </Link>
                      <span className="mt-0.5 block text-micro font-normal text-muted tablet:hidden">{c.cargo}</span>
                    </th>
                    <td className="py-5 pr-4 text-[0.9375rem] text-body">{c.mode}</td>
                    <td className="hidden py-5 pr-4 text-[0.9375rem] text-body tablet:table-cell">{c.cargo}</td>
                    <td className="py-5 text-right text-[0.9375rem] tabular text-ink">{formatNumber(c.km)} km</td>
                    <td className="py-5 pl-4 text-right">
                      <ArrowUpRight aria-hidden strokeWidth={1.5} className="ml-auto size-5 text-ink transition-transform duration-2 group-hover/tr:-translate-y-0.5 group-hover/tr:translate-x-0.5 group-hover/tr:text-accent" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section tone="night" aria-labelledby="map-title" className="overflow-hidden">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-4">
            <h2 id="map-title" data-reveal="lines" className="text-h1 font-medium">
              Where the loads move. <span className="text-signal">Road, lake and rail across East Africa.</span>
            </h2>
            <div className="mt-10 text-on-night" data-reveal="fade">
              <MapLegend />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <CorridorMap />
          </div>
        </div>
      </Section>

      <Section tone="paper" space="sm" aria-label="Figures">
        <FiguresRow
          items={[
            { value: "6", label: "Regular corridors" },
            { value: "5", label: "Countries" },
            { value: "3", label: "Transport modes" },
            { value: "1", label: "Office in Kigali" },
          ]}
        />
      </Section>

      <CorridorFocus corridor={featuredCorridor} tone="white" />
      <ClosingCta />
    </Page>
  );
}
