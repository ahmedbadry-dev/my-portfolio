import { cn } from "@/lib/utils";

type SectionLabelProps = Readonly<{
  label: string;
  className?: string;
}>;

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-md flex items-center gap-sm font-body text-[12px] leading-none font-normal text-text-primary md:text-[14px]",
        className
      )}
    >
      <span aria-hidden="true" className="text-[12px] leading-none text-accent md:text-[14px]">
        ✦
      </span>
      <span>{label}</span>
    </p>
  );
}
