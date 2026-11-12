import type { Metadata } from "next"
import Link from "next/link"
import { services } from "@/lib/constants/services"
import { processSteps } from "@/lib/constants/process"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Art direction, brand strategy, web design, development, motion design, and maintenance — one compact team carrying your project end to end.",
}

const ServicesPage = () => {
  return (
    <div className="mb-8">
      <PageHeader
        label="What we do"
        title="Six disciplines, one team."
        intro="One compact team carries your project the whole way — from the first moodboard to the last deploy. No handoffs between agencies, no lost context."
        meta="06 services"
      />

      {/* Service rows */}
      <ul className="flex flex-col border-t border-border">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <li
              key={service.n}
              className="grid grid-cols-1 gap-6 border-b border-border py-10 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs text-muted-foreground">
                  {service.n}
                </span>
              </div>

              <div className="md:col-span-4">
                <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <h2 className="text-2xl font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] md:text-3xl">
                  {service.title}
                </h2>
              </div>

              <div className="md:col-span-7">
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {service.desc}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-widest text-muted-foreground uppercase"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>

      {/* The way we work — condensed process */}
      <section className="mt-20 md:mt-24">
        <div className="flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-baseline md:justify-between">
          <h2 className="text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-4xl">
            How it runs, week to week.
          </h2>
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            The way we work
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
                {step.sub}. You get{" "}
                <span className="font-mono text-xs text-foreground">
                  {step.artifact}
                </span>
                .
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Mid-page conversion moment */}
      <section className="mt-20 flex flex-col items-start gap-6 rounded-lg border border-border bg-secondary p-8 md:flex-row md:items-center md:justify-between md:p-12">
        <div>
          <h2 className="text-3xl font-medium tracking-[-0.02em] font-[family-name:var(--font-display)] md:text-4xl">
            Not sure which one you need?
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Most projects mix three or four of these. Send us the problem —
            we&apos;ll shape the right package around it.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-accent-foreground"
        >
          Ask us directly
        </Link>
      </section>

      <CtaBand
        title="Let's scope your project."
        sub="A senior partner replies within one working day — with a plan, not a pitch deck."
      />
    </div>
  )
}

export default ServicesPage
