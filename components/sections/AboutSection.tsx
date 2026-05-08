import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import { sanityFetch } from "@/sanity/lib/client";
import { EXPERIENCES_QUERY, SITE_CONFIG_QUERY } from "@/sanity/lib/queries";
import type { Experience, SiteConfig, SocialPlatform } from "@/types/sanity";
import { DateBadge } from "@/components/ui/DateBadge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { YellowButton } from "@/components/ui/YellowButton";

const fallbackSiteConfig: SiteConfig = {
  _id: "fallback-site-config",
  name: "Ahmed Badry",
  tagline: "Visualizer & Design Director",
  bio: "I'm David Michel, a UI/UX designer passionate about crafting intuitive, user-centered experiences. I've completed 100+ projects turning complex ideas into seamless interfaces.",
  resumeUrl: "/#resume",
  email: "luminUI@gmail.com",
  phone: "+039 9484 94894",
  website: "www.luminui.com",
  address: "19 Southern Way, UK",
  socials: [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
    { platform: "x", url: "https://x.com" }
  ]
};

const fallbackExperiences: readonly Experience[] = [
  {
    _id: "fallback-ui-ux-designer",
    role: "UI/UX Designer",
    company: "Wegems",
    startDate: "2023",
    endDate: null,
    description:
      "Designing intuitive interfaces, improving user flows, conducting usability tests, and collaborating with teams to create engaging digital experiences.",
    order: 1
  },
  {
    _id: "fallback-product-designer",
    role: "Product Designer",
    company: "LuminUI",
    startDate: "2022",
    endDate: "2023",
    description:
      "Crafting interactive designs, prototyping innovative features, analyzing user behavior, and ensuring products meet user needs and business goals.",
    order: 2
  },
  {
    _id: "fallback-senior-ux-designer",
    role: "Senior UX Designer",
    company: "Ugergency",
    startDate: "2020",
    endDate: "2022",
    description:
      "Leading UX projects, conducting user research and testing, and optimizing products for usability, engagement, and overall satisfaction.",
    order: 3
  }
];

type SocialIconProps = SVGProps<SVGSVGElement>;

function FacebookIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="M14.2 8.2h2.1V5.1c-.4-.1-1.6-.2-3-.2-3 0-5 1.8-5 5.1v2.8H5v3.5h3.3V24h4v-7.7h3.1l.5-3.5h-3.6v-2.4c0-1 .3-2.2 1.9-2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="M7.6 2h8.8A5.6 5.6 0 0 1 22 7.6v8.8a5.6 5.6 0 0 1-5.6 5.6H7.6A5.6 5.6 0 0 1 2 16.4V7.6A5.6 5.6 0 0 1 7.6 2Zm0 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm4.4 3.4A4.6 4.6 0 1 1 7.4 12 4.6 4.6 0 0 1 12 7.4Zm0 2A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4Zm5-2.6a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 17 6.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedinIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="M5.1 7.7H1.5V22h3.6V7.7ZM3.3 1A2.1 2.1 0 1 0 3.3 5.2 2.1 2.1 0 0 0 3.3 1Zm7.8 6.7H7.6V22h3.5v-7.1c0-1.9.4-3.7 2.7-3.7s2.3 2.1 2.3 3.8v7h3.5v-7.9c0-3.9-.8-6.8-5.3-6.8a4.6 4.6 0 0 0-4.1 2.3h-.1V7.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="M14.4 10.2 22.5 1h-1.9l-7 8-5.6-8H1.5l8.5 12.1L1.5 23h1.9l7.4-8.5 5.9 8.5h6.5l-8.8-12.8Zm-2.6 3-1-1.4L4 2.4h3.1l5.5 7.7 1 1.4 7.2 10.1h-3.1l-5.9-8.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialIcons: Partial<Record<SocialPlatform, ComponentType<SocialIconProps>>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  x: XIcon
};

function formatCompany(company: string) {
  return company.toLowerCase().startsWith("at ") ? company : `At ${company}`;
}

type ExperienceCardProps = Readonly<{
  experience: Experience;
}>;

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="border-b border-border px-lg py-xl first:border-t md:px-xl md:py-xl">
      <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-[22px] leading-[1.05] font-semibold tracking-[-0.035em] text-text-primary md:text-[clamp(24px,3vw,30px)]">
            {experience.role}
          </h3>
          <p className="mt-sm font-body text-[14px] leading-none text-text-secondary md:text-[15px]">
            {formatCompany(experience.company)}
          </p>
        </div>

        <DateBadge
          className="shrink-0 shadow-[inset_0_8px_16px_rgba(255,255,255,0.03)]"
          endDate={experience.endDate}
          startDate={experience.startDate}
        />
      </div>

      <p className="mt-md max-w-[500px] font-body text-[14px] leading-[1.65] font-normal text-text-secondary">
        {experience.description}
      </p>
    </article>
  );
}

type ProfileCardProps = Readonly<{
  siteConfig: SiteConfig;
}>;

