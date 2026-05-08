import { sanityFetch } from "@/sanity/lib/client";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import type { Testimonial } from "@/types/sanity";

const fallbackTestimonials: readonly Testimonial[] = [
  {
    _id: "fallback-testimonial-bar-1",
    quote: "Navigating the portfolio feels natural. Everything aligned and easy to use.",
    author: "Preview Client",
    role: "Founder",
    rating: 5,
    order: 1
  },
  {
    _id: "fallback-testimonial-bar-2",
    quote: "The experience feels smooth and fast, exactly how a portfolio should be.",
    author: "Preview Client",
    role: "Creative Director",
    rating: 5,
    order: 2
  }
] as const;

function StarRating({ rating }: Readonly<{ rating: number }>) {
  const stars = Array.from({ length: Math.min(Math.max(rating, 1), 5) }, (_, index) => index);

  return (
    <div
      aria-hidden="true"
      className="mb-sm flex gap-[4px] text-[14px] leading-none text-accent md:text-[15px]"
    >
      {stars.map((star) => (
        <span key={star}>&#9733;</span>
      ))}
    </div>
  );
}

export async function TestimonialsBar() {
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

  return (
    <section
      aria-label="Client testimonials"
      className="overflow-hidden border-y border-border bg-bg-ticker"
    >
      <div className="flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
          <article
            aria-hidden={index >= testimonials.length}
            className="flex min-h-[98px] w-[min(78vw,365px)] shrink-0 flex-col justify-center border-r border-border px-lg py-md md:min-h-[108px] md:px-xl"
            key={`${testimonial._id}-${index}`}
          >
            <StarRating rating={testimonial.rating} />
            <p className="font-body text-[14px] leading-[1.45] font-normal tracking-[-0.01em] text-text-secondary italic md:text-[16px]">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
