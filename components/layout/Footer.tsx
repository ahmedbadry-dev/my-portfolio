"use client";

import Link from "next/link";

import { useLiveTime } from "@/hooks/useLiveTime";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
    <footer className="border-t border-border bg-bg-primary">
      <div className="mx-auto w-full max-w-[1200px] px-lg py-xl md:px-4xl">
        <div className="grid gap-xl border-b border-border pb-xl lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-lg">
            <nav aria-label="Footer primary navigation" className="flex flex-wrap gap-lg">
              {NAV_LINKS.map((link, index) => (
                <Link
                  className={cn(
                    "font-body text-[13px] leading-none text-text-muted transition-colors duration-200 hover:text-text-secondary",
                    index === 0 && "text-accent"
                  )}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Footer utility navigation" className="flex flex-wrap gap-lg">
              {footerUtilityLinks.map((link) => (
                <Link
                  className="font-body text-[13px] leading-none text-text-muted transition-colors duration-200 hover:text-text-secondary"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-md">
            {socialLinks.map((social) => (
              <Link
                aria-label={social.label}
                className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated font-body text-[13px] font-semibold text-text-secondary transition-colors duration-200 hover:border-border-hover hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:outline-none"
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

        <div className="grid gap-md pt-lg text-[13px] leading-[1.4] text-text-muted md:grid-cols-3 md:items-center">
          <Link aria-label="Go to home page" className="flex items-center gap-[10px]" href="/">
            <span className="grid size-8 place-items-center rounded-full bg-accent text-[11px] font-bold text-text-on-accent ring-2 ring-bg-primary">
              AB
            </span>
            <span className="font-display text-[18px] leading-none font-bold tracking-[-0.01em] text-text-primary">
              PortFoliyo
            </span>
          </Link>

          <p className="text-left md:text-center">©2025 Ahmed Badry. All rights reserved.</p>

          <div className="space-y-xs text-left md:text-right">
            <p aria-live="polite">{liveTime}</p>
            <p>Cairo: Sunny, 42.3°C</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