function ProfileCard({ siteConfig }: ProfileCardProps) {
  const socials = siteConfig.socials ?? [];

  return (
    <article className="w-full overflow-hidden rounded-xl border border-border bg-bg-primary">
      <div className="relative h-[288px] bg-bg-card">
        {siteConfig.avatarUrl ? (
          <Image
            alt={`${siteConfig.name} portrait`}
            className="object-cover object-top"
            fill
            priority={false}
            sizes="(max-width: 1024px) 100vw, 360px"
            src={siteConfig.avatarUrl}
          />
        ) : (
          <div
            aria-label={`${siteConfig.name} portrait`}
            className="grid h-full place-items-center bg-[radial-gradient(circle_at_34%_24%,rgba(245,196,0,0.22)_0%,transparent_42%),var(--color-bg-card)] font-display text-[32px] font-semibold text-text-primary md:text-[64px]"
            role="img"
          >
            {siteConfig.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase())
              .join("")}
          </div>
        )}
      </div>

      <div className="border-t border-border px-xl py-lg text-center">
        <h3 className="font-display text-[20px] leading-none font-semibold tracking-[-0.01em] text-text-primary">
          {siteConfig.name}
        </h3>
        <p className="mt-sm font-body text-[14px] leading-none font-normal text-text-secondary">
          {siteConfig.tagline}
        </p>
      </div>

      <div className="flex justify-center gap-sm border-t border-border px-xl py-lg">
        {socials?.slice(0, 4).map((social) => {
          const Icon = socialIcons[social.platform] ?? XIcon;

          return (
            <a
              aria-label={social.platform}
              className="grid size-9 place-items-center rounded-full border border-border bg-bg-elevated text-text-primary transition-colors duration-200 hover:border-border-hover hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:outline-none"
              href={social.url}
              key={social.platform}
              rel="noreferrer"
              target="_blank"
            >
              <Icon className="size-4" />
            </a>
          );
        })}
      </div>
    </article>
  );
}

type ContactTableProps = Readonly<{
  siteConfig: SiteConfig;
}>;

function ContactTable({ siteConfig }: ContactTableProps) {
  const rows = [
    { label: "Phone", value: siteConfig.phone },
    { label: "Email", value: siteConfig.email },
    { label: "Website", value: siteConfig.website },
    { label: "Address", value: siteConfig.address }
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  return (
    <div id="contact" className="w-full lg:mt-30">
      <div className="pl-4 lg:pb-5">
        <SectionLabel label="Contact" />
      </div>
      <div className="w-full border border-border">
        {rows.map((row) => (
          <div
            className="grid grid-cols-[110px_1fr] items-center border-b border-border px-lg py-md last:border-b-0 md:grid-cols-[140px_1fr] md:px-lg"
            key={row.label}
          >
            <span className="font-body text-[14px] leading-none text-text-secondary md:text-[15px]">
              {row.label}
            </span>
            <span className="text-right font-body text-[16px] leading-[1.2] font-medium text-text-primary md:text-[18px]">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function AboutSection() {
  const [siteConfigResult, experiencesResult] = await Promise.all([
    sanityFetch<SiteConfig | undefined>({
      query: SITE_CONFIG_QUERY,
      tags: ["siteConfig"]
    }),
    sanityFetch<readonly Experience[] | undefined>({
      query: EXPERIENCES_QUERY,
      tags: ["experience"]
    })
  ]);

  const shouldUseFallback = process.env.NODE_ENV !== "production";
  const siteConfig = siteConfigResult ?? (shouldUseFallback ? fallbackSiteConfig : undefined);

  if (!siteConfig) {
    return null;
  }

  const experiences = experiencesResult?.length
    ? experiencesResult
    : shouldUseFallback
      ? fallbackExperiences
      : [];

  return (
    <section id="about" className="bg-bg-primary pt-2xl pb-2xl">
      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="grid gap-3xl lg:grid-cols-[minmax(0,595px)_minmax(320px,360px)] lg:items-start lg:gap-3xl">
          <div className="w-full">
            <SectionLabel label="About Me" />
            <h2 className="max-w-[560px] font-display text-[32px] leading-[1.16] font-semibold tracking-[-0.045em] text-text-primary md:text-[clamp(40px,5vw,58px)]">
              Passionate &amp; Lead Product Designer
            </h2>
            <p className="mt-md max-w-[560px] font-body text-[16px] leading-[1.55] font-normal text-text-secondary">
              {siteConfig.bio}
            </p>

            <YellowButton className="mt-2xl" href={siteConfig.resumeUrl} variant="download">
              Download Resume
            </YellowButton>
          </div>

          <aside className="w-full">
            <ProfileCard siteConfig={siteConfig} />
          </aside>
        </div>

        <div className="mt-3xl grid gap-2xl lg:grid-cols-[595px_minmax(0,1fr)] lg:gap-0 lg:mt-0">
          <div className="w-full">
            <SectionLabel label="Experience" />
            {experiences.length > 0 && (
              <div className="mt-2xl w-full border-x border-border">
                {experiences.map((experience) => (
                  <ExperienceCard experience={experience} key={experience._id} />
                ))}
              </div>
            )}
          </div>

          <ContactTable siteConfig={siteConfig} />
        </div>
      </div>
    </section>
  );
}
