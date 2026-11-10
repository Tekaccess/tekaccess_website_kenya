import { useEffect, useRef } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigation } from "react-router-dom";
import { SiteHeader } from "@/components/organisms/site-header";
import { SiteFooter } from "@/components/organisms/site-footer";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Shell for every route: skip link, header, animated main, footer,
 * scroll restoration, a top progress bar while a lazy route loads, and a polite
 * route-change announcement for screen readers.
 */
export function RootLayout() {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const main = useRef<HTMLElement>(null);
  const announcer = useRef<HTMLParagraphElement>(null);
  const first = useRef(true);

  // Page transition: new content lifts in. Skipped on first load and for reduced motion.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = main.current;
    if (el && !prefersReducedMotion()) {
      gsap.fromTo(el, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out", clearProps: "all" });
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = setTimeout(() => {
      if (announcer.current) announcer.current.textContent = document.title;
    }, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  const loading = navigation.state === "loading";

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded bg-ink px-4 py-3 text-small font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-toast"
      >
        Skip to content
      </a>
      <div
        aria-hidden
        className={`fixed inset-x-0 top-0 z-toast h-0.5 origin-left bg-accent transition-transform duration-5 ease-out ${loading ? "scale-x-75" : "scale-x-0 duration-200"}`}
      />
      <SiteHeader />
      <main id="main" ref={main} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <SiteFooter />
      <p ref={announcer} aria-live="polite" className="sr-only" />
      <ScrollRestoration />
    </>
  );
}
