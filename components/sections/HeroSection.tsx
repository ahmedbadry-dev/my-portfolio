import heroReference from "@/design-references/01_hero.jpg";
import { YellowButton } from "@/components/ui/YellowButton";

const heroSkills = ["#BRANDING", "#UI/UX DESIGN", "#DEVELOPMENT", "#WEB DESIGN"] as const;

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-bg-primary pt-[150px] pb-xl md:pt-[160px] lg:min-h-[660px] lg:pb-[30px]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_77%_10%,rgba(245,196,0,0.13)_0%,transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_96%_73%,rgba(245,196,0,0.08)_0%,transparent_30%)]" />

      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <h1 className="text-center whitespace-nowrap font-display text-[32px] leading-none font-semibold tracking-tighter text-text-primary uppercase md:text-[clamp(60px,9.5vw,148px)]">
          Ahmed Badry
        </h1>

        <ul
          aria-label="Primary skills"
          className="mt-[40px] grid w-full grid-cols-2 place-items-center justify-around gap-x-xl gap-y-md font-body text-[14px] leading-none font-medium tracking-[-0.03em] text-text-primary md:flex md:justify-between md:text-[16px] lg:text-[18px]"
        >
          {heroSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <div className="mt-[50px] grid items-end gap-xl md:grid-cols-[360px_minmax(0,1fr)] lg:gap-[102px]">
          <div
            aria-label="Ahmed Badry portrait"
            className="relative hidden h-[282px] w-full max-w-[360px] overflow-hidden md:block"
            role="img"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[length:8px_8px] opacity-45" />
            <div
              className="absolute inset-0 bg-[length:1024px_660px] bg-[-94px_-352px] bg-no-repeat"
              style={{ backgroundImage: `url(${heroReference.src})` }}
            />
          </div>

          <div className="max-w-[560px] pb-[2px] md:pt-[86px]">
            <p className="text-center font-body text-[16px] leading-[1.5] font-normal tracking-[-0.01em] text-text-primary md:text-left md:text-[17px] lg:text-[18px]">
              {"Welcome to my portfolio! I'm Ahmed Badry, a web designer & developer from the "}
              US with 16+ years of experience. I craft visually stunning, functional websites that
              deliver exceptional user experiences.
            </p>

            <YellowButton
              className="mt-[36px] w-full md:w-auto"
              href="/#contact"
              variant="external"
            >
              Start a Project Now
            </YellowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
