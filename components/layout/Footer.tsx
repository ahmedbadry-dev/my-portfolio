"use client";

import Link from "next/link";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { YellowButton } from "@/components/ui/YellowButton";
import { useLiveTime } from "@/hooks/useLiveTime";
import { cn } from "@/lib/utils";

const footerPrimaryLinks = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" }
] as const;

const footerUtilityLinks = [
  { label: "Resume Download", href: "/#resume" },
  { label: "Instructions", href: "/#instructions" },
  { label: "Style Guide", href: "/#style-guide" },
  { label: "Licenses", href: "/#licenses" }
] as const;

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", mark: "f" },
  { label: "LinkedIn", href: "https://linkedin.com", mark: "in" },
  { label: "X", href: "https://x.com", mark: "X" }
] as const;

export function Footer() {
  const liveTime = useLiveTime();

  return (
    <footer className="relative isolate overflow-hidden bg-bg-primary pb-xl">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_11%_83%,rgba(245,196,0,0.12)_0%,rgba(245,196,0,0.055)_22%,transparent_48%),radial-gradient(ellipse_at_48%_0%,rgba(245,196,0,0.045)_0%,transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(245,196,0,0.035)_0%,transparent_32%,rgba(0,0,0,0.34)_100%)]" />

      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <section
          aria-labelledby="footer-cta-heading"
          className="pt-[112px] pb-[128px] md:pt-[126px] md:pb-[148px]"
          id="cta"
        >
          <div className="grid gap-2xl lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:items-start">
            <div>
              <SectionLabel label="Got a project?" />
              <h2
                className="max-w-[720px] font-display text-[32px] leading-[1.03] font-semibold tracking-[-0.07em] text-text-primary md:text-[clamp(56px,8.4vw,88px)]"
                id="footer-cta-heading"
              >
                Surround yourself with an expert
              </h2>
              <p className="mt-lg max-w-[560px] font-body text-[16px] leading-[1.6] font-normal text-text-secondary">
                Bring your next digital product, brand, or website to life with focused design
                direction and polished execution.
              </p>
            </div>

            <div className="lg:flex lg:justify-end lg:pt-[116px]">
              <YellowButton
                className="rounded-sm px-[28px] py-[17px] text-[14px] md:text-[17px]"
                href="/#contact"
                variant="external"
              >
                Start a Project Now
              </YellowButton>
            </div>
          </div>
        </section>

        <div className="grid gap-2xl pb-[34px] lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-lg">
            <nav aria-label="Footer primary navigation" className="flex flex-wrap gap-x-xl gap-y-md">
              {footerPrimaryLinks.map((link, index) => (
                <Link
                  className={cn(
                    "font-body text-[14px] leading-none font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary md:text-[15px]",
                    index === 0 && "text-accent"
                  )}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Footer utility navigation" className="flex flex-wrap gap-x-xl gap-y-md">
              {footerUtilityLinks.map((link) => (
                <Link
                  className="font-body text-[14px] leading-none font-normal text-text-secondary transition-colors duration-200 hover:text-text-primary md:text-[15px]"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-md lg:pb-[5px]">
            {socialLinks.map((social) => (
              <Link
                aria-label={social.label}
                className={cn(
                  "grid size-11 place-items-center rounded-full border border-border bg-bg-elevated/90",
                  "font-body text-[14px] font-semibold text-text-primary shadow-[inset_0_8px_18px_rgba(255,255,255,0.04)] md:text-[15px]",
                  "transition-colors duration-200 hover:border-border-hover hover:bg-bg-card focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:outline-none"
                )}
                href={social.href}
                key={social.label}
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true">{social.mark}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-md pt-lg text-[14px] leading-[1.4] text-text-secondary md:grid-cols-3 md:items-center">
          <Link aria-label="Go to home page" className="flex items-center gap-[10px]" href="/">
            <span className="grid size-8 place-items-center rounded-full bg-accent text-[11px] font-bold text-text-on-accent ring-2 ring-bg-primary">
              AB
            </span>
            <span className="font-display text-[18px] leading-none font-semibold tracking-[-0.03em] text-text-primary md:text-[22px]">
              PortFoliyo
            </span>
          </Link>

          <p className="text-left md:text-center">
            &copy;2025 Ahmed Badry All
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            rights reserved.
          </p>

          <div className="space-y-xs text-left md:text-right">
            <p aria-live="polite">{liveTime}</p>
            <p>Cairo: Sunny, 42.3&deg;C</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
