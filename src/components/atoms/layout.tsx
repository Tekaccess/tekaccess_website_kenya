import { forwardRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page-width column with responsive side gutters (20 to 80px). */
export const Container = ({ className, ...p }: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("mx-auto w-full max-w-page px-gutter", className)} {...p} />
);

type Tone = "paper" | "white" | "night";
const tones: Record<Tone, string> = {
  paper: "bg-paper",
  white: "bg-white",
  night: "on-night bg-gradient-to-br from-night to-night-2 text-on-night [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white",
};
const spacing = { default: "py-section", sm: "py-section-sm", none: "" };

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: Tone;
  /** 1px ink rule across the top. Off for dark bands and for `pt-0` continuations of the previous section. */
  divider?: boolean;
  space?: keyof typeof spacing;
  container?: boolean;
  as?: ElementType;
};

/** A full-bleed band with consistent vertical rhythm; content sits in a Container. */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ tone = "paper", space = "default", container = true, divider, className, children, as: As = "section", ...p }, ref) => (
    <As
      ref={ref}
      className={cn(
        tones[tone],
        spacing[space],
        "relative",
        (divider ?? (tone !== "night" && !/\bpt-0\b/.test(className ?? ""))) && "border-t border-[#ECEEF2]",
        className,
      )}
      {...p}
    >
      {container ? <Container>{children}</Container> : children}
    </As>
  ),
);
Section.displayName = "Section";

/** 1px rule; draws in from the left when `reveal` is set. */
export const Hairline = ({ className, reveal, strong }: { className?: string; reveal?: boolean; strong?: boolean }) => (
  <div
    aria-hidden
    data-reveal={reveal ? "hairline" : undefined}
    className={cn("h-px w-full", strong ? "bg-[#ECEEF2]" : "bg-line", className)}
  />
);

/** Section label column + content column (3 / 9 on desktop, stacked on phones). */
export const Split = ({
  label,
  children,
  className,
  labelClassName,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
}) => (
  <div className={cn("grid gap-y-8 lg:grid-cols-12 lg:gap-x-8", className)}>
    <div className={cn("lg:col-span-3", labelClassName)}>{label}</div>
    <div className="lg:col-span-9">{children}</div>
  </div>
);
