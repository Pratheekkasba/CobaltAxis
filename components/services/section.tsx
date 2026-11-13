import { cn } from "@/lib/utils"
import { Container } from "./container"

/**
 * Page-section scaffold for /services. Renders the standard header block —
 * mono cobalt eyebrow, display title, muted lead — when those props are
 * given, then the section body. Everything is optional so the primitive
 * works for plain bands too.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  className,
  children,
}: {
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  lead?: React.ReactNode
  className?: string
  children?: React.ReactNode
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <Container>
        {(eyebrow || title || lead) && (
          <header className="mb-12 max-w-3xl md:mb-16">
            {eyebrow && (
              <p className="font-mono text-[11px] tracking-[0.18em] text-cobalt uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] text-foreground md:text-5xl">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  )
}
