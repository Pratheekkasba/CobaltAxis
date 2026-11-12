import Link from "next/link"

// Branded 404 — renders inside the root layout (nav + footer included).
const NotFound = () => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Error 404
      </p>
      <h1 className="mt-6 text-6xl leading-[1.02] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-8xl">
        Page not found.
      </h1>
      <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
        This page took a wrong turn — but your next project doesn&apos;t have
        to.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-accent-foreground"
        >
          Back to home
        </Link>
        <Link
          href="/work"
          className="rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:bg-secondary"
        >
          See the work
        </Link>
      </div>
    </section>
  )
}

export default NotFound
