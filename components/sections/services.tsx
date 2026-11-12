"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { services } from "@/lib/constants/services"
import { SectionHeading } from "./section-heading"

// Sticky storytelling: the section pitch stays pinned while the six service
// cards scroll past it (desktop). Mobile stacks everything vertically.
export const Services = () => {
  return (
    <section id="services" className="mb-28 md:mb-36">
      <SectionHeading label="What we do" title="Six disciplines, one team." />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Pinned pitch */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              One compact team carries your project the whole way — from the
              first moodboard to the last deploy. No handoffs between agencies,
              no lost context.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              Discuss your project
            </Link>
          </div>
        </div>

        {/* Scrolling cards */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.n}
                className="group relative flex gap-6 rounded-lg border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40 md:p-8"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>

                <div className="min-w-0">
                  <h3 className="text-xl font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {service.desc}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="absolute top-6 right-6 flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 md:top-8 md:right-8"
                >
                  <ArrowUpRight className="size-4" />
                </span>
                <span className="absolute top-6 right-6 font-mono text-xs text-muted-foreground transition-opacity duration-300 group-hover:opacity-0 md:top-8 md:right-8">
                  {service.n}
                </span>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
