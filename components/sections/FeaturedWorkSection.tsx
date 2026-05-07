import { ProjectCard, type ProjectCardProject } from "@/components/ui/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { YellowButton } from "@/components/ui/YellowButton";
import { sanityFetch } from "@/sanity/lib/client";
import { FEATURED_PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { Project } from "@/types/sanity";

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

export async function FeaturedWorkSection() {
  const projectsResult = await sanityFetch<readonly Project[] | undefined>({
    query: FEATURED_PROJECTS_QUERY,
    tags: ["project"]
  });

  const projects = projectsResult?.length
    ? projectsResult.slice(0, 4).map(toProjectCardProject)
    : process.env.NODE_ENV !== "production"
      ? fallbackProjects
      : [];

  if (!projects.length) {
    return null;
  }

  return (
    <section id="work" className="bg-bg-primary py-4xl md:py-5xl">
      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="grid gap-2xl md:grid-cols-[300px_minmax(0,1fr)] md:gap-3xl">
          <div>
            <SectionLabel label="Featured Work" />
            <YellowButton className="mt-[46px]" href="/projects" variant="external">
              Explore all Projects
            </YellowButton>
          </div>

          <div>
            <h2 className="max-w-[620px] font-display text-[clamp(40px,5vw,58px)] leading-[1.15] font-semibold tracking-[-0.045em] text-text-primary">
              Showcasing My Work for Your Inspiration
            </h2>
            <p className="mt-lg max-w-[590px] font-body text-[16px] leading-[1.55] font-normal text-text-secondary">
              Discover a showcase of digital creativity by Ahmed Badry - innovative UI/UX design and
              web projects crafted to inspire your next big idea.
            </p>
          </div>
        </div>

        <div className="mt-3xl grid gap-x-lg gap-y-3xl md:mt-[92px] md:grid-cols-2 md:gap-x-xl md:gap-y-[84px]">
          {projects.map((project, index) => (
            <ProjectCard index={index} key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
