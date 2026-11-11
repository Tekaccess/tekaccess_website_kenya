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
