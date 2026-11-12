"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { services } from "@/lib/constants/services"
import { SectionHeading } from "./section-heading"
import { cn } from "@/lib/utils"

/*
 * The disciplines index — the page's flagship. A sticky left column carries
 * the pitch, a mini stats stack and a live "now viewing" readout that tracks
 * whichever row is hovered or focused; the six discipline rows sit right,
 * separated by hairlines. Row hover: a cobalt scanner sweeps the top rule,
 * the icon square flips to solid cobalt, the index swaps to an arrow, and
 * deliverable chips warm up left-to-right (see .svc-* rules in globals.css).
 * Entrance motion is the shared CSS view()-timeline reveal.
 */

/** Which pillar system each discipline primarily feeds. */
const pillarFeed: Record<string, string> = {
  "01": "SYS.03",
  "02": "SYS.03",
  "03": "SYS.03",
  "04": "SYS.01 · SYS.02 · SYS.03",
  "05": "SYS.02 · SYS.03",
  "06": "SYS.01 · SYS.02",
}

const tickerTerms = [
  "Art Direction",
  "Brand Strategy",
  "Web Design",
  "Development",
  "Motion Design",
  "Maintenance",
  "Custom AI Agents",
  "Workflow Orchestration",
  "60fps Interfaces",
  "Cloud Systems",
]

const TickerGroup = ({ hidden = false }: { hidden?: boolean }) => (
  <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
    {tickerTerms.map((term, index) => (
      <li key={term} className="flex items-center gap-2.5 pr-4 whitespace-nowrap">
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.1em] uppercase xl:text-[11px]",
            index % 2 === 0 ? "text-foreground/75" : "text-muted-foreground",
          )}
        >
          {term}
        </span>
        <span aria-hidden className="text-primary/70">
          ✦
        </span>
      </li>
    ))}
  </ul>
)

const stats = [
  { value: "06", label: "Disciplines" },
  { value: "03", label: "Pillars" },
  { value: "05", label: "Process stages" },
  { value: "01", label: "Senior team" },
]

export const Services = () => {
  const [activeN, setActiveN] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const active = services.find((s) => s.n === activeN)

  return (
    <section id="disciplines" className="relative mb-24 md:mb-32">
      {/* Discipline ticker */}
      <div className="section-reveal services-marquee relative mb-14 overflow-hidden border-y border-border py-5 md:mb-16">
        <div className="services-marquee-fade">
          <div className="services-marquee-track flex w-max">
            <TickerGroup />
            <TickerGroup hidden />
          </div>
        </div>
      </div>

      <div className="section-reveal">
        <SectionHeading
          label="The disciplines"
          title="How we deliver."
          indexInlineFrom="xl"
        />
      </div>

      <div className="mt-2 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Sticky pitch — pins while the rows scroll past (desktop). */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              One compact team carries your project the whole way — from the
              first moodboard to the last deploy. No handoffs between agencies,
              no lost context.
            </p>

            {/* Mini stats — the mono data voice. */}
            <dl className="mt-10 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card px-5 py-4">
                  <dt className="order-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.01em] text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Live readout — tracks the hovered / focused row. */}
            <div className="mt-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full bg-primary/40 transition-colors duration-200 data-[live=true]:animate-pulse data-[live=true]:bg-primary"
                data-live={active ? "true" : "false"}
              />
              <span className="sr-only">Currently viewing:</span>
              <span className="relative inline-flex h-[1.2em] min-w-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active ? `${active.n}-${active.title}` : "all"}
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={cn(
                      "whitespace-nowrap",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {active
                      ? `${active.n} / ${active.title}`
                      : "All disciplines"}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              Discuss your project
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Discipline rows */}
        <div className="lg:col-span-8">
          <ul className="border-t border-border">
            {services.map((service) => {
              const Icon = service.icon
              const isActive = activeN === service.n
              return (
                <li key={service.n}>
                  <article
                    onMouseEnter={() => setActiveN(service.n)}
                    onMouseLeave={() => setActiveN(null)}
                    onFocus={() => setActiveN(service.n)}
                    onBlur={() => setActiveN(null)}
                    className={cn(
                      "svc-row group grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-x-5 gap-y-4 border-b border-border px-1 py-8 transition-colors duration-300 sm:grid-cols-[auto_1fr_auto] md:py-10",
                      isActive ? "bg-secondary/50" : "hover:bg-secondary/50",
                    )}
                  >
                    {/* Icon square — flips to solid cobalt while active. */}
                    <span
                      className={cn(
                        "col-start-1 row-start-1 row-span-2 flex size-11 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 sm:size-12",
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-accent text-accent-foreground",
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>

                    {/* Title + index/arrow swap */}
                    <div className="col-start-2 row-start-1 flex min-w-0 items-baseline justify-between gap-4 sm:col-start-2 sm:row-start-1">
                      <h3 className="text-xl font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] md:text-2xl">
                        {service.title}
                      </h3>
                      <span className="relative inline-flex size-7 shrink-0 items-center justify-center self-center overflow-hidden rounded-full">
                        <span
                          className={cn(
                            "absolute inset-0 flex items-center justify-center font-mono text-[11px] text-muted-foreground transition-all duration-300",
                            isActive ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100",
                          )}
                        >
                          {service.n}
                        </span>
                        <span
                          className={cn(
                            "absolute inset-0 flex items-center justify-center transition-all duration-300",
                            isActive
                              ? "translate-y-0 opacity-100"
                              : "translate-y-3 opacity-0",
                          )}
                        >
                          <span className="flex size-7 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                            <ArrowUpRight className="size-3.5" aria-hidden="true" />
                          </span>
                        </span>
                      </span>
                    </div>

                    {/* Description + chips + pillar feed */}
                    <div className="col-start-1 col-span-2 row-start-2 sm:col-start-2 sm:col-span-1">
                      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                        {service.desc}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {service.points.map((point, i) => (
                          <li
                            key={point}
                            style={{ "--chip-i": i } as React.CSSProperties}
                            className="svc-chip rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                        Feeds{" "}
                        <span className="text-primary/80">{pillarFeed[service.n]}</span>
                      </p>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Services
