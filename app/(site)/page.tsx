import { AboutSection } from "@/components/sections/AboutSection";
import { BrandsTickerSection } from "@/components/sections/BrandsTickerSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { RecentProjectsSection } from "@/components/sections/RecentProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsBar } from "@/components/sections/TestimonialsBar";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TestimonialsBar />
      <RecentProjectsSection />
      <AboutSection />
      <EducationSection />
      <BrandsTickerSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <TestimonialsSection />
    </main>
  );
}
