import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Img } from "@/components/atoms/media";
import { photos, type PhotoKey } from "@/content/images";
import { cn } from "@/lib/utils";

/**
 * Photo carousel: slides wipe in from the side they come from (clip-path, 0.9s),
 * square prev/next controls and a "1 / 4" counter. Arrow keys when focused,
 * swipe on touch. Announces the current photo to screen readers.
 */
export function Gallery({ items, ratio = "4/3", priority, className }: { items: PhotoKey[]; ratio?: string; priority?: boolean; className?: string }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const startX = useRef<number | null>(null);
  const go = (d: 1 | -1) => {
    setDir(d);
    setI((v) => (v + d + items.length) % items.length);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };
  const onDown = (e: PointerEvent) => (startX.current = e.clientX);
  const onUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX.current = null;
  };

  return (
    <div className={cn("relative", className)}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Photos"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
        className="relative touch-pan-y select-none overflow-hidden rounded-xs focus-visible:outline-offset-4"
        style={{ aspectRatio: ratio, backgroundColor: photos[items[i]].color }}
      >
        {items.map((p, n) => {
          const active = n === i;
          return (
            <div
              key={p + n}
              aria-hidden={!active}
              className="absolute inset-0 transition-[clip-path] duration-4 ease-out-expo"
              style={{
                clipPath: active ? "inset(0 0 0 0)" : dir === 1 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
                zIndex: active ? 2 : 1,
              }}
            >
              <Img
                photo={p}
                ratio={ratio}
                priority={priority && n === 0}
                sizes="(min-width:1024px) 62vw, 100vw"
                className={cn("size-full rounded-none transition-transform duration-6 ease-out", active ? "scale-100" : "scale-105")}
              />
            </div>
          );
        })}
      </div>
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-small tabular text-muted" aria-live="polite">
            <span className="sr-only">Photo </span>
            {i + 1} / {items.length}
            <span className="sr-only">: {photos[items[i]].alt}</span>
          </p>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => go(d)}
                aria-label={d === -1 ? "Previous photo" : "Next photo"}
                className="grid size-11 place-items-center rounded border border-line-strong text-ink transition-colors duration-2 hover:border-ink hover:bg-ink hover:text-white"
              >
                {d === -1 ? <ArrowLeft aria-hidden className="size-4" strokeWidth={1.75} /> : <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
