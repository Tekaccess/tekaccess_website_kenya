import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { site } from "@/content/site";

/**
 * Rendered when a route throws (or a lazy chunk fails after a deploy). Self-contained:
 * it does not depend on the layout that may have failed.
 */
export function RouteError() {
  const err = useRouteError();
  const chunk = err instanceof Error && /dynamically imported module|Loading chunk/i.test(err.message);
  if (!isRouteErrorResponse(err)) console.error(err);

  return (
    <main className="grid min-h-dvh place-items-center bg-paper px-gutter py-20">
      <div className="max-w-2xl">
        <p className="text-label font-medium text-muted">{chunk ? "Update available" : "Something went wrong"}</p>
        <h1 className="mt-6 text-display font-medium text-ink">
          {chunk ? "A newer version is ready." : "This page hit a problem."}{" "}
          <span className="text-quiet">{chunk ? "Reload to continue." : "It's on our side, not yours."}</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex h-12 items-center rounded bg-ink px-5 text-[0.9375rem] font-medium text-white hover:bg-ink-2"
          >
            Reload the page
          </button>
          <Link to="/" className="font-medium text-ink underline underline-offset-4">
            Back to the home page
          </Link>
        </div>
        <p className="mt-6 text-small text-muted">
          Need us now? Call or WhatsApp{" "}
          <a href={site.phoneHref} className="font-medium text-ink">
            {site.phone}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
