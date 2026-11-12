import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Logo } from "@/components/atoms/brand";
import { Container } from "@/components/atoms/layout";
import { LinkButton } from "@/components/atoms/button";
import { useScrollState } from "@/hooks/use-media";
import { nav, site } from "@/content/site";
import { preloadRoute } from "@/routes/preload";
import { cn } from "@/lib/utils";

/**
 * Sticky header: transparent at the top, paper + hairline once scrolled, hides on
 * scroll down past the fold and returns on any scroll up. Mobile: full-screen sheet.
 */
export function SiteHeader() {
  const { scrolled, hidden } = useScrollState();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-header transition-[transform,background-color,border-color,backdrop-filter] duration-3 ease-out",
        scrolled ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-line bg-paper",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <Container className="flex h-header items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onMouseEnter={() => preloadRoute(item.to)}
                  onFocus={() => preloadRoute(item.to)}
                  className={({ isActive }) =>
                    cn(
                      "relative inline-flex h-10 items-center px-3.5 text-[0.9375rem] font-medium transition-colors duration-2",
                      "after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-px after:origin-left after:bg-ink after:transition-transform after:duration-3 after:ease-out",
                      isActive ? "text-ink after:scale-x-100" : "text-body hover:text-ink after:scale-x-0 hover:after:scale-x-100",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 tablet:gap-5">
          <a
            href={site.phoneHref}
            className="hidden text-[0.9375rem] font-medium tabular text-ink transition-colors hover:text-accent desktop:inline"
          >
            {site.phone}
          </a>
          <LinkButton to="/contact" variant="ink" size="sm" className="hidden sm:inline-flex">
            Get in Touch
          </LinkButton>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="-mr-2 grid size-11 place-items-center rounded text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" strokeWidth={1.75} />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed inset-0 z-overlay flex flex-col bg-paper data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-4 data-[state=closed]:duration-200 data-[state=open]:duration-300"
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Container className="flex h-header shrink-0 items-center justify-between border-b border-line">
                  <Logo />
                  <Dialog.Close className="-mr-2 grid size-11 place-items-center rounded text-ink" aria-label="Close menu">
                    <X className="size-6" strokeWidth={1.75} />
                  </Dialog.Close>
                </Container>
                <Container className="flex flex-1 flex-col overflow-y-auto pb-8 pt-6 safe-bottom">
                  <nav aria-label="Mobile">
                    <ul>
                      {nav.map((item, i) => (
                        <li
                          key={item.to}
                          className="animate-in fade-in-0 slide-in-from-bottom-3 fill-mode-both"
                          style={{ animationDelay: `${80 + i * 50}ms`, animationDuration: "500ms" }}
                        >
                          <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center justify-between border-b border-line py-5 text-h2 font-medium transition-colors",
                                isActive ? "text-accent" : "text-ink",
                              )
                            }
                          >
                            {item.label}
                            <ArrowUpRight aria-hidden className="size-6" strokeWidth={1.5} />
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-auto grid gap-3 pt-10">
                    <LinkButton to="/contact" variant="accent" size="lg" className="w-full">
                      Get in Touch
                    </LinkButton>
                    <div className="grid grid-cols-2 gap-3">
                      <a href={site.phoneHref} className="flex h-12 items-center justify-center gap-2 rounded border border-line-strong text-small font-medium text-ink">
                        <Phone aria-hidden className="size-4" strokeWidth={1.75} /> Call
                      </a>
                      <a href={site.whatsappHref} target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-2 rounded border border-line-strong text-small font-medium text-ink">
                        <MessageCircle aria-hidden className="size-4" strokeWidth={1.75} /> WhatsApp
                      </a>
                    </div>
                    <p className="pt-2 text-center text-small tabular text-muted">{site.phone} · 24/7</p>
                  </div>
                </Container>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Container>
    </header>
  );
}
