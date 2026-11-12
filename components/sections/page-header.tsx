// Page-level header for the inner routes: a hairline rule, the page title as
// the primary display voice, a mono context label, and an optional intro.
type PageHeaderProps = {
  label: string
  title: string
  intro?: string
  meta?: string
}

export const PageHeader = ({ label, title, intro, meta }: PageHeaderProps) => {
  return (
    <header className="mb-16 md:mb-24">
      <div className="flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-baseline md:justify-between">
        <h1 className="max-w-3xl text-5xl leading-[1.05] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-7xl">
          {title}
        </h1>
        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {label}
        </span>
      </div>
      {intro && (
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </p>
      )}
      {meta && (
        <p className="mt-4 font-mono text-xs tracking-widest text-muted-foreground uppercase md:hidden">
          {meta}
        </p>
      )}
    </header>
  )
}
