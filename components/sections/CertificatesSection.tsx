"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/types/sanity";

const INITIAL_CERTIFICATE_COUNT = 6;

type CertificateCardProps = Readonly<{
  certificate: Certificate;
}>;

type CertificatesSectionProps = Readonly<{
  certificates: readonly Certificate[];
}>;

function getCertificateSpanClass(aspectRatio?: number) {
  if (typeof aspectRatio !== "number") {
    return "col-span-1 row-span-1";
  }

  if (aspectRatio > 1.5) {
    return "col-span-2 row-span-1";
  }

  if (aspectRatio < 0.8) {
    return "col-span-1 row-span-2";
  }

  return "col-span-1 row-span-1";
}

function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-md border border-border bg-bg-card",
        "min-h-[180px] sm:min-h-[220px] md:min-h-[260px]",
        "shadow-card transition duration-300 hover:border-border-hover",
        getCertificateSpanClass(certificate.aspectRatio)
      )}
    >
      {certificate.imageUrl ? (
        <Image
          alt={certificate.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          src={certificate.imageUrl}
        />
      ) : (
        <div className="h-full w-full bg-bg-elevated" />
      )}

      <div className="absolute inset-0 bg-bg-overlay opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 flex translate-y-sm flex-col items-center justify-center p-lg text-center opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:p-xl">
        <h3 className="max-w-[280px] font-display text-[20px] leading-[1.08] font-semibold tracking-[-0.035em] text-text-primary md:text-[clamp(22px,2vw,28px)]">
          {certificate.title}
        </h3>
        <p className="mt-sm font-body text-[14px] leading-[1.45] font-normal text-text-secondary md:text-[15px]">
          {certificate.issuer}
        </p>
        {certificate.imageUrl ? (
          <a
            aria-label={`Open certificate: ${certificate.title}`}
            className="mt-lg inline-flex items-center justify-center gap-sm rounded-full bg-accent px-lg py-sm font-body text-[14px] leading-none font-semibold text-text-on-accent transition duration-200 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:outline-none"
            href={certificate.imageUrl}
            rel="noreferrer"
            target="_blank"
          >
            Open
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleCertificates = showAll ? certificates : certificates.slice(0, INITIAL_CERTIFICATE_COUNT);
  const canToggleCertificates = certificates.length > INITIAL_CERTIFICATE_COUNT;
  const ToggleIcon = showAll ? ArrowUp : ArrowDown;

  if (!certificates.length) {
    return null;
  }

  return (
    <section id="certificates" className="bg-bg-primary py-4xl md:py-5xl">
      <div className="mx-auto w-full max-w-[1200px] px-lg md:px-4xl">
        <div className="grid gap-2xl md:grid-cols-[300px_minmax(0,1fr)] md:gap-3xl">
          <div>
            <SectionLabel label="Certificates" />
          </div>

          <div>
            <h2 className="max-w-[620px] font-display text-[32px] leading-[1.15] font-semibold tracking-[-0.045em] text-text-primary md:text-[clamp(40px,5vw,58px)]">
              Credentials Behind the Craft
            </h2>
          </div>
        </div>

        <div className="mt-3xl grid auto-rows-[180px] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:auto-rows-[220px] md:grid-cols-4 md:auto-rows-[260px]">
          {visibleCertificates.map((certificate) => (
            <CertificateCard certificate={certificate} key={certificate._id} />
          ))}
        </div>

        {canToggleCertificates ? (
          <button
            className="mt-3 w-full rounded-lg border border-border bg-[rgba(0,0,0,0.6)] py-4 font-body text-[15px] font-semibold text-accent backdrop-blur transition-colors duration-200 hover:bg-[rgba(255,255,255,0.05)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:outline-none"
            onClick={() => setShowAll((currentShowAll) => !currentShowAll)}
            type="button"
          >
            <span className="inline-flex items-center justify-center gap-sm">
              {showAll ? "Show Less" : "View More Certificates"}
              <ToggleIcon aria-hidden="true" className="size-4" strokeWidth={2} />
            </span>
          </button>
        ) : null}
      </div>
    </section>
  );
}
