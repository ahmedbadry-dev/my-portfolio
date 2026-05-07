import { cn } from "@/lib/utils";

type SectionLabelProps = Readonly<{
  label: string;
  className?: string;
}>;

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-md flex items-center gap-sm font-body text-[14px] leading-none font-normal text-text-primary",
        className
      )}
    >
      <span aria-hidden="true" className="text-[14px] leading-none text-accent">
        ✦
      </span>
      <span>{label}</span>
    </p>
  );
}
