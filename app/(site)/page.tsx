import { AboutSection } from "@/components/sections/AboutSection";
import { BrandsTickerSection } from "@/components/sections/BrandsTickerSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { RecentProjectsSection } from "@/components/sections/RecentProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsBar } from "@/components/sections/TestimonialsBar";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { sanityFetch } from "@/sanity/lib/client";
import { CERTIFICATES_QUERY } from "@/sanity/lib/queries";
import type { Certificate } from "@/types/sanity";

export default async function Home() {
  const certificates = await sanityFetch<readonly Certificate[] | undefined>({
    query: CERTIFICATES_QUERY,
    tags: ["certificate"]
  });

  return (
    <main>
      <HeroSection />
      <TestimonialsBar />
      <RecentProjectsSection />
      <AboutSection />
      <EducationSection />
      <CertificatesSection certificates={certificates ?? []} />
      <BrandsTickerSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <TestimonialsSection />
    </main>
  );
}
