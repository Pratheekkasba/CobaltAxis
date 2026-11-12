"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { processSteps } from "@/lib/constants/process"
import { SectionHeading } from "./section-heading"

/*
 * The delivery cadence — five stages, each ending in a reviewable artifact.
 * A hairline rail runs down the left; a cobalt progress beam fills it with
 * scroll (spring-smoothed useScroll), and each stage dot ignites as it enters
 * the viewport. Both effects switch off under prefers-reduced-motion.
 */

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
