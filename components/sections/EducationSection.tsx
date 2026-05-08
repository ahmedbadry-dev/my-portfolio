import { sanityFetch } from "@/sanity/lib/client";
import { EDUCATION_QUERY } from "@/sanity/lib/queries";
import type { Education } from "@/types/sanity";
import { DateBadge } from "@/components/ui/DateBadge";
import { SectionLabel } from "@/components/ui/SectionLabel";

const fallbackEducation: readonly Education[] = [
  {
    _id: "fallback-bsc-cse",
    degree: "BSC in CSE",
    institution: "London University",
    startYear: 2023,
    endYear: 2026,
    order: 1
  },
  {
    _id: "fallback-web-design",
    degree: "Diploma in Web Design",
    institution: "Oxford College",
    startYear: 2022,
    endYear: 2023,
    order: 2
  },
  {
    _id: "fallback-ui-ux-certificate",
    degree: "UI/UX Certificate",
    institution: "Google Design",
    startYear: 2020,
    endYear: 2021,
    order: 3
  },
  {
    _id: "fallback-branding-course",
    degree: "Branding Course",
    institution: "Cambridge Institute",
    startYear: 2018,
    endYear: 2019,
    order: 4
  }
];

type EducationCardProps = Readonly<{
  education: Education;
}>;

function EducationCard({ education }: EducationCardProps) {
  return (
    <article className="border-b border-border px-lg py-xl last:border-b-0 md:px-xl md:py-xl">
      <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-[22px] leading-[1.05] font-semibold tracking-[-0.035em] text-text-primary md:text-[clamp(24px,3vw,30px)]">
            {education.degree}
          </h3>
          <p className="mt-sm font-body text-[14px] leading-none font-normal text-text-secondary md:text-[15px]">
            {education.institution}
          </p>
        </div>

        <DateBadge
          className="shrink-0 shadow-[inset_0_8px_16px_rgba(255,255,255,0.03)]"
          endDate={education.endYear.toString()}
          startDate={education.startYear.toString()}
        />
      </div>
    </article>
  );
}

export async function EducationSection() {
  const educationResult = await sanityFetch<readonly Education[] | undefined>({
    query: EDUCATION_QUERY,
    tags: ["education"]
  });

  const educationItems = educationResult?.length
    ? educationResult
    : process.env.NODE_ENV !== "production"
      ? fallbackEducation
      : [];

  if (!educationItems.length) {
    return null;
  }

  return (
    <section id="education" className="bg-bg-primary pt-2xl pb-4xl">
      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="max-w-[595px]">
          <SectionLabel label="Education" />
          <div className="mt-2xl border border-border">
            {educationItems.map((education) => (
              <EducationCard education={education} key={education._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
