import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded font-medium transition-[background-color,color,border-color,transform] duration-2 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        accent: "bg-accent text-white hover:bg-accent-2",
        ink: "bg-ink text-white hover:bg-ink-2",
        outline: "border border-line-strong bg-transparent text-ink hover:border-ink",
        night: "border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/5",
        white: "bg-white text-ink hover:bg-paper",
      },
      size: {
        sm: "h-10 px-4 text-small",
        md: "h-12 px-5 text-[0.9375rem]",
        lg: "h-14 px-6 text-base",
      },
    },
    defaultVariants: { variant: "ink", size: "md" },
  },
);

type Common = VariantProps<typeof button> & { arrow?: boolean; loading?: boolean; children: ReactNode; className?: string };

const Inner = ({ children, arrow, loading }: Pick<Common, "children" | "arrow" | "loading">) => (
  <>
    {loading && <Loader2 aria-hidden className="size-4 animate-spin" />}
    <span>{children}</span>
    {arrow && !loading && (
      <ArrowUpRight
        aria-hidden
        strokeWidth={1.75}
        className="size-4 transition-transform duration-2 ease-out group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
      />
    )}
  </>
);

type ButtonProps = Common & Omit<ComponentPropsWithoutRef<"button">, "children">;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, arrow, loading, className, children, disabled, ...p }, ref) => (
    <button
      ref={ref}
      className={cn(button({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...p}
    >
      <Inner arrow={arrow} loading={loading}>
        {children}
      </Inner>
    </button>
  ),
);
Button.displayName = "Button";

type LinkButtonProps = Common & Omit<LinkProps, "children">;
/** Internal route link styled as a button. */
export const LinkButton = ({ variant, size, arrow = true, className, children, ...p }: LinkButtonProps) => (
  <Link className={cn(button({ variant, size }), className)} {...p}>
    <Inner arrow={arrow}>{children}</Inner>
  </Link>
);

type AnchorButtonProps = Common & Omit<ComponentPropsWithoutRef<"a">, "children">;
/** External / tel: / mailto: link styled as a button. */
export const AnchorButton = ({ variant, size, arrow = true, className, children, ...p }: AnchorButtonProps) => (
  <a className={cn(button({ variant, size }), className)} {...p}>
    <Inner arrow={arrow}>{children}</Inner>
  </a>
);

const textLink =
  "group/tl relative inline-flex items-center gap-1.5 font-medium text-ink after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-3 after:ease-out hover:after:scale-x-0 focus-visible:after:scale-x-0";
const textLinkAlt = "after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100";

type TLCommon = { arrow?: boolean; quiet?: boolean; className?: string; children: ReactNode };
const TLInner = ({ children, arrow }: Pick<TLCommon, "children" | "arrow">) => (
  <>
    <span>{children}</span>
    {arrow && (
      <ArrowUpRight
        aria-hidden
        strokeWidth={1.75}
        className="size-[1em] transition-transform duration-2 ease-out group-hover/tl:-translate-y-0.5 group-hover/tl:translate-x-0.5"
      />
    )}
  </>
);

/** Underlined link. Underline retracts on hover (default) or draws in on hover (`quiet`). */
export const TextLink = ({ arrow, quiet, className, children, ...p }: TLCommon & Omit<LinkProps, "children">) => (
  <Link className={cn(textLink, quiet && textLinkAlt, className)} {...p}>
    <TLInner arrow={arrow}>{children}</TLInner>
  </Link>
);

export const TextAnchor = ({ arrow, quiet, className, children, ...p }: TLCommon & Omit<ComponentPropsWithoutRef<"a">, "children">) => (
  <a className={cn(textLink, quiet && textLinkAlt, className)} {...p}>
    <TLInner arrow={arrow}>{children}</TLInner>
  </a>
);
