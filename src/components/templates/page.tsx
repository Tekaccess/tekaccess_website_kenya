import { useRef, type ReactNode } from "react";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useReveal } from "@/lib/motion";

type Meta = Parameters<typeof useDocumentMeta>[0];

/**
 * Every route renders inside Page: it sets the document meta and wires all
 * data-reveal motion inside it. `motionKey` re-runs motion when the content
 * changes without a remount (e.g. switching between two service slugs).
 */
export function Page({ meta, children, motionKey }: { meta: Meta; children: ReactNode; motionKey?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useDocumentMeta(meta);
  useReveal(ref, [motionKey ?? meta.path]);
  return <div ref={ref}>{children}</div>;
}
