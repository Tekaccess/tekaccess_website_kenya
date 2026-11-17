import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  type: "bg-[#E3ECFD] text-ink",
  closed: "bg-[#E8E9ED] text-muted",
};

/** Small square label: job type, Closed. */
export function Badge({
  tone = "type",
  children,
  className,
}: {
  tone?: keyof typeof tones;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1 whitespace-nowrap rounded px-2 text-micro font-medium",
        tones[tone],
        className,
      )}
    >
      {tone === "closed" && (
        <Lock aria-hidden className="size-3" strokeWidth={2} />
      )}
      {children}
    </span>
  );
}
