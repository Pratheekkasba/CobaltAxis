// Shared section header: a hairline rule, the section title as the primary
// voice (display face, sentence case), and a mono index label on the right —
// the "data voice" carrying metadata, not decoration.
type SectionHeadingProps = {
  label: string
  title: string
  /**
   * Preserved for call-site compatibility. Index labels now stay pinned to the
   * right side across all viewport widths.
   */
  indexInlineFrom?: "md" | "xl"
}

export const SectionHeading = ({
  label,
  title,
}: SectionHeadingProps) => {
  return (
    <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-border pt-6 md:mb-16">
      <h2 className="text-4xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      <span className="ml-auto shrink-0 text-right font-mono text-xs tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}
