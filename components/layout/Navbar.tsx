"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 50);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled && "border-b border-border bg-bg-primary/80 shadow-glow-subtle backdrop-blur-md"
      )}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-lg md:px-4xl"
      >
        <Link aria-label="Go to home page" className="flex items-center gap-[10px]" href="/">
          <span className="grid size-8 place-items-center rounded-full bg-accent text-[11px] font-bold text-text-on-accent ring-2 ring-bg-primary">
            DM
          </span>
          <span className="font-display text-[18px] leading-none font-bold tracking-[-0.01em] text-text-primary">
            PortFoliyo
          </span>
        </Link>

        <div className="hidden items-center gap-xl lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname === link.href;

            return (
              <Link
                className={cn(
                  "relative font-body text-[14px] leading-none font-medium tracking-[0.01em] text-text-primary uppercase transition-colors duration-200",
                  "after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200",
                  "hover:text-accent hover:after:scale-x-100",
                  isActive && "text-accent after:scale-x-100"
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="grid size-10 place-items-center rounded-full border border-border bg-bg-card text-text-primary transition-colors duration-200 hover:border-border-hover hover:bg-bg-elevated focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:outline-none lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-bg-primary/95 backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden",
          isMenuOpen ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-col px-lg py-md">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname === link.href;

            return (
              <Link
                className={cn(
                  "border-b border-border py-md font-body text-[14px] font-medium tracking-[0.01em] text-text-primary uppercase transition-colors duration-200 last:border-b-0 hover:text-accent",
                  isActive && "text-accent"
                )}
                href={link.href}
                key={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
