import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small sentence-case section label. */
export const Eyebrow = ({ className, ...p }: ComponentPropsWithoutRef<"p">) => (
  <p className={cn("text-label font-medium text-muted", className)} {...p} />
);

// Static map so Tailwind can see every class (no `text-${size}` interpolation).
const sizes = {
  "display-xl": "text-display-xl",
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
} as const;
type Size = keyof typeof sizes;

/**
 * Two-tone headline: `lead` in ink, `quiet` in grey on the same line.
 * `reveal` rises each line out of a mask on scroll (see lib/motion).
 */
export function Heading({
  as: As = "h2",
  size = "h2",
  lead,
  quiet,
  reveal = true,
  className,
  quietClassName,
  delay,
  id,
}: {
  as?: ElementType;
  size?: Size;
  lead: ReactNode;
  quiet?: ReactNode;
  reveal?: boolean;
  className?: string;
  quietClassName?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <As
      id={id}
      data-reveal={reveal ? "lines" : undefined}
      data-delay={delay}
      className={cn(sizes[size], "font-medium text-ink", className)}
    >
      {lead}
      {quiet && (
        <>
          {" "}
          <span className={cn("text-quiet", quietClassName)}>{quiet}</span>
        </>
      )}
    </As>
  );
}

export const Lead = ({ className, ...p }: ComponentPropsWithoutRef<"p">) => (
  <p className={cn("text-lead text-ink", className)} {...p} />
);

export const Body = ({ className, ...p }: ComponentPropsWithoutRef<"p">) => (
  <p className={cn("text-body text-body", className)} {...p} />
);
