"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/types/sanity";

type ServiceCardProps = Readonly<{
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: (serviceId: string) => void;
}>;

export function ServiceCard({ service, index, isOpen, onToggle }: ServiceCardProps) {
  const cardId = `service-panel-${service._id}`;
  const buttonId = `service-button-${service._id}`;
  const skills = service.skills.slice(0, 4);

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-lg border transition-colors duration-300",
        "border-border bg-bg-primary",
        isOpen && "border-border-hover bg-bg-elevated"
      )}
    >
      {isOpen && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_54%,var(--color-accent-glow)_0%,transparent_54%)]" />
      )}

      <button
        aria-controls={cardId}
        aria-expanded={isOpen}
        className={cn(
          "relative z-10 flex w-full items-center justify-between gap-xl px-lg py-xl text-left",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset focus-visible:outline-none",
          isOpen ? "pb-md md:px-xl md:pt-xl" : "md:px-xl md:py-[34px]"
        )}
        id={buttonId}
        onClick={() => onToggle(service._id)}
        type="button"
      >
        <span className="min-w-0">
          <span className="mb-md block font-body text-[14px] leading-none font-normal tracking-[-0.02em] text-text-secondary md:text-[16px]">
            {service.subtitle}
          </span>
          <span className="block font-display text-[22px] leading-[1.05] font-semibold tracking-[-0.045em] text-text-primary md:text-[clamp(28px,4vw,38px)]">
            {service.title}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-full transition-all duration-300 md:size-[54px]",
            isOpen
              ? "bg-accent text-text-on-accent"
              : "bg-bg-elevated text-text-primary shadow-[inset_0_8px_18px_rgba(255,255,255,0.04)]"
          )}
        >
          {isOpen ? (
            <ArrowUpRight className="size-6" strokeWidth={2} />
          ) : (
            <ArrowRight className="size-6" strokeWidth={2} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            aria-labelledby={buttonId}
            className="relative z-10 overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id={cardId}
            initial={{ height: 0, opacity: 0 }}
            role="region"
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="grid gap-xl px-lg pb-xl md:grid-cols-[minmax(0,1fr)_280px_54px] md:items-center md:px-xl">
              <div>
                <p className="max-w-[560px] font-body text-[14px] leading-[1.55] font-normal text-text-secondary md:text-[16px]">
                  {service.description}
                </p>

                {skills.length > 0 && (
                  <ul className="mt-lg grid gap-md sm:grid-cols-2">
                    {skills.map((skill) => (
                      <li
                        className="flex items-center gap-sm font-body text-[12px] leading-none font-medium text-text-primary md:text-[13px]"
                        key={skill}
                      >
                        <span aria-hidden="true" className="text-accent">
                          &bull;
                        </span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="hidden md:block">
                {service.imageUrl ? (
                  <div className="relative h-[190px] overflow-hidden rounded-md">
                    <Image
                      alt={service.title}
                      className="object-cover"
                      fill
                      sizes="280px"
                      src={service.imageUrl}
                    />
                  </div>
                ) : (
                  <div className="grid h-[190px] place-items-center rounded-md border border-border bg-bg-card">
                    <span className="font-display text-[32px] leading-none font-semibold tracking-[-0.06em] text-accent md:text-[64px]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>

              <span aria-hidden="true" className="hidden md:block" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
