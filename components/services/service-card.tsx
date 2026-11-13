import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Service card — the workhorse of the upcoming section prompts.
 *
 * White card, hairline border, optional 16:9 isometric art panel. The art
 * uses mix-blend-multiply on a fixed white panel so the illustration's
 * white background fuses with the card in light theme and reads as a clean
 * light plate in dark theme (same pattern as the homepage capability
 * cards). Hover: lift 4px, border turns cobalt, soft neon-cyan glow —
 * 200ms ease-out, transform/box-shadow only, disabled for
 * prefers-reduced-motion users.
 */
export function ServiceCard({
  index,
  title,
  description,
  image,
  icon,
  href,
  className,
}: {
  /** Mono index label, e.g. "02". */
  index?: string
  title: string
  description: string
  image?: { src: string; alt: string }
  icon?: React.ReactNode
  href?: string
  className?: string
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-cobalt hover:shadow-[0_16px_48px_-16px_rgba(0,240,255,0.35),0_10px_28px_-14px_rgba(43,84,216,0.28)] focus-within:border-cobalt motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {image && (
        <div className="relative aspect-video w-full overflow-hidden bg-white">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover mix-blend-multiply"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          {index && (
            <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-cobalt">
              {index}
            </span>
          )}
          {icon && (
            <span aria-hidden="true" className="text-cobalt [&_svg]:size-5">
              {icon}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] font-[family-name:var(--font-display)] text-foreground md:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {href && (
          <span
            aria-hidden="true"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            Learn more
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        )}
      </div>

      {href && (
        <a href={href} className="absolute inset-0 rounded-2xl">
          <span className="sr-only">{title}</span>
        </a>
      )}
    </article>
  )
}
