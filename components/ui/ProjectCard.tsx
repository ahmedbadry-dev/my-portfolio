import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/sanity";

export type ProjectCardProject = Readonly<{
  _id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  imageUrl?: string;
  url?: string;
}>;

type ProjectCardProps = Readonly<{
  project: ProjectCardProject;
  index: number;
}>;

const categoryLabels = {
  "ui-ux": "UI/UX",
  branding: "Branding",
  web: "Web Design",
  mobile: "Mobile App"
} satisfies Record<ProjectCategory, string>;

function getProjectHref(project: ProjectCardProject) {
  return project.url ?? "/#projects";
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const href = getProjectHref(project);
  const isExternal = href.startsWith("http");


  return (
    <article className="group">
      <Link
        aria-label={`View project: ${project.title}`}
        className="block focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-primary focus-visible:outline-none"
        href={href}
        rel={isExternal ? "noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
      >
        <div className="relative aspect-[1.51] overflow-hidden rounded-md bg-bg-card">
          {project.imageUrl ? (
            <Image
              alt={project.title}
              className="object-cover grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              src={project.imageUrl}
            />
          ) : (
            <div
              aria-label={`${project.title} project preview`}
              className={cn(
                "h-full w-full grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0",
                "bg-[radial-gradient(circle_at_68%_36%,rgba(255,255,255,0.42)_0%,transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.08)_38%,rgba(255,255,255,0.2)_100%)]"
              )}
              role="img"
            >
              <div className="absolute inset-[18%_12%] rotate-[-7deg] rounded-sm border border-white/35 bg-bg-primary/50 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
                <div className="mx-auto mt-[14%] h-[9%] w-[58%] rounded-full bg-white/45" />
                <div className="mx-auto mt-[7%] h-[6%] w-[42%] rounded-full bg-white/25" />
                <div className="absolute inset-x-[18%] bottom-[16%] grid grid-cols-3 gap-xs">
                  <span className="h-8 rounded-xs bg-white/20" />
                  <span className="h-8 rounded-xs bg-white/28" />
                  <span className="h-8 rounded-xs bg-white/20" />
                </div>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-bg-overlay opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center justify-center gap-sm rounded-full bg-accent px-[24px] py-[13px] font-body text-[14px] leading-none font-semibold text-text-on-accent md:px-[28px] md:py-[14px] md:text-[15px]">
              View Project
              <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </span>
          </div>

          <span className="absolute top-md left-md rounded-full border border-border bg-bg-primary/70 px-md py-sm font-body text-[12px] leading-none font-medium text-text-primary opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            {categoryLabels[project.category]}
          </span>

        </div>

        <div className="mt-lg">
          <h3
            className="font-display text-[22px] leading-[1.05] font-semibold tracking-[-0.05em] text-text-primary transition-colors duration-300 group-hover:text-accent md:text-[clamp(28px,4vw,38px)]"
          >
            {project.title}
          </h3>
          <p className="mt-md max-w-[470px] font-body text-[14px] leading-[1.5] font-normal text-text-secondary md:text-[15px]">
            {project.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
