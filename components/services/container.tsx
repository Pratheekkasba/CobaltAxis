import { cn } from "@/lib/utils"

/**
 * Content column for services sections. The site shell already constrains
 * to 1380px; this is the narrower reading column the services page works
 * in (enterprise-airy, generous gutters).
 */
export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  )
}
