import Image from "next/image";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/client";
import { CERTIFICATES_QUERY } from "@/sanity/lib/queries";
import type { Certificate } from "@/types/sanity";

type CertificateCardProps = Readonly<{
  certificate: Certificate;
}>;

function getCertificateSpanClass(aspectRatio?: number) {
  if (typeof aspectRatio !== "number") {
    return "sm:col-span-1 sm:row-span-1";
  }

  if (aspectRatio > 1.5) {
    return "sm:col-span-2 sm:row-span-1";
  }

  if (aspectRatio < 0.8) {
    return "sm:col-span-1 sm:row-span-2";
  }

  return "sm:col-span-1 sm:row-span-1";
}

function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <article
      className={cn(
        "group relative min-h-[260px] overflow-hidden rounded-md border border-border bg-bg-card",
        "shadow-card transition duration-300 hover:border-border-hover",
        getCertificateSpanClass(certificate.aspectRatio)
      )}
    >
      {certificate.imageUrl ? (
        <Image
          alt={certificate.title}
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          src={certificate.imageUrl}
        />
      ) : (
        <div className="h-full w-full bg-bg-elevated" />
      )}

      <div className="absolute inset-0 bg-bg-overlay opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-md p-lg opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:p-xl">
        <h3 className="font-display text-[22px] leading-[1.08] font-semibold tracking-[-0.035em] text-text-primary md:text-[clamp(24px,2.4vw,30px)]">
          {certificate.title}
        </h3>
        <p className="mt-sm font-body text-[14px] leading-[1.45] font-normal text-text-secondary md:text-[15px]">
          {certificate.issuer}
        </p>
      </div>
    </article>
  );
}

export async function CertificatesSection() {
  const certificates = await sanityFetch<readonly Certificate[] | undefined>({
    query: CERTIFICATES_QUERY,
    tags: ["certificate"]
  });

  if (!certificates?.length) {
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

        <div className="mt-3xl grid auto-rows-[260px] grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((certificate) => (
            <CertificateCard certificate={certificate} key={certificate._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
