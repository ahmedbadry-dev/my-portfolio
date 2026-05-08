import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/client";
import { SITE_CONFIG_QUERY } from "@/sanity/lib/queries";
import type { Brand, SiteConfig } from "@/types/sanity";

const fallbackBrands: readonly Brand[] = [
  { name: "Spotify" },
  { name: "Gumroad" },
  { name: "Asana" },
  { name: "Framer" },
  { name: "Medium" },
  { name: "Linear" }
];

type BrandItemProps = Readonly<{
  brand: Brand;
}>;

function BrandItem({ brand }: BrandItemProps) {
  const content = brand.logoUrl ? (
    <Image
      alt={brand.name}
      className="max-h-9 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      height={36}
      src={brand.logoUrl}
      width={150}
    />
  ) : (
    <span className="font-display text-[22px] leading-none font-bold tracking-[-0.035em] text-text-secondary opacity-70 transition duration-300 hover:text-text-primary hover:opacity-100 md:text-[24px]">
      {brand.name}
    </span>
  );

  if (!brand.url) {
    return (
      <div className="flex h-full min-w-[180px] items-center justify-center px-xl">{content}</div>
    );
  }

  return (
    <a
      aria-label={brand.name}
      className="flex h-full min-w-[180px] items-center justify-center px-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-ticker focus-visible:outline-none"
      href={brand.url}
      rel="noreferrer"
      target="_blank"
    >
      {content}
    </a>
  );
}

export async function BrandsTickerSection() {
  const siteConfig = await sanityFetch<SiteConfig | undefined>({
    query: SITE_CONFIG_QUERY,
    tags: ["siteConfig"]
  });

  const brands = siteConfig?.brands?.length
    ? siteConfig.brands
    : process.env.NODE_ENV !== "production"
      ? fallbackBrands
      : [];

  if (!brands.length) {
    return null;
  }
  const marqueeBrands = [...brands, ...brands] as readonly Brand[];

  return (
    <section aria-label="Brand collaborations" className="overflow-hidden bg-bg-ticker">
      <div className="flex min-h-[128px] w-max animate-[testimonials-marquee_30s_linear_infinite] items-center hover:[animation-play-state:paused] motion-reduce:animate-none md:min-h-[136px]">
        {marqueeBrands.map((brand, index) => (
          <BrandItem brand={brand} key={`${brand.name}-${index}`} />
        ))}
      </div>
    </section>
  );
}
