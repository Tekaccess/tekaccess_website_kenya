import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/** Nuru TekAccess logo (Uganda and Kenya sites): vector, so one file serves every screen density. */
export const Logo = ({ inverse, className }: { inverse?: boolean; className?: string }) => (
  <Link to="/" aria-label="Nuru TekAccess, home" className={cn("inline-flex shrink-0 items-center", className)}>
    <img
      src={inverse ? "/images/brand/nuru-tekaccess-white.svg" : "/images/brand/nuru-tekaccess-colour.svg"}
      alt="Nuru TekAccess"
      width={4000}
      height={1004}
      className="h-8 w-auto lg:h-9"
    />
  </Link>
);
