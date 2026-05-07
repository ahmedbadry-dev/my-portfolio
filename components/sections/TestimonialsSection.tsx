import Image from "next/image";

import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { sanityFetch } from "@/sanity/lib/client";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import type { Testimonial } from "@/types/sanity";

const fallbackTestimonials: readonly Testimonial[] = [
  {
    _id: "fallback-james-mitchell",
    quote: "David captured our vision and turned it into a polished website.",
    author: "James Mitchell",
    role: "CEO",
    company: "Crattora Studio",
    rating: 5,
    order: 1
  },
  {
    _id: "fallback-daniel-kim",
    quote: "The design exceeded our expectations. Clean, modern, and user-friendly",
    author: "Daniel Kim",
    role: "CEO",
    company: "Wegems Agency",
    rating: 5,
    order: 2
  },
  {
    _id: "fallback-sarah-wilson",
    quote: "The process was smooth and the final product added so much value.",
    author: "Sarah Wilson",
    role: "Founder",
    company: "Northline",
    rating: 5,
    order: 3
  }
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TrustAvatar({
  testimonial,
  index
}: Readonly<{ testimonial: Testimonial; index: number }>) {
  return (
    <div
      className="relative size-11 overflow-hidden rounded-full border-2 border-bg-primary bg-bg-elevated shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
      style={{ zIndex: 10 - index }}
    >
      {testimonial.avatarUrl ? (
        <Image
          alt={testimonial.author}
          className="object-cover"
          fill
          sizes="44px"
          src={testimonial.avatarUrl}
        />
      ) : (
        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_34%_24%,rgba(245,196,0,0.25)_0%,transparent_40%),var(--color-bg-card)] font-body text-[12px] font-semibold text-text-primary">
          {getInitials(testimonial.author)}
        </div>
      )}
    </div>
  );
}

export async function TestimonialsSection() {
  const testimonialsResult = await sanityFetch<readonly Testimonial[] | undefined>({
    query: TESTIMONIALS_QUERY,
    tags: ["testimonial"]
  });

  const testimonials = testimonialsResult?.length
    ? testimonialsResult
    : process.env.NODE_ENV !== "production"
      ? fallbackTestimonials
      : [];

  if (!testimonials.length) {
    return null;
  }
  const visibleTestimonials = testimonials.slice(0, 2);
  const trustTestimonials = testimonials.slice(0, 3);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-bg-primary py-4xl md:py-5xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[56%] left-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(120px,22vw,260px)] leading-none font-semibold tracking-[0.02em] text-transparent opacity-70 [-webkit-text-stroke:1px_var(--color-border-strong)]"
      >
        TESTIMONIALS
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="mx-auto flex w-fit flex-col items-center">
          <div className="flex -space-x-md">
            {trustTestimonials.map((testimonial, index) => (
              <TrustAvatar index={index} key={testimonial._id} testimonial={testimonial} />
            ))}
          </div>
          <p className="mt-lg text-center font-body text-[20px] leading-none font-normal tracking-[-0.03em] text-text-primary">
            Trusted 18,000+ Satisfied Clients
          </p>
        </div>

        <div className="mx-auto mt-3xl grid max-w-[840px] gap-lg md:grid-cols-2 md:gap-xl">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
