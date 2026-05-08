import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/sanity";

type TestimonialCardProps = Readonly<{
  testimonial: Testimonial;
}>;

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getRoleLine(testimonial: Testimonial) {
  return testimonial.company ? `${testimonial.role}, ${testimonial.company}` : testimonial.role;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="relative rounded-lg border border-border bg-bg-primary/90 px-lg py-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:px-xl md:py-[30px]">
      <blockquote>
        <p className="font-body text-[16px] leading-[1.45] font-normal tracking-[-0.01em] text-accent italic md:text-[17px]">
          &quot;{testimonial.quote}&quot;
        </p>
      </blockquote>

      <p className="mt-md max-w-[430px] font-body text-[14px] leading-[1.55] font-normal text-text-secondary md:text-[15px]">
        {testimonial.quote}
      </p>

      <div className="mt-xl flex items-center gap-md pr-[70px]">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full border border-border bg-bg-elevated">
          {testimonial.avatarUrl ? (
            <Image
              alt={testimonial.author}
              className="object-cover"
              fill
              sizes="44px"
              src={testimonial.avatarUrl}
            />
          ) : (
            <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_34%_24%,rgba(245,196,0,0.28)_0%,transparent_38%),var(--color-bg-elevated)] font-body text-[12px] font-semibold text-text-primary md:text-[13px]">
              {getInitials(testimonial.author)}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-body text-[16px] leading-none font-semibold text-text-primary">
            {testimonial.author}
          </h3>
          <p className="mt-sm font-body text-[13px] leading-none font-normal text-text-secondary">
            {getRoleLine(testimonial)}
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "absolute right-lg bottom-lg font-display text-[32px] leading-none font-semibold md:text-[64px]",
          "text-text-secondary/80 md:right-xl md:bottom-xl"
        )}
      >
        &quot;
      </span>
    </article>
  );
}
