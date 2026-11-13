import { cn } from "@/lib/utils"

/**
 * Mono spec chip for capability lists — the "data voice" label used
 * across the services page. Optional icon renders in cobalt.
 */
export function FeatureChip({
  icon,
  className,
  children,
}: {
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase",
        className,
      )}
    >
      {icon && (
        <span aria-hidden="true" className="text-cobalt [&_svg]:size-3">
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}
