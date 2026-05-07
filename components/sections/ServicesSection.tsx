import { ServicesAccordion } from "@/components/sections/ServicesAccordion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { YellowButton } from "@/components/ui/YellowButton";
import { sanityFetch } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import type { Service } from "@/types/sanity";

const fallbackServices: readonly Service[] = [
  {
    _id: "fallback-ui-ux-design",
    title: "UI/UX Design",
    subtitle: "Designing Seamless Journeys",
    description:
      "I design intuitive, conversion-focused product experiences that make complex tasks feel simple and keep every interaction aligned with user needs.",
    skills: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Interactive Interface Design",
      "Usability Testing & Optimization"
    ],
    featured: false,
    order: 1
  },
  {
    _id: "fallback-web-development",
    title: "Web Development",
    subtitle: "Building Functional Solutions",
    description:
      "I build responsive, fast, and maintainable websites that bring polished product ideas into production-ready digital experiences.",
    skills: [
      "Responsive Development",
      "Frontend Architecture",
      "CMS Integration",
      "Performance Optimization"
    ],
    featured: false,
    order: 2
  },
  {
    _id: "fallback-branding",
    title: "Branding",
    subtitle: "Shaping Memorable Identities",
    description:
      "Developing and maintaining web applications, ensuring functionality, and collaborating with teams to deliver seamless.",
    skills: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Interactive Interface Design",
      "Usability Testing & Optimization"
    ],
    featured: true,
    order: 3
  },
  {
    _id: "fallback-animation-design",
    title: "Animation Design",
    subtitle: "Bringing Ideas Alive",
    description:
      "I craft purposeful motion systems that make interfaces feel responsive, expressive, and easier to understand without slowing the experience.",
    skills: ["Motion Direction", "Micro-interactions", "Scroll Animation", "Prototype Animation"],
    featured: false,
    order: 4
  },
  {
    _id: "fallback-product-design",
    title: "Product Design",
    subtitle: "Creating User-Centered Products",
    description:
      "I shape product strategy, workflows, and interface systems that help teams ship cohesive digital products with strong usability.",
    skills: ["Product Strategy", "User Flows", "Design Systems", "Design QA"],
    featured: false,
    order: 5
  }
];

export async function ServicesSection() {
  const servicesResult = await sanityFetch<readonly Service[] | undefined>({
    query: SERVICES_QUERY,
    tags: ["service"]
  });

  const services = servicesResult?.length
    ? servicesResult
    : process.env.NODE_ENV !== "production"
      ? fallbackServices
      : [];

  if (!services.length) {
    return null;
  }

  return (
    <section id="services" className="bg-bg-primary py-4xl md:py-5xl">
      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="grid gap-2xl md:grid-cols-[300px_minmax(0,1fr)] md:gap-3xl">
          <div>
            <SectionLabel label="My Services" />
            <YellowButton className="mt-[46px]" href="/#contact" variant="external">
              Start a Project Now
            </YellowButton>
          </div>

          <div>
            <h2 className="max-w-[650px] font-display text-[clamp(40px,5vw,58px)] leading-[1.15] font-semibold tracking-[-0.045em] text-text-primary">
              Experience the Impact of User-Centered Design
            </h2>
            <p className="mt-lg max-w-[610px] font-body text-[16px] leading-[1.55] font-normal text-text-secondary">
              Experience the impact of user-centered design. I craft intuitive and engaging digital
              solutions that put users first and elevate brands.
            </p>
          </div>
        </div>

        <ServicesAccordion services={services} />
      </div>
    </section>
  );
}
