import { SectionLabel } from "@/components/ui/SectionLabel";
import { YellowButton } from "@/components/ui/YellowButton";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden bg-bg-primary pt-[112px] pb-[128px] md:pt-[126px] md:pb-[148px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_11%_83%,rgba(245,196,0,0.12)_0%,rgba(245,196,0,0.055)_22%,transparent_48%),radial-gradient(ellipse_at_48%_0%,rgba(245,196,0,0.045)_0%,transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(245,196,0,0.035)_0%,transparent_32%,rgba(0,0,0,0.34)_100%)]" />

      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="grid gap-2xl lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:items-start">
          <div>
            <SectionLabel label="Got a project?" />
            <h2 className="max-w-[720px] font-display text-[32px] leading-[1.03] font-semibold tracking-[-0.07em] text-text-primary md:text-[clamp(56px,8.4vw,88px)]">
              Surround yourself with an expert
            </h2>
            <p className="mt-lg max-w-[560px] font-body text-[16px] leading-[1.6] font-normal text-text-secondary">
              Bring your next digital product, brand, or website to life with focused design
              direction and polished execution.
            </p>
          </div>

          <div className="lg:flex lg:justify-end lg:pt-[116px]">
            <YellowButton
              className="rounded-sm px-[28px] py-[17px] text-[14px] md:text-[17px]"
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
