import { Link } from "react-router-dom";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Breadcrumb trail with schema-friendly markup. */
export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-label text-muted">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {it.to ? (
              <Link to={it.to} className="transition-colors hover:text-ink">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {it.label}
              </span>
            )}
            {i < items.length - 1 && <ChevronRight aria-hidden className="size-3.5 text-faint" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** FAQ accordion: hairline rows, plus turns into a cross, one open at a time. */
export function Accordion({
  items,
  defaultOpen,
  className,
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number;
  className?: string;
}) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultOpen !== undefined ? `i${defaultOpen}` : undefined}
      className={cn("border-t border-line", className)}
    >
      {items.map((it, i) => (
        <AccordionPrimitive.Item key={it.q} value={`i${i}`} className="border-b border-line">
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group/acc flex w-full items-center justify-between gap-6 py-3 text-left text-[1.0625rem] font-medium text-ink transition-colors duration-2 hover:text-accent tablet:py-3.5 tablet:text-[1.1875rem]">
              {it.q}
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong transition-[transform,background-color,border-color,color] duration-3 ease-out group-hover/acc:border-ink group-data-[state=open]/acc:rotate-45 group-data-[state=open]/acc:border-ink group-data-[state=open]/acc:bg-ink group-data-[state=open]/acc:text-white">
                <Plus aria-hidden className="size-4" strokeWidth={1.75} />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="max-w-prose pb-4 pr-12 text-body text-body">{it.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

/** Skeleton block with a moving sheen (loading states). */
export const Skeleton = ({ className }: { className?: string }) => (
  <div aria-hidden className={cn("relative overflow-hidden rounded-xs bg-mist", className)}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
);
