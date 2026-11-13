"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { Check } from "lucide-react"
import { processSteps } from "@/lib/constants/process"
import { SectionHeading } from "./section-heading"
import { cn } from "@/lib/utils"

/*
 * The delivery cadence — five stages, each ending in a reviewable artifact.
 * Top: a timing waterfall (the ml.ai-style gantt card) that lays out a
 * typical engagement as honest day counts; bars grow into view once.
 * Below: the stage rail — a hairline that fills with a cobalt beam as you
 * scroll (spring-smoothed useScroll), each stage dot igniting in view.
 * Both effects switch off under prefers-reduced-motion.
 */

/** Illustrative waterfall for a typical mid-market rollout (28 days ≈ 6 weeks). */
const waterfall = processSteps.map((step, i) => {
  const days = [2, 5, 15, 4, 2][i] ?? 2
  const start = [0, 2, 7, 22, 26][i] ?? 0
  return {
    step,
    days,
    start,
    left: (start / 28) * 100,
    width: (days / 28) * 100,
  }
})

export const ServicesProcess = () => {
  const railRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.78", "end 0.5"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <section id="process" className="relative mb-24 md:mb-32">
      <div className="section-reveal">
        <SectionHeading
          label="The way we work"
          title="How it runs, week to week."
        />
      </div>

      <p className="section-reveal -mt-6 mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:mb-16 md:text-lg">
        One cadence for every engagement — five stages, and each one ends with
        something you can review, run, or ship.
      </p>

      {/* Timing waterfall — the cadence as honest day counts. */}
      <div className="section-reveal mb-14 rounded-xl border border-border bg-card/40 p-6 md:mb-16 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase md:text-[11px]">
            Cobalt build · typical mid-market rollout
          </p>
          <p className="font-mono text-[10px] tracking-[0.16em] text-foreground uppercase md:text-[11px]">
            ≈ 6 weeks
          </p>
        </div>

        <div className="mt-6 space-y-2.5">
          {waterfall.map(({ step, days, left, width }, i) => (
            <div
              key={step.step}
              className="grid grid-cols-[86px_1fr] items-center gap-3 sm:grid-cols-[110px_1fr] sm:gap-4"
            >
              <span className="truncate text-[13px] text-foreground sm:text-sm">
                {step.title}
              </span>
              <div className="relative h-7 rounded-md bg-secondary/50">
                <motion.span
                  aria-hidden="true"
                  initial={reduced ? false : { width: 0 }}
                  whileInView={reduced ? undefined : { width: `${width}%` }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: reduced ? 0 : 0.15 + i * 0.12,
                  }}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  className={cn(
                    "absolute inset-y-0 rounded-md",
                    i === 2 ? "bg-primary" : "bg-primary/75",
                  )}
                />
                <span className="absolute inset-y-0 right-2.5 flex items-center font-mono text-[10px] text-muted-foreground">
                  {days}d
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          <Check aria-hidden="true" className="size-3.5 shrink-0 text-primary" />
          Every stage ends in a reviewable artifact — nothing advances on a
          hunch
        </p>
      </div>

      <div className="relative">
        {/* The rail: static hairline plus the scroll-driven cobalt beam. */}
        <span
          aria-hidden="true"
          className="absolute top-3 bottom-3 left-[7px] w-px bg-border"
        />
        {!reduced && (
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute top-3 bottom-3 left-[7px] w-px origin-top bg-primary shadow-[0_0_10px_1px_color-mix(in_srgb,var(--primary)_45%,transparent)]"
          />
        )}

        <ol ref={railRef} className="flex flex-col">
          {processSteps.map((step) => (
            <li
              key={step.step}
              className="section-reveal relative grid grid-cols-1 gap-x-8 gap-y-3 py-7 pl-10 md:grid-cols-12 md:py-8 lg:pl-12"
            >
              {/* Stage dot on the rail — ignites as the stage scrolls in. */}
              <motion.span
                aria-hidden="true"
                initial={reduced ? false : { scale: 0.4, opacity: 0.35 }}
                whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute top-[2.4rem] left-0 size-[15px] rounded-full border-2 border-border bg-background transition-colors duration-300 md:top-[2.7rem]"
              />
              {/* Solid cobalt core revealed on top of the dot while in view. */}
              <motion.span
                aria-hidden="true"
                initial={reduced ? false : { scale: 0 }}
                whileInView={reduced ? undefined : { scale: 1 }}
                viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.08 }}
                className="absolute top-[2.4rem] left-[4.5px] size-[6px] rounded-full bg-primary shadow-[0_0_8px_2px_color-mix(in_srgb,var(--primary)_50%,transparent)] md:top-[2.7rem]"
              />

              <span className="font-mono text-xs text-muted-foreground md:col-span-1">
                {step.step}
              </span>

              <div className="md:col-span-3">
                <h3 className="text-xl font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] md:text-[1.35rem]">
                  {step.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {step.sub}
                </p>
              </div>

              <div className="md:col-span-8">
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {step.description}
                </p>
                <p className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                  <span aria-hidden className="text-primary/80">
                    ✦
                  </span>
                  <span className="truncate">
                    Artifact — {step.artifact}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ServicesProcess
