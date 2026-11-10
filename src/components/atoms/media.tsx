import { useState, type CSSProperties } from "react";
import { photos, type PhotoKey } from "@/content/images";
import { cn } from "@/lib/utils";

type ImgProps = {
  photo?: PhotoKey;
  src?: string; // remote image (Firestore covers)
  alt?: string;
  /** `sizes` attribute; describe the rendered width so the browser picks the right file. */
  sizes?: string;
  /** Aspect ratio of the frame, e.g. "4/3". Defaults to the photo's own ratio. */
  ratio?: string;
  priority?: boolean;
  className?: string; // frame
  imgClassName?: string;
  position?: string; // object-position
  reveal?: "image" | "parallax";
  style?: CSSProperties;
};

/**
 * Responsive WebP with a fixed-ratio frame (no layout shift), the photo's average
 * colour as placeholder, lazy loading and a soft fade-in once decoded.
 */
export function Img({
  photo,
  src,
  alt,
  sizes = "100vw",
  ratio,
  priority,
  className,
  imgClassName,
  position = "center",
  reveal,
  style,
}: ImgProps) {
  const p = photo ? photos[photo] : undefined;
  const [loaded, setLoaded] = useState(false);
  const srcSet = p?.widths.map((w) => `${p.base}-${w}.webp ${w}w`).join(", ");
  const fallback = p ? `${p.base}-${p.widths.find((w) => w >= 1024) ?? p.widths.at(-1)}.webp` : src;
  const aspect = ratio ?? (p ? `${p.width}/${p.height}` : undefined);

  return (
    <div
      data-reveal={reveal}
      className={cn("relative overflow-hidden rounded-xs", className)}
      style={{ aspectRatio: aspect, backgroundColor: p?.color ?? "rgb(var(--mist))", ...style }}
    >
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt ?? p?.alt ?? ""}
        width={p?.width}
        height={p?.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchpriority: "high" } : {})} /* React 18 only knows the lowercase attribute */
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          // cached images can finish before React attaches onLoad
          if (el?.complete && !loaded) setLoaded(true);
        }}
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-4 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
        style={{ objectPosition: position }}
      />
    </div>
  );
}
