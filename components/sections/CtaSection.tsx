import { SectionLabel } from "@/components/ui/SectionLabel";
import { YellowButton } from "@/components/ui/YellowButton";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden border-t border-border bg-bg-primary py-4xl md:py-5xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_11%_75%,rgba(245,196,0,0.11)_0%,transparent_42%),radial-gradient(ellipse_at_55%_0%,rgba(245,196,0,0.06)_0%,transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(245,196,0,0.035)_0%,transparent_30%,rgba(245,196,0,0.025)_100%)]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="grid gap-2xl lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:items-center">
          <div>
            <SectionLabel label="Got a project?" />
            <h2 className="max-w-[720px] font-display text-[clamp(54px,8vw,86px)] leading-[1.03] font-semibold tracking-[-0.065em] text-text-primary">
              Surround yourself with an expert
            </h2>
            <p className="mt-lg max-w-[560px] font-body text-[16px] leading-[1.6] font-normal text-text-secondary">
              Bring your next digital product, brand, or website to life with focused design
              direction and polished execution.
            </p>
          </div>

          <div className="lg:flex lg:justify-end lg:pt-[58px]">
            <YellowButton
              className="px-[32px] py-[17px] text-[17px]"
              href="/#contact"
              variant="external"
            >
              Start a Project
            </YellowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
