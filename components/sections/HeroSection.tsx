import heroReference from "@/design-references/01_hero.jpg";
import { YellowButton } from "@/components/ui/YellowButton";

const heroSkills = ["#BRANDING", "#UI/UX DESIGN", "#DEVELOPMENT", "#WEB DESIGN"] as const;

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-bg-primary pt-[128px] pb-xl md:pt-[168px] lg:min-h-[660px] lg:pb-[30px]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_77%_10%,rgba(245,196,0,0.14)_0%,transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_96%_73%,rgba(245,196,0,0.08)_0%,transparent_30%)]" />

      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <h1 className="flex flex-row items-center justify-around gap-x-[clamp(16px,4.4vw,58px)] whitespace-nowrap font-hero text-[clamp(32px,8vw,138px)] leading-[1] font-[700] tracking-[-0.03em] text-text-primary">
          <span>Ahmed</span>
          <span>Badry</span>
        </h1>

        <ul
          aria-label="Primary skills"
          className="mt-[42px] grid grid-cols-2 gap-x-xl gap-y-md pl-[32px] font-body text-[16px] leading-none font-medium tracking-[-0.03em] text-text-primary md:grid-cols-4 md:pl-[37px] lg:text-[20px]"
        >
          {heroSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <div className="mt-[46px] grid items-end gap-xl md:grid-cols-[360px_1fr] lg:mt-[50px] lg:grid-cols-[360px_1fr] lg:gap-[102px]">
          <div
            aria-label="Ahmed Badry portrait"
            className="h-[282px] w-full max-w-[360px] bg-[length:1024px_660px] bg-[-94px_-352px] bg-no-repeat md:h-[284px]"
            role="img"
            style={{ backgroundImage: `url(${heroReference.src})` }}
          />

          <div className="max-w-[560px] pb-[2px] md:pt-[82px]">
            <p className="font-body text-[17px] leading-[1.45] font-normal tracking-[-0.01em] text-text-primary lg:text-[20px]">
              {"Welcome to my portfolio! I'm Ahmed Badry, a web designer & developer from the "}
              US with 16+ years of experience. I craft visually stunning, functional websites that
              deliver exceptional user experiences.
            </p>

            <YellowButton className="mt-[36px]" href="/#contact" variant="external">
              Start a Project Now
            </YellowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
