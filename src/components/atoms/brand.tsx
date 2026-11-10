import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/** The real TekAccess logo (arched swoosh + italic wordmark). */
export const Logo = ({ inverse, className }: { inverse?: boolean; className?: string }) => (
  <Link to="/" aria-label="TekAccess, home" className={cn("inline-flex shrink-0 items-center", className)}>
    <img
      src={inverse ? "/images/brand/logo-white@640.png" : "/images/brand/logo@640.png"}
      srcSet={
        inverse
          ? "/images/brand/logo-white@320.png 320w, /images/brand/logo-white@640.png 640w"
          : "/images/brand/logo@320.png 320w, /images/brand/logo@640.png 640w"
      }
      sizes="(min-width:1024px) 120px, 106px"
      alt="TekAccess"
      width={1586}
      height={483}
      className="h-8 w-auto lg:h-9"
    />
  </Link>
);

/**
 * Giant edge-to-edge "TekAccess" set in Satoshi. SVG textLength stretches letter
 * spacing (not glyph shapes) so it fills the container exactly at every width.
 */
export const Wordmark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 1000 214" role="img" aria-label="TekAccess" className={cn("block w-full overflow-visible", className)}>
    <text
      x="0"
      y="172"
      textLength="1000"
      lengthAdjust="spacing"
      className="fill-ink"
      style={{ font: "500 238px Satoshi, 'Satoshi Placeholder', sans-serif", letterSpacing: "-0.04em" }}
    >
      TekAccess
    </text>
  </svg>
);
