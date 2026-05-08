"use client";

import { useEffect, useState } from "react";

import { ProjectCard, type ProjectCardProject } from "@/components/ui/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { YellowButton } from "@/components/ui/YellowButton";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { Project } from "@/types/sanity";

const PROJECTS_PER_PAGE = 4;

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

export function FeaturedWorkSection() {
  const [projects, setProjects] = useState<readonly ProjectCardProject[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      try {
        const projectsResult = await client.fetch<readonly Project[]>(PROJECTS_QUERY);

        if (isMounted) {
          setProjects(projectsResult.map(toProjectCardProject));
        }
      } catch {
        if (isMounted) {
          setProjects(process.env.NODE_ENV !== "production" ? fallbackProjects : []);
        }
      }
    }

    void fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const resolvedProjects =
    projects ?? (process.env.NODE_ENV !== "production" ? fallbackProjects : []);
  const visibleProjects = resolvedProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < resolvedProjects.length;

  if (!resolvedProjects.length) {
    return null;
  }

  return (
    <section id="projects" className="bg-bg-primary py-4xl md:py-5xl">
      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="grid gap-2xl md:grid-cols-[300px_minmax(0,1fr)] md:gap-3xl">
          <div>
            <SectionLabel label="Featured Work" />
          </div>

          <div>
            <h2 className="max-w-[620px] font-display text-[32px] leading-[1.15] font-semibold tracking-[-0.045em] text-text-primary md:text-[clamp(40px,5vw,58px)]">
              Showcasing My Work for Your Inspiration
            </h2>
            <p className="mt-lg max-w-[590px] font-body text-[16px] leading-[1.55] font-normal text-text-secondary">
              Discover a showcase of digital creativity by Ahmed Badry - innovative UI/UX design and
              web projects crafted to inspire your next big idea.
            </p>
          </div>
        </div>

        <div className="mt-3xl grid gap-x-lg gap-y-3xl md:mt-[92px] md:grid-cols-2 md:gap-x-xl md:gap-y-[84px]">
          {visibleProjects.map((project, index) => (
            <ProjectCard index={index} key={project._id} project={project} />
          ))}
        </div>

        {hasMoreProjects && (
          <div className="mt-3xl flex justify-center">
            <YellowButton
              onClick={() => setVisibleCount((current) => current + PROJECTS_PER_PAGE)}
            >
              Load More
            </YellowButton>
          </div>
        )}
      </div>
    </section>
  );
}
