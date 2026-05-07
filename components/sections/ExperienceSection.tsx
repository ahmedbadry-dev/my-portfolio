import { sanityFetch } from "@/sanity/lib/client";
import { EXPERIENCES_QUERY } from "@/sanity/lib/queries";
import type { Experience } from "@/types/sanity";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DateBadge } from "@/components/ui/DateBadge";

const fallbackExperiences: readonly Experience[] = [
  {
    _id: "fallback-experience-1",
    role: "UI/UX Designer",
    company: "Wegems",
    startDate: "2023-01-01",
    endDate: null,
    description:
      "Designing intuitive interfaces, improving user flows, conducting usability tests, and collaborating with teams to create engaging digital experiences.",
    order: 0
  },
  {
    _id: "fallback-experience-2",
    role: "Product Designer",
    company: "LuminUI",
    startDate: "2022-01-01",
    endDate: "2023-01-01",
    description:
      "Crafting interactive designs, prototyping innovative features, analyzing user behavior, and ensuring products meet user needs and business goals.",
    order: 1
  },
  {
    _id: "fallback-experience-3",
    role: "Senior UX Designer",
    company: "Usergency",
    startDate: "2020-01-01",
    endDate: "2022-01-01",
    description:
      "Leading UX projects, conducting user research and testing, and optimizing products for usability, engagement, and overall satisfaction.",
    order: 2
  }
] as const;

export async function ExperienceSection() {
  const experiencesResult = await sanityFetch<readonly Experience[] | undefined>({
    query: EXPERIENCES_QUERY,
    tags: ["experience"]
  });
  const experiences = experiencesResult?.length
    ? experiencesResult
    : process.env.NODE_ENV !== "production"
      ? fallbackExperiences
      : [];

  if (!experiences.length) {
    return null;
  }

  return (
    <section className="bg-bg-primary pb-4xl md:pb-5xl">
      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="max-w-[690px]">
          <SectionLabel label="Experience" />

          <div className="border border-border">
            {experiences.map((experience) => (
              <article
                className="border-b border-border bg-bg-primary px-lg py-xl transition-colors duration-200 last:border-b-0 hover:bg-white/[0.02] md:px-xl md:py-[34px]"
                key={experience._id}
              >
                <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-[clamp(25px,3vw,32px)] leading-[1.05] font-semibold tracking-[-0.035em] text-text-primary">
                      {experience.role}
                    </h3>
                    <p className="mt-sm font-body text-[15px] leading-none text-text-secondary">
                      At {experience.company}
                    </p>
                  </div>

                  <DateBadge
                    className="sm:mt-xs"
                    endDate={experience.endDate}
                    startDate={experience.startDate}
                  />
                </div>

                <p className="mt-md max-w-[590px] font-body text-[15px] leading-[1.55] text-text-secondary">
                  {experience.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
