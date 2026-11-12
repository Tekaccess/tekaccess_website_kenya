import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/** The official TekAccess logo (arched swoosh + italic wordmark), as vector. */
export const Logo = ({ inverse, className }: { inverse?: boolean; className?: string }) => (
  <Link to="/" aria-label="TekAccess, home" className={cn("inline-flex shrink-0 items-center", className)}>
    <img
      src={inverse ? "/images/brand/tekaccess-white.svg" : "/images/brand/tekaccess-colour.svg"}
      alt="TekAccess"
      width={1587}
      height={478}
      className="h-8 w-auto lg:h-9"
    />
  </Link>
);
