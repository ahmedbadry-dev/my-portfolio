import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";

import { cn } from "@/lib/utils";

type YellowButtonVariant = "default" | "external" | "download";

type YellowButtonBaseProps = Readonly<{
  children: ReactNode;
  variant?: YellowButtonVariant;
  href?: string;
  className?: string;
}>;

type YellowButtonProps = YellowButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const iconByVariant = {
  default: ArrowRight,
  external: ArrowUpRight,
  download: Download
} satisfies Record<YellowButtonVariant, typeof ArrowRight>;

export function YellowButton({
  children,
  variant = "default",
  href,
  className,
  type = "button",
  ...buttonProps
}: YellowButtonProps) {
  const Icon = iconByVariant[variant];
  const classes = cn(
    "inline-flex items-center justify-center gap-sm rounded-full bg-accent px-[28px] py-[14px]",
    "font-body text-[14px] leading-none font-semibold text-text-on-accent md:text-[15px]",
    "shadow-none transition-all duration-200 ease-out",
    "hover:-translate-y-px hover:bg-accent-hover hover:shadow-[0_8px_24px_rgba(245,196,0,0.3)]",
    "active:translate-y-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:outline-none",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
    </>
  );

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    return (
      <Link
        className={classes}
        href={href}
        rel={isExternal ? "noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...buttonProps}>
      {content}
    </button>
  );
}
