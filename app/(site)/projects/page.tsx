import type { Metadata } from "next";

import { ProjectCard, type ProjectCardProject } from "@/components/ui/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { sanityFetch } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { Project } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Projects",
  description: "A complete project archive for Ahmed Badry."
};

const fallbackProjects: readonly ProjectCardProject[] = [
  {
    _id: "fallback-website-redesign",
    title: "Website Redesign",
    category: "web",
    description:
      "Revamping outdated layouts into modern, responsive websites that improve usability and engagement."
  },
  {
    _id: "fallback-branding-identity-design",
    title: "Branding Identity Design",
    category: "branding",
    description:
      "Crafting unique brand identities that reflect values, connect with audiences, and stand out."
  },
  {
    _id: "fallback-creative-hub-website",
    title: "Creative Hub Website",
    category: "ui-ux",
    description:
      "Designing an engaging platform that brings ideas, content, and communities together seamlessly."
  },
  {
    _id: "fallback-mobile-app-mvp-designs",
    title: "Mobile App MVP Designs",
    category: "mobile",
    description:
      "Building clean, user-friendly MVPs that validate ideas quickly and deliver real impact."
  },
  {
    _id: "fallback-product-design-system",
    title: "Product Design System",
    category: "ui-ux",
    description:
      "Creating scalable interface foundations for consistent product teams and faster delivery."
  },
  {
    _id: "fallback-launch-landing-page",
    title: "Launch Landing Page",
    category: "branding",
    description:
      "Designing a campaign-ready landing experience with sharp positioning and conversion flow."
  }
];

function toProjectCardProject(project: Project): ProjectCardProject {
  return {
    _id: project._id,
    title: project.title,
    category: project.category,
    description: project.description,
    imageUrl: project.imageUrl,
    url: project.url
  };
}

export default async function ProjectsPage() {
  const projectsResult = await sanityFetch<readonly Project[] | undefined>({
    query: PROJECTS_QUERY,
    tags: ["project"]
  });

  const projects = projectsResult?.length
    ? projectsResult.map(toProjectCardProject)
    : process.env.NODE_ENV !== "production"
      ? fallbackProjects
      : [];

  return (
    <main className="bg-bg-primary pt-[136px] pb-5xl md:pt-[168px]">
      <section className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="grid gap-2xl md:grid-cols-[300px_minmax(0,1fr)] md:gap-3xl">
          <div>
            <SectionLabel label="All Projects" />
          </div>

          <div>
            <h1 className="max-w-[650px] font-display text-[32px] leading-[1.05] font-semibold tracking-[-0.055em] text-text-primary md:text-[clamp(48px,6vw,76px)]">
              Explore the Complete Project Archive
            </h1>
            <p className="mt-lg max-w-[600px] font-body text-[16px] leading-[1.6] font-normal text-text-secondary">
              A curated grid of product, brand, and web design work shaped with careful strategy,
              clean systems, and polished visual execution.
            </p>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="mt-3xl grid gap-x-lg gap-y-3xl md:mt-[84px] md:grid-cols-2 md:gap-x-xl md:gap-y-[76px] xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard index={index} key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-3xl border-y border-border py-2xl">
            <p className="font-body text-[16px] leading-[1.6] text-text-secondary">
              Project entries are being prepared in the CMS.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
