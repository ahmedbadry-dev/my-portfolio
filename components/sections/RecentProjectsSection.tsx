import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { Project, ProjectCategory } from "@/types/sanity";

type RecentProject = Readonly<{
  _id: string;
  title: string;
  category: ProjectCategory;
  date: string;
  imageUrl?: string;
  url?: string;
}>;

const fallbackProject: RecentProject = {
  _id: "fallback-recent-project",
  title: "LuminUI",
  category: "ui-ux",
  date: "2025-08-18",
  url: "/projects"
};

const categoryLabels = {
  "ui-ux": "UI/UX Design",
  branding: "Branding",
  web: "Web Design",
  mobile: "Mobile App"
} satisfies Record<ProjectCategory, string>;

function toRecentProject(project: Project): RecentProject {
  return {
    _id: project._id,
    title: project.title,
    category: project.category,
    date: project.date,
    imageUrl: project.imageUrl,
    url: project.url
  };
}

function getProjectHref(project: RecentProject) {
  return project.url ?? "/projects";
}

function formatProjectDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).formatToParts(parsedDate);

  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const year = parts.find((part) => part.type === "year")?.value ?? "";

  return `${day} ${month}, ${year}`;
}

function RecentProjectPreview({ project }: Readonly<{ project: RecentProject }>) {
  const href = getProjectHref(project);
  const isExternal = href.startsWith("http");

  return (
    <Link
      aria-label={`View project: ${project.title}`}
      className="group block focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-primary focus-visible:outline-none"
      href={href}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      <article className="relative w-full overflow-hidden rounded-lg bg-bg-card
        h-[420px]
        sm:h-[380px]
        md:h-[480px]
        lg:h-[560px]">
        {project.imageUrl ? (
          <Image
            alt={project.title}
            className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 1200px"
            src={project.imageUrl}
          />
        ) : (
          <div
            aria-label={`${project.title} project preview`}
            className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_55%_36%,rgba(255,255,255,0.18)_0%,transparent_24%),linear-gradient(128deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.18)_44%,rgba(255,255,255,0.06)_100%)] grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
            role="img"
          >
            <div className="absolute top-[-18%] left-[7%] h-[82%] w-[55%] rotate-[-10deg] rounded-md border border-white/15 bg-bg-primary/45 shadow-[0_44px_100px_rgba(0,0,0,0.72)]">
              <div className="absolute inset-x-[9%] top-[13%] h-[18%] rounded-xs bg-white/10" />
              <div className="absolute top-[19%] left-[13%] font-display text-[22px] leading-[0.95] font-semibold tracking-[-0.06em] text-white/65 md:text-[clamp(32px,5vw,66px)]">
                M-Mockups:
                <br />
                MacBook Air
              </div>
              <div className="absolute right-[11%] bottom-[15%] h-[9%] w-[21%] rounded-xs bg-accent/80" />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[repeating-linear-gradient(164deg,rgba(255,255,255,0.22)_0_2px,transparent_2px_18px)] opacity-30" />
            <div className="absolute right-[8%] bottom-[16%] h-[26%] w-[54%] skew-x-[-18deg] rounded-sm bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.65)]" />
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.22)_48%,rgba(0,0,0,0.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-primary/80 to-transparent" />

        <div className="absolute inset-0 grid place-items-center px-lg">
          <span className="inline-flex items-center justify-center gap-sm rounded-sm bg-accent px-[22px] py-[14px] font-body text-[14px] leading-none font-semibold whitespace-nowrap text-text-on-accent shadow-[0_12px_36px_rgba(0,0,0,0.28)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-accent-hover md:px-[30px] md:py-[18px] md:text-[18px]">
            View Project
            <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={2} />
          </span>
        </div>

        <div className="absolute bottom-lg left-lg flex max-w-[calc(100%-48px)] flex-wrap gap-sm md:bottom-xl md:left-xl md:gap-md">
          <span className="rounded-full bg-bg-primary/70 px-md py-sm font-body text-[12px] leading-none font-semibold text-text-primary backdrop-blur-md md:px-lg md:py-md md:text-[14px]">
            {categoryLabels[project.category]}
          </span>
          <span className="rounded-full bg-bg-primary/70 px-md py-sm font-body text-[12px] leading-none font-semibold text-text-primary backdrop-blur-md md:px-lg md:py-md md:text-[14px]">
            {formatProjectDate(project.date)}
          </span>
        </div>

        <h2
          className={cn(
            "absolute right-lg bottom-[86px] left-lg font-display",
            "text-[32px] leading-none font-semibold tracking-[-0.06em] text-text-primary",
            "md:right-xl md:bottom-xl md:left-auto md:max-w-[48%] md:text-right md:text-[clamp(44px,7vw,76px)]"
          )}
        >
          {project.title}
        </h2>
      </article>
    </Link>
  );
}

export async function RecentProjectsSection() {
  const projectsResult = await sanityFetch<readonly Project[] | undefined>({
    query: PROJECTS_QUERY,
    tags: ["project"]
  });

  const recentProject =
    projectsResult?.find((project) => !project.featured) ?? projectsResult?.[0] ?? null;
  const project = recentProject
    ? toRecentProject(recentProject)
    : process.env.NODE_ENV !== "production"
      ? fallbackProject
      : null;

  if (!project) {
    return null;
  }

  return (
    <section id="recent-projects" className="bg-bg-primary py-3xl md:py-4xl lg:py-5xl">
      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="mb-2xl flex flex-col items-start gap-md sm:flex-row sm:items-center sm:justify-between sm:gap-xl md:mb-[54px]">
          <SectionLabel className="mb-0" label="Recent Projects" />

          <Link
            className="inline-flex items-center gap-sm font-body text-[14px] leading-none font-medium whitespace-nowrap text-accent transition-colors duration-200 hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:outline-none md:text-[15px]"
            href="/projects"
          >
            Explore more Work
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
          </Link>
        </div>

        <RecentProjectPreview project={project} />
      </div>
    </section>
  );
}
