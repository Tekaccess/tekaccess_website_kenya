import { Link } from "react-router-dom";
import { Container } from "@/components/atoms/layout";
import { nav, site } from "@/content/site";

const head = "text-[0.875rem] text-on-night/60";
const link = "text-[0.9375rem] text-white transition-colors duration-2 hover:text-signal";

/** Navy footer, continuous with the closing call to action above it (Storey layout). */
export function SiteFooter() {
  return (
    <footer className="on-night bg-night pt-12 tablet:pt-14" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Footer
      </h2>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="max-w-[26rem] text-[1.125rem] font-medium leading-snug text-white">
              {site.footer}
            </p>
            <p className="mt-3 text-[0.9375rem] text-on-night">TekAccess Global HQ · {site.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 tablet:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className={head}>Digital Navigation</h3>
              <ul className="mt-2.5 space-y-1 leading-[1.75]">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className={link}>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={head}>Global HQ</h3>
              <ul className="mt-2.5 space-y-1 leading-[1.75]">
                <li>
                  <a href={site.phoneHref} className={`${link} tabular`}>
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={site.emailHref} className={link}>
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.whatsappHref} target="_blank" rel="noreferrer" className={link}>
                    WhatsApp & Call, 24/7
                  </a>
                </li>
                <li className="text-[0.9375rem] text-on-night">{site.hours}</li>
              </ul>
            </div>
            <div>
              <h3 className={head}>Connect with Us</h3>
              <ul className="mt-2.5 space-y-1 leading-[1.75]">
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className={link}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 py-5 text-small text-on-night/70 tablet:flex-row tablet:items-center tablet:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            <li>
              <Link to="/legal/privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/legal/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <a href={site.appUrl} className="transition-colors hover:text-white">
                Staff sign-in
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
