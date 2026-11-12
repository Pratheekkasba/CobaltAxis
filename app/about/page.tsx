import type { Metadata } from "next"
import Link from "next/link"
import { facts, values } from "@/lib/constants/about"
import { processSteps } from "@/lib/constants/process"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"

export const metadata: Metadata = {
  title: "About",
  description:
    "Cobalt Axis is a compact, fully in-house studio of designers and engineers — small teams, short loops, and real work shipping every week.",
}

const AboutPage = () => {
  return (
    <div className="mb-8">
      <PageHeader
        label="About"
        title="A compact studio with senior hands."
        intro="Cobalt Axis is a small, fully in-house team of designers and engineers. The people you meet on day one are the people who ship your project."
        meta="Est. 2025"
      />

      {/* Manifesto */}
      <p className="mx-auto max-w-4xl text-center text-3xl leading-[1.15] font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-[3.25rem]">
        Great digital work lives where <span className="text-primary">craft</span>{" "}
        meets <span className="text-primary">technology</span> — building brands
        and products that feel inevitable.
      </p>

      {/* Facts strip */}
      <div className="mt-16 grid grid-cols-1 divide-y divide-border overflow-hidden rounded-lg border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-2 px-8 py-6">
            <p className="text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-4xl">
              {fact.value}
              {fact.suffix && <span className="text-up">{fact.suffix}</span>}
            </p>
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              {fact.label}
            </p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <div key={value.title} className="flex flex-col gap-3 bg-background p-8">
            <span className="text-base font-medium font-[family-name:var(--font-display)]">
              {value.title}
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {value.desc}
            </p>
          </div>
        ))}
      </div>

      {/* How we work */}
      <section className="mt-20 md:mt-24">
        <div className="flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-baseline md:justify-between">
          <h2 className="text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-4xl">
            The way we work.
          </h2>
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Five phases
          </span>
        </div>

        <ol className="mt-10 flex flex-col border-t border-border">
          {processSteps.map((step) => (
            <li
              key={step.step}
              className="grid grid-cols-1 gap-2 border-b border-border py-6 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-mono text-xs text-muted-foreground md:col-span-1">
                {step.step}
              </span>
              <span className="text-lg font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] md:col-span-3">
                {step.title}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground md:col-span-8">
                {step.description}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Direct conversation */}
      <section className="mt-20 flex flex-col items-start gap-6 rounded-lg border border-border bg-secondary p-8 md:flex-row md:items-center md:justify-between md:p-12">
        <div>
          <h2 className="text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-4xl">
            Work directly with the makers.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            No account managers, no telephone game. When you write to us, a
            designer or engineer writes back.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-accent-foreground"
        >
          Say hello
        </Link>
      </section>

      <CtaBand
        title="Come build with us."
        sub="Whether it's a salon that deserves a better website or a firm that's outgrown its current one — we'd love to hear it."
      />
    </div>
  )
}

export default AboutPage
