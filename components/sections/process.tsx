"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { processSteps } from "@/lib/constants/process"
import { SectionHeading } from "./section-heading"

const steps = processSteps

// The active step is whichever row last crossed the viewport's midline —
// scroll-driven, like reading a document. Clicking a row selects it too.
export const Process = () => {
  const [activeStep, setActiveStep] = useState(0)
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLButtonElement[]
    if (!rows.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveStep(Number(entry.target.getAttribute("data-index")))
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )

    rows.forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  const step = steps[activeStep]

  return (
    <section id="process" className="mb-28 md:mb-36">
      <SectionHeading label="Methodology" title="How we think." />

      {/* Desktop: scroll-driven list + sticky detail panel */}
      <div className="hidden gap-16 lg:grid lg:grid-cols-12">
        <div className="col-span-6 flex flex-col">
          {steps.map((item, idx) => {
            const isActive = activeStep === idx
            return (
              <button
                key={item.step}
                ref={(el) => {
                  rowRefs.current[idx] = el
                }}
                data-index={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex flex-1 flex-col justify-center border-b border-border py-8 text-left transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-35 hover:opacity-70"
                }`}
              >
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {item.step}
                </span>
                <span className="mt-2 text-2xl font-medium tracking-[-0.01em] font-[family-name:var(--font-display)]">
                  {item.title}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {item.sub}
                </span>
              </button>
            )
          })}
        </div>

        <div className="col-span-6">
          <div className="sticky top-32 rounded-lg border border-border bg-card p-10">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Phase {step.step} of 05
              </span>
              <div className="flex items-center gap-1.5">
                {steps.map((s, i) => (
                  <span
                    key={s.step}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeStep
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3 className="mt-8 text-2xl font-medium tracking-[-0.01em] font-[family-name:var(--font-display)] md:text-3xl">
                  {step.sub}
                </h3>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6">
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    Deliverable
                  </span>
                  <span className="font-mono text-sm font-medium text-foreground">
                    {step.artifact}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-4 lg:hidden">
        {steps.map((item) => (
          <article
            key={item.step}
            className="rounded-lg border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-muted-foreground">
                {item.step}
              </span>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                {item.title}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-medium tracking-[-0.01em] font-[family-name:var(--font-display)]">
              {item.sub}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
            <p className="mt-5 border-t border-border pt-4 font-mono text-xs text-foreground">
              {item.artifact}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
