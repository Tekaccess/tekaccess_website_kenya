import { useRef } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/atoms/layout";
import { Logo, Wordmark } from "@/components/atoms/brand";
import { nav, site } from "@/content/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const linkCls = "text-[0.9375rem] text-body transition-colors duration-2 hover:text-ink";

export function SiteFooter() {
  const mark = useRef<HTMLDivElement>(null);

  // The wordmark rises out of the baseline as the footer comes into view.
  useGSAP(
    () => {
      if (!mark.current || prefersReducedMotion()) return;
      gsap.from(mark.current.querySelector("svg"), {
        yPercent: 60,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: mark.current, start: "top 95%", once: true },
      });
    },
    { scope: mark },
  );

  return (
    <footer className="overflow-hidden bg-white pt-section-sm" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Footer
      </h2>
      <Container>
        <div className="grid gap-12 tablet:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-[0.9375rem] text-body">
              TekAccess sources industrial raw materials and moves them across East Africa. One office, one contact, one invoice.
            </p>
            <p className="mt-4 text-small text-muted">{site.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 tablet:grid-cols-3 lg:col-span-7 lg:gap-8">
            <div>
              <h3 className="text-label font-medium text-muted">Site</h3>
              <ul className="mt-5 space-y-3">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className={linkCls}>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-label font-medium text-muted">Office</h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <a href={site.phoneHref} className={`${linkCls} tabular`}>
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={site.emailHref} className={linkCls}>
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.whatsappHref} target="_blank" rel="noreferrer" className={linkCls}>
                    WhatsApp, 24/7
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-label font-medium text-muted">Social</h3>
              <ul className="mt-5 space-y-3">
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className={linkCls}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div ref={mark} className="mt-section-sm overflow-hidden pb-2">
          <Wordmark />
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-small text-muted tablet:flex-row tablet:items-center tablet:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            <li>
              <Link to="/legal/privacy" className="transition-colors hover:text-ink">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/legal/terms" className="transition-colors hover:text-ink">
                Terms
              </Link>
            </li>
            <li>
              <a href={site.appUrl} className="transition-colors hover:text-ink">
                Staff sign-in
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
