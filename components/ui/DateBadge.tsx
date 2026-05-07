import { cn } from "@/lib/utils";

type DateBadgeProps = Readonly<{
  startDate: string;
  endDate?: string | null;
  className?: string;
}>;

function formatYear(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.getFullYear().toString();
}

export function DateBadge({ startDate, endDate, className }: DateBadgeProps) {
  const label = `${formatYear(startDate)} - ${endDate ? formatYear(endDate) : "Present"}`;

  return (
    <time
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-bg-elevated px-[14px] py-[6px]",
        "font-body text-[12px] leading-none font-medium tracking-[0.02em] text-accent",
        className
      )}
      dateTime={endDate ?? startDate}
    >
      {label}
    </time>
  );
}
