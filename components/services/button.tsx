"use client"

import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Services-page CTA button. `primary` = solid enterprise cobalt,
 * `ghost` = hairline outline that warms toward cobalt. Renders a next/link
 * when `href` is given, otherwise a native button. Cobalt is the brief's
 * #2B54D8 brand token (see @theme in globals.css).
 */
const buttonVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-full text-sm font-semibold whitespace-nowrap outline-none transition-[background-color,border-color,color,box-shadow] duration-200 ease-out focus-visible:ring-[3px] focus-visible:ring-cobalt/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-cobalt text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-cobalt-deep",
        ghost:
          "border border-border bg-transparent text-foreground hover:border-cobalt/50 hover:text-cobalt",
      },
      size: {
        md: "h-11 px-6",
        lg: "h-12 px-8 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

type ButtonProps = VariantProps<typeof buttonVariants> & {
  href?: string
  type?: "button" | "submit"
  onClick?: () => void
  /** Pass-through for external links (e.g. booking URLs). */
  target?: string
  rel?: string
  className?: string
  children: React.ReactNode
  "aria-label"?: string
}

export function Button({
  variant,
  size,
  href,
  type = "button",
  onClick,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)
  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  )
}
